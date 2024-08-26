import Footer from "./Footer";
import Navbar from "./Navbar";
import Section1 from "./Section1"
import Section2 from "./Section2";
import Section3 from "./Section3";
import Section4 from "./Section4";
import Section5 from "./Section5"
import Section6 from "./Section6";

const Accueil = () => {
    return (
        <div className="flex flex-col">
            <Navbar />
        <div id="section1">
        <Section1 />
        </div>
        <div id="section2">
        <Section2 />
        </div>
        <div id="section3">
        <Section3 />
        </div>
        <div id="section4">
        <Section4 />
        </div>
        <div id="section5">
        <Section5 />
        </div>
        <div id="section6">
        <Section6 />
        </div>
        <Footer/>
        
        </div>
    );
};

export default Accueil;
