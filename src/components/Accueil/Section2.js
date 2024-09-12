import React from "react";
import Eglise from "../../assets/Eglise.webp";
import Eveque from "../../assets/Eveque.webp";

const Section2 = () => {
    return (
        <div className="w-full flex justify-center items-center py-16 bg-white">
            {/* Conteneur avec les deux images et la carte */}
            <div className="relative w-full flex justify-between items-center">
                
                {/* Première image - Eglise */}
                <div className="hidden md:block w-[40%] h-[700px]">
                    <img src={Eglise} alt="Eglise" className="w-full h-full object-cover shadow-lg" />
                </div>

                {/* Carte au centre */}
                <div className="w-full md:w-[50%] md:translate-x-1/2 bg-white p-8 shadow-xl z-10 md:absolute text-center flex flex-col justify-center mt-20">
                    <h2 className="text-3xl font-bold text-[#264A6E] mb-4">VIVEZ L'EUCHARISTIE</h2>
                    <p className="text-gray-700 text-lg mb-6">
                        Nous vous invitons chaleureusement à participer aux messes de la Paroisse Saint-Nazaire de Sanary, que ce soit le dimanche ou en semaine. Chaque célébration est une occasion de se rassembler, de prier, et de partager la joie de l'Évangile. Rejoignez-nous pour vivre ensemble ces moments de grâce, de communion, et de paix. Que vous soyez un habitué ou que ce soit votre première visite, vous êtes toujours les bienvenus parmi nous !
                    </p>
                    {/* Boutons */}
                    <div className="flex justify-center gap-4">
                        <button className="bg-[#CC6E95] text-white py-2 px-4 rounded-lg shadow-md font-semibold">
                            Les horaires de messe
                        </button>
                        <button className="bg-gray-200 text-gray-700 py-2 px-4 rounded-lg shadow-md font-semibold">
                            Découvrir la messe
                        </button>
                    </div>
                </div>

                {/* Deuxième image - Eveque */}
                <div className="hidden md:block  w-[40%]">
                    <img src={Eveque} alt="Eveque" className="w-full min-h-[700px] shadow-lg object-cover" />
                </div>
            </div>
        </div>
    );
};

export default Section2;
