import React, { useState } from 'react';
import Navbar from '../components/TemplateParoisse1/Navbar';
import Footer from '../components/TemplateParoisse1/Footer';
import Section1 from '../components/TemplateParoisse1/Section1';
import Section2 from '../components/TemplateParoisse1/Section2';
import Section3 from '../components/TemplateParoisse1/Section3';
import Section4 from '../components/TemplateParoisse1/Section4';
import Section5 from '../components/TemplateParoisse1/Section5';
import Section6 from '../components/TemplateParoisse1/Section6';
import { FiSmartphone, FiMonitor } from 'react-icons/fi';

const Preview = ({ formData = {} }) => {
    const [isMobileView, setIsMobileView] = useState(true);

    const toggleView = (view) => {
        setIsMobileView(view === 'mobile');
    };

    const defaultFormData = {
        navbar: { logoSrc: '', links: [] },
        section1: {},
        section2: {},
        section3: {},
        section4: {},
        section5: {},
        section6: {},
        footer: { socialLinks: {} },
    };

    const data = { ...defaultFormData, ...formData };

    return (
        <div className="flex flex-col items-center">
            <div className="flex space-x-4 mb-4">
                <button 
                    className={`p-2 ${isMobileView ? 'bg-gray-200' : ''}`} 
                    onClick={() => toggleView('mobile')}
                >
                    <FiSmartphone size={24} />
                </button>
                <button 
                    className={`p-2 ${!isMobileView ? 'bg-gray-200' : ''}`} 
                    onClick={() => toggleView('desktop')}
                >
                    <FiMonitor size={24} />
                </button>
            </div>
            
            <div 
                className={`border ${isMobileView ? 'w-[375px]' : 'w-full max-w-[1440px]'} h-full shadow-lg overflow-y-auto`}
            >
                <Navbar 
                    logoSrc={data.navbar.logoSrc}
                    links={data.navbar.links}  // Passe les liens ici
                    isMobileView={isMobileView}
                />
                
                {/* Sections with IDs for navigation */}
                <div id="section1">
                    <Section1 data={data.section1} />
                </div>
                <div id="section2">
                    <Section2 data={data.section2} />
                </div>
                <div id="section3">
                    <Section3 data={data.section3} />
                </div>
                <div id="section4">
                    <Section4 data={data.section4} />
                </div>
                <div id="section5">
                    <Section5 data={data.section5} />
                </div>
                <div id="section6">
                    <Section6 data={data.section6} />
                </div>
                
                <Footer 
                    backgroundImage={data.footer.backgroundImage}
                    logoSrc={data.navbar.logoSrc}  // Utilisation directe de data
                    address={data.footer.address}
                    contact={data.footer.contact}
                    socialLinks={data.footer.socialLinks}
                />
            </div>
        </div>
    );
};

export default Preview;
