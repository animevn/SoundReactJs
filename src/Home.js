import React from "react";
import "bootstrap/js/dist/dropdown";

function Home() {

  return (
    <div className="container mt-3">
      <div className="dropdown d-flex justify-content-around">
        <button className="btn btn-success dropdown-toggle" type="button" id="dropdownMenuButton"
                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <span className="mx-2">Choose Repeat</span>
        </button>
        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <button className="btn dropdown-item">1</button>
          <button className="dropdown-item" >2</button>
          <button className="dropdown-item" >3</button>
        </div>
      </div>

    </div>
  )
}

export default Home;