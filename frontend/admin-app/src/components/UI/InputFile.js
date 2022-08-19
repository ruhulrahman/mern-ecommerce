import React from 'react'
import { Form } from 'react-bootstrap'

const InputFile = (props) => {
  return(
    <>
        <Form.Group controlId={props.label} className="mb-3">
          <Form.Label>{props.label}</Form.Label>
          <Form.Control type={props.type} name={props.name}/>
          <Form.Text className="text-muted">
                {props.errorMsg}
            </Form.Text>
        </Form.Group>
    </>
   )

 }

 export default InputFile