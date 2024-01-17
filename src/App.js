import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes, BrowserRouter} from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import SignIn from './components/signin/SignIn';
import SignUp from './components/signup/SignUp';
import AllCategory from './components/category/AllCategory';
import Product from './components/product/Product';
import Cart from './components/cart/Cart';
import './App.css';

const Home = () => {
  return (
    <div className="home-main-div">
      <h1>Welcome to Swift Shop</h1>
      <div className='home-main-div-sub'>
          <Link to="/signin"><button className='main-div-signin'>Sign In</button></Link>
          <Link to="/signup"><button className='main-div-signup'>Sign Up</button></Link>
      </div>
      
    </div>
  );
};

const App = ()=> {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<div>
          <Home/>
        </div>}/>

        <Route path="/signin" element={<div>
          <SignIn/>
        </div>} />

        <Route path="/signup" element={<div>
          <SignUp/>
        </div>} />

        <Route path="/allcategories" element={<div>
          <AllCategory/>
        </div>} />

        <Route path="/allcategories/product" element={<div>
          <Product/>
        </div>} />
        
      </Routes>
    </Router>
  );
}

export default App;
