import React from 'react'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'

const Home = function () {
  return (
    <div>
      <h1>Shalomie Homie. Welcome to my website.</h1>
      <Link to={'/sign-in'}>
        <Button>Sign In</Button>
      </Link>
      <Link to={'/sign-up'}>
        <Button>Sign Up</Button>
      </Link>
    </div>
  )
}

export default Home
