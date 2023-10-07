
import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

function UpdateCourse({ onUpdate }) {
  const [selectedCourseTitle, setSelectedCourseTitle] = useState("");
  const [courseData, setCourseData] = useState({
    instructor: "",
    title: "",
    description: "",
    price: "",
  });
  const [courseList, setCourseList] = useState([]);

  useEffect(() => {
    // Fetch the list of courses from the server when the component mounts
    axios
      .get("https://coding-arena-backend.glitch.me/allcourses")
      .then((response) => {
        setCourseList(response.data);
      })
      .catch((error) => {
        console.error("Error fetching courses:", error);
      });
  }, []);

  

  const handleSelectChange = (e) => {
    const selectedCourseTitle = e.target.value;
    setSelectedCourseTitle(selectedCourseTitle);

    // Fetch the selected course's details when a course is selected
    axios
      .get(`https://coding-arena-backend.glitch.me/allcourses/${selectedCourseTitle}`)
      .then((response) => {
        // Set the course data in the form
        const course = response.data.data;
        setCourseData({
          instructor: course.cname,
          title: course.title,
          description: course.description,
          price: course.price,
        });
      })
      .catch((error) => {
        console.error("Error fetching course details:", error);
      });
  };
  //notifications
  const showMessage = (text, isError = false) => {
    toast.info(text, {
      autoClose: 6000,
      className: isError ? "toast-error" : "toast-success",
    });
    console.log(text);
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    // Prepare the updated course data
    const updatedCourse = {
      cname: courseData.cname,
      title: courseData.title,
      description: courseData.description,
      price: courseData.price,
    };

    // Send an HTTP request to update the course based on the selected title
    axios
      .post(
        `https://coding-arena-backend.glitch.me/updatecourse/${selectedCourseTitle}`,
        updatedCourse
      )
      .then((response) => {
        if (response.data.success) {
         console.log("Course Updated")
         showMessage('Course updated successfully');
          // Course updated successfully
          onUpdate(); // You can define this callback to perform any additional actions
         
        } else {
          // Handle errors or display an error message
        }
      })
      .catch((error) => {
        console.error("Error updating course:", error);
      });
  };

  return (
    <>
      <h2 className="createcoursehead">Update Course</h2>
      <form onSubmit={handleUpdate}>
        <div className="mb-3">
          <label htmlFor="courseTitle" className="form-label">
            Select a course to Update
          </label>
          <select
            id="courseTitle"
            name="courseTitle"
            className="form-select"
            value={selectedCourseTitle}
            onChange={handleSelectChange}
            required
          >
            <option value="" disabled>
              Select a course
            </option>
            {courseList.map((course) => (
              <option
                key={course._id}
                value={course.title}
                style={{ fontSize: "18px", fontWeight: "600" }}
              >
                {course.title}
              </option>
            ))}
          </select>
        </div>

        {/* Conditional rendering of course update fields */}
        {selectedCourseTitle && (
          <div>
            {/* Input fields for updating course details */}
            <div className="mb-3">
              <label htmlFor="instructor" className="createcourselabel">
                Instructor
              </label>
              <input
                type="text"
                className="form-control"
                id="instructor"
                name="instructor"
                value={courseData.instructor}
                required
                placeholder="Update Instructor Name"
                onChange={(e) =>
                  setCourseData({ ...courseData, instructor: e.target.value })
                }
              />
            </div>

            <div className="mb-3">
              <label htmlFor="title" className="createcourselabel">
                Title
              </label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                value={courseData.title}
                required
                placeholder="Update Course Title"
                onChange={(e) =>
                  setCourseData({ ...courseData, title: e.target.value })
                }
              />
            </div>

            <div className="mb-3">
              <label htmlFor="description" className="createcourselabel">
                Description
              </label>
              <textarea
                className="form-control"
                id="description"
                name="description"
                value={courseData.description}
                required
                placeholder="Update Description"
                onChange={(e) =>
                  setCourseData({ ...courseData, description: e.target.value })
                }
              ></textarea>
            </div>

            <div className="mb-3">
              <label htmlFor="price" className="createcourselabel">
                Price
              </label>
              <input
                type="number"
                className="form-control"
                id="price"
                name="price"
                value={courseData.price}
                required
                placeholder="Update Price"
                onChange={(e) =>
                  setCourseData({ ...courseData, price: e.target.value })
                }
              />
            </div>

            <button type="submit" className="coursebtn">
              Update Course
            </button>
          </div>
        )}
      </form>
      <ToastContainer/>
    </>
  );
}

export default UpdateCourse;
