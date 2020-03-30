import React, {useState} from "react";
import "bootstrap/js/dist/dropdown";

const options = [1, 2, 3, 6, 10];
const sounds = ["sound/fx1.ogg", "sound/fx2.ogg", "sound/fx3.ogg"];

function Home() {
  const [loop, setLoop] = useState(1);
  const [volume, setVolume] = useState(20);
  const [stop, setStop] = useState();


  function onButtonOptionClick(event) {
    event.preventDefault();
    setLoop(event.target.value);
  }

  const buttonOptions = (
    options.map((value => {
      return (
        <button className="btn dropdown-item" onClick={onButtonOptionClick} value={value}>
          {value}
        </button>
      )
    }))
  );

  function onButtonSoundClick(event) {
    event.preventDefault();
    const audio = new Audio(event.target.value);
    audio.volume = volume/100;
    let times = loop;
    const looper = setInterval(()=>{
      times--;
      if (times === 0) clearInterval(looper);
      audio.play().catch(err=>console.log(err));
    }, 500);
    setStop(looper);
  }

  const buttonSounds = (
    sounds.map((value, index) => {
      return (
        <button className="btn btn-outline-success" onClick={onButtonSoundClick} value={value}>
          {"Sound " + (index + 1)}
        </button>
      )
    })
  );

  function handleVolumeChange(event) {
    event.preventDefault();
    setVolume(event.target.value);
  }

  function onStopClick(event) {
    event.preventDefault();
    clearInterval(stop);
  }

  return (
    <div className="container mt-3">
      <div className="dropdown d-flex justify-content-around">
        <button className="btn btn-outline-success dropdown-toggle" data-toggle="dropdown">
          <span className="mx-2">{"Choose Repeat: " + loop}</span>
        </button>
        <div className="dropdown-menu">
          {buttonOptions}
        </div>
      </div>

      <div className="mt-5 container col-xl-6 col-lg-7 col-md-9 col-sm-11 col-11">
        <p className="text-center">{"Volume: " + volume/100}</p>
        <input className="custom-range" type="range" min="0" max="100" value={volume}
               onChange={handleVolumeChange}/>
      </div>

      <div className="mt-5 container d-flex justify-content-around
                      col-xl-6 col-lg-7 col-md-9 col-sm-11 col-11">
        {buttonSounds}
      </div>

      <div className="mt-5 container d-flex justify-content-around
                      col-xl-6 col-lg-7 col-md-9 col-sm-11 col-11">
        <button className="btn btn-outline-success" onClick={onStopClick}>
          Stop
        </button>
      </div>

    </div>
  )
}

export default Home;