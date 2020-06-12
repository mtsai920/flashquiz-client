import React, { useEffect, useState } from 'react'
import { withRouter, Redirect } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const CardShow = (props) => {
  console.log(props)

  const [card, setCard] = useState({
    term: '',
    definition: '',
    collectionId: ''
  })

  const [deleted, setDeleted] = useState(null)

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
      .catch(console.err)
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
      .catch(console.err)
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
      .then(res => setCard(res.data.card))
      .catch(console.err)
  }

  const handleChange = event => {
    event.persist()
    setCard(card => ({ ...card, [event.target.name]: event.target.value }))
  }

  if (deleted) {
    return <Redirect to={`/collections/${location.card.collectionId}`}/>
  }

  return (
    <div>
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
        </Form.Group>
        <Button type="submit">Update Card</Button>
        <Button onClick={destroy}>Delete</Button>
      </Form>
    </div>
  )
}

export default withRouter(CardShow)
