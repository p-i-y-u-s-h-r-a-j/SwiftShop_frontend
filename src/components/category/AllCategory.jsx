import React from "react";
import { useState } from "react";
import './AllCategory.css'
import Category from "../showcategories/Category";
import Product from '../product/Product';
import { useLocation, useNavigate } from 'react-router-dom';
import Cart from "../cart/Cart";
import Wishlist from "../wishlist/Wishlist";
import SignIn from "../signin/SignIn";

const AllCategory = () =>{
    const [categoryDiv, setCategoryDiv] = useState(true);
    const [productDiv, setProductDiv] = useState(false);
    const[wishlistDiv, setWishlistDiv] = useState(false);
    const[cartDiv, setCartDiv] = useState(false);
    const navigate = useNavigate();
    let buttonText = 'Sign Out';
    
    
    const { state } = useLocation();
    let dataFromsignIn = state && state.data;
    if(dataFromsignIn==null){
        buttonText = 'Sign In';
    }

    
    

    const handleWishlist = () =>{
        setCategoryDiv(false);
        setProductDiv(false);
        setWishlistDiv(true);
        setCartDiv(false);
    }
    const handleCategory = () =>{
        setCategoryDiv(true);
        setProductDiv(false);
        setWishlistDiv(false);
        setCartDiv(false);
    }
    const handleCart = () =>{
        setCategoryDiv(false);
        setProductDiv(false);
        setWishlistDiv(false);
        setCartDiv(true);
    }

    const handleSignOut = () =>{
        dataFromsignIn = null;
        navigate('/signin');
    }
    return(
        <div className="allCategories"> 
            <div className="category-head">
                <span className="text-head">SwiftShop</span>
                <input placeholder="Search"/>
                <div className="all-category"><i className='bx bxs-category' onClick={handleCategory}></i></div>
                <div className="heart"><i className='bx bxs-heart' onClick={handleWishlist}></i></div>
                <div className="cart-add"><i className='bx bxs-cart-add' onClick={handleCart}></i></div>
                <button className="button-head" onClick={handleSignOut}>{buttonText}</button>
            </div>
            <div className="common">
                {productDiv&&<Product/>}
                {categoryDiv&&<Category token = {dataFromsignIn}/>}
                {cartDiv&&<Cart token = {dataFromsignIn}/>}
                {wishlistDiv&&<Wishlist token = {dataFromsignIn}/>}
            </div>
        </div>
        
    );
}

export default AllCategory;