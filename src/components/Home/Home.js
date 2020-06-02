import React from 'react'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'

const Home = function () {
  return (
    <div>
      <h1>Welcome to FlashQuiz</h1>
      <Link to={'/sign-in'}>
        <Button>Sign In</Button>
      </Link>
      <Link className="auth-button" to={'/sign-up'}>
        <Button>Sign Up</Button>
      </Link>
    </div>
  )
}

export default Home
