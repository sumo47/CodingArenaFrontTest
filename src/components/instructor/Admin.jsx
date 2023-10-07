

import  { useState } from "react";
import "../profile/profile.css";
import jwtDecode from "jwt-decode";
import { Link } from "react-router-dom";
import CreateCourse from "./CreateCourse";
import UpdateCourse from "./UpdateCourse";
import ManageCourse from "./ManageCourse";

function Admin() {
	const [content, setContent] = useState("createCourse"); // Default content is the dashboard

	// Function to switch content based on sidebar link click
	const switchContent = (newContent) => {
		setContent(newContent);
	};

	return (
		<div className=' '>
			<div className='flex ' >
				{/* Sidebar */}
				<nav
					id='sidebar2'
					className='col-md-3 col-lg-2 d-md-block bg-light sidebar'
					style={{width:'250px'}}>
					<div className='position-sticky'>
						<ul className='nav flex-column'>
							<li className='nav-item' style={{ cursor: "pointer" }}>
								<a
									className={`sidebaropt ${
										content === "createCourse" ? "active" : ""
									}`}
									onClick={() => switchContent("createCourse")}>
									Create Course
								</a>
							</li>
							<li className='nav-item' style={{ cursor: "pointer" }}>
								<a
									className={`sidebaropt ${
										content === "updateCourse" ? "active" : ""
									}`}
									onClick={() => switchContent("updateCourse")}>
									Update Course
								</a>
							</li>
							<li className='nav-item' style={{ cursor: "pointer" }}>
								<a
									className={`sidebaropt ${
										content === "manageCourse" ? "active" : ""
									}`}
									onClick={() => switchContent("manageCourse")}>
									Manage Courses
								</a>
							</li>
						</ul>
					</div>
				</nav>

				{/* Main content */}
				<div className='container'>
					{content === "createCourse" && <CreateCourse />}
					{content === "updateCourse" && <UpdateCourse />}
					{content === "manageCourse" && <ManageCourse />}
				</div>
			</div>
		</div>
	);
}

export default Admin;
