# Admission Portal

A fully automated admission portal website for educational institutions.

## Features

- User registration and login with validation
- Secure authentication with captcha
- Admission form submission with all required fields
- Application status tracking
- Report generation with edit and delete functionality
- Export to Excel capability
- File upload with size and format validation (max 1MB, JPEG/PNG only)
- Responsive design for mobile and desktop

## How to Use

1. **Open the Website**
   - Open `index.html` in your web browser

2. **Register an Account**
   - Click on "Register Now" or navigate to the Registration page
   - Fill in your details (all fields are required)
   - Upload a photo (JPEG/PNG format, max 1MB)
   - Submit the form

3. **Login**
   - Use your email and password to login
   - Enter the captcha code shown on the screen

4. **Submit Admission Form**
   - After logging in, navigate to the Admission Form
   - Fill in all required details
   - Upload necessary documents (JPEG/PNG format, max 1MB)
   - Submit the form

5. **View and Manage Reports**
   - Navigate to the Report page
   - View all submitted admission forms and their status
   - Track the progress of your application through the status timeline
   - Edit or delete existing forms
   - Export data to Excel format

## Technical Details

This is a client-side demo that uses:
- HTML5, CSS3 (with Tailwind CSS)
- JavaScript (ES6+)
- LocalStorage for data persistence (no backend required)

The application is completely client-side and doesn't require any server setup. All data is stored in your browser's localStorage, which means:
- Data persists between sessions on the same browser
- Data is not shared between different browsers or devices
- Data will be lost if you clear your browser cache/localStorage

Note: The `backend-spring boot` folder contains a Spring Boot backend implementation that is not currently in use. You can ignore this folder as it's not required for the demo.

## Note on Tailwind CSS

The application currently uses the Tailwind CSS CDN for styling, which may show a warning in the console:
```
cdn.tailwindcss.com should not be used in production. To use Tailwind CSS in production, install it as a PostCSS plugin or use the Tailwind CLI: https://tailwindcss.com/docs/installation
```

This warning is expected and doesn't affect functionality. In a production environment, you should install Tailwind CSS as a PostCSS plugin or use the Tailwind CLI as recommended.

## Demo Credentials

For testing purposes, you can register a new account or use these demo credentials:
- Email: demo@example.com
- Password: password123


