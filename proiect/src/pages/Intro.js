import React from 'react'
import '../styles/Styles.css'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
  } from "react-router-dom";
export default function Intro() {
    let match = useRouteMatch();
    return (
        <main className="box-full">
           
            <section className="full-img">
                 <ul className="nav border-slim sticky-top">
          <li className="nav-item">
            <Link className="nav-link active " to='/'>Home</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link active" to='/register'>Register</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link active" to='/login'>Login</Link>
          </li>
        </ul>
                <h1 className="title-main">Welcome to Timerio</h1>
                <p id="subtitle">A well-designed site for time management</p>
            </section>
            <section id="info-section">
                <p className="info-text">Some Info</p>
            </section>
            <footer className="footer">
                    <span>Copyright 2021, Timerio</span> 
            </footer>
        </main>
    )
}