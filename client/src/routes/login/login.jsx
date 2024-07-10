import { useContext, useState } from "react";
import "./login.scss";
import { Link, useNavigate } from "react-router-dom";
import apiRequest from "../../components/lib/apiRequest";
import { AuthContext } from "../../context/AuthContext";

function Login() {
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const { updateUser } = useContext(AuthContext);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        const formData = new FormData(e.target);

        const username = formData.get("username");
        const password = formData.get("password");

        try {
            const res = await apiRequest.post("/auth/login", {
                username,
                password,
            });

            updateUser(res.data);

            navigate("/");
        } catch (err) {
            const errorMessage = err.response?.data?.message || "An error occurred";
            setError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="login">
            <div className="container">
                <div className="formContainer">
                     <h2>Welcome Back!</h2>
                    <form onSubmit={handleSubmit}>  
                        <div className="form-group">
                            <input name="username" required minLength={3} maxLength={20} type="text" placeholder="username" />
                        </div>
                        <div className="form-group">
                            <input name="password" type="password" required placeholder="password" />
                        </div>
                        <div className="checkbox-group">
                            <input type="checkbox" id="remember" name="remember" />
                            <label htmlFor="remember">Remember Me</label>
                        </div>
                        <button className="btn" disabled={isLoading}>Login</button>
                            {error && <span>{error}</span>}
                    </form>
                    <Link to="/register">{"Don't"} you have an account</Link>
                </div>
            </div>
        </div>
    );
}

export default Login;
