import React from "react";
import Enfants from "../../../assets/enfants.png";
import Ado from "../../../assets/ado.png";
import JeunePro from "../../../assets/jeunepro.png";

const Section6 = ({ data }) => {
    return (
        <div id="section6" className="mt-8 mb-20 px-4 md:px-8">
            <h1 className="text-2xl md:text-4xl font-kanit font-bold text-primary text-center mb-12">
                {data.title || "NOS PASTORALES POUR LES JEUNES"}
            </h1>
            <div className="grid grid-cols-1 gap-8">
                <div className="relative flex flex-col items-center justify-center">
                    <img 
                        src={data.image1Src || Enfants} 
                        alt={data.image1Alt || "Enfants"} 
                        className="w-full h-64 md:h-80 object-cover brightness-50 rounded-lg mb-4" 
                    />
                    <h1 className="absolute text-xl sm:text-2xl md:text-4xl lg:text-5xl font-kanit font-bold text-white text-center">
                        {data.image1Title || "ENFANTS"}
                    </h1>
                </div>
                <div className="relative flex flex-col items-center justify-center">
                    <img 
                        src={data.image2Src || Ado} 
                        alt={data.image2Alt || "Ados"} 
                        className="w-full h-64 md:h-80 object-cover brightness-50 rounded-lg mb-4" 
                    />
                    <h2 className="absolute text-xl sm:text-2xl md:text-4xl lg:text-5xl font-kanit font-bold text-white text-center">
                        {data.image2Title || "ADOS"}
                    </h2>
                </div>
                <div className="relative flex flex-col items-center justify-center">
                    <img 
                        src={data.image3Src || JeunePro} 
                        alt={data.image3Alt || "Jeunes Pro"} 
                        className="w-full h-64 md:h-80 object-cover brightness-50 rounded-lg mb-4" 
                    />
                    <h3 className="absolute text-xl sm:text-2xl md:text-4xl lg:text-5xl font-kanit font-bold text-white text-center">
                        {data.image3Title || "JEUNES PRO"}
                    </h3>
                </div>
            </div>
        </div>
    );
};

export default Section6;
