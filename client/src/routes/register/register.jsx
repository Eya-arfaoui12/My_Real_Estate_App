import "./register.scss";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import apiRequest from "../../components/lib/apiRequest";

function Register() {
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
  
    const navigate = useNavigate();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setError("")
      setIsLoading(true);
      const formData = new FormData(e.target);
  
      const username = formData.get("username");
      const email = formData.get("email");
      const password = formData.get("password");
  
      try {
        const res = await apiRequest.post("/auth/register", {
          username,
          email,
          password,
        });
  
        navigate("/login");
      } catch (err) {
        setError(err.response.data.message);
      } finally {
        setIsLoading(false);
      }
    };
    return (
      <div className="registerPage">
        <div className="container">
          <div className="formContainer">
          <h2>Create an Account</h2>
            <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input name="username" type="text" placeholder="Username" />
            </div>
            <div className="form-group">
              <input name="email" type="text" placeholder="Email" />
            </div>
            <div className="form-group">
              <input name="password" type="password" placeholder="Password" />
            </div>
              <button disabled={isLoading}>Register</button>
              {error && <span>{error}</span>}
            </form>
            <Link to="/login">Do you have an account?</Link>
          </div>
        </div>
      </div>
    );
  }
  
  export default Register;