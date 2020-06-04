import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import apiUrl from '../../apiConfig'
import axios from 'axios'
import { Col, Row, Form } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'

const CollectionEdit = (props) => {
  const [collection, setCollection] = useState({
    title: '',
    description: '',
    cards: []
  })

  const { match, user } = props

  useEffect(() => {
    axios({
      url: `${apiUrl}/collections/${match.params.id}`,
      method: 'GET',
      headers: {
        'Authorization': `Token token=${user.token}`
      }
    })
      .then(res => setCollection(res.data.collection))
      .catch(console.err)
  }, [])

  const handleChange = event => {
    event.persist()
    setCollection(recipe => ({ ...collection, [event.target.name]: event.target.value }))
  }

  return (
    <div>
      <h2>Edit your Collection</h2>
      <Form>
        <Form.Group as={Row} controlId="formPlaintextPassword">
          <Form.Label column sm="2">
            Title
          </Form.Label>
          <Col sm="10">
            <Form.Control
              placeholder="Title"
              name="title"
              value={collection.title}
              onChange={handleChange}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formPlaintextPassword">
          <Form.Label column sm="2">
            Description
          </Form.Label>
          <Col sm="10">
            <Form.Control
              placeholder="Description"
              name="description"
              value={collection.description}
              onChange={handleChange}
            />
          </Col>
        </Form.Group>
        <Button type="submit">Save</Button>
      </Form>
    </div>
  )
}

export default withRouter(CollectionEdit)
