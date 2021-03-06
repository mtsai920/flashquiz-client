import React, { useEffect, useState } from 'react'
import { withRouter, Redirect, Link } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const CardShow = (props) => {
  const [card, setCard] = useState({
    term: '',
    definition: '',
    collectionId: ''
  })

  const [deleted, setDeleted] = useState(false)

  const [updated, setUpdated] = useState(false)

  const { match, user, location, msgAlert } = props

  useEffect(() => {
    axios({
      url: `${apiUrl}/cards/${match.params.id}`,
      method: 'GET',
      headers: {
        'Authorization': `Token token=${user.token}`
      }
    })
      .then(res => setCard(res.data.card))
      .catch((err) => {
        msgAlert({
          heading: 'Uh oh!',
          variant: 'danger',
          message: 'Failed to retrieve card information due to ' + err.message
        })
      })
  }, [])

  const destroy = event => {
    axios({
      url: `${apiUrl}/cards/${match.params.id}`,
      method: 'DELETE',
      headers: {
        'Authorization': `Token token=${user.token}`
      }
    })
      .then(() => setDeleted(true))
      .then(() => {
        msgAlert({
          heading: 'Success!',
          variant: 'success',
          message: 'Card has been deleted.'
        })
      })
      .catch((err) => {
        msgAlert({
          heading: 'Uh oh!',
          variant: 'danger',
          message: 'Failed to delete card due to: ' + err.message
        })
      })
  }

  const onSubmit = event => {
    event.preventDefault()
    axios({
      url: `${apiUrl}/cards/${match.params.id}`,
      method: 'PATCH',
      data: { card },
      headers: {
        'Authorization': `Token token=${user.token}`
      }
    })
      .then(() => setUpdated(true))
      .then(() => {
        msgAlert({
          heading: 'Updated!',
          variant: 'success',
          message: 'Card has been successfully updated.'
        })
      })
      .catch((err) => {
        msgAlert({
          heading: 'Uh oh!',
          variant: 'danger',
          message: 'Failed to update card due to ' + err.message
        })
      })
  }

  const handleChange = event => {
    event.persist()
    setCard(card => ({ ...card, [event.target.name]: event.target.value }))
  }

  if (deleted || updated) {
    return <Redirect to={`/collections/${location.card.collectionId}`}/>
  }

  return (
    <div className="card-show-div">
      <h2>Update your Card</h2>
      <Form onSubmit={onSubmit}>
        <Form.Group controlId="formGroupEmail">
          <Form.Label>Term</Form.Label>
          <Form.Control
            type="text"
            name="term"
            value={card.term}
            onChange={handleChange}
            required />
        </Form.Group>
        <Form.Group controlId="exampleForm.ControlTextarea1">
          <Form.Label>Definition</Form.Label>
          <Form.Control as="textarea" rows="3"
            maxLength="350"
            name="definition"
            value={card.definition}
            onChange={handleChange}
            required />
          <Form.Text>
            Max length 350 characters
          </Form.Text>
        </Form.Group>
        <Button variant="light" type="submit">Update Card</Button>
        <Button variant="light" className="card-show-delete" onClick={destroy}>Delete</Button>
        <Link to={`/collections/${location.card.collectionId}`}>
          <Button variant="light">Back</Button>
        </Link>
      </Form>
    </div>
  )
}

export default withRouter(CardShow)
