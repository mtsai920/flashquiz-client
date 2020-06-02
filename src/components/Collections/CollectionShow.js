import React from 'react'
import { withRouter } from 'react-router-dom'
// import axios from 'axios'

const CollectionShow = (props) => {
  // const [collection, setCollection] = useState({
  //   title: null,
  //   description: null,
  //   cards: []
  // })

  // useEffect(() => {
  //   axios({
  //     url: `${apiUrl}/collections/${match.params._id}`
  //   })
  // })

  console.log(props)

  return (
    <div>
      <h1>Collection Show</h1>
      <button>Delete</button>
    </div>
  )
}

export default withRouter(CollectionShow)
