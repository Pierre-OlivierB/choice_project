import React, { useEffect } from "react";
import { useState } from "react";

function TheEnd(props) {
  const save = props.save;
  console.log(save);
  const story = save.current.map((step, key) => <div key={key}>{step[0]}</div>);
  return (
    <>
      <h1>The end</h1>
      <div>{story}</div>
    </>
  );
}

export default TheEnd;
