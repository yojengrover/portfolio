import React from 'react'
import './Footer.css';
function Footer(props) {
  return (
    <footer className={props.position?"footer":"footer"}>
    <div class="container">       
    <div class="row mb-5">
      <div class="col-md-4">
        <div class="site-logo">
          <a href="#">Contact</a>
          
        </div>
      </div>
      <div class="col-md-8 text-md-right">
        <ul class="list-unstyled social-icons">
          <li><a href="#" class="fb"><span class="icon-facebook"></span></a></li>
          <li><a href="#" class="tw"><span class="icon-twitter"></span></a></li>
        </ul>
      </div>
    </div>

    <div class="row mb-5">
      <div class="col-md-6 ">
        <ul class="nav-links list-unstyled nav-left">
          <li><span>yojen.grover@gmail.com</span></li>
        </ul>
      </div>
    </div>
    <div class="row">
      <div class="col ">
        <div class="copyright">
          <p><small>Developed by Yojen Grover. Beta Version 0.1</small></p>
        </div>
      </div>
    </div>
  
</div></footer>
  )
}

export default Footer