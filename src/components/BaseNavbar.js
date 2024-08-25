import React from "react";

const menuNavbar = [
        {
            name:Accueil,
            link:"/"
        },
        {
            name:Admin,
            link:"/admin"
        }

]

const BaseNavbar = () => {
    return (
        <div className="h-22 bg-blue-300 fixed w-full">
            <nav className="flex justify-between items-center h-full p-4">
                <ul className="flex items-center space-x-4">
                    {menuNavbar.map((item, index) => (
                        <li key={index}>
                            <a href={item.link}>{item.name}</a>
                        </li>
                        ))}
                </ul>
            </nav>
        </div>
    )
}

export default BaseNavbar