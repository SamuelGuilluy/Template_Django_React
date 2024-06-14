import Form from "../components/Form";
import { useNavigate } from "react-router-dom";
import "../styles/Form.css";

function Login() {
    const navigate = useNavigate();
    return (
        <div>
        <Form route="/api/token/" method="login" />
        <button className="register-button" onClick={() => navigate("/register")}> 
            Register
        </button>
        
        </div>
    );
}

export default Login;