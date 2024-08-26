import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiMenu } from "react-icons/fi";

const Navbar = ({ logoSrc = 'default_logo_path', links = [], isMobileView = false }) => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className={`relative w-full h-16 flex items-center z-50 ${isMobileView ? 'bg-[#54B9BC] shadow-md' : 'bg-[#54B9BC]'}`}
        >
            <a href="/" className="ml-4">
                <img src={logoSrc} alt="logo" className="h-8 md:h-12" />
            </a>
            <nav className="ml-8 flex-grow flex items-center justify-end">
                {isMobileView ? (
                    <div className="flex items-center pr-4">
                        <button onClick={toggleMenu} className="text-white text-3xl focus:outline-none">
                            <FiMenu />
                        </button>
                    </div>
                ) : (
                    <div className="flex items-center space-x-4 pr-4">
                        {links.map((item, index) => (
                            <a 
                                key={index}
                                href={`#section${index + 1}`}  // Lien fixe basé sur l'ID de la section
                                className="text-white font-jost text-sm font-semibold hover:underline"
                            >
                                {item.name}  {/* Affiche le nom modifiable */}
                            </a>
                        ))}
                    </div>
                )}
            </nav>
            {menuOpen && isMobileView && (
                <div className="absolute top-16 left-0 w-full bg-[#54B9BC] flex flex-col items-center shadow-md z-50">
                    {links.map((item, index) => (
                        <a 
                            key={index}
                            href={`#section${index + 1}`}  // Lien fixe basé sur l'ID de la section
                            onClick={() => setMenuOpen(false)}
                            className="text-white font-jost text-lg py-4 w-full text-center hover:bg-[#399799]"
                        >
                            {item.name}  {/* Affiche le nom modifiable */}
                        </a>
                    ))}
                </div>
            )}
        </motion.div>
    );
};

export default Navbar;
