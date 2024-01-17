import React, { useEffect, useState } from "react";
import './Category.css';
import Product from "../product/Product";
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";

const CATEGORY_API_URL = 'http://localhost:8080/api/v1/category/list';




const Category = ({token}) =>{
    const [productDiv, setProductDiv] = useState(false);
    const [categoryDiv, setCategoryDiv] = useState(true);
    const [allCategoriesData, setAllCategoriesData] = useState([])
    const navigate = useNavigate();

    const CategoryCard = ({category}) =>{
        const handleClick = () =>{
            const dataToSend = {
                "id": category.id,
                "token": token
            }
            navigate('product', {state: {data: dataToSend}});
        };
        return(
            <div className="main-category-card" onClick={handleClick}>
                <img className = "image" src={category.imageUrl} alt="Camera"/>
                <span className="image-text">{category.categoryName}</span>
            </div>
        );
    }

    const task = async ()=>{
        try{
            const response = await fetch(CATEGORY_API_URL);
            const data = await response.json();
            setAllCategoriesData(data);
        }
        catch(error){
            alert("Custom---Error: "+error);
        }
    }
    useEffect(()=>{
        task();
    },[]);

    return(
        <div>
            {categoryDiv && <div className="category-div">
            {
                allCategoriesData?.length > 0
                ?(
                    <div className="category-main">
                        {allCategoriesData.map((cat)=>(
                        <CategoryCard category={cat}/>
                    ))}
                    </div>
                ) :
                (
                    <div><h2>There are No Categories Available</h2></div>
                )
            }
            
        </div>}
        </div>
    );
}
export default Category;