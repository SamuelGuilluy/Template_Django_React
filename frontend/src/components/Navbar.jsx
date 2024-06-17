import { useNavigate } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar() {
    const navigate = useNavigate();

    return (
        <div className="navbar-container">
            <button className= "navbar-button" onClick={() => navigate('/')}>Ajouter un nouveau projet</button>
            <button className= "navbar-button" onClick={() => navigate('/list_projects')}>Liste des projets</button>
            <button className= "navbar-button" onClick={() => navigate('/chatbot')}>Chatbot</button>
            <button className= "navbar-button" onClick={() => navigate('/logout')}>Se déconnecter</button>
        </div>
    )
}

export default Navbar