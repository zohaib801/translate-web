import React, { useState } from "react";
import "./Navbar.css"

const Navbar = () => {
        const [isOpen, setIsOpen] = useState(false);
    return(
        <div className ="Navbar">
            <span className="nav-logo">language Translation</span>
            <div className={`nav-items ${isOpen ? "open" : ""}`}>
                <a href="/home">Home</a>
                <a href="/book">Books</a>
                <a href="/about">About</a>
                <a href="/contact">Contact</a>
            </div>
            <div
                className={`nav-toggle ${isOpen ? "open" : ""}`}
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className="bar"></div>
            </div>
            
                
           
        </div>

    );
};

export default Navbar;