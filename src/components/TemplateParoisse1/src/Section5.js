import React from "react";
import Bapteme from "./assets/bapteme.png";

const Section5 = ({ data = {} }) => {
    return (
        <div id="section5" className="relative flex flex-col items-center justify-center min-h-screen w-full">
            <img 
                src={data.backgroundImageSrc || Bapteme} 
                alt="Bapteme" 
                className="absolute inset-0 h-full w-full object-cover brightness-50"
            />
            <div className="relative z-10 text-center px-4 md:px-8">
                <h1 className="text-white font-kanit font-bold text-xl sm:text-2xl md:text-4xl xl:text-5xl leading-tight md:leading-normal mb-4 max-w-lg md:max-w-3xl mx-auto">
                    {data.title || "LE BAPTEME COMME POINT DE DEPART"}
                </h1>
                <p className="text-[#C7D6D6] font-kanit text-sm sm:text-base md:text-lg xl:text-xl leading-relaxed max-w-md md:max-w-2xl mx-auto mt-12">
                    {data.description || "Notre paroisse accueille avec joie toutes les familles souhaitant célébrer le sacrement du baptême. Nous vous invitons à venir partager ce moment unique et sacré dans notre église. Le baptême est une porte d'entrée dans la vie chrétienne, marquant le début d'un chemin de foi et de communauté. Nous vous accompagnons dans la préparation de cette étape importante, offrant soutien et conseils pour que ce sacrement soit vécu pleinement et sereinement. Rejoignez-nous pour célébrer le baptême de votre enfant et accueillir ensemble les grâces de Dieu."}
                </p>
            </div>
        </div>
    );
};

export default Section5;
