import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate for redirect

const Login = () => {
  const [formData, setFormData] = useState({
    role: '',
    email: '',
    password: '',
  });
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        alert('Login successful!');
        navigate('/dashboard');
      } else {
        setLoginError(data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      setLoginError('An error occurred. Please try again.');
    }
  };

  const radioButtonStyle = {
    display: 'none',
  };

  const labelStyle = {
    display: 'inline-block',
    padding: '10px 20px',
    margin: '0 5px',
    backgroundColor: '#f0f0f0',
    border: '2px solid #ccc',
    borderRadius: '20px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  };

  const activeLabelStyle = {
    backgroundColor: '#ff8c00',
    borderColor: '#ff8c00',
    color: '#fff',
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-lg">
            <div className="card-body">
              <h2 className="text-center mb-4">Login</h2>
              {/* <img src="logo.png" alt="Logo" className="d-block mx-auto mb-4" /> */}
              {loginError && <p className="text-danger text-center">{loginError}</p>}

              <div className="mb-3 text-center">
                <input
                  type="radio"
                  id="advisor"
                  name="role"
                  value="Worker"
                  checked={formData.role === 'Worker'}
                  onChange={handleChange}
                  style={radioButtonStyle}
                />
                <label
                  htmlFor="advisor"
                  style={{
                    ...labelStyle,
                    ...(formData.role === 'Worker' ? activeLabelStyle : {}),
                  }}
                >
                  Worker
                </label>
                
                <input
                  type="radio"
                  id="b2breseller"
                  name="role"
                  value="Employer"
                  checked={formData.role === 'Employer'}
                  onChange={handleChange}
                  style={radioButtonStyle}
                />
                <label
                  htmlFor="b2breseller"
                  style={{
                    ...labelStyle,
                    ...(formData.role === 'Employer' ? activeLabelStyle : {}),
                  }}
                >
                  Employer
                </label>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-control"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className="form-control"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>

                <button type="submit" className="btn btn-warning w-100">Login</button>
              </form>

              <div className="text-center mt-3">
                <Link to="/register" className="text-decoration-none">
                  Don't have an account? Register here
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
