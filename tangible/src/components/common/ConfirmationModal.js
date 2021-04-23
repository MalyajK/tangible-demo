import {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const ConfirmationModal = (props) => {
  
  const {buttonText, handleSubmit, modalText, form, disabled} = props
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
      <>
      <Button variant="primary" onClick={handleShow} disabled={disabled}>
        {buttonText}
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {modalText}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" type="submit" onClick={() => {handleSubmit(); handleClose()}} form={form}>
            Save Changes 
          </Button>
        </Modal.Footer>
      </Modal>
      </>
  )
}

export default ConfirmationModal
