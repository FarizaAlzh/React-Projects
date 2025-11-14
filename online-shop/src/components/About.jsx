import React from 'react';
import '../styles/About.css';

function AboutUs() {
  return (
    <div className="about-container">
      <div className="about-header">WOW, a whole page just about me!</div>
      <div className="about-main">
        <img className='about-photo' src='photos/my.png' alt='myPhoto'/>
        <div className="about-text">
          <h3>Me talking about myself</h3>
          <p>
            My name is Alzhan Fariza. I’m 20 years old and from Pavlodar. I study at the Kazakh-British Technical University in the School of Information Technology. I am currently a third-year student. This semester, I chose to study the React framework because I want to try working in this field. 
          </p>
          <h3>Fun Facts About Me</h3>
          <ul>
            <li>My hobby is high-heels dancing</li>
            <li>I’m interested in startups</li>
            <li>I graduated school with honors</li>
            <li>I like mixing unusual foods</li>
            <li>I enjoy different types of sports</li>
            <li>I have a very calm personality</li>
          </ul>
        </div>
      </div>
    </div>
  ); 
}

export default AboutUs;
