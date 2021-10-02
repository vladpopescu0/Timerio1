import React,{Component,useState} from 'react'
import {Link} from 'react-router-dom'
import '../styles/Styles.css'
function Register() {
    
    let registerData={
        firstName:"",
        lastName:"",
        username:"",
        password:""
    }
    const [newData,setnewData] = useState(registerData)
    const [redirectValue, setredirectValue] = useState('/register')
    async function registerUser(){
        const data=newData
        const options = {
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
              },
            body: JSON.stringify(data)
        }
        console.log(data)
        await fetch('http://127.0.0.1:3001/users/register',options).then(data => {
            if(data.status>=200 && data.status<300){
                console.log(data)
                setredirectValue('/login')
            }
        }).catch(error =>{
            console.log('There has been a problem with the fetch',error);
        });
    }
    function firstNameChange(event){
        let tmpvalue = Object.assign({},newData);
        tmpvalue.firstName=event.target.value
        setnewData(tmpvalue)
    }
    function lastNameChange(event){
        let tmpvalue = Object.assign({},newData);
        tmpvalue.lastName=event.target.value
        setnewData(tmpvalue)
    }
    function emailChange(event){
        let tmpvalue = Object.assign({},newData);
        tmpvalue.username=event.target.value
        setnewData(tmpvalue)
    }
    function passwordChange(event){
        let tmpvalue = Object.assign({},newData);
        tmpvalue.password=event.target.value
        setnewData(tmpvalue)
    }
    return (
        <main>
            
            
            <form className="centered-small">
            <h1 className="text-muted title" >Welcome</h1>
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon1"><i class="bi bi-person-circle"></i></span>
                    </div>
                    <input type="text" className="form-control" onChange={firstNameChange} placeholder="First Name" required/>
                </div>
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon1"><i class="bi bi-person-circle"></i></span>
                    </div>
                    <input type="text" onChange={lastNameChange} className="form-control" placeholder="Last Name" required/>
                </div>
                <div class="input-group mb-3">
                    <div class="input-group-append">
                        <span class="input-group-text" id="basic-addon2"><i className="bi bi-envelope-fill"></i></span>
                    </div>
                        <input type="email" onChange={emailChange} className="form-control" placeholder="Your Email" required/>
                        
                </div>
                    <div class="input-group mb-3">
                        <div class="input-group-append">
                        <span class="input-group-text" id="basic-addon2"><i class="bi bi-question-lg"></i></span>
                        </div>
                        <input type="password" onChange={passwordChange} className="form-control" placeholder="Your Password" required/>
                </div>
                <Link to="/register" onClick={registerUser} type="button" className="btn btn-primary btn-lg btn-block">Register</Link>
                {/*<input type="submit" value="Register" className="register-button"/>*/}
            </form>
            
            
        </main>
    )
}
export default Register
