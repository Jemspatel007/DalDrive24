import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/login';
import Signup from './components/signup';
import Navbar from './components/navbar';
import Dashboard from './components/dashboard';
import HomePage  from './components/homepage';

function App() {
  const handleImageUpload = async (file) => {
    const email = localStorage.getItem('userEmail');

    const reader = new FileReader();
    
    reader.onloadend = async () => {
        const base64String = reader.result.split(',')[1];

        try {
            const response = await fetch('https://biupjyo5e3.execute-api.us-east-1.amazonaws.com/Dev/upload', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    body: base64String,
                    queryStringParameters: { email: email },
                }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Image uploaded successfully:', data);
                // Show a success notification here
            } else {
                console.error('Image upload failed:', response.statusText);
                // Show an error notification here
            }
        } catch (error) {
            console.error('Error during image upload:', error);
        }
    };

    reader.readAsDataURL(file); // Convert the file to base64
};


  return (
    <Router>
      <div>
        <Navbar onUpload={handleImageUpload} /> {}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;