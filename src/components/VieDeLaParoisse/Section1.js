import React from "react";
import Bg1 from "../../assets/2021.webp";

const Section1 = () => {
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
                Nos prêtres
                </h1>
                <h2 className="text-[#FFFFFF] font-kanit font-light text-lg sm:text-xl md:text-2xl lg:text-3xl mb-2 w-[45%]">
                "Le prêtre n'est pas prêtre pour lui-même, il ne se donne pas l'absolution, il ne se donne pas les sacrements. Il n'est pas pour lui, il est pour vous." — Saint Jean-Marie Vianney, Curé d'Ars
                </h2>
            </div>
        </div>
    );
};

export default Section1;
