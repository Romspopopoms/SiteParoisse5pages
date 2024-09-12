import React from "react";

const Section5 = () => {
    return (
        <div className="w-full flex justify-center items-center py-16 bg-white">
            <form className="w-full max-w-lg p-8 bg-[#FFFFFF] shadow-lg flex flex-col space-y-6">
                <h2 className="text-3xl font-kanit font-bold text-primary text-center mb-6">Demander un sacrement</h2>
                
                <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                    <input 
                        type="text" 
                        placeholder="Nom" 
                        className="w-full p-3 bg-[#264A6E] text-primary placeholder-[#999999] border-none"
                    />
                    <input 
                        type="text" 
                        placeholder="Prénom" 
                        className="w-full p-3 bg-[#264A6E] text-primary placeholder-[#999999] border-none"
                    />
                </div>
                
                <select className="w-full p-3 bg-[#264A6E] text-[#999999] placeholder-[#999999] border-none">
                    <option value="" disabled selected>Sacrement demandé</option>
                    <option value="baptême">Baptême</option>
                    <option value="mariage">Mariage</option>
                    <option value="communion">Communion</option>
                    <option value="confirmation">Confirmation</option>
                </select>

                <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                    <input 
                        type="text" 
                        placeholder="Téléphone" 
                        className="w-full p-3 bg-[#264A6E] text-primary placeholder-[#999999] border-none"
                    />
                    <input 
                        type="email" 
                        placeholder="Mail" 
                        className="w-full p-3 bg-[#264A6E] text-primary placeholder-[#999999] border-none"
                    />
                </div>
                
                <textarea 
                    placeholder="Adresse postale" 
                    className="w-full p-3 bg-[#264A6E] text-primary placeholder-[#999999] border-none h-24"
                />
                
                <textarea 
                    placeholder="Message (Exemple : noms et prénoms des fiancés, Nom et prénom pour le baptême etc.)" 
                    className="w-full p-3 bg-[#264A6E] text-primary placeholder-[#999999] border-none h-32"
                />
                
                <button className="w-full bg-gradient-to-r from-[#CC6E95] to-[#264A6E] text-white py-3 rounded-lg shadow-md font-semibold">
                    Envoyer
                </button>
            </form>
        </div>
    );
};

export default Section5;
