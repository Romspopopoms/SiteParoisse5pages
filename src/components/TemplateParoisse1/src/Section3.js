import React from "react";
import Eucharistie from "../assets/Eucharistie.png";

const Section3 = ({ data }) => {
    return (
        <div id="section3" className="relative flex flex-col items-center justify-center min-h-screen w-full overflow-hidden">
            <img 
                src={data.backgroundImageSrc || Eucharistie} 
                alt="Eucharistie" 
                className="absolute inset-0 h-full w-full object-cover brightness-50"
            />
            <div className="relative z-10 text-center px-4 md:px-8 max-w-full">
                <h1 className="text-white font-kanit font-bold text-2xl sm:text-3xl md:text-4xl xl:text-5xl leading-tight md:leading-normal mb-4 max-w-lg md:max-w-3xl mx-auto break-words">
                    {data.title || "VIVEZ L'EUCHARISTIE"}
                </h1>
                <p className="text-white font-kanit text-sm sm:text-base md:text-lg xl:text-xl leading-relaxed max-w-md md:max-w-2xl mx-auto break-words">
                    {data.description || "Venez nous rejoindre à la messe, célébrée chaque jour dans notre paroisse. Nous vous accueillons avec joie pour partager ensemble la prière et la grâce divine."}
                </p>
            </div>
        </div>
    );
};

export default Section3;
