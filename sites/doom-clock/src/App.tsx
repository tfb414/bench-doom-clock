import React, { useState } from "react";
import CountdownTimer from "./CountdownTimer";
import "./App.css";
import DoomHud from "./DoomHud";
import initialImage from "./images/doom-bigupper-enter-your-bench-start-date.png";
import gameOverImage from "./images/doom-bigupper-game-over.png";
import doomLogo from "./images/Doom_logo-min.png";
import countdownTimer from "./CountdownTimer";
import dayjs, {Dayjs} from "dayjs";

const App = () => {
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [fireDate, setFireDate] = useState<Dayjs | null>(null);
  const [timeLeftInSeconds, setTimeLeftInSeconds] = useState<number>(
    9999999,
  );
  const [showCountdown, setShowCountdown] = useState<boolean>(true);

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDateString = event.target.value;

    const selectedDate = dayjs(selectedDateString);

    const fireDate = dayjs(selectedDate).add(80, 'day');
    setFireDate(fireDate)

    setSelectedDate(selectedDate);
    setFireDate(fireDate);

    const fired = selectedDate.add(80, 'day') > dayjs()

    setShowCountdown(fired)
    setTimeLeftInSeconds(getSecondsLeftUntilFiring(fireDate.toDate()));
  };

  return (
    <body>
      <div className="image-container">
        <img src={doomLogo} className="logo" alt="doom logo" />
          <div className="countdown-container">
            {!showCountdown ? (<img src={gameOverImage} alt="game over" />) : (<img src={initialImage} alt="Initial"/>)}
            <input
              type="date"
              className="doom-input"
              onChange={handleDateChange}
            />
            {selectedDate && showCountdown &&  (
              <CountdownTimer
                fireDate={fireDate}
                startDate={selectedDate}
              />
            )}
          </div>
      </div>
      <div className="doom-bar">
        <DoomHud secondsRemaining={timeLeftInSeconds} />
      </div>
    </body>
  );
};

function getSecondsLeftUntilFiring(endDate: Date): number {
  const today = new Date();
  return endDate.getTime() / 1000 - today.getTime() / 1000;
}

export default App;
