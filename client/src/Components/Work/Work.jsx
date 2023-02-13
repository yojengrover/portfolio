import React from 'react'
import Header from '../Header/Header'
import './Work.css'
function Work() {
  return (
    <div><Header ns={2} />
    <div className='container'>
      <div className='row'>
        <h2>Work Experience</h2>
        <h3>Cognizant Technology Solutions</h3>
        <h4 className='wList'>
            Programmer Analyst: Pearson Team
            <ul className="list-group">
            <li className="list-group-item">Developed sound knowledge on React, Redux for front-end, Mongo DB for backend and Node and  Express as server through comprehensive programmatic analysis and the performance of various tasks to ensure that all objectives aligned with institutional deliverables.</li>	
            <li className="list-group-item">Created reusable components and implemented routing to navigate between components using  React and React-Router by assessing and evaluating gaps across programmatic framework present to provide timely, effective resolutions.</li>	
            <li className="list-group-item">Developed Reusable and Responsive Stateless Components using React hooks.</li>	
            <li className="list-group-item">Used MobX as state management tool for front end development.</li>	
            <li className="list-group-item">Followed Test Driven Development using Enzyme and React Testing Library for  Component based testing.</li>	
            <li className="list-group-item">Worked with AXIOS to hit REST endpoints to fetch data into the app.</li>	
            <li className="list-group-item">Used JIRA for requirement gathering and GIT and BITBUCKET as version control systems.</li>	
            <li className="list-group-item">Debugged the application using chrome development tools.</li>	
            <li className="list-group-item">Used Agile methodology for the development life cycle and followed Scrum framework.</li>	
            <li className="list-group-item">Designed unit tests using tools like JEST, Enzyme and ensured 100 percent coverage.</li>
            </ul>
        </h4>
      </div>
    </div>
    </div>
  )
}

export default Work