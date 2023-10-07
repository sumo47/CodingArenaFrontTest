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
    axios.get('http://localhost:3001/allcourses')
      .then((response) => {
        setCourses(response.data);
      })
      .catch((error) => {
        console.error('Error fetching courses:', error);
      });
  }, []);

  
  const [selectedCourse, setSelectedCourse] = useState(null);


  const handleCardClick = (id,cname,title,price,description) => {
    setSelectedCourse({ id,cname,title,price,description});
    navigate('/coursecontent', { state: { course: {id,cname,title,price,description } } });
  }

   return (
    <>
    
    <div className=" courses  mx-auto w-10/12" id="course"  >


      <center>
        <h1  style={{color:'#a11afe',fontWeight:'800',marginTop:'35px',fontSize:'32px'}}>
          Explore Our Top Courses </h1>
          </center>

      <div className="cards flex justify-center my-4 flex-wrap  md:flex-row flex-col items-center ">



      {courses.map((course) => (
          <CourseListCard
          key={course._id}
          id={course.id}
         
          cname={course.cname}
          title={course.title}
          rating={course.rating}
            price={course.price}
            description={course.description}
            onClick={() => handleCardClick(course.id,course.cname,course.title,course.price,course.description)}
            
          />
        ))}

         {selectedCourse && (  
        <CourseContent
        key={selectedCourse._id}
        id={selectedCourse.id}
        cname={selectedCourse.cname}
          title={selectedCourse.title}
          
          price={selectedCourse.price}
          description={selectedCourse.description}
         
        />
        
      )}
         
        
      

      </div>
     
    </div>
    </>
  );
};

export default CourseList;

