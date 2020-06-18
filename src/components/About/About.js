import React from 'react'

const About = () => {
  return (
    <div>
      <h3 className="about-heading">What is FlashQuiz?</h3>
      <h5>FlashQuiz is the new flashcard studying application. Learn new words, study for tests, or prepare for interviews. Your cards are tied to your account, so you never have to worry about losing them.</h5>
      <div className="about-gs-div">
        <h3 className="about-heading">Getting Started</h3>
        <h5>To use Flashquiz, simply create a Collection first. Then, create your cards. It&apos;s that simple!</h5>
      </div>
      <div className="about-af-div">
        <h3 className="about-heading">About FlashQuiz</h3>
        <h5>FlashQuiz is an open source application built with React, Javascript, MongoDB, and Express. Check out the GitHub repo <a className="about-link" href="https://github.com/mtsai920/flashquiz-client" rel="noopener noreferrer" target="_blank">here</a>. Any improvements and changes are welcome.</h5>
      </div>
    </div>
  )
}

export default About
