import "./coursecontent.css";


import { ToastContainer} from "react-toastify"; 
import { useEffect, useState } from "react";
import axios from "axios";

import { useLocation } from 'react-router-dom';

export default function CourseContent() {

  const location = useLocation();
  const courseData = location.state?.course || {};
                                                                              
  const [course, setCourse] = useState(null);
  const [cart, setCart] = useState([]);
  const [isAddingToCart, setIsAddingToCart] = useState(false); // Step 1: Add loading state

  

  useEffect(() => {
    // Fetch available courses from the server
    axios
      .get("https://coding-arena-backend.glitch.me/courses")
      .then((response) => {
        setCourse(response.data);
        
      })
      .catch((error) => {
        console.error("Error fetching courses:", error);
      });
  }, []);

  const addToCart = async (courseId) => {
    if (isAddingToCart) {
      return; // Prevent multiple clicks while adding to cart
    }
  
    setIsAddingToCart(true);
  
    try {
      // Check if the course is already in the cart
      if (cart.find((cartItem) => cartItem.id === courseId)) {
        // Course is already in the cart, don't add it again
        return;
      }
  
      // Send an API request to add the selected course to the cart
      const response = await axios.post('https://coding-arena-backend.glitch.me/cart/add', { courseId });
      console.log(response.data.message);
      
      // Update the cart state locally
      setCart([...cart, courseData]);
    } catch (error) {
      console.error('Error adding course to cart:', error);
    } finally {
      setIsAddingToCart(false); // Reset the loading state
    }
  };

  


  return (
    <div className="mainContainer">
      <div className="contentBody">
        <h2 className="coursecontentheading">{courseData.title}
        </h2>

        <div className="tab-container coursetabs1">
          <ul className="nav nav-tabs" id="testTabs" role="tablist">
            <li className="nav-item" role="presentation">
              <a
                className="nav-link active"
                id="test1-tab"
                data-bs-toggle="tab"
                href="#test1"
                role="tab"
                aria-controls="test1"
                aria-selected="true"
              >
                Course Overview
              </a>
            </li>
            <li className="nav-item" role="presentation">
              <a
                className="nav-link "
                id="test2-tab"
                data-bs-toggle="tab"
                href="#test2"
                role="tab"
                aria-controls="test2"
                aria-selected="false"
              >
                Instructor
              </a>
            </li>
            <li className="nav-item" role="presentation">
              <a
                className="nav-link "
                id="test3-tab"
                data-bs-toggle="tab"
                href="#test3"
                role="tab"
                aria-controls="test3"
                aria-selected="false"
              >
                What you'll Learn
              </a>
            </li>
          </ul>
          <div
            className="tab-content"
            id="testTabsContent"
            style={{ maxWidth: "400px" }}
          >
            <div
              className="tab-pane fade show active"
              id="test1"
              role="tabpanel"
              aria-labelledby="test1-tab"
            >
              <h3 className="courseoverview">
                Learn python from the basic and build your own projects.
              </h3>
              <ul className="my-3 coursepoints">
                <li>
                  <i
                    className="fa-solid fa-check fa-beat"
                    style={{ color: "white" }}
                  ></i>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit Lorem
                  ipsum dolor sit, amet consectetur adipisicing elit. Fugiat,
                  quis.
                </li>
                <li>
                  <i
                    className="fa-solid fa-check fa-beat"
                    style={{ color: "white" }}
                  ></i>
                  Lorem, ipsum dolor sit amet consectetur
                </li>
                <li>
                  <i
                    className="fa-solid fa-check fa-beat"
                    style={{ color: "white" }}
                  ></i>
                  Lorem, ipsum dolor sit amet consectetur
                </li>
                <li>
                  <i
                    className="fa-solid fa-check fa-beat"
                    style={{ color: "white" }}
                  ></i>
                  Lorem, ipsum dolor sit amet consectetur
                </li>
              </ul>
            </div>
            <div
              className="tab-pane fade"
              id="test2"
              role="tabpanel"
              aria-labelledby="test2-tab"
            >
              <h3 className="courseoverview">Course Created by : </h3>
              <ul className="my-3 coursepoints">
                <li>
                  <i
                    className="fa-solid fa-chalkboard-user fa-lg "
                    style={{ color: "white" }}
                  ></i>
                  Name of Instructor :{" "}
                </li>
                <li>
                  {" "}
                  <i
                    className="fa-solid fa-calendar fa-lg "
                    style={{ color: "white" }}
                  ></i>
                  Last updated on : dd/mm/yy
                </li>
                <li>
                  {" "}
                  <i
                    className="fa-solid fa-language fa-lg "
                    style={{ color: "white" }}
                  ></i>
                  Language : English
                </li>
              </ul>
            </div>
            <div
              className="tab-pane fade"
              id="test3"
              role="tabpanel"
              aria-labelledby="test3-tab"
            >
              <h3 className="courseoverview">Features</h3>

              <ul className="my-3 coursepoints">
                <li>
                  <i
                    className="fa-solid fa-video fa-lg"
                    style={{ color: "white" }}
                  ></i>
                  On Demand Videos
                </li>
                <li>
                  <i
                    className="fa-solid fa-bullseye fa-lg"
                    style={{ color: "white" }}
                  ></i>
                  Assignments
                </li>
                <li>
                  <i
                    className="fa-solid fa-pen fa-lg"
                    style={{ color: "white" }}
                  ></i>
                  Chapterwise Notes
                </li>
                <li>
                  <i
                    className="fa-solid fa-code fa-lg"
                    style={{ color: "white" }}
                  ></i>
                  Projects with Source Code
                </li>
                <li>
                  <i
                    className="fa-solid fa-trophy fa-lg"
                    style={{ color: "white" }}
                  ></i>
                  Certificate Of Completion
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="courseDesc">
        <div className="courseimage">
          <img src="./images/dev.webp" alt="" />
        </div>
        <div className="desc">
          <div> Course Price : ₹ {courseData.price} </div>

          <div> Course Duration : 3 Months</div>
          <div>Subscribe to Coding Arena's Top Courses</div>
          <div className="cartbutton">
            <button className="b1"
             onClick={() => addToCart(courseData.id)}
             disabled={isAddingToCart}>
               {isAddingToCart ? 'Adding...' : 'Add to Cart'}</button>
            <button className="b2">
              <i class="fa-regular fa-heart"></i>
            </button>
          </div>
        </div>
        
      </div>

      <ToastContainer />
    </div>
  );
}
