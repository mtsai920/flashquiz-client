import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import { Col, Row, Form } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import apiUrl from '../../apiConfig'
import axios from 'axios'

const CollectionCreate = (props) => {
  const [collection, setCollection] = useState({
    title: '',
    description: '',
    cards: []
  })

  const [collectionId, setCollectionId] = useState(null)

  const { user, msgAlert } = props

  const handleChange = event => {
    event.persist()
    setCollection(collection => ({ ...collection, [event.target.name]: event.target.value }))
  }

  const handleSubmit = event => {
    event.preventDefault()

    axios({
      url: `${apiUrl}/collections`,
      method: 'POST',
      data: { collection },
      headers: {
        'Authorization': `Token token=${user.token}`
      }
    })
      .then(res => setCollectionId(res.data.collection._id))
      .then(() => msgAlert({
        heading: 'Success!',
        variant: 'success',
        message: 'Collection created.'
      }))
      .catch((error) => {
        msgAlert({
          heading: 'Uh oh!',
          variant: 'danger',
          message: 'Failed to create collection due to error: ' + error.message
        })
      })
  }

  if (collectionId) {
    return <Redirect to={`/collections/${collectionId}`} />
  }

  return (
    <div className="col-create-div">
      <h1>Create a Collection</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group as={Row} controlId="collection-title">
          <Form.Label column sm="2">
            Title
          </Form.Label>
          <Col sm="10">
            <Form.Control
              placeholder="Title"
              name="title"
              value={collection.title}
              onChange={handleChange}
              required
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="collection-description">
          <Form.Label column sm="2">
            Description
          </Form.Label>
          <Col sm="10">
            <Form.Control
              placeholder="Description"
              name="description"
              value={collection.description}
              onChange={handleChange}
              required
            />
          </Col>
        </Form.Group>
        <Button id="collection-create" variant="light" type="submit">Create</Button>
      </Form>
    </div>
  )
}

export default CollectionCreate
