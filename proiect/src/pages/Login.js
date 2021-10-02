import React,{Component,useState} from 'react'
import '../styles/Styles.css'
import {Link, useHistory} from 'react-router-dom'
function Login() {
    const defaultData = {
        username:'',
        password:''
    }

    function emailChange(event){
        let tmpvalue  = Object.assign({},loginData);
        tmpvalue.username = event.target.value
        setloginData(tmpvalue);
    }
    function passwordChange(event){
        let tmpvalue  = Object.assign({},loginData);
        tmpvalue.password = event.target.value
        setloginData(tmpvalue);
    }

    const [loginData, setloginData] = useState(defaultData);

    async function loginUser(){
        const data=loginData
        const options = {
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
              },
            body: JSON.stringify(data)
        }
        console.log(data)
        let response2 = null
        await fetch('http://127.0.0.1:3001/users/authenticate',options).then(response => {
            response2 = response
        }).catch(error =>{
            console.log('There has been a problem with the fetch',error);
        });
        let body = await response2.json()
        console.log(body)
        const TOKEN_KEY = body.token
        if(body.hasOwnProperty('token')){
            localStorage.setItem('Token_key',TOKEN_KEY)   
            localStorage.setItem('user id',body.id)
            window.location.reload(false);
        }
    }
    
    return (
        <main>
            
            <div className="centered-small">
            <form>
                <h1 className="text-muted title">Welcome back</h1>
                    <div class="input-group mb-3">
                    <div class="input-group-append">
                        <span class="input-group-text" id="basic-addon2"><i class="bi bi-envelope-fill"></i></span>
                    </div>
                        <input type="email" onChange={emailChange} className="form-control" placeholder="Your Email" required/>
                </div>
                    <div class="input-group mb-3">
                        <div class="input-group-append">
                        <span class="input-group-text" id="basic-addon2"><i class="bi bi-question-lg"></i></span>
                        </div>
                        <input type="password" onChange={passwordChange} className="form-control" placeholder="Your Password" required/>
                </div>
                
            </form>
            <Link to='/addevent' onClick={loginUser} className="btn btn-primary btn-lg btn-block">
                    Login
                </Link>
            </div>
        </main>
    )
    
}
export default Login
