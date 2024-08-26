import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faMapMarkerAlt, faHandsPraying } from '@fortawesome/free-solid-svg-icons';

const Section4 = ({ data }) => {
    return (
        <div id="section4" className="mt-8 mb-20 px-4 md:px-8">
            <h1 className="text-2xl md:text-4xl font-kanit font-bold text-primary text-center mb-12">
                {data.title || "QUE POUVONS-NOUS FAIRE POUR VOUS ?"}
            </h1>
            <div className="grid grid-cols-1 gap-8">
                <div className="flex flex-col items-center justify-center">
                    <div
                        className="flex items-center justify-center w-24 h-24 sm:w-32 sm:h-32 rounded-full mb-4"
                        style={{ backgroundColor: data.circle1Color || "#8BA2E0" }}  // Couleur personnalisée pour le premier cercle
                    >
                        {data.icon1Src ? (
                            <img src={data.icon1Src} alt="icon1" className="w-12 h-12 object-contain" />
                        ) : (
                            <FontAwesomeIcon icon={faHandsPraying} className="text-white text-2xl sm:text-3xl" />
                        )}
                    </div>
                    <button className="py-2 px-4 text-sm sm:text-base font-kanit font-semibold text-white bg-[#394040] rounded-lg w-full max-w-[200px] text-center">
                        {data.button1Text || "Intention de prière"}
                    </button>
                </div>
                <div className="flex flex-col items-center justify-center">
                    <div
                        className="flex items-center justify-center w-24 h-24 sm:w-32 sm:h-32 rounded-full mb-4"
                        style={{ backgroundColor: data.circle2Color || "#A7CCAD" }}  // Couleur personnalisée pour le deuxième cercle
                    >
                        {data.icon2Src ? (
                            <img src={data.icon2Src} alt="icon2" className="w-12 h-12 object-contain" />
                        ) : (
                            <FontAwesomeIcon icon={faCalendar} className="text-white text-2xl sm:text-3xl" />
                        )}
                    </div>
                    <button className="py-2 px-4 text-sm sm:text-base font-kanit font-semibold text-white bg-[#394040] rounded-lg w-full max-w-[200px] text-center">
                        {data.button2Text || "Prendre un rendez-vous"}
                    </button>
                </div>
                <div className="flex flex-col items-center justify-center">
                    <div
                        className="flex items-center justify-center w-24 h-24 sm:w-32 sm:h-32 rounded-full mb-4"
                        style={{ backgroundColor: data.circle3Color || "#F09878" }}  // Couleur personnalisée pour le troisième cercle
                    >
                        {data.icon3Src ? (
                            <img src={data.icon3Src} alt="icon3" className="w-12 h-12 object-contain" />
                        ) : (
                            <FontAwesomeIcon icon={faMapMarkerAlt} className="text-white text-2xl sm:text-3xl" />
                        )}
                    </div>
                    <button className="py-2 px-4 text-sm sm:text-base font-kanit font-semibold text-white bg-[#394040] rounded-lg w-full max-w-[200px] text-center">
                        {data.button3Text || "Visiter l'église"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Section4;
