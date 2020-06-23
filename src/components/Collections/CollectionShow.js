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
      .catch((err) => {
        msgAlert({
          heading: 'Uh oh!',
          variant: 'danger',
          message: 'Failed to retrieve all your cards due to ' + err.message
        })
      })
  }, [])

  const getCards = () => {
    axios({
      url: `${apiUrl}/card/${match.params.id}`,
      method: 'GET',
      headers: {
        'Authorization': `Token token=${user.token}`
      }
    })
      .then(res => setCards(res.data.cards))
      .catch((err) => {
        msgAlert({
          heading: 'Uh oh!',
          variant: 'danger',
          message: 'Failed to retrieve all your cards due to ' + err.message
        })
      })
  }

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
      .then(() => setCard({ term: '', definition: '' }))
      .then(() => getCards())
      .then(() => msgAlert({
        heading: 'Success!',
        variant: 'success',
        message: 'Card created! It has been added to the bottom of the page. '
      }))
      .catch((err) => {
        msgAlert({
          heading: 'Uh oh!',
          variant: 'danger',
          message: 'Failed to create your card due to ' + err.message
        })
      })
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
    <div className="flip-card" key={card._id}>
      <Link to={{
        pathname: `/cards/${card._id}`,
        card: {
          term: card.term,
          definition: card.definition,
          collectionId: match.params.id
        }
      }}>
        <div className="flip-card-inner">
          <div className="flip-card-front">
            <h3>{card.term}</h3>
          </div>
          <div className="flip-card-back">
            <h5>{card.definition}</h5>
          </div>
        </div>
      </Link>
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
          <Button id="delete-collection" variant="dark" onClick={destroy}>Delete</Button>
          <br />
          <Link to={`${match.params.id}/edit`}>
            <Button id="edit-collection" variant="dark" className="show-col-edit">Edit</Button>
          </Link>
          <br />
          <Link to={'/collections'}>
            <Button variant="dark">Back to all Collections</Button>
          </Link>
        </div>
      </div>
      <div className="card-create">
        <hr />
        <h3>Create a Card</h3>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="card-term">
            <Form.Label>Term</Form.Label>
            <Form.Control
              type="text"
              name="term"
              value={card.term}
              onChange={handleChange}
              required />
          </Form.Group>
          <Form.Group controlId="card-definition">
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
          <Button variant="dark" type="submit">Create Card</Button>
        </Form>
        <hr />
      </div>
      <div>
        <h3>View your Cards</h3>
        <h4>Click on a card to update, edit, or delete.</h4>
        <ul>
          {showCards}
        </ul>
      </div>
    </div>
  )
}

export default withRouter(CollectionShow)
