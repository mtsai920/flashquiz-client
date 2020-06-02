import React, { useState, useEffect } from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'

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
      <h3>Title: {collection.title}</h3>
      <h3>Description: {collection.description}</h3>
      <hr />
    </div>
  ))

  return (
    <div>
      <ul>
        {showCollections}
      </ul>
    </div>
  )
}

export default CollectionIndex
