import React from "react";
import Bg1 from "../../assets/Onction.webp";

const Section3 = () => {
    return (
        <div className="relative w-full h-screen"> {/* Utilisation de h-screen pour s'assurer que l'image occupe tout l'écran */}
            {/* Image d'arrière-plan */} 
            <img src={Bg1} alt='Ordination' className="absolute inset-0 w-full h-full object-cover z-0"></img>

            {/* Overlay avec le dégradé */}
            <div 
                className="absolute inset-0 z-10"
                style={{
                    backgroundImage: 'linear-gradient(120deg, #CC6E95 5%, #264A6E 100%)',
                    opacity: 0.4
                }}
            ></div>

            {/* Texte par-dessus */}
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4 h-full">
                <h1 className="text-[#FFFFFF] font-noto font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-4">
                La confirmation
                </h1>
                <h2 className="text-[#FFFFFF] font-kanit font-light text-lg sm:text-xl md:text-2xl lg:text-3xl mb-2 w-[50%] mx-auto">
                Ce sacrement est habituellement conféré par l’Évêque qui est chargé de « confirmer ses frères dans la foi »

                </h2>
                <h3 className="text-[#FFFFFF] font-kanit font-light text-md sm:text-xl md:text-2xl">
                Catéchisme de l’église catholique 1285</h3>
            </div>
        </div>
    );
};

export default Section3;
