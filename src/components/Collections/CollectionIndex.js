import React, { useState, useEffect } from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import { Link } from 'react-router-dom'

const CollectionIndex = (props) => {
  const [collections, setCollections] = useState([])

  const { user, msgAlert } = props

  useEffect(() => {
    axios({
      url: `${apiUrl}/collections`,
      method: 'GET',
      headers: {
        'Authorization': `Token token=${user.token}`
      }
    })
      .then(res => setCollections(res.data.collections))
      .catch((err) => {
        msgAlert({
          heading: 'Uh oh!',
          variant: 'danger',
          message: 'Failed to retrieve your collections due to ' + err.message
        })
      })
  }, [])

  if (collections.length === 0) {
    return (
      <div>
        <h2>You have no collections yet!</h2>
      </div>
    )
  }

  const showCollections = collections.map(collection => (
    <div className="index-col-div" key={collection._id}>
      <Link className="coll-index-title" to={`/collections/${collection._id}`}>{collection.title}</Link>
      <h4>{collection.description}</h4>
    </div>
  ))

  return (
    <div>
      <h1>Select a Collection</h1>
      <ul>
        {showCollections}
      </ul>
    </div>
  )
}

export default CollectionIndex
