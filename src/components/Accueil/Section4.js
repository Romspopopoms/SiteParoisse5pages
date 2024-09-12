import React from "react";
import Image1 from "../../assets/Image1.webp"
import Image2 from "../../assets/Image2.webp"
import Image3 from "../../assets/Image3.webp"


const Section4 = () => {
    return (
        <div className="flex flex-col md:flex-row justify-center space-y-8 md:space-y-0 md:space-x-20 items-center mt-24 md:w-full mb-24 w-[80%] mx-auto md:mx-0">
            {/* Première image - Jeunesse */}
            <div className="relative w-auto">
                <img src={Image1} alt="Photo1" className="w-80 h-96 object-cover"></img>
                <div
                    className="absolute inset-0 z-10"
                    style={{
                        backgroundImage: 'linear-gradient(120deg, #CC6E95 5%, #264A6E 100%)',
                        opacity: 0.4
                    }}
                ></div>
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-full z-20 text-center">
                    <h1 className="font-kanit font-bold text-2xl text-[#FFFFFF]">
                        Jeunesse
                    </h1>
                </div>
            </div>

            {/* Deuxième image - Lieux de Cultes */}
            <div className="relative">
                <img src={Image2} alt="Photo2" className="w-80 h-96 object-cover"></img>
                <div
                    className="absolute inset-0 z-10"
                    style={{
                        backgroundImage: 'linear-gradient(120deg, #CC6E95 5%, #264A6E 100%)',
                        opacity: 0.4
                    }}
                ></div>
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-full z-20 text-center">
                    <h1 className="font-kanit font-bold text-2xl text-[#FFFFFF]">
                        Lieux de Cultes
                    </h1>
                </div>
            </div>

            {/* Troisième image - Vie de la paroisse */}
            <div className="relative">
                <img src={Image3} alt="Photo3" className="w-80 h-96 object-cover"></img>
                <div
                    className="absolute inset-0 z-10"
                    style={{
                        backgroundImage: 'linear-gradient(120deg, #CC6E95 5%, #264A6E 100%)',
                        opacity: 0.4
                    }}
                ></div>
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-full z-20 text-center">
                    <h1 className="font-kanit font-bold text-2xl text-[#FFFFFF]">
                        Vie de la paroisse
                    </h1>
                </div>
            </div>
        </div>
    );
};

export default Section4;


