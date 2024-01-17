import React from "react";
import { useState } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './SignUp.css';

const API_URL = 'http://localhost:8080/api/v1/user/signup';



const SignUp = () =>{
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    });
    const handleInputChange = (event) => {
       const { name, value } = event.target;
       setFormData((prevData) =>({
        ...prevData,
        [name]: value,
       })) 
    };

    const handleSingUp = async (event) =>{
        event.preventDefault();
        try {
            // Send POST request to your backend API
            const response = await axios.post(API_URL, formData);
            if(response.data.status=='Success'){
                alert(response.data.status);
                navigate('/signin');
            }
          } catch (error) {
            // Handle errors
            if(error.response && error.response.status==400){
                alert('User Already Exist');
            }
          }
    }





    return(
        <div className="mainbody">


            <div className="namewhole">
                <div className="name">Name</div>
                <div className="namediv">

                    <input className="firstname" 
                    name="firstName"
                    value = {formData.firstName} 
                    onChange={handleInputChange}
                    placeholder="First Name"/>

                    <input className="lastname"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Last Name"></input>

                </div>
            </div>


            <div className="emailwhole">
                <div className="email">Email</div>
                <div className="emailinputdiv">

                    <input className="emailinput" 
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Email"/>

                    
                </div>
            </div>

            <div className="passwordwhole">
                <div className="password">Password</div>
                <div>

                    <input className = "passwordinput" 
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Password"/>

                </div>
            </div>

            <div className="button" onClick={handleSingUp}>
                <button className="buttonsignup">Sign Up</button>
            </div>

        </div>
        
    );
}

export default SignUp;