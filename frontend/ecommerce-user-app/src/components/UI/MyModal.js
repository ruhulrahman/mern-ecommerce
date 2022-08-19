import React from 'react'
import { Button, Modal } from 'react-bootstrap'

const MyModal = (props) => {
    // const [show, setShow] = useState(false)
    // const closeModal = () => setShow(false);
    // const showModal = () => setShow(true);

  return(
    <Modal show={props.show} onHide={props.closeModal} size={props.size ? props.size : 'md'}>
        <Modal.Header closeButton>
            <Modal.Title>{props.modalTitle}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
            {props.children}
        </Modal.Body>

        <Modal.Footer>
            {
                !props.closeBtnHide ?
                    <Button variant="secondary" onClick={props.closeModal}>
                        Close
                    </Button>
                : ''
            }
            {
                !props.saveBtnHide ?
                    <Button variant="success" onClick={props.handleClose}>
                        Save
                    </Button>
                : ''
            }
        </Modal.Footer>
    </Modal>
   )

 }

 export default MyModal