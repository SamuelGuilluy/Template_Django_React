import "../styles/Home.css";
import Navbar from "../components/Navbar";
import TableComponents from "../components/TableComponents";
import api from "../api";
import {useState, useEffect} from "react";

function ListProjects() {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        getProjects();
    } , []);


    const getProjects = () => {
        api
            .get("/api/projects/")
            .then((res) => res.data)
            .then((data) => {setProjects(data); console.log(data)})
            .catch((error) => allert(error));
    }

    const deleteProject = (id) => {
        api
            .delete(`/api/projects/delete/${id}/`)
            .then((res) => {
            if (res.status === 204) {
                alert("Note deleted successfully");
            }
            else {
                alert("Error deleting note");
            }
        })
            .catch((error) => alert(error));
    }

    return (
        <div>
             <Navbar />
            {/* <div> <h2>Notes</h2>
                {notes.map((note) => (
                    <Note key={note.id} note={note} onDelete={deleteNote} />
                ))}
            </div> */}

            <div >
                <h1>Liste des projets</h1>
                <TableComponents data={projects} onDelete={deleteProject}/>
            </div>
        </div>
            
    );
}

export default ListProjects;