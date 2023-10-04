import React, { useState } from "react";
import './profile.css'

function Admin() {
  const [courseData, setCourseData] = useState({
    name: "",
    title: "",
    description: "",
    price: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseData({ ...courseData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setCourseData({ ...courseData, image: file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a FormData object to send the form data including the image file
    const formData = new FormData();
    formData.append("name", courseData.name);
    formData.append("title", courseData.title);
    formData.append("description", courseData.description);
    formData.append("price", courseData.price);
    formData.append("image", courseData.image);

    try {
       await fetch('https://coding-arena-backend.glitch.me/upload',{
      method: 'POST',
      body: formData    
      
  })
      
  } catch (error) {
      console.error('Error uploading Image:',error);
      
  }

  };

  return (
    <div className=" ">
      <div className="flex ">
        {/* Sidebar */}
        <nav
          id="sidebar2"
          className="col-md-3 col-lg-2 d-md-block bg-light sidebar"
        >
          <div className="position-sticky">
            <ul className="nav flex-column">
              {/* Sidebar items */}
              <li className="nav-item">
                <a className="sidebaropt" href="/#">
                  Dashboard
                </a>
              </li>
              <li className="nav-item">
                <a className="sidebaropt active" href="/#">
                  Create Course
                </a>
              </li>
              <li className="nav-item">
                <a className="sidebaropt" href="/#">
                  Manage Courses
                </a>
              </li>
             
            </ul>
          </div>
        </nav>

        {/* Main content */}
        <div className="container">
          <h2>Create Course</h2>
          
          <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={courseData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={courseData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            value={courseData.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="price" className="form-label">
            Price
          </label>
          <input
            type="number"
            className="form-control"
            id="price"
            name="price"
            value={courseData.price}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="image" className="form-label">
            Course Image
          </label>
          <input
            type="file"
            className="form-control"
            id="image"
            name="image"
            onChange={handleImageChange}
            accept="image/*"
            required
          />
        </div>
        <button type="submit" className="btn ">
          Create Course
        </button>
      </form>
          
        </div>
      </div>
    </div>
  );
}

export default Admin;



