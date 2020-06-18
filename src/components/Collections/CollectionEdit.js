import React, { useState, useEffect } from 'react'
import { withRouter, Redirect, Link } from 'react-router-dom'
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

  const [updated, setUpdated] = useState(false)

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
      .catch(console.err)
  }, [])

  const handleSubmit = event => {
    event.preventDefault()

    axios({
      url: `${apiUrl}/collections/${match.params.id}`,
      method: 'PATCH',
      data: { collection },
      headers: {
        'Authorization': `Token token=${user.token}`
      }
    })
      .then(setUpdated(true))
      .then(() => {
        msgAlert({
          heading: 'Success!',
          variant: 'success',
          message: 'Collection successfully updated.'
        })
      })
      .catch((err) => {
        msgAlert({
          heading: 'Uh oh!',
          variant: 'danger',
          message: 'Failed to update collection due to ' + err.message
        })
      })
  }

  const handleChange = event => {
    event.persist()
    setCollection(collection => ({ ...collection, [event.target.name]: event.target.value }))
  }

  if (updated) {
    return <Redirect to={`/collections/${props.match.params.id}`} />
  }

  return (
    <div className="col-edit-div">
      <h1>Edit your Collection</h1>
      <Form onSubmit={handleSubmit}>
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
        <Button variant="dark" type="submit">Save</Button>
        <Link to={`/collections/${match.params.id}`}>
          <Button variant="dark" className="col-edit-back">Back</Button>
        </Link>
      </Form>
    </div>
  )
}

export default withRouter(CollectionEdit)
