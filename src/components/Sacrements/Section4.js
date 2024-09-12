import React from "react";
import Impo from "../../assets/Impo.webp"; // Assurez-vous que le chemin est correct

const Section4 = () => {
  return (
    <section className="relative w-full mt-24 mb-40">
      {/* Arrière-plan haut */}
      <div className=" h-60 w-full"></div>

      {/* Contenu de la section avec l'image centrale floue */}
      <div
        className="relative w-full min-h-[900px] flex justify-center items-center"
        style={{
          backgroundImage: `url(${Impo})`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        {/* Premier bloc de contenu en absolute */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white shadow-lg p-4 md:p-8 mb-12 min-w-[90%] lg:min-w-[55%] md:max-w-[80%] lg:max-w-[50%] z-20 min-h-[320px] md:min-h-[370px]">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium text-center text-primary mb-4 md:mb-8">
          Le sacrement de la confirmation
          </h2>
          <p className="text-primary text-center text-base sm:text-lg md:text-xl leading-relaxed max-w-[90%] md:max-w-[70%] mx-auto">
          Comme ce mot l’indique, ce sacrement confirme la grâce reçue au baptême.

            La confirmation, sacrement de l’initiation chrétienne est le rite par lequel le baptisé est confirmé dans l’Esprit Saint comme membre vivant de l’Église. Le Saint Esprit est symbolisé dans l’iconographie religieuse par une colombe.

            La confirmation rend le baptisé capable, avec l’aide l’Esprit saint, de porter témoignage de sa foi dans le monde où il vit. Dans le baptême, Dieu dit «viens» dans la confirmation, il dit « va ».

            Dans le rituel, le symbolisme du sacrement de confirmation est l’onction de l’huile ou Saint chrême qui signifie la croissance du baptisé comme prêtre, prophète et roi. En savoir plus (renvoi sur la fiche du baptême).
                    </p>
        </div>

        {/* Deuxième bloc de contenu en absolute */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 bg-white shadow-lg p-4 md:p-8 min-w-[90%] lg:min-w-[55%] md:max-w-[80%] lg:max-w-[60%] z-20 min-h-[320px] md:min-h-[370px]">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium text-center text-primary mb-4 md:mb-8">
          En règle générale :
          </h2>
          <p className="text-primary text-center text-base sm:text-lg md:text-xl leading-relaxed max-w-[90%] md:max-w-[70%] mx-auto">
          dans le cas du baptême d’un adulte, il reçoit en même temps la confirmation et l’eucharistie.

            dans le cas d’un enfant baptisé à la naissance ou en âge scolaire, la confirmation se reçoit au moment de l’adolescence pour lui donner le temps de grandir dans la foi et de faire un choix raisonné.

            Le parrain et/ou la marraine de confirmation peuvent être différents de ceux du baptême. Dans tous les cas, ce sont des personnes qui ont reçu les trois sacrements de l’initiation chrétienne : baptême, eucharistie et confirmation.

            Recevoir le sacrement de confirmation est un choix personnel que l’on peut faire lorsque l’on est adolescent ou adulte : quand on a compris que l’amour de Dieu reçu au baptême est un trésor que l’on ne peut pas garder pour soi, qu’il faut le partager. Il est possible de demander à recevoir ce sacrement en s’adressant à sa paroisse. Des confirmations de jeunes et d’adultes sont régulièrement proposées. Ce sacrement est habituellement conféré par l’Évêque qui est chargé de « confirmer ses frères dans la foi » ; c’est vers l’âge de 15-16 ans que les jeunes font cette démarche, après un temps de préparation en équipe de jeunes ou dans un groupe avec des adultes. La célébration est présidée par l’Évêque ou son délégué.
          </p>
        </div>
      </div>

      {/* Arrière-plan bas */}
      <div className=" h-60 w-full"></div>
    </section>
  );
};

export default Section4;
