import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import "./App.css";
// import Layout from './components/Layout';
import { Routes, Route } from "react-router-dom";
// import Home from "./containers/Home";
// import PrivateRoute from "./components/HOC/PrivateRoute";
import ProtectedRoute from "./components/HOC/ProtectedRoute";
import NotFound from "./containers/NotFound";
import Orders from './containers/Orders';
import { getInitialData } from './actions';
import HomePage from './containers/HomePage';
import { ProductListPage } from './containers/ProductListPage';

// import NavDropdown from 'react-bootstrap/NavDropdown';

function App() {

  const auth = useSelector(state => state.auth)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getInitialData());
  }, [])

  return (
    <div>
        <Routes>
          <Route path="/" element={
            <HomePage/>
          }/>
          <Route path="/:slug" element={<ProductListPage/>}/>
          <Route path="/products" element={
            <ProtectedRoute>
            </ProtectedRoute>
          }/>
          <Route path="/orders" element={
            <ProtectedRoute>
              <Orders/>
            </ProtectedRoute>
          }/>
          <Route path="*" element={<NotFound/>} />
        </Routes>
      {/* <Layout>
        <h1>Hello world</h1>
      </Layout> */}
    </div>
  );
}

export default App;
