import React, { useState, useEffect } from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import { Link } from 'react-router-dom'

const CollectionIndex = (props) => {
  const [collections, setCollections] = useState([])

  const { user } = props

  useEffect(() => {
    axios({
      url: `${apiUrl}/collections`,
      method: 'GET',
      headers: {
        'Authorization': `Token token=${user.token}`
      }
    })
      .then(res => setCollections(res.data.collections))
      .catch(console.error)
  }, [])

  if (collections.length === 0) {
    return (
      <div>
        <h2>Loading...</h2>
      </div>
    )
  }

  const showCollections = collections.map(collection => (
    <div key={collection._id}>
      <Link to={`/collections/${collection._id}`}>{collection.title}</Link>
      <h3>Description: {collection.description}</h3>
      <hr />
    </div>
  ))

  return (
    <div>
      <h2>Select a Collection</h2>
      <ul>
        {showCollections}
      </ul>
    </div>
  )
}

export default CollectionIndex
