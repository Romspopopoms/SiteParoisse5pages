import React from "react";
import Bg1 from "../../assets/Ordination.webp";
import Cards from "../../assets/Cards.webp"; // Image à insérer pour les grands écrans

const Section1 = () => {
    return (
        <div className="relative w-full h-[800px] mb-[800px] xl:mb-[600px]">
            {/* Image d'arrière-plan */} 
            <img src={Bg1} alt='Ordination' className="absolute top-0 left-0 w-full h-full object-cover z-0"></img>

            {/* Overlay avec le dégradé */}
            <div 
                className="absolute inset-0 z-10"
                style={{
                    backgroundImage: 'linear-gradient(120deg, #CC6E95 5%, #264A6E 100%)',
                    opacity: 0.4
                }}
            ></div>

            {/* Texte par-dessus */}
            <div className="relative z-20 flex flex-col items-center justify-center h-full">
                <h1 className="text-[#FFFFFF] font-noto font-light text-xl md:text-3xl text-center">
                    Aujourd'hui
                </h1>
                <h2 className="text-[#FFFFFF] font-noto font-bold text-3xl md:text-5xl text-center">Jésus t'attends</h2>
            </div>

            {/* Image en absolute pour XL et plus */}
            <div className="hidden xl:block absolute top-[600px] left-1/2 transform -translate-x-1/2 w-[80%] z-20">
                <img src={Cards} alt="Cards" className="w-full h-auto object-cover"/>
            </div>

            {/* Cartes flexibles pour les tailles inférieures à XL */}
            <div className="xl:hidden w-full flex flex-col items-center gap-2 justify-center z-30 mt-4 ">
                {/* Première carte */}
                <div className="bg-white shadow-lg p-8 w-[90%] md:w-[75%] mx-4 my-2 md:my-0 text-center min-h-[400px] flex flex-col space-y-6">
                    <h3 className="text-primary font-semibold text-2xl md:text-3xl">Bienvenue à la Paroisse de Saint Nazaire !</h3>
                    <p className="text-primary font-kanit font-light text-lg max-w-[85%] mx-auto">
                        Nous sommes heureux de vous accueillir sur le site de notre paroisse, un lieu de rencontre, de prière et de fraternité pour tous. Que vous soyez nouveau dans la région, en visite, ou un paroissien de longue date, notre paroisse vous ouvre grand ses portes.
                    </p>
                </div>

                {/* Deuxième carte */}
                <div className=" bg-white shadow-lg p-8 w-[90%] md:w-[75%] mx-4 my-2 md:my-0 text-center min-h-[400px] flex flex-col space-y-6">
                    <h3 className="text-primary font-semibold text-2xl md:text-3xl">Un lieu de foi et de partage</h3>
                    <p className="text-primary font-kanit font-light text-lg max-w-[85%] mx-auto">
                        La Paroisse Saint-Nazaire de Sanary est plus qu’une simple église : c’est une famille spirituelle où chacun trouve sa place. Ici, nous grandissons ensemble dans la foi, célébrons l’amour du Christ, et nous engageons à servir les autres. Nous croyons en l’importance de vivre une vie enracinée dans l’Évangile et de partager la joie du Seigneur avec tous.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Section1;
