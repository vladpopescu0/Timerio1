import React, { useState, useEffect } from "react";
import NumberGrowth from "../components/NumberGrowth";
import CompletionCard from "../components/CompletionCard";
import data from "../data/data";
import PieTypes from "../components/PieTypes";

export default function Statistics() {
  const [sector, setsector] = useState("Today");
  const [number, setNumber] = useState(0);
  const [allEvents, setallEvents] = useState(null);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [barData, setBarData] = useState({});

  const [pieData, setPieData] = useState({});

  let updateResponse;
  const thisDay = new Date();

  function _handleChange() {
    if (sector == "Today") {
      // todayEvents();
      var arrayTypes = [0, 0, 0, 0, 0, 0];
      var timeComp = [0, 0, 0, 0, 0, 0];
      var timeUncomp = [0, 0, 0, 0, 0, 0];
      console.log("filteredEvents.length", filteredEvents.length);
      if (filteredEvents.length) {
        console.log(filteredEvents.length);
        for (let i = 0; i < filteredEvents.length; i++) {
          console.log("filteredEvents[i].type", filteredEvents[i].type);
          if (filteredEvents[i].type == "Sport") {
            arrayTypes[0]++;
          } else if (filteredEvents[i].type == "Eat") {
            arrayTypes[1]++;
          } else if (filteredEvents[i].type == "Work") {
            arrayTypes[2]++;
          } else if (filteredEvents[i].type == "Relax") {
            arrayTypes[3]++;
          } else if (filteredEvents[i].type == "Self Care") {
            arrayTypes[4]++;
          } else {
            arrayTypes[5]++;
          }
        }
        for (let i = 0; i < filteredEvents.length; i++) {
          const eventDate = new Date(filteredEvents[i].time);
          if (eventDate.getHours() >= 0 && eventDate.getHours() < 4) {
            if (filteredEvents[i].completion == "FINISHED") {
              timeComp[0]++;
              setNumber((prev) => prev + 1);
            } else {
              timeUncomp[0]++;
            }
          } else if (eventDate.getHours() >= 4 && eventDate.getHours() < 8) {
            if (filteredEvents[i].completion == "FINISHED") {
              timeComp[1]++;
              setNumber((prev) => prev + 1);
            } else {
              timeUncomp[1]++;
            }
          } else if (eventDate.getHours() >= 8 && eventDate.getHours() < 12) {
            if (filteredEvents[i].completion == "FINISHED") {
              timeComp[2]++;
              setNumber((prev) => prev + 1);
            } else {
              timeUncomp[2]++;
            }
          } else if (eventDate.getHours() >= 12 && eventDate.getHours() < 16) {
            if (filteredEvents[i].completion == "FINISHED") {
              timeComp[3]++;
              setNumber((prev) => prev + 1);
            } else {
              timeUncomp[3]++;
            }
          } else if (eventDate.getHours() >= 16 && eventDate.getHours() < 20) {
            if (filteredEvents[i].completion == "FINISHED") {
              timeComp[4]++;
              setNumber((prev) => prev + 1);
            } else {
              timeUncomp[4]++;
            }
          } else {
            if (filteredEvents[i].completion == "FINISHED") {
              timeComp[5]++;
              setNumber((prev) => prev + 1);
            } else {
              timeUncomp[5]++;
            }
          }
        }
        console.log(barData);
        setBarData((prev) => ({
          labels: data.dayHours,
          datasets: [
            {
              label: "Uncompleted Tasks",
              data: timeUncomp,
              fill: false,
              backgroundColor: "rgba(240, 130, 50, 0.8)",
              borderColor: "rgba(75,192,192,1)",
            },
            {
              label: "Completed Tasks",
              data: timeComp,
              fill: true,
              backgroundColor: "rgba(159, 233, 144, 0.8)",
              borderColor: "#742775",
            },
          ],
        }));

        setPieData((prev) => ({
          labels: data.types,
          datasets: [
            {
              label: "Types",
              data: arrayTypes,
              backgroundColor: [
                "#A58499",
                "#CFE0F4",
                "#B0D278",
                "#F5C86E",
                "#F4F18F",
                "#C5CCC5",
              ],
              hoverOffset: 4,
            },
          ],
        }));
      }
    }
  }
  function convertUTCDateToLocalDate(date) {
    var dateLocal = new Date(date);
    var newDate = new Date(
      dateLocal.getTime() - dateLocal.getTimezoneOffset() * 60 * 1000
    );
    console.log(dateLocal.getTimezoneOffset() * 60 * 1000);
    let month = newDate.getMonth() + 1;
    if (month < 10) {
      month = "0" + month;
    }
    let day = newDate.getDate();
    if (day < 10) {
      day = "0" + day;
    }
    return (
      newDate.getFullYear() +
      "-" +
      month +
      "-" +
      day +
      " " +
      newDate.getHours() +
      ":" +
      newDate.getMinutes()
    );
  }

  function todayEvents() {
    let month = thisDay.getMonth() + 1;
    if (month < 10) {
      month = "0" + month;
    }
    let day = thisDay.getDate();
    if (day < 10) {
      day = "0" + day;
    }
    var todayBegin = new Date(thisDay.getFullYear() + "-" + month + "-" + day);
    todayBegin = new Date(
      todayBegin.getTime() + todayBegin.getTimezoneOffset() * 60 * 1000
    );

    if (allEvents?.events) {
      setFilteredEvents((prev) => [
        ...allEvents.events.filter((element) => {
          var elEnd = new Date(element.time);

          if (
            elEnd.getFullYear() == thisDay.getFullYear() &&
            elEnd.getMonth() == thisDay.getMonth() &&
            elEnd.getDate() == thisDay.getDate()
          ) {
            return element;
          }
        }),
      ]);
    }
    console.log(allEvents);
    console.log(filteredEvents);
  }

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append(
    "Authorization",
    "Bearer " + localStorage.getItem(localStorage.key(1))
  );
  myHeaders.append("Accept", "*/*");

  async function getEvents() {
    const options = {
      method: "GET",
      headers: myHeaders,
    };
    fetch("http://127.0.0.1:3001/events/", options)
      .then((response) => response.json())
      .then(setallEvents)
      .catch((error) => console.log(error));
  }

  useEffect(() => {
    getEvents();
  }, []);

  useEffect(() => {
    if (allEvents) {
      todayEvents();
    }
  }, [sector, allEvents?.events.length]);

  useEffect(() => {
    _handleChange();
  }, [filteredEvents.length]);

  console.log("pieData", pieData);

  return (
    <div className="div-stats">
      <select
        value={sector}
        className="form-control"
        name="type"
        id="selecter"
        onChange={(e) => {
          setsector(e.target.value);
        }}
      >
        <option value="Today">Today</option>
        <option value="week">This Week</option>
        <option value="month">This Month</option>
        <option value="year">This Year</option>
        <option value="All Time">All Time</option>
      </select>
      <NumberGrowth data={sector == "Today" ? barData : data.graphData} />
      <div className="row">
        <div className="col-4">
          <CompletionCard number={number} sector={sector} past={32} />
        </div>
        <div className="col-4">
          {filteredEvents.length && <PieTypes sector={sector} data={pieData} />}
        </div>
      </div>
    </div>
  );
}
