import React from "react";
import Eglise from "../../assets/Image2.webp"
import Ordination from "../../assets/Ordination.webp";

const Section2 = () => {
    return (
        <div className="w-full flex justify-center items-center py-16 bg-white">
            {/* Conteneur avec les deux images et la carte */}
            <div className="relative w-full flex justify-between items-center">
                
                {/* Première image - Eglise */}
                <div className="hidden md:block w-[40%] h-[800px]">
                    <img src={Eglise} alt="Eglise" className="w-full h-full object-cover shadow-lg" />
                </div>

                {/* Carte au centre */}
                <div className="w-full md:w-[50%] md:translate-x-1/2 bg-white p-8 shadow-xl z-10 md:absolute text-center flex flex-col justify-center ">
                    <h2 className="text-3xl font-bold text-[#264A6E] mb-4">Le sacrement de l'Eucharistie</h2>
                    <p className="text-gray-700 text-lg mb-6">
                    Eucharistie vient d’un mot grec qui signifie « action de grâce » : louange, action de grâce rendue à Dieu. On désigne plus particulièrement par ce mot, chez les chrétiens, l’action de grâce de Jésus lors de la Cène, dernier repas de Jésus avec ses disciples. Les chrétiens se réunissent pour célébrer Jésus mort et ressuscité, pour associer à sa vie nouvelle tous ceux qui y communient dans la foi.
                    <br></br><br></br>
                    L’Eucharistie, troisième sacrement de l’initiation chrétienne, est le seul sacrement accompli par Jésus lui-même. Elle a été instituée lors de la Cène. Ce geste est particulièrement commémoré lors de la célébration du Jeudi saint où le Christ s’offre à son Père.
                    <br></br><br></br>
                    Sacrement eucharistique
                    L’Eucharistie structure la vie chrétienne, elle la ponctue, elle est la respiration dans la vie spirituelle. C’est une actualisation de la Pâque et non pas sa répétition ou son simple souvenir. L’Eucharistie, ou la messe, est un rappel de la dernière Cène, de la mort et de la résurrection de Jésus Christ.
                    <br></br><br></br>
                    La consécration à la messe est réelle. Pour les catholiques, le pain et le vin deviennent vraiment le Corps et le Sang du Christ. La messe est offerte à Dieu le Père comme geste d’offrande. L’Eucharistie est une nourriture donnée par Dieu aux hommes afin qu’ils vivent de lui.
                    <br></br><br></br>
                    Un chrétien doit se préparer à recevoir le Corps du Christ pour la première fois. Ensuite, il est invité à communier à chaque eucharistie, particulièrement le dimanche.
                    </p>
                    {/* Boutons */}
                </div>

                {/* Deuxième image - Eveque */}
                <div className="hidden md:block  w-[40%]">
                    <img src={Ordination} alt="Eveque" className="w-full min-h-[800px] shadow-lg object-cover" />
                </div>
            </div>
        </div>
    );
};

export default Section2;
