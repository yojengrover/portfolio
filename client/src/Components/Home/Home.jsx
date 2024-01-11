import React from 'react'
import Header from '../Header/Header'
import reactImage from '../../Images/react.jpg'
import reduxImage from '../../Images/redux.jpg'
import mongoDbImage from '../../Images/mongodb.jpg'
import nodeImage from '../../Images/nodejs.jpg'
import htmlImage from '../../Images/html5.jpg'
import scssImage from '../../Images/sass.jpg'
import sqlImage from '../../Images/sql-database-generic.jpg'
import bootstrapImage from '../../Images/bootstrap.jpg'
import javascriptImage from '../../Images/javascript.jpg'
import graphqlImage from '../../Images/download.png'
import './Home.css'
import Footer from '../Footer/Footer'
const Home = () => {

  const data = [
    {
      image:reactImage,
      name: "ReactJS"
    },
    {
      image:reduxImage,
      name: "Redux"
    },
    {
      image:nodeImage,
      name: "NodeJS"
    },
    {
      image:mongoDbImage,
      name: "MongoDB"
    },
    {
      image:graphqlImage,
      name: "Graphql"
    },
    {
      image:javascriptImage,
      name: "JavaScript"
    },
    {
      image:sqlImage,
      name: "SQL"
    },
    {
      image:scssImage,
      name: "Sass"
    },
    {
      image:htmlImage,
      name: "HTML"
    },
    {
      image:bootstrapImage,
      name: "Bootstrap"
    }
  ]

  const downloadResume = () => {
    // using Java Script method to get PDF file
    fetch('Grover, Yojen resume.pdf').then(response => {
        response.blob().then(blob => {
            // Creating new object of PDF file
            const fileURL = window.URL.createObjectURL(blob);
            // Setting various property values
            let alink = document.createElement('a');
            alink.href = fileURL;
            alink.download = 'Grover, Yojen resume.pdf';
            alink.click();
        })
    })
}
  return (
    <div>
    <Header ns={1} />
      <div className='container'>
        <div className='row'>
          <div className='col'>
            <div className='statement'>
              Frontend Developer/ Full Stack Developer experienced in designing & developing 
              custom websites based on React/Redux and MERN Stack. Download <a className='resumeLink' onClick={downloadResume}>Resume</a>
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='skillset'>
          <div className='skillHeading'>Skills</div>
          <div className='borderDiv'>
          <div class="row row-cols-3 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5">

        {data.map((tech) => (
          <div class="col mb-4">
            <div class="card">
              <img src={tech.image} class="card-img-top" alt="..." />
              <div class="card-body">
                <h5 class="card-title">{tech.name}</h5>
              </div>
            </div>
          </div>))}
      </div>
      </div>
          </div>
        </div>
      </div>
      <Footer position={false}/>
    </div>
  )
}

export default Home