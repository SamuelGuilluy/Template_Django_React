import {useState, useEffect} from "react";
import api from "../api";
import "../styles/Home.css";
import Navbar from "../components/Navbar";

function Home() {
    const [title, setTitle] = useState("");
    const [client, setClient] = useState("");
    // const [deadline, setDeadline] = useState("");
    const [description, setDescription] = useState("");
    const [context, setContext] = useState("");
    const [estimated_cost, setEstimated_cost] = useState("");

    const createProject = (e) =>{
        e.preventDefault()
        api.post("/api/projects/", { title, client, description, context, estimated_cost}).then((res) => {
            if (res.status === 201) {
                alert("Le project a été crée avec succès !");
            }
            else {
                alert("Erreur lors de la création du project");
            }
        })
            .catch((error) => alert(error));
        
    }

    // const handleDateChange = (e) => {
    //     const date = e.target.value;
    //     const dateTime = `${date}T00:00:00`; // Append time to date
    //     setDeadline(dateTime);
    //   };


    return (
        <div>
            <Navbar />

            <div>
                <h2> Formulaire de création d'un nouveau projet</h2>
                <form onSubmit={createProject}>
                    <label htmlFor="title">Titre</label>
                    <br />
                    <input type="text" id="title" placeholder="Titre" value={title} required onChange={(e) => setTitle(e.target.value)} />
                    <label htmlFor="client">Client</label>
                    <br />
                    <textarea placeholder="Client" id="client" value={client} required onChange={(e) => setClient(e.target.value)} />
                    <br />
                    {/* <label htmlFor="deadline">Dead Line</label>
                    <br />
                    <input type="date" id="deadline" required onChange={(e) => handleDateChange(e)} />
                    <br /> */}
                    <label htmlFor="description">Description</label>
                    <br />
                    <textarea placeholder="Description" id="description" value={description} required onChange={(e) => setDescription(e.target.value)} />
                    <br />
                    <label htmlFor="context">Contexte</label>
                    <br />
                    <textarea placeholder="Contexte" id="context" value={context} required onChange={(e) => setContext(e.target.value)} />
                    <br />
                    <label htmlFor="estimated_cost">Budget total estimé</label>
                    <br />
                    <textarea placeholder="Budget total estimé" id="estimated_cost" value={estimated_cost} required onChange={(e) => setEstimated_cost(e.target.value)} />
                    <br />
                    <input type="submit" value="Créer" />
                </form>
            </div>
        </div>
    );
}

export default Home;