import React from 'react'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'

const Home = function () {
  return (
    <div className="home-div">
      <div>
        <h1>Welcome to FlashQuiz</h1>
        <div>
          <h3>A flashcard application for all of your studying needs. Sign up or sign in to get started.</h3>
        </div>
        <Link to={'/sign-up'}>
          <Button variant="light">Sign Up</Button>
        </Link>
        <Link className="auth-button" to={'/sign-in'}>
          <Button variant="light">Sign In</Button>
        </Link>
      </div>
    </div>
  )
}

export default Home
