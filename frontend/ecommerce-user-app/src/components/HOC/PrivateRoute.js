import React from "react"
import { Route } from "react-router-dom"

const PrivateRoute = ({ component: Component, ...rest}) => {
    return <Route {...rest} element={(props) => {
        const token = localStorage.getItem('token')
        if (token) {
            return <Component {...props}/>
        } else {
            // return <Redirect to="/signin"/>
            return
        }
    }}/>
    // return <Route path={props.path} element={props.element}/>
}
export default PrivateRoute