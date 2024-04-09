import React, { useEffect, useState } from "react";
import Countdown from "react-countdown";
import { CountdownTimeDelta } from "react-countdown/dist/utils";
import "./CountdownTimer.css";
import timeIsRunningOutImage from './images/doom-nightmare-your-time-is-running-out.png';
import CharacterImage from "./CharacterImage";
import {Dayjs} from "dayjs";


interface CountdownTimerProps {
  fireDate: Dayjs | null;
  startDate?: Dayjs;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({
  fireDate,
  startDate,
}) => {




  const [currentTime, setCurrentTime] = useState(Date.now());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const renderer = ({
    days,
    hours,
    minutes,
    seconds,
    completed,
  }: CountdownTimeDelta) => {




      return (

          <div className="countdown-display">
            <div className="time-segment">
                <CharacterImage character={days.toString()[0]}/>
            {days.toString()[1] ? <CharacterImage character={days.toString()[1]}/> : ''}
                {days.toString()[2] ? <CharacterImage character={days.toString()[2]}/> : ''}
                <CharacterImage character={'d'}/>
            </div>
            <div className="time-segment">
                <CharacterImage character={hours.toString()[0]}/>
            {hours.toString()[1] ? <CharacterImage character={hours.toString()[1]}/>: ''}
                <CharacterImage character={'h'}/>
            </div>
            <div className="time-segment">
                <CharacterImage character={minutes.toString()[0]}/>
            {minutes.toString()[1] ? <CharacterImage character={minutes.toString()[1]}/> : ''}
                <CharacterImage character={'m'}/>
            </div>
            <div className="time-segment">
                <CharacterImage character={seconds.toString()[0]}/>
            {seconds.toString()[1] ? <CharacterImage character={seconds.toString()[1]}/> : ''}
                <CharacterImage character={'s'}/>
            </div>
          </div>
      );

  };

  return (
    <div>
      <p>
      <img className="no-time" src={timeIsRunningOutImage}/> {" "} {fireDate && <Countdown date={fireDate.toDate()} renderer={renderer} />}
      </p>
    </div>
  );
};


export default CountdownTimer;
