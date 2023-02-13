import React, {useState} from 'react'
import Header from '../Header/Header'
import ProcjectDetails from '../ProcjectDetails/ProcjectDetails';
import './Projects.css';
function Projects() {

  const [check, setDetails] = useState(true);
  const [id,setID] = useState(0);

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


  const viewProject = (name) => {
    setID(name)
    setDetails(false)
  }

  console.log(check);


  return (
    <div><Header ns={3} />
    <div>{ check && <div class="row row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-2 row-cols-xl-4">
    {projects.map((tech) => ( 
    <div className='myCards'>
    <div className='cardBody'>
     <div class="card">
       <div class="card-body"> 
         <div className='carSpace'>
         <h5 class="card-title">{tech.name}</h5>
         </div>
         <a href="#" class="btn btn-primary" onClick={() => viewProject(tech.id)}>View Details</a>
       </div>
       </div>
     </div>
     </div>
    ))}
    </div>} 
    
    { !check && <ProcjectDetails projectID = {id} backButton = {setDetails}/>}
    </div>
    </div>
  )
}

export default Projects