import React from "react";
import { useState, useEffect } from "react";
import './Cart.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";
const CART_API_CALL = 'http://localhost:8080/api/v1/cart/?token=';
const DELETE_CART_API = 'http://localhost:8080/api/v1/cart/delete/';

const CartCard = ({data, token}) =>{


    const handleRemoveCall = async() =>{
        const URL = DELETE_CART_API + data.id + '?token=' + token;
        try{
            const response = await axios.delete(URL);
            if(response.data.success == true){
                alert('Item Removed From Cart');
            }
        }
        catch(error){
            alert('Unable To Remove Item');
        }
    }

    return(
        <div className="cart-card">
            <div className="cart-card-img">
                <img className="cart-img" src={data.product.imageUrl}></img>
            </div>
            <div className="cart-card-detail">
                <p><span className="cart-card-name">{data.product.name}</span></p>
                <p><span className="cart-card-quantity">Quantity - {data.quantity}</span></p>
                <p><span className="cart-card-price">Price - {data.product.price}</span></p>
            </div>
            <div className="cart-card-delivery">
                <div className="cart-card-delivery-time"><span>Delivery in 2 Days | Fri</span></div>
                <div className="cart-card-delivery-remove" onClick={handleRemoveCall}><span>Remove From the Cart</span></div>
            </div>
        </div>
    );
}





const Cart = ({token}) =>{
    
    const [cartData, setCartData] = useState([]);
    const Task = async() =>{
        const URL = CART_API_CALL+token;
        try{
            const response = await fetch(URL);
            const data = await response.json();
            console.log("Cart Data:- " + data.cartItems[0].product.id);
            setCartData(data);
            
        }
        catch(error){
            if(error.response && error.response.data == 400){
                alert('Please Sign In To See The Cart');
            }
        }
    }

    useEffect(()=>{
        Task();
    },[]);

    let totalCostotBuy = (cartData.totalCost);

    let totalSize = cartData.cartItems?.length;
    
    
    let discount = (totalCostotBuy/10);
    let randomNumber = Math.floor(Math.random() * (40 - 30 + 1) + 30);
    let shippingCharge = randomNumber;
    if(totalCostotBuy>499 || totalCostotBuy==null) shippingCharge = 0;
    let totalAmountToPay = (totalCostotBuy - discount - shippingCharge);
    
    return(
        <div className="cart-head-all">
            <div className="cart-head-all-card">
            {
                cartData.cartItems?.length > 0
                ?(
                    <div className="card-final">
                        {cartData.cartItems.map((p)=>(
                            <CartCard data={p} token={token}/>
                        ))}
                    </div>
                ):
                (
                    <h1>No Items Added To Cart</h1>
                )
            }
            </div>

            <div className="cart-head-all-price">
                <div className="cart-head-all-price-head"><h3>PRICE DETAILS</h3></div>
                <div className="cart-head-all-price-detail">
                    <div className="cart-head-all-price-detail-price shared-styles">
                        <div className="total-cost change-flex"><span>Price({totalSize !== undefined ? totalSize : '0'} item)</span></div>
                        <div><span>{totalCostotBuy !== undefined ? totalCostotBuy.toFixed(2) : '0'}</span></div>
                    </div>
                    <div className="cart-head-all-price-detail-discount shared-styles">
                        <div className="discount change-flex"><span>Discounts</span></div>
                        <div><span>-{discount !== undefined ? discount : '0'}</span></div>
                    </div>
                    <div className="cart-head-all-price-detail-delivery shared-styles">
                        <div className="delivery change-flex"><span>Delivery Cost</span></div>
                        <div><span>{shippingCharge}</span></div>
                    </div>
                    <div className="cart-head-all-price-detail-total shared-styles">
                        <div className="total-amount change-flex"><span>Total Amount</span></div>
                        <div><span>{totalAmountToPay.toFixed(2)}</span></div>
                    </div>
                </div>
                <div className="cart-head-all-price-button">
                    <button>PLACE ORDER</button>
                </div>
            </div>
            
            
        </div>
    );
}

export default Cart;