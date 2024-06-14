import { useNavigate } from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();

    return (
        <div className="navbar-container">
            <button onClick={() => navigate('/')}>Add Notes</button>
            <button onClick={() => navigate('/visualise')}>Visualise Notes</button>
        </div>
    )
}

export default Navbar