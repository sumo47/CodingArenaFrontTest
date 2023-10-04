import { useState} from "react";

import { BiSolidUser } from "react-icons/bi";
import { AiFillStar } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";


import "react-toastify/dist/ReactToastify.css";

export default function CourseListCard({image,title,price,onClick}) {
  const [message, setmessage] = useState(false);
  const description = (message) => {
    console.log("description is here ");
    setmessage(true);
    toast(message, {
      position: "bottom-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  

  return (
    <div
      className="card  cursor-pointer  rounded-xl  mx-4 w-11/12 md:w-3/12  shadow-xl border-2 shadow-slate-300 
       hover:shadow-pink-200 p-1 font-bold my-4 "
      onMouseEnter={() => {
        description("Course");
      }}
      onMouseLeave={() => {
        setmessage(false);
      }}
      style={{height:'410px'}}
      onClick={onClick}>
      {message && <ToastContainer />}

      <div className="img-section">
        <img src= {image}

        alt="" className="rounded-xl" />
      </div>

      
      
        <div className="content-section px-2">
          <div className="rating flex justify-between my-2">
            <div className="flex item-center justify-center">
              <p> 12 </p>
              <BiSolidUser className="text-md my-1 mx-1" />
            </div>

            <div className="flex item-center  justify-center ">
              <p> 4.7 </p>
              <AiFillStar className="text-md my-1 mx-1" />
            </div>
          </div>

          <div className="teacher text-center font-bold text-xl my-2 flex  flex-col items-center justify-center ">
            

            <p> Instructor </p>
          </div>

          <div className="heading  text-center font-bold text-md ">
          {title}
          </div>

          <div className="price flex my-4 justify-between" >
            <p className="text-sm">Beginner Friendly </p>
            <p> ₹ {price} </p>
          </div>

        </div>
      
    </div>
  );
}
