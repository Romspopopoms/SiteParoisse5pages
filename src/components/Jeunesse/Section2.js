import React from "react";
import Impo from "../../assets/Cate.webp"

const Section2 = () => {
  return (
    <section className="relative w-full">
      {/* Arrière-plan haut */}
      <div className=" h-60 w-full"></div>

      {/* Contenu de la section avec l'image centrale floue */}
      <div
        className="relative w-full min-h-[800px] flex justify-center items-center"
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
          Le KT, c'est quoi ?
          </h2>
          <p className="text-primary text-center text-base sm:text-lg md:text-xl leading-relaxed max-w-[90%] md:max-w-[70%] mx-auto">
          La catéchèse est une pratique religieuse qui vise à éduquer et à former les personnes à la foi chrétienne catholique. Il s’agit d’une forme d’éducation à la foi qui permet d’approfondir la connaissance de la doctrine, de la tradition et de l’amour de Dieu. La catéchèse est une mission qui a pour but de former de nouveaux disciples missionnaires, d’évangéliser et de préparer les chrétiens à une rencontre personnelle avec Jésus-Christ, conduisant à une participation consciente et active au mystère liturgique.
                    </p>
        </div>

        {/* Deuxième bloc de contenu en absolute */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 bg-white shadow-lg p-4 md:p-8 min-w-[90%] lg:min-w-[55%] md:max-w-[80%] lg:max-w-[60%] z-20 min-h-[320px] md:min-h-[370px]">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium text-center text-primary mb-4 md:mb-8">
          En règle générale :
          </h2>
          <p className="text-primary text-center text-base sm:text-lg md:text-xl leading-relaxed max-w-[90%] md:max-w-[70%] mx-auto">
          La première année de catéchisme s'adresse aux enfants qui sont au CE2.   La deuxième année de catéchisme s'adresse aux enfants qui sont au CM1. C’est un temps de préparation pour le sacrement de la pénitence et de l’Eucharistie.  Et la troisième année de catéchisme s'adresse aux enfants qui sont au CM2. C’est une opportunité pour les enfants d’approfondir les thèmes importants de notre foi.   De même, les enfants non baptisés sont  accueillis et peuvent se préparer au baptême avec l'aide d'un catéchiste.
          </p>
        </div>
      </div>

      {/* Arrière-plan bas */}
      <div className=" h-60 w-full"></div>
    </section>
  );
};

export default Section2;
