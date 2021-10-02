import React, { useState } from "react";
import ReactTooltip from "react-tooltip";

const EventBar = ({
  title,
  text,
  type,
  time,
  id,
  completion,
  editEvent,
  start,
}) => {
  const userToken = localStorage.getItem(localStorage.key(1));
  const myHeaders = new Headers();
  const eventData = {
    title: title,
    text: text,
    time: time,
    start: start,
    type: type,
    completion: "FINISHED",
  };
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", "Bearer " + userToken);
  myHeaders.append("Accept", "*/*");

  async function deleteEvent() {
    const options = {
      method: "DELETE",
      headers: myHeaders,
    };
    await fetch(`http://127.0.0.1:3001/events/${id}`, options).catch(
      (error) => {
        console.log("there has been a problem", error);
      }
    );
    window.location.reload(false);
  }
  async function completeEvent() {
    const options = {
      method: "PUT",
      headers: myHeaders,
      body: JSON.stringify(eventData),
    };
    await fetch(`http://127.0.0.1:3001/events/${id}`, options).catch(
      (error) => {
        console.log("there has been a problem", error);
      }
    );
    window.location.reload(false);
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
  return (
    <tr>
      <td>{title}</td>
      <td>{text}</td>
      <td>{type ? type : "No type set"} </td>
      <td>{convertUTCDateToLocalDate(start).toString()}</td>
      <td className="time">
        {time ? convertUTCDateToLocalDate(time).toString() : "No time set"}{" "}
      </td>
      <td>
        {completion == "EXPIRED" && (
          <p className="completion" style={{ color: "#AE5950" }}>
            {completion}
          </p>
        )}
        {completion == "ONGOING" && (
          <p className="completion" style={{ color: "#50AE88" }}>
            {completion}
          </p>
        )}
        {completion == "FINISHED" && (
          <p className="completion" style={{ color: "#A5AE50" }}>
            {completion}
          </p>
        )}
      </td>
      <td>
        {completion == "ONGOING" && (
          <button
            type="button"
            className="btn btn-success btn-sm"
            data-tip="Finish Event"
            onClick={completeEvent}
          >
            <i class="bi bi-check-circle"></i>
          </button>
        )}
        {completion == "ONGOING" && (
          <button
            type="button"
            data-tip="Update Event"
            onClick={() => editEvent(id)}
            className="btn btn-primary btn-sm"
          >
            <i class="bi bi-pencil-square"></i>
          </button>
        )}
        <button
          className="btn btn-danger btn-sm"
          data-tip="Delete Event"
          onClick={deleteEvent}
        >
          <i class="bi bi-trash"></i>
        </button>
      </td>
      <ReactTooltip textColor="black" arrowColor="red" className="tooltip" />
    </tr>
  );
};
export default EventBar;
