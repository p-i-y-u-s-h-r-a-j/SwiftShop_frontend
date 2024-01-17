import React, { useState } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import './SignIn.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SIGN_IN_URL = 'http://localhost:8080/api/v1/user/signIn';


const SignIn = () =>{
    const[formData, setFormData] = useState({
        email:'',
        password:'',
    });

    const navigate = useNavigate();
    const[token, setToken] = useState('');

    const handleInputChange = (event)=>{
        const{ name, value } = event.target;
        setFormData((prevData)=>({
            ...prevData,
            [name]:value,
        }));
    };

    const handleSignIn = async(event)=>{
        event.preventDefault();

        try{
            const response = await axios.post(SIGN_IN_URL, formData);
            if(response.data.status == 'Success'){
                alert('Signned In Successfully');
                setToken(response.data.message);
                console.log("Token plzz: "+ response.data.message);
                navigate('/allcategories',{state:{data: response.data.message}});
            }
        }
        catch(error){
            if(error.response && error.response.status==400){
                alert('Email Or Password is Wrong');
            }
        }  
    }



    return(
        <div className="mainbody">
            <div className="email">
            <div className="textemail">Email</div>
            <div className="emailinput">
                <input 
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter Your Email"/>
            </div>
            </div>

            <div className="password">
            <div className="textpassword">Password</div>

            <div className="passwordinput" >
                <input 
                name = "password"
                value = {formData.password}
                onChange={handleInputChange} 
                placeholder="Enter Your Password"/>
            </div>
            </div>
            <button className="button" onClick={handleSignIn}>Sign In</button>            
        </div>
    );
}

export default SignIn;