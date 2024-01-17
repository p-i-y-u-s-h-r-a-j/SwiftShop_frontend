import React from "react";
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from "react";
import './Product.css';
import axios from "axios";
const PROUDCT_API_URL = 'http://localhost:8080/api/v1/product/';
const WISHILIST_API_URL = 'http://localhost:8080/api/v1/wishlist/add?token=';
const CART_API_URL = 'http://localhost:8080/api/v1/cart/add?token=';



const Product = () =>{
    const { state } = useLocation();
    const dataFromHome = state && state.data;
    const[productData, setProductData] = useState([])


    const ProductCustomCard = ({testProduct}) =>{
        const handleAddToWishlist = async(event) =>{
            event.preventDefault();
            const URL = WISHILIST_API_URL + dataFromHome.token;
            // alert(URL);
            try{
                const response = await axios.post(URL, testProduct);
                if(response.data.success == true){
                    alert('Added To Wishlist Successfully');
                }
            }
            catch(error){
                if(error.response && error.response.status==400){
                    alert('Please Sign In To Add In Wishlist')
                }
            }
        }

        const handleAddToCart = async(event) =>{
            event.preventDefault();
            const pId = testProduct.id;
            const quantity = 1;
            const cartData = {
                "productId":pId,
                "quantity":quantity
            }
            const URL = CART_API_URL+dataFromHome.token;
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
            <div className="product-card-div">
                <div className="product-card-image">
                    <img className="product-image" src={testProduct.imageUrl}></img>
                </div>
                <div className="product-card-detail">
                    <p><span>{testProduct.name}</span></p>
                    <p> <span>{testProduct.description}</span></p>
                    <p><span>Price - {testProduct.price}</span></p>

                    <div className="product-card-button">
                        <button className="product-card-wishlist" onClick={handleAddToWishlist}><span>Add To WishList</span></button>
                        <button className="product-card-cart" onClick={handleAddToCart}><span>Add To Cart</span></button>
                    </div>
                </div>
            </div>
        );
    }


    const Task = async() =>{
        try{
            const response = await fetch(PROUDCT_API_URL);
            const data = await response.json();
            // console.log(data[0]);
            setProductData(data);
            
        }
        catch(error){
            console.log("Custom---Error: "+error);
        }
    }

    useEffect(()=>{
        Task();
    },[]);

    const productsWithCategoryId = productData.filter(product => product.categoryId === dataFromHome.id);
    // console.log(productsWithCategoryId);
    return(
        <div className="main-product-all">
            <div className="product-head-all">
                <span className="text-head">SwiftShop</span>
                <div className="search-and-icon">
                    <input className="search-product" placeholder="Search" />
                    <i className='bx bx-search-alt'></i>
                </div>
                
            </div>
            <div className="product-card">
                {
                    productsWithCategoryId?.length > 0
                    ?(
                        <div>
                            {productsWithCategoryId.map((p)=>(
                                <ProductCustomCard testProduct={p}/>
                            ))}
                        </div>
                    ) :
                    (
                        <div><h2>No Products Found</h2></div>
                    )
                }
            </div>
            
        </div>
    );
}

export default Product;