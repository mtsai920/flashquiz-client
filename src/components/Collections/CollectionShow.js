import React, { useState, useEffect } from 'react'
import { withRouter, Redirect, Link } from 'react-router-dom'
import apiUrl from '../../apiConfig'
import axios from 'axios'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

const CollectionShow = (props) => {
  const [collection, setCollection] = useState({
    title: null,
    description: null,
    cards: []
  })

  const [modalShow, setModalShow] = useState(false)

  const [deleted, setDeleted] = useState(false)

  const { match, user, msgAlert } = props

  useEffect(() => {
    axios({
      url: `${apiUrl}/collections/${match.params.id}`,
      method: 'GET',
      headers: {
        'Authorization': `Token token=${user.token}`
      }
    })
      .then(res => setCollection(res.data.collection))
      .catch((err) => {
        msgAlert({
          heading: 'Uh oh!',
          variant: 'danger',
          message: 'Failed to retrieve collection due to ' + err.message
        })
      })
  }, [])

  const EditModal = function (props) {
    return (
      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
             Modal heading
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Centered Modal</h4>
          <p>
           Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
           dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
           consectetur ac, vestibulum at eros.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    )
  }

  const destroy = () => {
    axios({
      url: `${apiUrl}/collections/${match.params.id}`,
      method: 'DELETE',
      headers: {
        'Authorization': `Token token=${user.token}`
      }
    })
      .then(() => {
        msgAlert({
          heading: 'Success!',
          variant: 'success',
          message: 'Collection successfully deleted.'
        })
      })
      .then(() => setDeleted(true))
  }

  if (!collection) {
    return (
      <div>
        <h2>Loading...</h2>
      </div>
    )
  } else if (deleted) {
    return <Redirect to={'/collections'} />
  }

  return (
    <div>
      <h1>{collection.title}</h1>
      <h2>{collection.description}</h2>
      <Button onClick={destroy}>Delete</Button>
      <Button onClick={() => setModalShow(true)}>
        Edit
      </Button>
      <Link to={'/collections'}>
        <Button>Back to all Collections</Button>
      </Link>

      <EditModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </div>
  )
}

export default withRouter(CollectionShow)
