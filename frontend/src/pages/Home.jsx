import {useState, useEffect} from "react";
import api from "../api";
import Note from "../components/Note";
import "../styles/Home.css";
import Navbar from "../components/Navbar";

function Home() {
    const [notes, setNotes] = useState([]);
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");
    

    

    const createNote = (e) =>{
        e.preventDefault()
        api.post("/api/notes/", {content, title}).then((res) => {
            if (res.status === 201) {
                alert("Note created successfully");
            }
            else {
                alert("Error creating note");
            }
        })
            .catch((error) => alert(error));
        
    }


    return (
        <div>
            <Navbar />

            <div>
                <h2> Create a Note</h2>
                <form onSubmit={createNote}>
                    <label htmlFor="title">Title</label>
                    <br />
                    <input type="text" id="title" placeholder="Title" value={title} required onChange={(e) => setTitle(e.target.value)} />
                    <label htmlFor="content">Content</label>
                    <br />
                    <textarea placeholder="Content" id="content" value={content} required onChange={(e) => setContent(e.target.value)} />
                    <br />
                    <input type="submit" value="Submit" />
                </form>
            </div>
        </div>
    );
}

export default Home;