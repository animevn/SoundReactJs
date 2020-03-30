import React, {useState} from "react";
import "bootstrap/js/dist/dropdown";

function Home() {

  const options = [1, 2, 3, 4, 5];
  const [state, setState] = useState(1);

  function onButtonClick(event) {
    event.preventDefault();
    setState(event.target.value);
  }

  const buttonOptions = (
    options.map((value => {
      return (
        <button className="btn dropdown-item" onClick={onButtonClick} value={value}>
          {value}
        </button>
      )
    }))
  );

  return (
    <div className="container mt-3">
      <div className="dropdown d-flex justify-content-around">
        <button className="btn btn-success dropdown-toggle" data-toggle="dropdown">
          <span className="mx-2">{"Choose Repeat: " + state}</span>
        </button>
        <div className="dropdown-menu">
          {buttonOptions}
        </div>
      </div>

    </div>
  )
}

export default Home;