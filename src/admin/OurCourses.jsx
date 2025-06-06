import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const url=import.meta.env.VITE_BACKENDURL
function OurCourses() {
  const admin = JSON.parse(localStorage.getItem("admin"));
  const token=admin.token;
  const navigate=useNavigate();

  

   const [courses, setCourses] = useState([]);
   
   const [loading, setLoading] = useState(true);
   if(!token){
    toast.error("Go to login page")
    navigate('/admin/login')
   }

  
   // fetch courses
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`${url}/api/getCourses`, {
          withCredentials: true,
        });
        setCourses(response.data.getCourse);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCourses();
  }, []);

  // delete courses 

  const handleDelete= async(id)=>{
    
    console.log(id);
    try {
     const response= await axios.delete(`${url}/api/delete/${id}`,{
        headers:{
          Authorization:`Bearer ${token}`
        },
        withCredentials:true
      }
    )

    console.log(response.data.message.deleteCourse);
    
    toast.success(response.data.message)

    // ab jo course delete ho gya hai usko hta kr courses dekhao...
    const updateCourses=courses.filter((course)=>course._id!==id)
    setCourses(updateCourses);
      
    } catch (error) {
      // toast.error(error.response.data.messsage)
      // console.log(error.response.data.messsage);
      toast.error(error?.response?.data?.error || "Something went wrong");
     console.log("not from delete",error?.response?.data?.message);

      
    }
  }


  if (loading) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }


  return (


    


    <div className="bg-gray-100 p-8 space-y-4">
    <h1 className="text-3xl font-bold text-center mb-8">Our Courses</h1>
    <Link
      className="bg-orange-400 py-2 px-4 rounded-lg text-white hover:bg-orange-950 duration-300"
      to={"/admin/dashboard"}
    >
      Go to dashboard
    </Link>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {courses.map((course) => (
        <div key={course._id} className="bg-white shadow-md rounded-lg p-4">
          {/* Course Image */}
          <img
            src={course?.image?.url}
            alt={course.title}
            className="h-40 w-full object-cover rounded-t-lg"
          />
          {/* Course Title */}
          <h2 className="text-xl font-semibold mt-4 text-gray-800">
            {course.title}
          </h2>
          {/* Course Description */}
          <p className="text-gray-600 mt-2 text-sm">
            {course.description.length > 200
              ? `${course.description.slice(0, 200)}...`
              : course.description}
          </p>
          {/* Course Price */}
          <div className="flex justify-between mt-4 text-gray-800 font-bold">
            <div>
              {" "}
              ₹{course.price}{" "}
              <span className="line-through text-gray-500">₹300</span>
            </div>
            <div className="text-green-600 text-sm mt-2">10 % off</div>
          </div>

          <div className="flex justify-between">
            <Link
              to={`/admin/update-course/${course._id}`}
              className="bg-orange-500 text-white py-2 px-4 mt-4 rounded hover:bg-blue-600"
            >
              Update
            </Link>
            <button
              onClick={() => handleDelete(course._id)}
              className="bg-red-500 text-white py-2 px-4 mt-4 rounded hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
    
  )
}

export default OurCourses








