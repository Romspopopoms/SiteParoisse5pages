import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";

const Section2 = ({ data = {}, isMobileView }) => {
    const [Open, SetOpen] = useState(false);
    const [Open2, SetOpen2] = useState(false);
    const [Open3, SetOpen3] = useState(false);

    return (
        <div id="section2" className={`bg-white relative ${isMobileView ? 'grid grid-cols-1' : 'grid grid-cols-2'} gap-4 p-4 md:p-8`}>
            <div className={`flex flex-col justify-center items-center text-center ${isMobileView ? '' : 'md:text-left'}`}>
                <h1 className="font-kanit text-primary font-bold text-xl sm:text-2xl md:text-4xl mb-2 sm:mb-4">
                    {data.title || "Un lieu pour vivre sa foi"}
                </h1>
                <p className="text-[#394040] font-kanit text-base sm:text-lg md:text-xl leading-relaxed max-w-sm sm:max-w-md mx-auto md:mx-0">
                    {data.description || "Bienvenue dans notre paroisse catholique!"}
                </p>
            </div>
            <div className={`flex flex-col justify-center items-start mt-4 ${isMobileView ? '' : 'md:mt-0'}`}>
                <div className="w-full space-y-4">
                    <div className="flex flex-col">
                        <div
                            className="flex items-center cursor-pointer"
                            onClick={() => SetOpen(!Open)}
                        >
                            <FontAwesomeIcon icon={Open ? faTimes : faPlus} className="mr-2 sm:mr-4 text-[#394040]" />
                            <h3 className="font-kanit text-primary text-base sm:text-xl md:text-2xl font-bold">
                                {data.sacramentsTitle || "Les Sacrements"}
                            </h3>
                        </div>
                        {Open && (
                            <div className="ml-4 sm:ml-8 mt-2">
                                <p className="text-[#394040] font-kanit text-sm sm:text-lg md:text-xl">
                                    {data.sacramentsDescription || "Dans notre paroisse, vous pouvez vivre pleinement les sacrements."}
                                </p>
                            </div>
                        )}
                    </div>
                    <hr className="w-full border-gray-300" />
                    <div className="flex flex-col">
                        <div
                            className="flex items-center cursor-pointer"
                            onClick={() => SetOpen2(!Open2)}
                        >
                            <FontAwesomeIcon icon={Open2 ? faTimes : faPlus} className="mr-2 sm:mr-4 text-[#394040]" />
                            <h4 className="font-kanit text-primary text-base sm:text-xl md:text-2xl font-bold">
                                {data.youthMinistryTitle || "Une pastorale pour la jeunesse"}
                            </h4>
                        </div>
                        {Open2 && (
                            <div className="ml-4 sm:ml-8 mt-2">
                                <p className="text-[#394040] font-kanit text-sm sm:text-lg md:text-xl">
                                    {data.youthMinistryDescription || "Nous offrons de nombreuses activités pour les jeunes."}
                                </p>
                            </div>
                        )}
                    </div>
                    <hr className="w-full border-gray-300" />
                    <div className="flex flex-col">
                        <div
                            className="flex items-center cursor-pointer"
                            onClick={() => SetOpen3(!Open3)}
                        >
                            <FontAwesomeIcon icon={Open3 ? faTimes : faPlus} className="mr-2 sm:mr-4 text-[#394040]" />
                            <h5 className="font-kanit text-primary text-base sm:text-xl md:text-2xl font-bold">
                                {data.communityLifeTitle || "Une vie communautaire"}
                            </h5>
                        </div>
                        {Open3 && (
                            <div className="ml-4 sm:ml-8 mt-2">
                                <p className="text-[#394040] font-kanit text-sm sm:text-lg md:text-xl">
                                    {data.communityLifeDescription || "Notre paroisse propose diverses activités pour tous."}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Section2;
