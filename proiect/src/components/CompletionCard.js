import { Ticks } from "chart.js";
import React, { useState, useEffect } from "react";

export default function CompletionCard({ sector, number, past }) {
  const [percentage, setPercentage] = useState(0);
  const [finish, setFinish] = useState(false);
  const [lastValue, setLastValue] = useState(-1);
  useEffect(() => {
    if (percentage != lastValue && finish == true) {
      setFinish(false);
      setPercentage(0);
    }
    if (percentage < number) {
      var percentageID = setInterval(() => tick(), 100);
    }
    if (percentage > number) {
      setPercentage(number);
    }
    if (percentage == number) {
      setFinish(true);
      setLastValue(percentage);
    }
    return function cleanup() {
      clearInterval(percentageID);
    };
  });

  function tick() {
    setPercentage(percentage + 1);
  }

  return (
    <div className="card border-primary">
      <div className="card-header">
        {sector == "Today" || "All Time" ? sector : "This " + sector}
      </div>
      <div className="card-body text-primary">
        <h3 className="card-title">{percentage}</h3>
        <p className="card-text">
          Tasks completed{" "}
          {sector == "Today" || "All Time" ? sector : "in the past " + sector}.
        </p>
        {sector != "All Time" && (
          <p className="card-text font-weight-light">
            {Math.abs((number - past).toFixed(1))}
            {" tasks "}
            {past >= number ? "less" : "more"} than{" "}
            {sector == "Today" ? "yesterday" : "last " + sector}
          </p>
        )}
      </div>
    </div>
  );
}
