const http = require('http');

// In-memory database
const students = [];
const admissionForms = [];

// Create a server
const server = http.createServer((req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }
  
  // Parse URL
  const url = req.url;
  
  // Handle different endpoints
  if (url === '/api/student/register' && req.method === 'POST') {
    // Registration endpoint
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    
    req.on('end', () => {
      try {
        const student = JSON.parse(body);
        
        // Check if email already exists
        if (students.some(s => s.email === student.email)) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ message: 'Email is already in use!' }));
          return;
        }
        
        // Add student to database
        student.id = students.length + 1;
        students.push(student);
        
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Student registered successfully!' }));
      } catch (error) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Invalid request data' }));
      }
    });
  } 
  else if (url === '/api/student/login' && req.method === 'POST') {
    // Login endpoint
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    
    req.on('end', () => {
      try {
        const { email, password } = JSON.parse(body);
        
        // Find student
        const student = students.find(s => s.email === email);
        
        if (!student) {
          res.writeHead(401, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ message: 'Invalid email or password' }));
          return;
        }
        
        // In a real app, we would check the password hash
        // For demo, we'll just check the plain password
        if (student.password !== password) {
          res.writeHead(401, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ message: 'Invalid email or password' }));
          return;
        }
        
        // Generate a fake token
        const token = `fake-jwt-token-${Date.now()}`;
        
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          token,
          id: student.id,
          email: student.email,
          fullName: student.fullName
        }));
      } catch (error) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Invalid request data' }));
      }
    });
  }
  else if (url === '/api/admission/submit' && req.method === 'POST') {
    // Admission form submission endpoint
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    
    req.on('end', () => {
      try {
        const form = JSON.parse(body);
        
        // Add form to database with student ID
        form.id = admissionForms.length + 1;
        form.status = 'PENDING';
        form.createdAt = new Date().toISOString();
        
        // Store the student ID with the form
        if (form.studentId) {
          admissionForms.push(form);
          
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ message: 'Admission form submitted successfully!' }));
        } else {
          res.writeHead(401, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ message: 'Unauthorized: Student ID is required' }));
        }
      } catch (error) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Invalid request data' }));
      }
    });
  }
  else if (url === '/api/admission/status' && req.method === 'GET') {
    // Get admission status endpoint
    // Extract the student ID from the query parameters
    const urlObj = new URL(req.url, `http://${req.headers.host}`);
    const studentId = urlObj.searchParams.get('studentId');
    
    if (!studentId) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Student ID is required' }));
      return;
    }
    
    // Filter forms by student ID
    const studentForms = admissionForms.filter(form => form.studentId === parseInt(studentId));
    
    if (studentForms.length === 0) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'No admission form found for this student' }));
      return;
    }
    
    // Return the most recent form
    const form = studentForms.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0];
    
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(form));
  }
  else {
    // Not found
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Endpoint not found' }));
  }
});

// Start the server
const PORT = 8081;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});

