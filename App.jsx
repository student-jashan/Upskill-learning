import { useState } from 'react';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('login');
  const [role, setRole] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [securityAnswer, setSecurityAnswer] = useState('');
  const [isSecurityQuestionVisible, setIsSecurityQuestionVisible] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Reset form and messages
  const resetForm = () => {
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setRole('');
    setErrorMessage('');
    setSuccessMessage('');
    setSecurityAnswer('');
  };

  // Show Signup page
  const showSignup = () => {
    resetForm();
    setCurrentPage('signup');
  };

  // Show Login page
  const showLogin = () => {
    resetForm();
    setCurrentPage('login');
    setIsSecurityQuestionVisible(false);
  };

  // Validate Signup form
  const validateSignupForm = (e) => {
    e.preventDefault();

    if (!email) {
      setErrorMessage('Email is required.');
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrorMessage('Please enter a valid email address.');
      return false;
    }
    if (!password) {
      setErrorMessage('Password is required.');
      return false;
    }
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return false;
    }
    if (!role) {
      setErrorMessage('Please select a role.');
      return false;
    }

    setErrorMessage('');
    setSuccessMessage('Signup successful! Please log in.');
    showLogin();
    return true;
  };

  // Handle Security Answer Submission
  const handleSecurityAnswerSubmit = () => {
    if (!securityAnswer) {
      setErrorMessage('Please provide an answer to the security question.');
      return;
    }
    setErrorMessage('');
    setSuccessMessage('Security question successfully answered.');
    setCurrentPage('reset-password'); // Redirect to reset password page
  };

  // Handle New Password Submission
  const handleNewPasswordSubmit = () => {
    if (!password) {
      setErrorMessage('Password is required.');
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    setErrorMessage('');
    setSuccessMessage('Password reset successfully! Please log in.');
    showLogin(); // Redirect to login page
  };

  return (
    <div className="container">
      {currentPage === 'login' && (
        <div id="loginSection">
          <h1>Login</h1>
          <p>Select Your Role to Access the Portal</p>
          <select
            value={role}
            onChange={(e) => {
              const selectedRole = e.target.value;
              setRole(selectedRole);
              if (selectedRole === 'New User') {
                showSignup();
              }
            }}
          >
            <option value="" disabled>Select Role</option>
            <option value="HR">HR</option>
            <option value="Manager">Manager</option>
            <option value="Employee">Employee</option>
            <option value="New User">New User</option>
          </select>
          <div className="login-fields">
            <input type="text" placeholder="Username" required />
            <input type="password" placeholder="Password" required />
            <span className="error">{errorMessage}</span>
            <span className="success">{successMessage}</span>
            <div className="buttons">
              <button type="button">Login</button>
            </div>
            <a href="#" onClick={() => setCurrentPage('forgot-password')}>Forgot Password?</a>
            <div className="account-message">
              <p>Don’t have an account? <a href="#" onClick={showSignup}>Create one here</a></p>
            </div>
          </div>
        </div>
      )}

      {currentPage === 'signup' && (
        <div id="signupSection">
          <h1>Create a New Account</h1>
          <p>Fill in the details below to create your account</p>
          <form id="signupForm" onSubmit={validateSignupForm}>
            <input type="text" placeholder="Full Name" required />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <select value={role} onChange={(e) => setRole(e.target.value)} required>
              <option value="" disabled>Select Role</option>
              <option value="HR">HR</option>
              <option value="Manager">Manager</option>
              <option value="Employee">Employee</option>
            </select>
            <span className="error">{errorMessage}</span>
            <div className="buttons">
              <button type="submit">Sign Up</button>
            </div>
            <div className="account-message">
              <p>Already have an account? <a href="#" onClick={showLogin}>Sign in here</a></p>
            </div>
          </form>
        </div>
      )}

      {currentPage === 'forgot-password' && !isSecurityQuestionVisible && (
        <div id="forgotPasswordSection">
          <h1>Forgot Password</h1>
          <p>Enter your email associated with your role</p>
          <input
            type="email"
            placeholder="Enter your registered email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <div className="buttons">
            <button onClick={() => setIsSecurityQuestionVisible(true)}>Submit</button>
          </div>
          <div className="account-message">
            <p>Remembered your password? <a href="#" onClick={showLogin}>Sign in here</a></p>
          </div>
        </div>
      )}

      {isSecurityQuestionVisible && currentPage === 'forgot-password' && (
        <div id="securityQuestionSection">
          <h1>Security Question</h1>
          <p>Who is your role model?</p>
          <input
            type="text"
            placeholder="Enter your answer"
            value={securityAnswer}
            onChange={(e) => setSecurityAnswer(e.target.value)}
            required
          />
          <span className="error">{errorMessage}</span>
          <span className="success">{successMessage}</span>
          <div className="buttons">
            <button onClick={handleSecurityAnswerSubmit}>Submit Answer</button>
          </div>
        </div>
      )}

      {currentPage === 'reset-password' && (
        <div id="resetPasswordSection">
          <h1>Reset Password</h1>
          <p>Enter your new password</p>
          <input
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <span className="error">{errorMessage}</span>
          <span className="success">{successMessage}</span>
          <div className="buttons">
            <button onClick={handleNewPasswordSubmit}>Reset Password</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
