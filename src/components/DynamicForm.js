import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Preview from '../components/Preview';

const DynamicForm = ({ onSubmit }) => {
    const [formData, setFormData] = useState({
        navbar: {
            logo: '',
            logoSrc: '',
            links: [
                { name: 'ACCUEIL', link: '#section1' },
                { name: 'VIVRE SA FOI', link: '#section2' },
                { name: 'JEUNES', link: '#section3' },
                { name: 'PASTORALES', link: '#section4' },
                { name: 'SACREMENTS', link: '#section5' },
                { name: "L'EQUIPE PASTORALE", link: '#section6' }
            ]
        },
        section1: {
            title: 'Bienvenue dans votre Paroisse',
            backgroundImage: '',
            button1: 'Horaires des Messes',
            button2: 'Inscription au Patronage'
        },
        section2: {
            title: 'Un lieu pour vivre sa foi',
            text1: 'Texte de la première section',
            text2: 'Texte de la deuxième section',
            text3: 'Texte de la troisième section',
            sacramentsTitle: '',
            sacramentsDescription: '',
            youthMinistryTitle: '',
            youthMinistryDescription: '',
            communityLifeTitle: '',
            communityLifeDescription: ''
        },
        section3: {
            title: 'Vivez l\'Eucharistie',
            description: 'Venez nous rejoindre à la messe, célébrée chaque jour dans notre paroisse.',
            backgroundImage: ''
        },
        section4: {
            title: 'Que pouvons-nous faire pour vous ?',
            button1Text: 'Intention de prière',
            button2Text: 'Prendre un rendez-vous',
            button3Text: 'Visiter l\'église',
            icon1Src: '',
            icon2Src: '',
            icon3Src: '',
            circle1Color: '#8BA2E0',
            circle2Color: '#A7CCAD',
            circle3Color: '#F09878'
        },
        section5: {
            title: 'Le baptême comme point de départ',
            description: 'Notre paroisse accueille avec joie toutes les familles souhaitant célébrer le sacrement du baptême.',
            backgroundImage: ''
        },
        section6: {
            title: 'Nos Pastorales pour les Jeunes',
            images: [
                { name: 'ENFANTS', image: '', imageSrc: '' },
                { name: 'ADOS', image: '', imageSrc: '' },
                { name: 'JEUNES PRO', image: '', imageSrc: '' }
            ]
        },
        footer: {
            logo: '',
            address: 'Paroisse Saint-Athanase d\'Alexandrie de Provence, 12 rue du ciel, 83999 LaBelleVilleCatholique',
            contact: '',
            socialLinks: {
                facebook: '',
                instagram: '',
                youtube: ''
            }
        },
        theme: {
            primaryColor: '#54B9BC',
            secondaryColor: '#394040',
            backgroundColor: '#FFFFFF'
        }
    });

    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    const handleGenerateSite = (e) => {
        e.preventDefault();
        setShowModal(true);
    };

    const handleConfirm = () => {
        setShowModal(false);
        navigate('/PreviewPage', { state: { formData } }); 
    };

    const handleChange = (section, key, value, index = null) => {
        setFormData((prevData) => {
            const updatedData = { ...prevData };
            if (index !== null) {
                updatedData[section].images[index].image = value;
            } else {
                updatedData[section][key] = value;
            }
            return updatedData;
        });
    };

    const handleLinkChange = (index, key, value) => {
        const updatedLinks = [...formData.navbar.links];
        updatedLinks[index][key] = value;
        setFormData((prevData) => ({
            ...prevData,
            navbar: {
                ...prevData.navbar,
                links: updatedLinks
            }
        }));
    };

    const handleImageChange = (section, key, file, index = null) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            setFormData((prevData) => {
                const updatedData = { ...prevData };
                if (index !== null) {
                    updatedData[section].images[index].image = file;
                    updatedData[section].images[index].imageSrc = reader.result;
                } else {
                    updatedData[section][key] = file;
                    updatedData[section][`${key}Src`] = reader.result;
                }
                return updatedData;
            });
        };
        reader.readAsDataURL(file);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <form onSubmit={handleSubmit} className="p-6 bg-white shadow-md rounded-lg space-y-6">
                <h2 className="text-2xl font-bold mb-6 text-center">Personnalisez votre Template</h2>

                <div>
                    <h3 className="text-xl font-semibold mb-4">Navbar</h3>
                    <label className="block text-gray-700 font-semibold mb-2">Logo</label>
                    <input
                        type="file"
                        className="w-full p-3 border border-gray-300 rounded-lg"
                        onChange={(e) => handleImageChange('navbar', 'logo', e.target.files[0])}
                    />
                    {formData.navbar.links.map((link, index) => (
                        <div key={index} className="mt-4">
                            <label className="block text-gray-700 font-semibold mb-2">Nom de la section</label>
                            <input
                                type="text"
                                className="w-full p-3 border border-gray-300 rounded-lg"
                                value={link.name}
                                onChange={(e) => handleLinkChange(index, 'name', e.target.value)}
                            />
                        </div>
                    ))}
                </div>

                <div>
                    <h3 className="text-xl font-semibold mb-4">Section 1</h3>
                    <label className="block text-gray-700 font-semibold mb-2">Titre principal</label>
                    <input
                        type="text"
                        className="w-full p-3 border border-gray-300 rounded-lg"
                        value={formData.section1.title}
                        onChange={(e) => handleChange('section1', 'title', e.target.value)}
                    />
                    <label className="block text-gray-700 font-semibold mb-2">Image de fond</label>
                    <input
                        type="file"
                        className="w-full p-3 border border-gray-300 rounded-lg"
                        onChange={(e) => handleImageChange('section1', 'backgroundImage', e.target.files[0])}
                    />
                    <label className="block text-gray-700 font-semibold mb-2">Texte du bouton 1</label>
                    <input
                        type="text"
                        className="w-full p-3 border border-gray-300 rounded-lg"
                        value={formData.section1.button1}
                        onChange={(e) => handleChange('section1', 'button1', e.target.value)}
                    />
                    <label className="block text-gray-700 font-semibold mb-2">Texte du bouton 2</label>
                    <input
                        type="text"
                        className="w-full p-3 border border-gray-300 rounded-lg"
                        value={formData.section1.button2}
                        onChange={(e) => handleChange('section1', 'button2', e.target.value)}
                    />
                </div>
                <div>
                <h3 className="text-xl font-semibold mb-4">Section 2</h3>

                <label className="block text-gray-700 font-semibold mb-2">Titre principal</label>
                <input
                    type="text"
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    value={formData.section2.title}
                    onChange={(e) => handleChange('section2', 'title', e.target.value)}
                />
                
                <label className="block text-gray-700 font-semibold mb-2">Description</label>
                <textarea
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    value={formData.section2.description}
                    onChange={(e) => handleChange('section2', 'description', e.target.value)}
                />

                <hr className="my-4" />

                <label className="block text-gray-700 font-semibold mb-2">Titre des Sacrements</label>
                <input
                    type="text"
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    value={formData.section2.sacramentsTitle}
                    onChange={(e) => handleChange('section2', 'sacramentsTitle', e.target.value)}
                />

                <label className="block text-gray-700 font-semibold mb-2">Description des Sacrements</label>
                <textarea
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    value={formData.section2.sacramentsDescription}
                    onChange={(e) => handleChange('section2', 'sacramentsDescription', e.target.value)}
                />

                <hr className="my-4" />

                <label className="block text-gray-700 font-semibold mb-2">Titre de la Pastorale pour la Jeunesse</label>
                <input
                    type="text"
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    value={formData.section2.youthMinistryTitle}
                    onChange={(e) => handleChange('section2', 'youthMinistryTitle', e.target.value)}
                />

                <label className="block text-gray-700 font-semibold mb-2">Description de la Pastorale pour la Jeunesse</label>
                <textarea
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    value={formData.section2.youthMinistryDescription}
                    onChange={(e) => handleChange('section2', 'youthMinistryDescription', e.target.value)}
                />

                <hr className="my-4" />

                <label className="block text-gray-700 font-semibold mb-2">Titre de la Vie Communautaire</label>
                <input
                    type="text"
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    value={formData.section2.communityLifeTitle}
                    onChange={(e) => handleChange('section2', 'communityLifeTitle', e.target.value)}
                />

                <label className="block text-gray-700 font-semibold mb-2">Description de la Vie Communautaire</label>
                <textarea
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    value={formData.section2.communityLifeDescription}
                    onChange={(e) => handleChange('section2', 'communityLifeDescription', e.target.value)}
                />
             </div>

                <div>
                    <h3 className="text-xl font-semibold mb-4">Section 3</h3>
                    <label className="block text-gray-700 font-semibold mb-2">Titre principal</label>
                    <input
                        type="text"
                        className="w-full p-3 border border-gray-300 rounded-lg"
                        value={formData.section3.title}
                        onChange={(e) => handleChange('section3', 'title', e.target.value)}
                    />
                    <label className="block text-gray-700 font-semibold mb-2">Description</label>
                    <textarea
                        className="w-full p-3 border border-gray-300 rounded-lg"
                        value={formData.section3.description}
                        onChange={(e) => handleChange('section3', 'description', e.target.value)}
                    />
                    <label className="block text-gray-700 font-semibold mb-2">Image de fond</label>
                    <input
                        type="file"
                        className="w-full p-3 border border-gray-300 rounded-lg"
                        onChange={(e) => handleImageChange('section3', 'backgroundImage', e.target.files[0])}
                    />
                </div>
    
                
                <div>
    <h3 className="text-xl font-semibold mb-4">Section 4</h3>
    <label className="block text-gray-700 font-semibold mb-2">Titre principal</label>
    <input
        type="text"
        className="w-full p-3 border border-gray-300 rounded-lg"
        value={formData.section4.title}
        onChange={(e) => handleChange('section4', 'title', e.target.value)}
    />
    
    <label className="block text-gray-700 font-semibold mb-2">Texte du bouton 1</label>
    <input
        type="text"
        className="w-full p-3 border border-gray-300 rounded-lg"
        value={formData.section4.button1Text}
        onChange={(e) => handleChange('section4', 'button1Text', e.target.value)}
    />
    <label className="block text-gray-700 font-semibold mb-2">Icône du bouton 1</label>
    <input
        type="file"
        className="w-full p-3 border border-gray-300 rounded-lg"
        onChange={(e) => handleImageChange('section4', 'icon1', e.target.files[0])}
    />
    <label className="block text-gray-700 font-semibold mb-2">Couleur du cercle 1</label>
    <input
        type="color"
        className="w-full p-3 border border-gray-300 rounded-lg"
        value={formData.section4.circle1Color}
        onChange={(e) => handleChange('section4', 'circle1Color', e.target.value)}
    />

    <label className="block text-gray-700 font-semibold mb-2">Texte du bouton 2</label>
    <input
        type="text"
        className="w-full p-3 border border-gray-300 rounded-lg"
        value={formData.section4.button2Text}
        onChange={(e) => handleChange('section4', 'button2Text', e.target.value)}
    />
    <label className="block text-gray-700 font-semibold mb-2">Icône du bouton 2</label>
    <input
        type="file"
        className="w-full p-3 border border-gray-300 rounded-lg"
        onChange={(e) => handleImageChange('section4', 'icon2', e.target.files[0])}
    />
    <label className="block text-gray-700 font-semibold mb-2">Couleur du cercle 2</label>
    <input
        type="color"
        className="w-full p-3 border border-gray-300 rounded-lg"
        value={formData.section4.circle2Color}
        onChange={(e) => handleChange('section4', 'circle2Color', e.target.value)}
    />

    <label className="block text-gray-700 font-semibold mb-2">Texte du bouton 3</label>
    <input
        type="text"
        className="w-full p-3 border border-gray-300 rounded-lg"
        value={formData.section4.button3Text}
        onChange={(e) => handleChange('section4', 'button3Text', e.target.value)}
    />
    <label className="block text-gray-700 font-semibold mb-2">Icône du bouton 3</label>
    <input
        type="file"
        className="w-full p-3 border border-gray-300 rounded-lg"
        onChange={(e) => handleImageChange('section4', 'icon3', e.target.files[0])}
    />
    <label className="block text-gray-700 font-semibold mb-2">Couleur du cercle 3</label>
    <input
        type="color"
        className="w-full p-3 border border-gray-300 rounded-lg"
        value={formData.section4.circle3Color}
        onChange={(e) => handleChange('section4', 'circle3Color', e.target.value)}
    />
</div>

    
                <div>
                    <h3 className="text-xl font-semibold mb-4">Section 5</h3>
                    <label className="block text-gray-700 font-semibold mb-2">Titre principal</label>
                    <input
                        type="text"
                        className="w-full p-3 border border-gray-300 rounded-lg"
                        value={formData.section5.title}
                        onChange={(e) => handleChange('section5', 'title', e.target.value)}
                    />
                    <label className="block text-gray-700 font-semibold mb-2">Description</label>
                    <textarea
                        className="w-full p-3 border border-gray-300 rounded-lg"
                        value={formData.section5.description}
                        onChange={(e) => handleChange('section5', 'description', e.target.value)}
                    />
                    <label className="block text-gray-700 font-semibold mb-2">Image de fond</label>
                    <input
                        type="file"
                        className="w-full p-3 border border-gray-300 rounded-lg"
                        onChange={(e) => handleImageChange('section5', 'backgroundImage', e.target.files[0])}
                    />
                </div>
    
                <div>
    <h3 className="text-xl font-semibold mb-4">Section 6</h3>
    
    <label className="block text-gray-700 font-semibold mb-2">Titre de la section</label>
    <input
        type="text"
        className="w-full p-3 border border-gray-300 rounded-lg"
        value={formData.section6.title}
        onChange={(e) => handleChange('section6', 'title', e.target.value)}
    />
    
    <label className="block text-gray-700 font-semibold mb-2">Titre de la partie 1</label>
    <input
        type="text"
        className="w-full p-3 border border-gray-300 rounded-lg"
        value={formData.section6.image1Title}
        onChange={(e) => handleChange('section6', 'image1Title', e.target.value)}
    />
    <label className="block text-gray-700 font-semibold mb-2">Image de la partie 1</label>
    <input
        type="file"
        className="w-full p-3 border border-gray-300 rounded-lg"
        onChange={(e) => handleImageChange('section6', 'image1Src', e.target.files[0])}
    />
    
    <label className="block text-gray-700 font-semibold mb-2">Titre de la partie 2</label>
    <input
        type="text"
        className="w-full p-3 border border-gray-300 rounded-lg"
        value={formData.section6.image2Title}
        onChange={(e) => handleChange('section6', 'image2Title', e.target.value)}
    />
    <label className="block text-gray-700 font-semibold mb-2">Image de la partie 2</label>
    <input
        type="file"
        className="w-full p-3 border border-gray-300 rounded-lg"
        onChange={(e) => handleImageChange('section6', 'image2Src', e.target.files[0])}
    />
    
    <label className="block text-gray-700 font-semibold mb-2">Titre de la partie 3</label>
    <input
        type="text"
        className="w-full p-3 border border-gray-300 rounded-lg"
        value={formData.section6.image3Title}
        onChange={(e) => handleChange('section6', 'image3Title', e.target.value)}
    />
    <label className="block text-gray-700 font-semibold mb-2">Image de la partie 3</label>
    <input
        type="file"
        className="w-full p-3 border border-gray-300 rounded-lg"
        onChange={(e) => handleImageChange('section6', 'image3Src', e.target.files[0])}
    />
</div>

    
<div>
    <h3 className="text-xl font-semibold mb-4">Footer</h3>
    <label className="block text-gray-700 font-semibold mb-2">Adresse</label>
    <textarea
        className="w-full p-3 border border-gray-300 rounded-lg"
        value={formData.footer.address}
        onChange={(e) => handleChange('footer', 'address', e.target.value)}
    />
    <label className="block text-gray-700 font-semibold mb-2">Informations de contact</label>
    <textarea
        className="w-full p-3 border border-gray-300 rounded-lg"
        value={formData.footer.contact}
        onChange={(e) => handleChange('footer', 'contact', e.target.value)}
    />
    <label className="block text-gray-700 font-semibold mb-2">Lien Facebook</label>
    <input
        type="text"
        className="w-full p-3 border border-gray-300 rounded-lg"
        value={formData.footer.socialLinks.facebook}
        onChange={(e) => handleChange('footer', 'socialLinks.facebook', e.target.value)}
    />
    <label className="block text-gray-700 font-semibold mb-2">Lien Instagram</label>
    <input
        type="text"
        className="w-full p-3 border border-gray-300 rounded-lg"
        value={formData.footer.socialLinks.instagram}
        onChange={(e) => handleChange('footer', 'socialLinks.instagram', e.target.value)}
    />
    <label className="block text-gray-700 font-semibold mb-2">Lien YouTube</label>
    <input
        type="text"
        className="w-full p-3 border border-gray-300 rounded-lg"
        value={formData.footer.socialLinks.youtube}
        onChange={(e) => handleChange('footer', 'socialLinks.youtube', e.target.value)}
    />
</div>

    
<button 
                    type="button" 
                    className="w-full bg-blue-500 text-white p-3 rounded-lg font-semibold hover:bg-blue-600"
                    onClick={handleGenerateSite}
                >
                    Générer le site
                </button>

                {showModal && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg">
                            <h2 className="text-xl font-bold mb-4">Prévisualisation du site</h2>
                            <p className="mb-6">
                                Vous allez être redirigé vers la prévisualisation de votre site. Nous attendrons votre aval pour transmettre à notre équipe.
                            </p>
                            <div className="flex justify-end">
                                <button
                                    onClick={handleConfirm}
                                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                >
                                    Confirmer
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </form>

            <div className="bg-gray-100 p-6 shadow-md rounded-lg">
                <h2 className="text-2xl font-bold mb-6 text-center">Aperçu en Temps Réel</h2>
                <Preview formData={formData} />
            </div>
        </div>
    );
};

export default DynamicForm;
