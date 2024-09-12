import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { motion } from "framer-motion";
import Logo from '../../assets/LogoImaMissioW.svg'; // Remplacez par le chemin correct vers le logo VoxUnity

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const Menu = [
        { name: "Hub", href: "/" },
        { name: "Lieux de culte", href: "/LieuxDeCulte" },
        { name: "Sacrements", href: "/Sacrements" },
        { name: "Jeunesse", href: "/Jeunesse" },
        { name: "Vie de la paroisse", href: "/VieDeLaparoisse" },
    ];

    return (
        <nav className="fixed w-full z-50 bg-transparent">
            <div className="flex justify-between items-center px-4 h-20">
                {/* Logo visible en permanence */}
                <a href='/Accueil' className="text-xl">
                    <img src={Logo} alt="Imma" className="h-8 md:h-10 ml-4" />
                </a>

                {/* Menu pour les grands écrans */}
                <div className="hidden xl:flex md:items-center space-x-6 text-[#FFFFFF] text-xl font-kanit font-medium ml-96">
                    {Menu.map((item, index) => (
                        <a 
                            key={index} 
                            href={item.href} 
                        >
                            {item.name}
                        </a>
                    ))}
                </div>

                {/* Contact button */}
                <a href="/Contact" className="hidden xl:block text-[#FFFFFF] bg-primary py-2 px-4 mr-4">
                    <h1 className="font-kanit font-semibold">Contact</h1>
                </a>

                {/* Bouton Hamburger pour les petits écrans */}
                <div className="xl:hidden">
                    <button onClick={() => setIsOpen(!isOpen)} className="text-[#FFFFFF] focus:outline-none">
                        {isOpen ? (
                            <FaTimes className="w-6 h-6" />
                        ) : (
                            <FaBars className="w-6 h-6" />
                        )}
                    </button>
                </div>
            </div>

            {/* Menu déroulant pour petits écrans avec animation */}
            <motion.div
    initial={false}
    animate={isOpen ? "open" : "closed"}
    variants={{
        open: {
            opacity: 1,
            height: "auto",
            transition: {
                duration: 0.4,
                ease: "easeInOut",
            },
        },
        closed: {
            opacity: 0,
            height: 0,
            transition: {
                duration: 0.4,
                ease: "easeInOut",
            },
        },
    }}
    className="xl:hidden bg-transparent text-[#FFFFFF] rounded-xl overflow-hidden"
>
    <ul className="flex flex-col justify-center items-start space-y-4 p-4 ml-20">
        {Menu.map((item, index) => (
            <React.Fragment key={index}>
                <li>
                    <a
                        href={item.href}
                        className={`text-4xl font-medium font-kanit hover:text-gray-300 transition-colors duration-200`}
                        onClick={() => setIsOpen(false)} // Ferme le menu après sélection
                    >
                        {item.name}
                    </a>
                </li>
                {/* Ajout d'une ligne de séparation */}
                {index < Menu.length - 1 && <hr className="border-t border-[#FFFFFF] w-[60%] my-2" />}
            </React.Fragment>
        ))}
    </ul>

    {/* Séparateur avant le bouton */}
    <hr className="border-2 border-[#FFFFFF] w-[51.5%] my-2 ml-24" />

    {/* Bouton "Contact" modifié */}
    <a href="/Contact" className="flex flex-col bg-primary py-3 px-4 ml-24 mt-4 w-[60%] max-w-[50%] sm:max-w-[30%]">
        <h1 className="font-kanit text-[#FFFFFF] text-3xl font-semibold text-center">Contact</h1>
    </a>
</motion.div>


        </nav>
    );
};

export default Navbar;
