import React, { useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = (props) => {
	const [open, setOpen] = useState(false);
	const [navSelected, setnavSelected] = useState(props.ns);
	const handleClick = () => {
		setOpen(!open);
	};

	const closeMenu = () => {
		setOpen(false);
	};

	return (
		<nav className="navbar">
			<div>
				<Link to="/" className="nav-logo">
					<h2>Yojen Grover</h2>
				</Link>
			</div>
			<ul className={open ? 'nav-links active' : 'nav-links'}>
				<li className="nav-item">
					<Link to="/" className={navSelected === 1 ? "nav-link-active-red" : "nav-link"} onClick={closeMenu}>
						Home
					</Link>
				</li>
				<li className="nav-item">
					<Link to="/work" className={navSelected === 2 ? "nav-link-active-red" : "nav-link"} onClick={closeMenu}>
						Work
					</Link>
				</li>
				<li className="nav-item">
					<Link to="/projects" className={navSelected === 3 ? "nav-link-active-red" : "nav-link"} onClick={closeMenu}>
						Projects
					</Link>
				</li>
				{open &&
				<li className="nav-item">
				<Link to="/myapps" className={navSelected === 3 ? "nav-link-active-red" : "nav-link"} onClick={closeMenu}>
					My Apps
				</Link>
				</li>}
			</ul>
			<div className="nav-buttons">
				<div onClick={handleClick} className="nav-icon">
					{open ? <FiX /> : <FiMenu />}
				</div>
				<Link to="/myapps" className ='my-apps-button'>
					My Apps
				</Link>
			</div>
		</nav>

	);
};

export default Header;