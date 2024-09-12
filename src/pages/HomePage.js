import React from 'react';
import Section1 from '../components/Accueil/Section1';
import Section2 from '../components/Accueil/Section2';
import Section3 from '../components/Accueil/Section3';
import Section4 from "../components/Accueil/Section4"

const HomePage = () => {
   return (
    <div className='bg-white'>
        <Section1 />
        <Section2 />
        <Section3 />
        <Section4 />
    </div>
    );
};

export default HomePage;
