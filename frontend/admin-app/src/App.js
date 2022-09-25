import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import "./App.css";
// import Layout from './components/Layout';
import { Routes, Route } from "react-router-dom";
import Home from "./containers/Home";
import SignIn from "./containers/SignIn";
import SignUp from "./containers/SignUp";
// import PrivateRoute from "./components/HOC/PrivateRoute";
import ProtectedRoute from "./components/HOC/ProtectedRoute";
import NotFound from "./containers/NotFound";
import { isUserLoggedIn, getInitialData } from './actions';
import Products from './containers/Products';
import Orders from './containers/Orders';
import Category from './containers/Category';
import NewPage from './containers/NewPage';

// import NavDropdown from 'react-bootstrap/NavDropdown';

function App() {

  const auth = useSelector(state => state.auth)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn())
    }
    if (auth.authenticate) {
      dispatch(getInitialData())
    }
  }, [auth.authenticate])

  return (
    <div>
        <Routes>
          <Route path="/" element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }/>
          <Route path="/page" element={
            <ProtectedRoute>
              <NewPage/>
            </ProtectedRoute>
          }/>
          <Route path="/products" element={
            <ProtectedRoute>
              <Products/>
            </ProtectedRoute>
          }/>
          <Route path="/category" element={
            <ProtectedRoute>
              <Category/>
            </ProtectedRoute>
          }/>
          <Route path="/orders" element={
            <ProtectedRoute>
              <Orders/>
            </ProtectedRoute>
          }/>
          <Route path="/signin" element={<SignIn/>} />
          <Route path="/signup" element={<SignUp/>} />
          <Route path="*" element={<NotFound/>} />
        </Routes>
      {/* <Layout>
        <h1>Hello world</h1>
      </Layout> */}
    </div>
  );
}

export default App;
