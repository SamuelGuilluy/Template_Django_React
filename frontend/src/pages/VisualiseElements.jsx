import "../styles/Home.css";
import Navbar from "../components/Navbar";
import TableComponents from "../components/TableComponents";
import api from "../api";
import Note from "../components/Note";
import {useState, useEffect} from "react";

function VisualiseElements() {
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        getNotes();
    } , []);


    const getNotes = () => {
        api
            .get("/api/notes/")
            .then((res) => res.data)
            .then((data) => {setNotes(data); console.log(data)})
            .catch((error) => allert(error));
    }

    const deleteNote = (id) => {
        api
            .delete(`/api/notes/delete/${id}/`)
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
                <h1>Visualise Notes</h1>
                <TableComponents data={notes} onDelete={deleteNote}/>
            </div>
        </div>
            
    );
}

export default VisualiseElements;