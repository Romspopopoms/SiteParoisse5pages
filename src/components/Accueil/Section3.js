import React from "react";
import Messe from "../../assets/Messe.webp"

const Section3 = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 w-full mb-20 md:mt-12">
            <div className="flex w-full">
                    <img src={Messe} alt="Messe" className="max-w-[80%] mx-auto md:ml-auto"/>
            </div>
            <div className="flex flex-col md:ml-4 mt-12 md:mt-0">
                    <h1 className="text-2xl md:text-4xl font-bold text-primary font-kanit md:max-w-[40%]  text-center md:text-start mx-auto md:mx-0">UN LIEU POUR VIVRE SA FOI</h1>
                    <p className="text-primary font-light font-kanit text-lg md:text-xl max-w-[80%] md:max-w-[55%] mt-8 text-center md:text-start mx-auto md:mx-0">À la Paroisse Saint-Nazaire de Sanary, nous vous offrons l’opportunité de vivre pleinement votre foi à travers les sacrements. Que vous souhaitiez recevoir le baptême, la confirmation, le mariage ou la réconciliation, nous sommes là pour vous accompagner à chaque étape. Préparez-vous avec nous pour que chaque sacrement soit un moment significatif et enrichissant. Venez découvrir comment ces expériences spirituelles peuvent transformer votre vie et renforcer notre communauté. Soyez les bienvenus pour partager, grandir, et célébrer ensemble !</p>

                    <a href="/Sacrement" className="mt-8 flex flex-col justify-center items-center md:items-start">
                        <button className="bg-[#CC6E95] text-white py-2 px-4 rounded-lg shadow-md font-semibold">
                            Découvrir les Sacrements
                        </button>
                    </a>
            </div>
        </div>
    )
}

export default Section3