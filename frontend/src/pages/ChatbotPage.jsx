import Chatbot from "../components/chatbot";
import {useState, useEffect} from "react";
import Navbar from "../components/Navbar";

function ChatbotPage () {
    return (
        <div>
            <Navbar />
            <Chatbot />
        </div>
    )
}

export default ChatbotPage;