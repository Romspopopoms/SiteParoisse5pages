import React from "react";
import BGSection1 from "../../assets/bgSection1.png";

const Section1 = ({ data, setLogoSrc }) => {
    React.useEffect(() => {
        if (data.logoSrc) {
            setLogoSrc(data.logoSrc);
        }
    }, [data.logoSrc, setLogoSrc]);

    return (
        <div id="section1" className="relative flex flex-col items-center justify-center min-h-screen w-full z-0 mt-16 md:mt-0">
            <img 
                src={data.backgroundImageSrc || BGSection1} 
                alt="fond" 
                className="absolute inset-0 h-full w-full object-cover brightness-50" 
            />
            <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 md:px-8">
                <h1 className="font-bold text-white text-xl sm:text-2xl md:text-4xl xl:text-5xl leading-tight md:leading-normal mb-4 max-w-lg md:max-w-3xl">
                    {data.title || "Bienvenue dans votre Paroisse !"}
                </h1>
                <div className="flex flex-col sm:flex-row gap-2 mt-4">
                    <button className="bg-white text-[#54B9BC] py-1 px-3 sm:py-2 sm:px-5 md:px-8 md:py-2 rounded-lg font-bold text-xs sm:text-sm md:text-base">
                        {data.button1 || "Horaires des Messes"}
                    </button>
                    <button className="bg-white text-[#54B9BC] py-1 px-3 sm:py-2 sm:px-5 md:px-8 md:py-2 rounded-lg font-bold text-xs sm:text-sm md:text-base">
                        {data.button2 || "Inscription au Patronage"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Section1;
