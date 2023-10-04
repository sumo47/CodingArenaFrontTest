import  { useState ,useEffect } from "react";
import { useNavigate} from "react-router-dom";
import axios from "axios";

import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import CourseListCard from "./CourseListCard";
import CourseContent from "../coursecontent/CourseContent"

const CourseList = () => {
  
 const navigate = useNavigate();
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // Fetch available courses from the server
    axios.get('http://localhost:3001/courses')
      .then((response) => {
        setCourses(response.data);
      })
      .catch((error) => {
        console.error('Error fetching courses:', error);
      });
  }, []);

  
  const [selectedCourse, setSelectedCourse] = useState(null);


  const handleCardClick = (id,title, image,price) => {
    setSelectedCourse({ id,title, image,price});
    navigate('/coursecontent', { state: { course: {id, title, image,price } } });
  }
  
  
   return (
    <>
    
    <div className=" courses  mx-auto w-10/12" id="course"  >


      <center>
        <h1  style={{color:'#a11afe',fontWeight:'800',marginTop:'35px',fontSize:'32px'}}>
          Explore Our Top Courses </h1>
          </center>

      <div className="cards flex justify-center my-4 flex-wrap  md:flex-row flex-col items-center ">

{/* to render course cards */}

      {courses.map((course) => (
          <CourseListCard
          key={course.id}
          id={course.id}
          image={course.image}
            title={course.title}
            price={course.price}
            onClick={() => handleCardClick(course.id,course.title, course.image,course.price)}
            
          />
        ))}

         {selectedCourse && (  
        <CourseContent
        key={selectedCourse.id}
        id={selectedCourse.id}
          title={selectedCourse.title}
          image={selectedCourse.image}
          price={selectedCourse.price}
         
        />
        
      )}
         
      

      </div>
    </div>
    </>
  );
};

export default CourseList;
