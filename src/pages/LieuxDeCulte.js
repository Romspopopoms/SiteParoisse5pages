import React from "react";
import Culte from "../assets/Culte.webp"

const LieuxDeCulte = () => {
    return (
        <div 
            className="w-full min-h-screen bg-top bg-cover bg-no-repeat flex flex-col items-center justify-center py-32"
            style={{ backgroundImage: `url(${Culte})` }}
        >
            <h1 className="text-4xl md:text-6xl font-kanit font-bold text-[#FFFFFF]">
                Eglise Saint Nazaire
            </h1>

            <div className="w-48 h-72 bg-white flex flex-col text-center mt-12">
                <h2 className="font-kanit font-medium text-primary text-xl md:text-2xl text-center mt-4 ">Dimanche</h2>
                {/* Aligning list-items left to ensure bullet points are visible */}
                <ul className="space-y-2 font-kanit font-light text-lg text-primary list-disc text-left pl-5 mt-4 ml-2">
                    <li>8h30 – chapelet</li>
                    <li>9h – messe</li>
                    <li>10h30 – messe</li>
                    <li>18h30 – messe</li>
                </ul>
            </div>

            <div className="flex flex-col justify-center items-center w-full mt-4 space-x-4 md:space-x-0 ">
                <div className="flex flex-col md:flex-row w-full justify-center items-center space-x-0 md:space-x-4 space-y-4 md:space-y-0">
                    <div className="w-48 h-72 bg-white flex-col justify-center items-center">
                        <h2 className="font-kanit font-medium text-primary text-xl md:text-2xl text-center mt-4">Lundi</h2>
                        <ul className="space-y-2 font-kanit font-light text-lg text-primary list-disc text-left pl-5 mt-4 ml-2">
                            <li>18h30 – messe</li>
                        </ul>
                    </div>

                    <div className="w-48 h-72 bg-white flex-col justify-center space-y-6 items-center">
                        <h2 className="font-kanit font-medium text-primary text-xl md:text-2xl text-center mt-4">Mardi</h2>
                        <ul className="space-y-2 font-kanit font-light text-lg text-primary list-disc text-left pl-5 mt-4 ml-2">
                            <li>7h45 – Adoration</li>
                            <li>8h30 – chapelet</li>
                            <li>9h – messe</li>
                        </ul>
                    </div>

                    <div className="w-48 h-72 bg-white flex-col justify-center space-y-6 items-center">
                        <h2 className="font-kanit font-medium text-primary text-xl md:text-2xl text-center mt-4">Mercredi</h2>
                        <ul className="space-y-2 font-kanit font-light text-lg text-primary list-disc text-left pl-5 mt-4 ml-2">
                            <li>7h45 – Adoration</li>
                            <li>8h30 – chapelet</li>
                            <li>9h – messe</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="w-48 h-72 bg-white flex flex-col text-center mt-4">
                <h2 className="font-kanit font-medium text-primary text-xl md:text-2xl text-center mt-4">Jeudi</h2>
                <ul className="space-y-2 font-kanit font-light text-lg text-primary list-disc text-left pl-5 mt-4 ml-2">
                    <li>Jusqu’au 7 décembre – 18h – chapelet</li>
                    <li>8h30 – messe suivie de la nuit d’adoration (hors vacances scolaire)</li>
                </ul>
            </div>

            <div className="w-48 h-72 bg-white flex flex-col text-center mt-4">
                <h2 className="font-kanit font-medium text-primary text-xl md:text-2xl text-center mt-4">Vendredi</h2>
                <ul className="space-y-2 font-kanit font-light text-lg text-primary list-disc text-left pl-5 mt-4 ml-2">
                    <li>8h30 – chapelet</li>
                    <li>9h – messe</li>
                    <li>chaque premier vendredi du mois à 18h30 – Messe au Sacré-Coeur de Jésus pour la France</li>
                </ul>
            </div>

            <div className="w-48 h-72 bg-white flex flex-col text-center mt-4">
                <h2 className="font-kanit font-medium text-primary text-xl md:text-2xl text-center mt-4">Samedi</h2>
                <ul className="space-y-2 font-kanit font-light text-lg text-primary list-disc text-left pl-5 mt-4 ml-2">
                    <li>18h30 – messe anticipée (messe des jeunes)</li>
                </ul>
            </div>
        </div>
    )
}

export default LieuxDeCulte;
