import React from "react";

const Section4 = () => {
    return (
        <div className="w-full flex flex-col justify-center items-center mt-12 mb-12">
            {/* Flex container for the two first cards */}
            <div className="w-full flex flex-col md:flex-row justify-center items-start md:space-x-8 space-y-8 md:space-y-0">
                {/* Première carte */}
                <div className="bg-white shadow-lg p-6 w-[90%] md:w-[30%] mx-4 text-center flex flex-col min-h-[517px]">
                    <h2 className="text-primary font-bold text-xl mb-4">Conseil Economique</h2>
                    <p className="text-primary font-light text-lg mb-6">
                        Le Conseil économique est le conseil de notre paroisse qui s’occupe des budgets, comptes, projets et travaux. 
                        Il établit et contrôle l’usage qui est fait des ressources de la paroisse dans une perspective autant matérielle que spirituelle.
                    </p>
                    <ul className="list-disc list-inside text-primary">
                        <li>Abbé Gabriel Dabeziès</li>
                        <li>Anne Leleu</li>
                        <li>Dominique Lompré</li>
                        <li>Mathilde Dubuc</li>
                        <li>Vincent Bergmann</li>
                        <li>Thibault Mugarra</li>
                    </ul>
                </div>

                {/* Deuxième carte */}
                <div className="bg-white shadow-lg p-6 w-[90%] md:w-[30%] mx-4 text-center flex flex-col min-h-[400px]">
                    <h2 className="text-primary font-bold text-xl mb-4">Conseil Paroissial</h2>
                    <p className="text-primary font-light text-lg mb-6">
                        Le conseil d’animation pastorale aide à coordonner les différentes initiatives et activités de notre paroisse. 
                        Il participe à la vision du conseil pastoral. Ce conseil se réunit une fois par semaine.
                    </p>
                    <ul className="list-disc list-inside text-primary">
                        <li>Abbé Gabriel Dabeziès</li>
                        <li>Père Mario Jara</li>
                        <li>Abbé Richard Quiroga</li>
                        <li>Sandrine Uccellini</li>
                        <li>Angélique Magne</li>
                        <li>Martine Labé</li>
                        <li>Jean-Pierre Kittler</li>
                        <li>Henri Navarre</li>
                        <li>Hugues Bro</li>
                        <li>Marie-Christiane Mabic</li>
                        <li>Ségolène de la Fortelle</li>
                        <li>Roland Durand</li>
                    </ul>
                </div>
            </div>

            {/* Troisième carte (centrée en dessous) */}
            <div className="bg-white shadow-lg p-6 w-[90%] md:w-[30%] mx-4 mt-8 text-center flex flex-col">
                <h2 className="text-primary font-bold text-xl mb-4">Conseil Pastoral</h2>
                <p className="text-primary font-light text-lg mb-6">
                    Le Conseil pastoral aide à développer la vision pastorale de notre paroisse. Ce conseil se réunit une fois par mois.
                </p>
            </div>
        </div>
    );
};

export default Section4;
