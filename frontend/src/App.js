import React, { useState, useEffect } from "react";
import axios from "axios";
import './App.css';

const App = () => {
  const [courses, setCourses] = useState([]);
  const [authToken, setAuthToken] = useState(localStorage.getItem("authToken"));
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState("");
  
  useEffect(() => {
    if (authToken) {
      setIsLoggedIn(true);
      // Decode JWT token to get user role (you can use libraries like jwt-decode for decoding)
      const decoded = JSON.parse(atob(authToken.split('.')[1]));
      setUserRole(decoded.role);
      fetchCourses();
    }
  }, [authToken]);

  const fetchCourses = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/courses", {
        headers: { Authorization: `Bearer ${authToken}` }
      });
      setCourses(response.data);
    } catch (error) {
      console.error("Error fetching courses", error);
    }
  };

  const handleLogin = async () => {
    const email = prompt("Enter email:");
    const password = prompt("Enter password:");

    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", { email, password });
      const token = response.data.token;
      localStorage.setItem("authToken", token);
      setAuthToken(token);
      setIsLoggedIn(true);
    } catch (error) {
      alert("Login failed");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setAuthToken(null);
    setIsLoggedIn(false);
  };

  return (
    <div className="App">
      <h1>Learning Management System (LMS)</h1>
      
      {isLoggedIn ? (
        <>
          <h2>Welcome {userRole}</h2>
          <button onClick={handleLogout}>Logout</button>
          
          <h3>Courses</h3>
          <div>
            {courses.length === 0 ? (
              <p>No courses available</p>
            ) : (
              <ul>
                {courses.map(course => (
                  <li key={course._id}>
                    <strong>{course.title}</strong> - {course.description}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </>
      ) : (
        <button onClick={handleLogin}>Login</button>
      )}
    </div>
  );
};

export default App;
