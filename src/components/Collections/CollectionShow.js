import React, { useState, useEffect } from 'react'
import { withRouter, Redirect, Link } from 'react-router-dom'
import apiUrl from '../../apiConfig'
import axios from 'axios'
import Button from 'react-bootstrap/Button'

const CollectionShow = (props) => {
  const [collection, setCollection] = useState({
    title: null,
    description: null,
    cards: []
  })

  const [deleted, setDeleted] = useState(false)

  const { match, user, msgAlert } = props

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
      <Link to={'/collections'}>
        <Button>Back to all Collections</Button>
      </Link>
    </div>
  )
}

export default withRouter(CollectionShow)
