import React from 'react';
import Section1 from '../components/VieDeLaParoisse/Section1';
import Section2 from '../components/VieDeLaParoisse/Section2';
import Section3 from '../components/VieDeLaParoisse/Section3';
import Section4 from '../components/VieDeLaParoisse/Section4';



const VieDeLaParoisse = () => {
   return (
    <div className='bg-white'>
        <Section1 />
        <Section2/>
        <Section3 />
        <Section4 />
    </div>
    );
};

export default VieDeLaParoisse;
