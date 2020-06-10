import React from 'react'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'

const Home = function () {
  return (
    <div className="home-div">
      <div>
        <h1>Welcome to FlashQuiz</h1>
        <Link to={'/sign-up'}>
          <Button>Sign Up</Button>
        </Link>
        <Link className="auth-button" to={'/sign-in'}>
          <Button>Sign In</Button>
        </Link>
      </div>
      <div>
        <h3>A flashcard application for all of your studying needs</h3>
      </div>
    </div>
  )
}

export default Home
