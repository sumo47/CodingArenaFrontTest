import React from "react";

import ProgressBar from "@ramonak/react-progress-bar";
import { Link } from "react-router-dom";
import "./profile.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function Profile() {
	const navigate = useNavigate();

	const handleLogout = () => {
		// Remove the JWT token from localStorage
		localStorage.removeItem("jwtToken");
		console.log("Logged Out");
		// Redirect the user to the login page or any other page as needed
		navigate("/");
	};

	

	return (
		<div className='profilecontainer'>
			<nav
				id='sidebar'
				className='col-md-3 col-lg-2 d-md-block bg-light sidebar'>
				<div className='position-sticky'>
					<ul className='nav flex-column profilesidebar'>
						<li className='nav-item'>
							<a className=' sidebaropt'>Edit Profile</a>
						</li>
						<li className='nav-item'>
							<a className=' sidebaropt'>My Courses</a>
						</li>
						<li className='nav-item'>
							<a className=' sidebaropt'>Wishlist</a>
						</li>
						<li className='nav-item'>
							<a className=' sidebaropt'>My Cart</a>
						</li>
						<li className='nav-item'>
							<a className=' sidebaropt'>Notifications</a>
						</li>
						<li className='nav-item'>
							<a className=' sidebaropt'>Tests</a>
						</li>
						<li className='nav-item'>
							<a className=' sidebaropt' onClick={handleLogout}>
								Logout
							</a>
						</li>
					</ul>
				</div>
			</nav>
			<div className='container'>
				<div className='id-photo my-4'>
					<div
						className='text-center mt-4'
						style={{ width: "120px", height: "120px", margin: "0 auto" }}>
						<img src='./images/profile.webp' alt='' />
					</div>
				</div>

				<div class='container' style={{ width: "400px" }}>
					<div class='row statbox'>
						<div class='col stats'>
							<h2 className='profilestats'>Courses</h2>
						</div>
						<div class='col stats'>
							<h2 className='profilestats'>Points</h2>
						</div>
						<div class='col stats'>
							<h2 className='profilestats'>Tests</h2>
						</div>
					</div>
					<div class='row statbox align-items-center justify-content-center'>
						<div class='col '>
							<p>0</p>
						</div>
						<div class='col  '>
							<p>0</p>
						</div>
						<div class='col  '>
							<p>0</p>
						</div>
					</div>
				</div>
               



				<h2
					style={{
						marginLeft: "270px",
						color: "#a11afe",
						fontSize: "25px",
						fontWeight: "600",
						marginTop: "16px",
						marginBottom: "10px",
					}}>
					My Progress
				</h2>
				<div className='id-course mt-2 position-relative'>
					
				</div>
			</div>
		</div>
	);
}

export default Profile;
