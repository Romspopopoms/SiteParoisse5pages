import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons';
import DefaultBackground from "./assets/back paroisse.png"; // Remplacez par le chemin de votre image par défaut

const Footer = ({ backgroundImage, logoSrc, address, contact, socialLinks }) => {
    return (
        <div className="relative flex">
            <img src={backgroundImage || DefaultBackground} alt='background' className="h-96 object-cover md:h-64 w-full" />
            <div className="md:grid md:grid-cols-2 flex flex-col w-full absolute inset-0 p-4">
                <div className="flex flex-col gap-2">
                    <img src={logoSrc} alt="Logo" className="max-w-[20%]" />
                    <p className="text-white font-kanit font-thin text-sm">
                        {address || "Adresse non disponible"}
                    </p>
                    <div className="hidden md:block mt-12">
                        <h1 className="font-inter text-[#E6E6E6]">© SynergieInnovation 2024</h1>
                    </div>
                </div>

                <div className="flex flex-col gap-2 mt-12 md:mt-0 items-center md:items-end">
                    <div className="flex flex-row space-x-4 items-center">
                        <a href={socialLinks.facebook || "#"} target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faFacebook} size="2x" className="text-white" />
                        </a>
                        <a href={socialLinks.instagram || "#"} target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faInstagram} size="2x" className="text-white" />
                        </a>
                        <a href={socialLinks.youtube || "#"} target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faYoutube} size="2x" className="text-white" />
                        </a>
                    </div>
                    <p className="text-white font-kanit font-thin text-sm mt-3 text-center md:text-left">
                        {contact || "Contact non disponible"}
                    </p>
                    <div className="md:hidden mt-8">
                        <h1 className="font-inter text-[#E6E6E6]">© SynergieInnovation 2024</h1>
                    </div>
                </div> 
            </div>
        </div>
    );
};

export default Footer;
