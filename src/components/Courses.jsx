// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import toast from "react-hot-toast";
// import { FaDiscourse, FaDownload } from "react-icons/fa";
// import { IoMdSettings } from "react-icons/io";
// import { IoLogIn, IoLogOut } from "react-icons/io5";
// import { RiHome2Fill } from "react-icons/ri";
// import { HiMenu, HiX } from "react-icons/hi";
// import { Link } from "react-router-dom";
// import { FiSearch } from "react-icons/fi";

// function Courses() {
//   const [courses, setCourses] = useState([]);
//   const [isLoggIn, setIsLoggIn] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

//   // Prevent scrolling when sidebar is open on mobile
//   useEffect(() => {
//     document.body.style.overflow = isSidebarOpen ? "hidden" : "auto";
//   }, [isSidebarOpen]);

//   // Token check
//   useEffect(() => {
//     const token = localStorage.getItem("user");
//     setIsLoggIn(!!token);
//   }, []);

//   // Fetch courses
//   useEffect(() => {
//     const fetchCourses = async () => {
//       try {
//         const response = await axios.get("http://localhost:8000/api/getCourses", {
//           withCredentials: true,
//         });
//         setCourses(response.data.getCourse);
//         setLoading(false);
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     fetchCourses();
//   }, []);

//   // Logout
//   const handleLogout = async () => {
//     try {
//       const response = await axios.get("http://localhost:8000/user/logout", {
//         withCredentials: true,
//       });
//       localStorage.removeItem('user');
//       toast.success(response.data.message);
//       setIsLoggIn(false);
//     } catch (error) {
//       // console.log("Error in logout", error);
//       // console.log("error in courses",error.response.data.errors);
    
//       // toast.error(error.response?.data?.message || "Error in logout in course section");
//       toast.error(error.response.data.message || "Error in logout in course section");
//     }
//   };

//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };

//   return (
//     <div className="flex h-screen overflow-hidden">
//       {/* Mobile Sidebar Backdrop */}
//       {isSidebarOpen && (
//         <div
//           className="fixed inset-0 bg-black opacity-30 z-40 md:hidden"
//           onClick={toggleSidebar}
//         ></div>
//       )}

//       {/* Sidebar */}
//       <div
//         className={`z-50 md:fixed md:inset-y-0 md:left-0 bg-gray-100 p-5 transform ${
//           isSidebarOpen ? "translate-x-0" : "-translate-x-full"
//         } md:translate-x-0 transition-transform duration-300 ease-in-out w-64`}
//       >
//         <nav>
//           <ul className="mt-16 md:mt-0">
//             <li className="mb-4">
//               <Link to="/" className="flex items-center">
//                 <RiHome2Fill className="mr-2" /> Home
//               </Link>
//             </li>
//             <li className="mb-4">
//               <a href="#" className="flex items-center text-blue-500">
//                 <FaDiscourse className="mr-2" /> Courses
//               </a>
//             </li>
//             <li className="mb-4">
//               <Link to="/purchases" className="flex items-center">
//                 <FaDownload className="mr-2" /> Purchases
//               </Link>
//             </li>
//             <li className="mb-4">
//               <Link to="/settings" className="flex items-center">
//                 <IoMdSettings className="mr-2" /> Settings
//               </Link>
//             </li>
//             <li>
//               {isLoggIn ? (
//                 <button onClick={handleLogout} className="flex items-center">
//                   <IoLogOut className="mr-2" /> Logout
//                 </button>
//               ) : (
//                 <Link to="/login" className="flex items-center">
//                   <IoLogIn className="mr-2" /> Login
//                 </Link>
//               )}
//             </li>
//           </ul>
//         </nav>
//       </div>

//       {/* Sidebar Toggle Button (Mobile) */}
//       <button
//         className="fixed top-4 left-4 z-50 md:hidden bg-blue-600 text-white p-2 rounded-lg"
//         onClick={toggleSidebar}
//       >
//         {isSidebarOpen ? (
//           <HiX className="text-2xl" />
//         ) : (
//           <HiMenu className="text-2xl" />
//         )}
//       </button>

//       {/* Main Content */}
//       <div className="flex-1 p-8 bg-gray-50 md:ml-64 transition-all duration-300">
//         <h2 className="text-xl font-semibold mt-6 md:mt-0 mb-6">Courses</h2>

//         {/* Loading */}
//         {loading && <p>Loading courses...</p>}

//         {courses.length > 0 ? (
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//             {courses.map((course, index) => (
//               <div
//                 key={index}
//                 className="bg-white rounded-lg shadow-md p-6 mb-6"
//               >
//                 <div className="flex flex-col items-center space-y-4">
//                   <img
//                     className="rounded-lg w-full h-48 object-cover"
//                     src={course.image?.url || "https://via.placeholder.com/200"}
//                     alt={course.title}
//                   />
//                   <div className="text-center">
//                     <h3 className="text-lg font-bold">{course.title}</h3>
//                     <p className="text-gray-500">
//                       {course.description?.length > 100
//                         ? `${course.description.slice(0, 100)}...`
//                         : course.description}
//                     </p>
//                     <span className="text-green-700 font-semibold text-sm">
//                       ₹ {course.price} only
//                     </span>

//                     <Link
//                       to={`/buy/${course._id}`}
//                       className="block mt-3 bg-orange-500 w-full text-white px-4 py-2 rounded-lg hover:bg-blue-900 duration-300"
//                     >
//                       Buy Now
//                     </Link>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         ) : (
//           !loading && <p className="text-gray-500">No courses available.</p>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Courses;




import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { FaDiscourse, FaDownload } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { IoLogIn, IoLogOut } from "react-icons/io5";
import { RiHome2Fill } from "react-icons/ri";
import { HiMenu, HiX } from "react-icons/hi";
import { Link } from "react-router-dom";
const url=import.meta.env.VITE_BACKENDURL
function Courses() {
  const [courses, setCourses] = useState([]);
  const [isLoggIn, setIsLoggIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isSidebarOpen ? "hidden" : "auto";
  }, [isSidebarOpen]);

  useEffect(() => {
    const token = localStorage.getItem("user");
    setIsLoggIn(!!token);
  }, []);

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

  const handleLogout = async () => {
    try {
      const response = await axios.get(`${url}/user/logout`, {
        withCredentials: true,
      });
      localStorage.removeItem('user');
      toast.success(response.data.message);
      setIsLoggIn(false);
    } catch (error) {
      toast.error(error.response?.data?.message || "Error in logout in course section");
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen">
      {/* Mobile Sidebar Backdrop */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-30 z-40 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`z-50 md:fixed md:inset-y-0 md:left-0 bg-gray-100 p-5 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-300 ease-in-out w-64`}
      >
        <nav>
          <ul className="mt-16 md:mt-0">
            <li className="mb-4">
              <Link to="/" className="flex items-center">
                <RiHome2Fill className="mr-2" /> Home
              </Link>
            </li>
            <li className="mb-4">
              <a href="#" className="flex items-center text-blue-500">
                <FaDiscourse className="mr-2" /> Courses
              </a>
            </li>
            <li className="mb-4">
              <Link to="/purchases" className="flex items-center">
                <FaDownload className="mr-2" /> Purchases
              </Link>
            </li>
            <li className="mb-4">
              <Link to="/settings" className="flex items-center">
                <IoMdSettings className="mr-2" /> Settings
              </Link>
            </li>
            <li>
              {isLoggIn ? (
                <button onClick={handleLogout} className="flex items-center">
                  <IoLogOut className="mr-2" /> Logout
                </button>
              ) : (
                <Link to="/login" className="flex items-center">
                  <IoLogIn className="mr-2" /> Login
                </Link>
              )}
            </li>
          </ul>
        </nav>
      </div>

      {/* Sidebar Toggle Button (Mobile) */}
      <button
        className="fixed top-4 left-4 z-50 md:hidden bg-blue-600 text-white p-2 rounded-lg"
        onClick={toggleSidebar}
      >
        {isSidebarOpen ? (
          <HiX className="text-2xl" />
        ) : (
          <HiMenu className="text-2xl" />
        )}
      </button>

      {/* Main Content Scrollable */}
      <div className="flex-1 h-screen overflow-y-auto bg-gray-50 md:ml-64 p-4">
        <h2 className="text-xl font-semibold mt-6 md:mt-0 mb-6">Courses</h2>

        {loading && <p>Loading courses...</p>}

        {courses.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pb-10">
            {courses.map((course, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md p-6 flex flex-col"
              >
                <img
                  className="rounded-lg w-full h-48 object-cover mb-4"
                  src={course.image?.url || "https://via.placeholder.com/200"}
                  alt={course.title}
                />
                <h3 className="text-lg font-bold">{course.title}</h3>
                <p className="text-gray-500 mb-2">
                  {course.description?.length > 100
                    ? `${course.description.slice(0, 100)}...`
                    : course.description}
                </p>
                <span className="text-green-700 font-semibold text-sm mb-2">
                  ₹ {course.price} only
                </span>
                <Link
                  to={`/buy/${course._id}`}
                  className="mt-auto bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-blue-900 duration-300 text-center"
                >
                  Buy Now
                </Link>
              </div>
            ))}
          </div>
        ) : (
          !loading && <p className="text-gray-500">No courses available.</p>
        )}
      </div>
    </div>
  );
}

export default Courses;



