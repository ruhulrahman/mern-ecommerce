import React from 'react'
import { Form } from 'react-bootstrap'

const Input = (props) => {
  return(
    <>
        <Form.Group className="mb-3" controlId={props.label}>
            <Form.Label>{props.label}</Form.Label>
            <Form.Control type={props.type} value={props.value} placeholder={props.placeholder} onChange={props.onChange} min={props.min} max={props.max}/>
            <Form.Text className="text-muted">
                {props.errorMsg}
            </Form.Text>
        </Form.Group>
    </>
   )

 }

 export default Input