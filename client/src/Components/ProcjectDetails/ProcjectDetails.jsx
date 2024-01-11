import React from 'react'
import { useState } from 'react';
import './ProcjectDetails.css'
import Footer from '../Footer/Footer';

const ProcjectDetails = (props) => {
    const [id, setID] = useState(props.projectID);

    const backButton = () => {
        props.backButton(true);
        setID(0);
    }

    let projects= [{
        id:0,
        name:"GasNGo",
        desc:"Utilized React Hooks to develop a web application for ride sharing using material UI and CSS for frontend. Worked with GraphQL as query language for backend to fetch data from Mongo DB.", 
        GitHub: "https://github.com/yojengrover/GasNGo", 
        techUsed:"ReactJS, Node, GraphQl, MongoDB,CSS, Bootstrap, MaterialUI"
       },{
        id:1,
         name:"My Website",
        desc:"Developed a website to showcase my skills as a Frontend developer using ReactJS", 
        GitHub: "https://github.com/yojengrover/portfolio", 
        techUsed:"ReactJS, Node, CSS, Bootstrap, MaterialUI, Saas"
       },
       {
        id:2,
         name:"Social Media App",
        desc:"Designed Social media web application for developer using React class and functional components. Developed using Udemy course as a reference, in which frontend is designed using bootstrap , CSS and Mongo DB with Node and Express for backend. AXIOS a promise-based HTTP client to fetch data from APIs",   
        GitHub: "https://github.com/yojengrover/SocialMediaApp", 
        techUsed:"ReactJS, Redux, Node, Express, MongoDB,CSS, Bootstrap, MaterialUI"
       },
       {
        id:3,
         name:"Bus Booking app",
        desc:"Designed web application to book bus tickets using React class components. Developed frontend using bootstrap , CSS and Mongo DB with Node and Express for backend. AXIOS a promise-based HTTP client to fetch data from APIs",   
        GitHub: "https://github.com/yojengrover/BusApp_MERN_Stack", 
        techUsed:"ReactJS, Node, Express, GraphQl, MongoDB,CSS, Bootstrap, MaterialUI"
       }];

    return (
    <div><div className='container'>
    <button className='backButton' onClick={backButton}>Back</button>
<div className='row'>
    <div><h3 className='pdList'>{projects[id].name}</h3>
        <h4 className='pdList'>Project Description: {projects[id].desc}</h4>
        <h4 className='pdList'>Tech Stack used: {projects[id].techUsed}</h4>
        <h4 className='pdList'>Github Link: {projects[id].GitHub}</h4>   
        </div>
        </div>
        </div>
        <Footer position={false}/>
        </div>
  )
}

export default ProcjectDetails