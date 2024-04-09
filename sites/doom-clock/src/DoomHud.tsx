import React, {useEffect, useState} from "react";
import "./DoomHud.css";
import DoomFace from "./DoomFace";
import ptoHoursImage from "./images/doom-bigupper-pto-hours.png"
import mentalHealthImage from "./images/doom-bigupper-mental-health.png"
import timeImage from "./images/doom-bigupper-time.png"
import CharacterImage from "./CharacterImage";

const twelveWeeksInSeconds = 60 * 60 * 24 * 7 * 12;

const DoomHud = ({ secondsRemaining = twelveWeeksInSeconds}: { secondsRemaining: number}) => {
  const time = 300;

    const [pto, setPto] = useState(() => {
        const storedValue = sessionStorage.getItem('pto');
        return storedValue ? storedValue : generateRandomNumber(15, 120);
    });

    const [mentalHealth, setMentalHealth] = useState(() => {
        const storedValue = sessionStorage.getItem('mentalHealth');
        return storedValue ? storedValue : generateRandomNumber(15, 45);
    });

    useEffect(() => {
        localStorage.setItem('pto', pto);
        localStorage.setItem('mentalHealth', mentalHealth);
    }, [pto, mentalHealth]);




    const getPercentageTimeLeft =  (secondsRemaining / twelveWeeksInSeconds) * 100

    const percentageOfTimeRemaining = getPercentageTimeLeft > 100 ? '100' : getPercentageTimeLeft < 0 ? '0' : getPercentageTimeLeft.toFixed(0)

  return (
    <div className="doom-container">
      <div className="doom-box PTO">
        <span></span>
        <span className={"hud-number"}>
          <CharacterImage character={pto[0]} />
          <CharacterImage character={pto[1]} />
        </span>
        <img src={ptoHoursImage} className="hud-label" />
      </div>
      <div className="doom-box mental-health">
        <span></span>
        <span className="hud-number">
          <CharacterImage character={mentalHealth[0]} />
          <CharacterImage character={mentalHealth[1]} />
          <CharacterImage character={"%"} />
        </span>
        <img src={mentalHealthImage} className="hud-label" />
      </div>
      <div className="doom-box time">
        <span></span>
        <span className={"hud-number"}>
          <CharacterImage character={percentageOfTimeRemaining[0]} />
            {percentageOfTimeRemaining[1] ? <CharacterImage character={percentageOfTimeRemaining[1]} /> : ''}
          {percentageOfTimeRemaining[2] ? <CharacterImage character={percentageOfTimeRemaining[2]} /> : ''}
          <CharacterImage character={"%"} />
        </span>{" "}
        <img src={timeImage} className="hud-label" />
      </div>
      <div className="doom-box doom-face">
        <DoomFace percentage={Number(percentageOfTimeRemaining)} />
      </div>
    </div>
  );
};

function generateRandomNumber(min: number, max: number): string {
    return (Math.floor(Math.random() * (max - min + 1)) + min).toString()
}

export default DoomHud;
