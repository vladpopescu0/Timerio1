import React from "react";
import { Pie } from "react-chartjs-2";

export default function PieTypes({ sector, data }) {
  console.log("data", data);
  return (
    <div className="card border-primary mb-3">
      <div className="card-header">
        {sector == "Today" || "All Time" ? sector : "This " + sector}
      </div>
      <Pie data={data} className="piechart" />
    </div>
  );
}
