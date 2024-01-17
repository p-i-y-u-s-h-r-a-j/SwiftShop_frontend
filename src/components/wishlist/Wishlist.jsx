import React from "react";
import { useState, useEffect } from "react";
import './Wishlist.css';
import axios from "axios";
const WISHLIST_API_URL = 'http://localhost:8080/api/v1/wishlist/';
const CART_API_URL = 'http://localhost:8080/api/v1/cart/add?token=';

const ShowWishlist = ({test, token}) =>{
    const handleAddToCart = async(event) =>{
        event.preventDefault();
            const pId = test.id;
            const quantity = 1;
            const cartData = {
                "productId":pId,
                "quantity":quantity
            }
            const URL = CART_API_URL+ token;
            try{
                const response = await axios.post(URL, cartData);
                if(response.data.success==true){
                    alert('Added To Cart Successfully');
                }
            }
            catch(error){
                if(error.response && error.response.status==400){
                    alert('Please Sign In To Add In Cart');
                }
            }
    }
    return(
        <div className="wishlist-card-div">
                <div className="wishlist-card-image">
                    <img className="wishlist-image" src={test.imageUrl}></img>
                </div>
                <div className="wishlist-card-detail">
                    <p><span>{test.name}</span></p>
                    <p> <span>{test.description}</span></p>
                    <p><span>Price - {test.price}</span></p>

                    <div className="wishlist-card-button">
                        <button className="wishlist-card-cart" onClick={handleAddToCart}><span>Add To Cart</span></button>
                    </div>
                </div>
            </div>
    );
}

const Wishlist = ({token}) =>{
    const[wishlistData, setWishlistData] = useState([]);

    const Task = async()=>{
        const URL = WISHLIST_API_URL+token;
        try{
            const response = await fetch(URL);
            const data = await response.json();
            setWishlistData(data);
            console.log("Wishlist Data Log: "+ wishlistData[0].name);
        }
        catch(error){
            console.log("Some Error Occured: "+ error);
        }
    }

    useEffect(()=>{
        Task();
    },[]);

    console.log("Wishlist: " + token);
    return(
        <div className="wishlist-show">
            {
                wishlistData?.length > 0
                ?(
                    <div className="whislist-car-head-all">
                        {wishlistData.map((wishlist)=>(
                            <ShowWishlist test={wishlist} token={token}/>
                        ))}
                    </div>
                )
                :
                (
                    <h1>No Wishlist Added</h1>
                )
            }
        </div>
    );
}

export default Wishlist;