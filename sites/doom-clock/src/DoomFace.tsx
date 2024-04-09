import React from "react";
import './DoomFace.css'; // Create this CSS file

interface DoomFaceProps {
    percentage: number;
}

const DoomFace: React.FC<DoomFaceProps> = ({ percentage }) => {
    let svgImage = 'doomHud-5.png'
    if (percentage >= 101) {
        svgImage = 'doomHud-0.png';
    }
    else if (percentage >= 80) {
        svgImage = 'doomHud-1.png';
    } else if (percentage >= 60) {
        svgImage = 'doomHud-2.png';
    } else if (percentage >= 40) {
        svgImage = 'doomHud-3.png';
    }
    else if (percentage >= 20) {
        svgImage = 'doomHud-4.png';
    }

    return (
        <div className="doom-face">
            <img src={require(`./images/${svgImage}`)} alt="Face" />
        </div>
    );
};

export default DoomFace;
