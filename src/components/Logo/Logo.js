import React from "react";
import Tilt from 'react-parallax-tilt';
import './Logo.css';
import image from './logo.png';


const Logo = () => {
    return (
        <Tilt className="pa3" style={{width:'150px', height:'150px'}}>
            <div id='tilt' className="ma0 mt0 br2 shadow-2">
                <img src={image} alt="logo" />
            </div>
        </Tilt>
    );
}

export default Logo;