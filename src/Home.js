import React, {useState} from "react";
import Grid from "@material-ui/core/Grid";
import Select from "@material-ui/core/Select";
import {Box} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Slider from "@material-ui/core/Slider";

const options = [1, 2, 3, 6, 10];
const sounds = ["sound/fx1.ogg", "sound/fx2.ogg", "sound/fx3.ogg"];
const width = {xs:11, sm:8, md:6, lg:5, xl:4};

function Home() {
  const [loop, setLoop] = useState(1);
  const [volume, setVolume] = useState(20);
  const [stop, setStop] = useState();
  const [sound, setSound] = useState();

  //select part - spinner or whatever
  function handleSelectChange(event) {
    setLoop(event.target.value);
  }

  const selectOptions = (
    options.map((value, index) => {
      return (
        <option key={index} value={value}>{value}</option>
      )
    })
  );

  const select = (
    <Box display="flex" flexDirection="column" alignItems="center" mt={5}>

      <Box display="flex" flexDirection="row" justifyContent="center">
        <Typography>Number Of Loops</Typography>
      </Box>

      <Box display="flex" flexDirection="row" justifyContent="center" mt={1} width={200}>
        <Select native style={{"width":"6rem"}} variant="outlined"
                value={loop} onChange={handleSelectChange} >
          {selectOptions}
        </Select>
      </Box>

    </Box>
  );

  //input part - slider or seekbar, whatever
  function handleVolumeChange(event, value) {
    setVolume(value);
    if (sound != null) sound.volume = volume/100;
  }

  const input = (
    <Box px={10} mt={5}>
      <Slider valueLabelDisplay="auto" min={0} max={100}
              value={volume} onChange={handleVolumeChange} />
    </Box>
  );

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
    <Box display="flex" flexDirection="row" justifyContent="space-evenly"
         mt={5}>
      {sounds.map((value, index) => {
          return (
            <Button key={index} variant="outlined" color="secondary"
                    onClick={onButtonSoundClick} value={value}>
              {"Sound " + (index + 1)}
            </Button>
          )
      })}
    </Box>
  );

  //stop button part
  function onStopClick(event) {
    event.preventDefault();
    clearInterval(stop);
  }

  const buttonStop = (
    <Box mt={5} display="flex" flexDirection="row" justifyContent="center">
      <Button variant="outlined" color="secondary" onClick={onStopClick}>
        Stop
      </Button>
    </Box>
  );

  return (
    <Grid container direction="row" justify="center">
      <Grid item {...width}>
        {select}
        {input}
        {buttonSounds}
        {buttonStop}
      </Grid>
    </Grid>
  )
}

export default Home;