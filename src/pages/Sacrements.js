import React from 'react';
import Section1 from '../components/Sacrements/Section1';
import Section2 from '../components/Sacrements/Section2';
import Section3 from '../components/Sacrements/Section3';
import Section4 from '../components/Sacrements/Section4';
import Section5 from '../components/Sacrements/Section5';


const Sacrements = () => {
   return (
    <div className='bg-white'>
        <Section1 />
        <Section2 />
        <Section3 />
        <Section4 />
        <Section5 />  
    </div>
    );
};

export default Sacrements;
