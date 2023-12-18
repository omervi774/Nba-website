import React from "react";
import ReactLoading from "react-loading";

function Loader(props) {
  return (
    <div className="centerize-container" style={{ flex: "1" }}>
      <ReactLoading
        type={"spinningBubbles"}
        color={"#36D7B7"}
        height={50}
        width={50}
      />
      <h1 style={{ color: "#36D7B7", marginLeft: "0.3rem" }}>loading...</h1>
    </div>
  );
}

export default Loader;
