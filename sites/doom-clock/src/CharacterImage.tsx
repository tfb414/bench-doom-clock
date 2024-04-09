import React from 'react';
import doomNightmare0 from "./images/doomNightmare0.png";
import doomNightmare1 from "./images/doomNightmare1.png";
import doomNightmare2 from "./images/doomNightmare2.png";
import doomNightmare3 from "./images/doomNightmare3.png";
import doomNightmare4 from "./images/doomNightmare4.png";
import doomNightmare5 from "./images/doomNightmare5.png";
import doomNightmare6 from "./images/doomNightmare6.png";
import doomNightmare7 from "./images/doomNightmare7.png";
import doomNightmare8 from "./images/doomNightmare8.png";
import doomNightmare9 from "./images/doomNightmare9.png";
import doomNightmared from './images/doom-nightmare-d.png';
import doomNightmareh from './images/doom-nightmare-h.png';
import doomNightmarem from './images/doom-nightmare-m.png';
import doomNightmares from './images/doom-nightmare-s.png';
import doomNightmarePercent from './images/doom-nightmare-blank.png';

const imagePaths = {
    "0" : doomNightmare0,
    "1" : doomNightmare1,
    "2" : doomNightmare2,
    "3" : doomNightmare3,
    "4" : doomNightmare4,
    "5" : doomNightmare5,
    "6" : doomNightmare6,
    "7" : doomNightmare7,
    "8" : doomNightmare8,
    "9" : doomNightmare9,
    'd' : doomNightmared,
    'h' : doomNightmareh,
    'm': doomNightmarem,
    's' : doomNightmares,
    '%' : doomNightmarePercent
}

interface CharacterImageProps {
    character: string;             // The character to display as an image
}

const CharacterImage: React.FC<CharacterImageProps> = ({ character }) => {
    // Handle potential errors (if the character is not found)
    //@ts-ignore
    const imagePath = imagePaths[character] || imagePaths['default'];  // Provide a default image

    return (
        <img src={imagePath} alt={`${character} image`} />
    );
};

export default CharacterImage;