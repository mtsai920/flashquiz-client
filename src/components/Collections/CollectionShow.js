import React, { useState, useEffect } from 'react'
import { withRouter, Redirect, Link } from 'react-router-dom'
import apiUrl from '../../apiConfig'
import axios from 'axios'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

const CollectionShow = (props) => {
  const { match, user, msgAlert } = props

  const [collection, setCollection] = useState({
    title: '',
    description: '',
    cards: []
  })

  const [card, setCard] = useState({
    term: '',
    definition: '',
    collectionId: match.params.id
  })

  const [cards, setCards] = useState([])

  const [deleted, setDeleted] = useState(false)

  const handleChange = event => {
    event.persist()
    setCard(card => ({ ...card, [event.target.name]: event.target.value }))
  }

  // Axios call for rendering collection information on page
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

  // Axios call to retrieve all cards within the collection
  useEffect(() => {
    axios({
      url: `${apiUrl}/card/${match.params.id}`,
      method: 'GET',
      headers: {
        'Authorization': `Token token=${user.token}`
      }
    })
      .then(res => setCards(res.data.cards))
      .catch(console.err)
  }, [])

  // Submit function to create card
  const handleSubmit = event => {
    event.preventDefault()

    axios({
      url: `${apiUrl}/cards`,
      method: 'POST',
      data: { card },
      headers: {
        'Authorization': `Token token=${user.token}`
      }
    })
      .then(() => msgAlert({
        heading: 'Success!',
        variant: 'success',
        message: 'Card created!'
      }))
      .catch(console.error)
  }

  // Function to delete collection
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
      .catch((error) => {
        msgAlert({
          heading: 'Uh oh!',
          variant: 'danger',
          message: 'Failed to delete collection due to error: ' + error.message
        })
      })
  }

  let showCards = cards.map(card => (
    <div key={card._id}>
      <h3>{card.term}</h3>
      <h4>{card.definition}</h4>
    </div>
  ))

  if (cards.length === 0) {
    showCards = 'You have no cards in this collection yet! Create one to get studying.'
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
      <div className="show-col-div">
        <div>
          <h1>{collection.title}</h1>
          <h2>{collection.description}</h2>
        </div>
        <div className="show-col-buttons">
          <Button onClick={destroy}>Delete</Button>
          <br />
          <Link to={`${match.params.id}/edit`}>
            <Button className="show-col-edit">Edit</Button>
          </Link>
          <br />
          <Link to={'/collections'}>
            <Button>Back to all Collections</Button>
          </Link>
        </div>
      </div>
      <div className="card-create">
        <hr />
        <h3>Create a Card</h3>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formGroupEmail">
            <Form.Label>Term</Form.Label>
            <Form.Control
              type="text"
              name="term"
              value={card.term}
              onChange={handleChange} />
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label>Definition</Form.Label>
            <Form.Control as="textarea" rows="3"
              name="definition"
              value={card.definition}
              onChange={handleChange} />
          </Form.Group>
          <Button type="submit">Create Card</Button>
        </Form>
        <hr />
      </div>
      <div>
        <ul>
          {showCards}
        </ul>
      </div>
    </div>
  )
}

export default withRouter(CollectionShow)
