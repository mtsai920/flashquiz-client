import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'

const CardShow = (props) => {
  console.log(props)

  const { match, user } = props

  const [card, setCard] = useState({
    term: '',
    definition: '',
    collectionId: ''
  })

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

  if (!card) {
    return (
      <div>
        <h2>Loading...</h2>
      </div>
    )
  }

  return (
    <div>
      <h2>{card.term}</h2>
      <h3>{card.definition}</h3>
    </div>
  )
}

export default withRouter(CardShow)
