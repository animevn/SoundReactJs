import React, {useState} from "react";
import Grid from "@material-ui/core/Grid";

const options = [1, 2, 3, 6, 10];
const sounds = ["sound/fx1.ogg", "sound/fx2.ogg", "sound/fx3.ogg"];
const width = {xs:11, sm:8, md:6, lg:5, xl:4};

function Home() {
  const [loop, setLoop] = useState(1);
  const [volume, setVolume] = useState(20);
  const [stop, setStop] = useState();
  const [sound, setSound] = useState();

  //dropdown part - spinner or whatever
  function onButtonOptionClick(event) {
    event.preventDefault();
    setLoop(event.target.value);
  }

  const buttonOptions = (
    options.map((value, index) => {
      return (
        <button key={index} className="btn dropdown-item" onClick={onButtonOptionClick} value={value}>
          {value}
        </button>
      )
    })
  );

  const dropdown = (
    <div className="dropdown d-flex justify-content-around">
      <button className="btn btn-outline-success dropdown-toggle" data-toggle="dropdown">
        <span className="mx-2">{"Choose Repeat: " + loop}</span>
      </button>
      <div className="dropdown-menu">
        {buttonOptions}
      </div>
    </div>
  );

  //input part - slider or seekbar, whatever
  function handleVolumeChange(event) {
    event.preventDefault();
    setVolume(event.target.value);
    if (sound != null) sound.volume = volume/100;
  }

  const input = (
    <div className="mt-5 container col-xl-6 col-lg-7 col-md-9 col-sm-11 col-11">
      <p className="text-center">{"Volume: " + volume/100}</p>
      <input className="custom-range" type="range" min="0" max="100" value={volume}
             onChange={handleVolumeChange}/>
    </div>
  );

  //for sound buttons and stop button
  const box = (children)=>{
    return (
      <div className="mt-5 container d-flex justify-content-around
                      col-xl-6 col-lg-7 col-md-9 col-sm-11 col-11">
        {children}
      </div>
    )
  };

  //sound buttons part
  function onButtonSoundClick(event) {
    event.preventDefault();
    clearInterval(stop);
    const audio = new Audio(event.target.value);
    audio.volume = volume/100;
    let times = loop;
    const looper = setInterval(()=>{
      times--;
      if (times === 0) clearInterval(looper);
      setSound(audio);
      audio.play().catch(err=>console.log(err));
    }, 500);
    setStop(looper);
    setSound(null);
  }

  const buttonSounds = (
    sounds.map((value, index) => {
      return (
        <button key={index} className="btn btn-outline-success"
                onClick={onButtonSoundClick} value={value}>
          {"Sound " + (index + 1)}
        </button>
      )
    })
  );

  //stop button part
  function onStopClick(event) {
    event.preventDefault();
    clearInterval(stop);
  }

  const buttonStop = (
    <button className="btn btn-outline-success" onClick={onStopClick}>
      Stop
    </button>
  );

  return (
    <Grid container direction="row" justify="center">
      <Grid item {...width}>
        {dropdown}
        {input}
        {box(buttonSounds)}
        {box(buttonStop)}
      </Grid>
    </Grid>
  )
}

export default Home;