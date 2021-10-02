import Modal from "react-modal";
import React, { Component, useState, useEffect } from "react";
import EventBar from "../components/EventBar";
import { DatasetController } from "chart.js";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

export default function AddEvent() {
  let values = {
    title: null,
    text: null,
    type: "Sport",
    start: null,
    time: null,
    completion: "ONGOING",
  };

  const [newValue, setnewValue] = useState(values);
  const [allEvents, setallEvents] = useState("");
  const [isOpenned, setisOpenned] = useState(false);
  const [currentEvent, setcurrentEvent] = useState("");
  const [currentId, setcurrentId] = useState(0);
  const [timeAndStart, settimeAndStart] = useState(["", ""]);

  let newDate = new Date();
  newDate = newDate.toISOString().toString().substring(0, 16);
  console.log(newDate);

  let updateResponse;

  function handleChangeTitle(event) {
    let tmpvalue = Object.assign({}, newValue);
    tmpvalue.title = event.target.value;
    setnewValue(tmpvalue);
  }
  function handleChangeText(event) {
    let tmpvalue = Object.assign({}, newValue);
    tmpvalue.text = event.target.value;
    setnewValue(tmpvalue);
  }
  function handleChangeType(event) {
    let tmpvalue = Object.assign({}, newValue);
    tmpvalue.type = event.target.value;
    setnewValue(tmpvalue);
  }
  function handleChangeTime(event) {
    let tmpvalue = Object.assign({}, newValue);
    tmpvalue.time = new Date(event.target.value);
    setnewValue(tmpvalue);
    settimeAndStart([
      tmpvalue.time.toISOString().toString().substring(0, 16),
      timeAndStart[1],
    ]);
  }
  function handleChangeStart(event) {
    let tmpvalue = Object.assign({}, newValue);
    tmpvalue.start = new Date(event.target.value);
    setnewValue(tmpvalue);
    settimeAndStart([
      timeAndStart[0],
      tmpvalue.start.toISOString().toString().substring(0, 16),
    ]);
  }

  const userToken = localStorage.getItem(localStorage.key(1));

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", "Bearer " + userToken);
  myHeaders.append("Accept", "*/*");

  function editEventOpen(id) {
    setisOpenned(true);
    const thisEvent = allEvents.events.find((el) => el.id == id);
    setcurrentEvent({
      title: thisEvent.title,
      time: thisEvent.time,
      text: thisEvent.text,
      completion: "ONGOING",
      type: thisEvent.type,
      start: thisEvent.start,
    });
    setcurrentId(id);
  }

  function handleChangeTitleU(event) {
    let tmpvalue = Object.assign({}, currentEvent);
    tmpvalue.title = event.target.value;
    setcurrentEvent(tmpvalue);
  }
  function handleChangeTextU(event) {
    let tmpvalue = Object.assign({}, currentEvent);
    tmpvalue.text = event.target.value;
    setcurrentEvent(tmpvalue);
  }
  function handleChangeTypeU(event) {
    let tmpvalue = Object.assign({}, currentEvent);
    tmpvalue.type = event.target.value;
    setcurrentEvent(tmpvalue);
  }
  function handleChangeTimeU(event) {
    let tmpvalue = Object.assign({}, currentEvent);
    tmpvalue.time = new Date(event.target.value);
    setcurrentEvent(tmpvalue);
    settimeAndStart([
      tmpvalue.time.toISOString().toString().substring(0, 16),
      timeAndStart[1],
    ]);
  }
  function handleChangeStartU(event) {
    let tmpvalue = Object.assign({}, currentEvent);
    tmpvalue.start = new Date(event.target.value);
    setcurrentEvent(tmpvalue);
    settimeAndStart([
      timeAndStart[0],
      tmpvalue.time.toISOString().toString().substring(0, 16),
    ]);
  }

  async function getEvents() {
    const options = {
      method: "GET",
      headers: myHeaders,
    };
    await fetch("http://127.0.0.1:3001/events/", options)
      .then((response) => {
        updateResponse = response;
      })
      .catch((error) => {
        console.log("there has been a problem", error);
      });
    setallEvents(await updateResponse.json());
  }

  useEffect(() => {
    getEvents();
  }, []);

  async function createEvent() {
    const option = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(newValue),
    };
    await fetch("http://127.0.0.1:3001/events/", option)
      .then((response) => {
        updateResponse = response;
      })
      .catch((error) => {
        console.log("there has been a problem", error);
      });
    window.location.reload(false);
  }

  async function updateEvent() {
    const options = {
      method: "PUT",
      headers: myHeaders,
      body: JSON.stringify(currentEvent),
    };
    await fetch(`http://127.0.0.1:3001/events/${currentId}`, options).catch(
      (error) => console.log("problem")
    );
    setisOpenned(false);
    window.location.reload(false);
  }
  console.log(timeAndStart);

  return (
    <main>
      <div className="centered-small">
        <form>
          <h3>Create an Event</h3>
          <div className="form-group">
            <label for="title">The title of your reminder</label>
            <input
              type="text"
              id="title"
              className="form-control"
              onChange={handleChangeTitle}
              required
              maxLength="20"
            />
          </div>
          <div className="form-group">
            <label for="text">What are your plans?</label>
            <textarea
              type="text"
              id="text"
              className="form-control"
              maxLength="100"
              onChange={handleChangeText}
              required
            ></textarea>
          </div>
          <div className="form-group">
            <label for="selecter">Choose the type of your activity</label>
            <select
              className="form-control"
              name="type"
              id="selecter"
              onChange={handleChangeType}
              required
            >
              <option value="Sport">Sport</option>
              <option value="Work">Work</option>
              <option value="Eat">Eat</option>
              <option value="Relax">Relax</option>
              <option value="Self Care">Self Care</option>
              <option value="Something else">Something else</option>
            </select>
          </div>
          <div className="form-group">
            <label for="start">Pick the start date</label>
            <input
              type="datetime-local"
              className="form-control"
              id="start"
              onChange={handleChangeStart}
              min={newDate}
              max={timeAndStart[0]}
              required
            />
          </div>
          <div className="form-group">
            <label for="time">Pick a deadline</label>
            <input
              type="datetime-local"
              className="form-control"
              id="time"
              onChange={handleChangeTime}
              min={timeAndStart[1]}
              required
            />
          </div>
        </form>
        <button
          className="btn btn-outline-success btn-create"
          onClick={createEvent}
        >
          Add Event
        </button>
      </div>
      <div className="event-area">
        <table className="table table-striped" id="table-events">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Description</th>
              <th scope="col">Type</th>
              <th scope="col">Start</th>
              <th scope="col">End</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {allEvents.events &&
              allEvents.events.map((item) => {
                let mapTime = "";
                let mapStart = "";

                mapTime =
                  item.time.substring(0, 10) +
                  " " +
                  item.time.substring(11, 16);
                mapStart =
                  item.start.substring(0, 10) +
                  " " +
                  item.time.substring(11, 16);

                return (
                  <EventBar
                    title={item.title}
                    text={item.text}
                    time={mapTime}
                    start={mapStart}
                    type={item.type}
                    id={item.id}
                    completion={item.completion}
                    editEvent={() => editEventOpen(item.id)}
                  />
                );
              })}
          </tbody>
        </table>
      </div>
      <Modal
        isOpen={isOpenned}
        style={customStyles}
        contentLabel="example modal"
      >
        <div className="card">
          <div className="card-header">Update the event</div>
          <div className="card-body">
            <label className="card-text">New Title</label>
            <input
              type="text"
              className="form-control"
              value={currentEvent.title}
              onChange={handleChangeTitleU}
              maxLength="10"
            />
            <label className="card-text">New Description</label>
            <textarea
              type="text"
              className="form-control"
              maxLength="50"
              value={currentEvent.text}
              onChange={handleChangeTextU}
              style={{ maxHeight: 500 + "px" }}
            ></textarea>
            <label for="selecter">Choose the type of your activity</label>
            <select
              className="form-control"
              name="type"
              value={currentEvent.type}
              onChange={handleChangeTypeU}
              id="selecter"
              required
            >
              <option value="Sport">Sport</option>
              <option value="Work">Work</option>
              <option value="Eat">Eat</option>
              <option value="Relax">Relax</option>
              <option value="Self Care">Self Care</option>
              <option value="Something Else">Something else</option>
            </select>
            <label className="card-text">New Start Date</label>
            <input
              type="datetime-local"
              onChange={handleChangeStartU}
              min={newDate}
              max={timeAndStart[0]}
              className="form-control"
            />
            <label className="card-text">New Deadline</label>
            <input
              type="datetime-local"
              onChange={handleChangeTimeU}
              min={timeAndStart[1] ? timeAndStart[1] : newDate}
              className="form-control"
            />
          </div>
          <div className="row justify-content-between card-footer">
            <div className="col-4">
              <button
                type="button"
                onClick={() => setisOpenned(false)}
                className="btn btn-danger btn-sm"
              >
                Cancel
              </button>
            </div>
            <div className="col-4">
              <button
                type="button"
                onClick={updateEvent}
                className="btn btn-success btn-sm"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </main>
  );
}
//3028192
