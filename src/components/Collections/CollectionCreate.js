import React, { useState } from 'react'
import { Col, Row, Form } from 'react-bootstrap'
// import Button from 'react-bootstrap/Button'

const CollectionCreate = (props) => {
  const [collection, setCollection] = useState({
    title: '',
    description: '',
    cards: []
  })

  // const [collectionId, setCollectionId] = useState(null)

  const handleChange = event => {
    event.persist()
    setCollection(recipe => ({ ...collection, [event.target.name]: event.target.value }))
  }

  return (
    <div>
      <h1>Create a Collection</h1>
      <Form>
        <Form.Group as={Row} controlId="formPlaintextPassword">
          <Form.Label column sm="2">
            Descriptiongi
          </Form.Label>
          <Col sm="10">
            <Form.Control type="password" placeholder="Password" />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formPlaintextPassword">
          <Form.Label column sm="2">
            Description
          </Form.Label>
          <Col sm="10">
            <Form.Control type="password" placeholder="Password" />
          </Col>
        </Form.Group>
      </Form>
    </div>
  )
}

export default CollectionCreate
