import React from "react";

const Clock = () => {
  return (
    <div>
      <h3>Time: {new Date().toLocaleTimeString()} </h3>
    </div>
  );
};

export default Clock;
