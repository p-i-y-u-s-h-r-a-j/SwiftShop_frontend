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
    <div>
      <h1>Welcome to My App</h1>
      <Link to="/signin"><button>Sign In</button></Link>
      <Link to="/signup"><button>Sign Up</button></Link>
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
