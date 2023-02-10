import React, { useEffect } from 'react';
import Navbar from './components/header/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import { RootState } from './Context/Context';
import jwtDecode from 'jwt-decode';
import Cookies from 'universal-cookie';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Cart from './pages/Cart';
import Product from './components/Shop/Product';
import Checkout from './pages/Checkout';
import Orders from './pages/Orders';
import Wishlist from './pages/Wishlist';

function App() {

  const {authState, authDispatch, cartDispatch, productState, productDispatch} = RootState();
  const cookies = new Cookies()
  const URL = "https://beetle-eccommerce-backend.vercel.app"

  const refreshToken = async () => {
    try {
      const res = await axios.post(URL+"/api/customers/refresh", { token: authState.rToken }, { withCredentials: true });
      authDispatch({
        type: "REFRESH",
        payload: {
          aToken: res.data.accessToken,
          rToken: res.data.refreshToken
        }
      })
      cookies.set("aToken", res.data.accessToken)
      cookies.set("rToken", res.data.refreshToken)
      return res.data;
    } catch (err) {
      console.error(err);
    }
  };
  
  const axiosJWT = axios.create()
  
  axiosJWT.interceptors.request.use(
    async (config) => {
      let currentDate = new Date();
      const decodedToken = jwtDecode(authState?.aToken);
      if (decodedToken.exp * 1000 < currentDate.getTime()) {
        const data = await refreshToken();
        config.headers["x-access-token"] = data.accessToken;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  )

  const getUser = async () => {
    try{
      const { data } = await axios.get(URL+"/auth/login/success", { withCredentials: true})
      authDispatch({
        type: "LOGIN",
        payload: {
          user: data.user,
          aToken: data.aToken
        }
      });
    }
    catch(err){
      console.error(err);
    }
  }

  const getAllProducts = async() => {
    try{
      const data = await axios.get(URL+"/products/")
      const products = await data.data
      productDispatch({
        type: "GET_PRODUCTS",
        payload: {
          product: products
        }
      })
    }
    catch(err){
      console.error(err)
    }
  }

  useEffect(() => {
    authDispatch({
      type: "LOGIN",
      payload: {
        user: cookies.get("user"),
        aToken: cookies.get("aToken"),
        rToken: cookies.get("rToken"),
      }
    })
    getAllProducts()
  }, [])

  return (
    <div className="App">
      <Router>
        <Navbar axiosJWT={axiosJWT} />
        <Routes>
          <Route path='/' element={<Home URL={URL} />} />
          <Route path='/login' element={<Login URL={URL} />} />
          <Route path='/register' element={<Register URL={URL} />} />
          <Route path='/shop/:id' element={<Shop axiosJWT={axiosJWT} URL={URL} />} />
          <Route path='/shop/:id/:pid' element={<Product axiosJWT={axiosJWT} URL={URL} />} />
          <Route path='/cart' element={<Cart axiosJWT={axiosJWT} URL={URL} />} />
          <Route path='/wishlist' element={<Wishlist axiosJWT={axiosJWT} URL={URL} />} />
          <Route path='/checkout' element={<Checkout axiosJWT={axiosJWT} URL={URL} />} />
          <Route path='/orders' element={<Orders axiosJWT={axiosJWT} URL={URL} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
