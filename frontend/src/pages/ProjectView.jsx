import {useState, useEffect} from "react";
import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";
import api from "../api";
import UploadButton from '../components/UploadButton';
import ProgressiveText from "../components/ProgressiveText";

function ProjectView (){
    const param = useParams()
    const [id, setId] = useState(param.id)
    const [project, setProject] = useState([]);

    const text_to_show = "Bonjour, je suis un texte progressif très long qui va s'afficher progressivement";

    useEffect(() => {
        getProjectInfo();
    } , []);


    const getProjectInfo = () => {
        console.log(id)
        api
            .get(`/api/projects/get/${id}/`)
            .then((res) => res.data)
            .then((data) => {setProject(data); console.log(data)})
            .catch((error) => alert(error));
    }

    return (
        <div>
            <Navbar />
            <h1>Projet : {project.title}</h1>
            <div className="project-view-container">
                <p>Nom du client : {project.client}</p>
                <p>Description du projet : {project.description}</p>
                <p>Contexte : {project.context}</p>
                <p>Budget estimé : {project.estimated_cost}</p>
            </div>

            <ProgressiveText text={text_to_show} speed={10} />

            <div>
                <a href="/example.pdf" download="example.pdf">
                    <button>Télécharger le résumé</button>
                </a>
            </div>
            <UploadButton />
        </div>
    );
}

export default ProjectView;