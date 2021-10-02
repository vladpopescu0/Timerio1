import React,{useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import '../styles/Styles.css'

export default function UserPage() {
    function handleLogout(){
        localStorage.clear()
    }
    const userDefault = {
        firstName:'',
        lastName:'',
        username:'',
        password:''
    }
    const [newData, setnewData] = useState(userDefault)
    let passwordEntered;

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
        passwordEntered = event.target.value
    }
    
    let updateResponse = null;
    async function updateChanges(){
           const options = {
            method:'PUT',
            headers:myHeaders,
            body: JSON.stringify(newData)
        };
       await fetch(`http://127.0.0.1:3001/users/${userKey}`,options)
       .then(response => {updateResponse=response})
       .catch(error=>{console.log("there has been a problem",error)}); 
       window.location.reload(false)
    }


    const userKey = localStorage.getItem(localStorage.key(0))
    const userToken = localStorage.getItem(localStorage.key(1))
    let responseAfter=null;
    
    
    const [userData, setuserData] = useState(userDefault)

    const myHeaders = new Headers(); 
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Authorization','Bearer ' + userToken);
    myHeaders.append('Accept','*/*');

    console.info("this is the log from locale==>token",userToken);

    async function getInfo (){
        const options = {
            method:'GET',
            headers:myHeaders,
        };
       await fetch(`http://127.0.0.1:3001/users/${userKey}`,options)
       .then(response => {responseAfter=response})
       .catch(error=>{console.log("there has been a problem",error)});
       setuserData(await responseAfter.json());
       
    }

    
    
    useEffect(() => {
       getInfo()
    },[])

    return (
        <div className="container-fluid">
            <div className="card" style={{width: 18+'rem',margin:'auto',marginTop:30+'px'}}>
            <img src="https://picsum.photos/200/300" alt="random image" className="card-img-top" style={{height:200+'px',objectFit:'cover'}}/>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">{userData.firstName} {userData.lastName}</li>
                        <li className="list-group-item">{userData.username}</li>
                    </ul>
                    <Link to="/login" className="btn btn-outline-danger" onClick={handleLogout} style={{margin:'auto'}}>Log out</Link>
            </div>
       
    
            <form className="centered-small">
            <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon1"><i class="bi bi-person-circle"></i></span>
                    </div>
                    <input type="text" className="form-control" onChange={firstNameChange} placeholder="New First Name" required/>
            </div>
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon1"><i class="bi bi-person-circle"></i></span>
                    </div>
                    <input type="text" onChange={lastNameChange} className="form-control" placeholder="New Last Name" required/>
                </div>
                <div class="input-group mb-3">
                    <div class="input-group-append">
                        <span class="input-group-text" id="basic-addon2"><i class="bi bi-envelope-fill"></i></span>
                    </div>
                    <input type="email" onChange={emailChange} className="form-control" placeholder="New Email" required/>
                    
                </div>
                <div class="input-group mb-3">
                        <div class="input-group-append">
                        <span class="input-group-text" id="basic-addon2"><i class="bi bi-question-lg"></i></span>
                        </div>
                        <input type="password" onChange={passwordChange} className="form-control" placeholder="Your Password" required/>
                </div>
                <button className="btn btn-outline-success float-right" onClick={updateChanges}>Save Changes</button>
            </form> 
            
            
        </div>
    )
}
