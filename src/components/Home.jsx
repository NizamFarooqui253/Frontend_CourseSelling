

import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';
import axios from 'axios';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import toast from 'react-hot-toast';
const url=import.meta.env.VITE_BACKENDURL
function Home() {
  const [courses, setCourses] = useState([]);
  const [isLoggIn, setIsLoggIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("user");
    setIsLoggIn(!!token);
  }, []);

  const handleLogout = async () => {
    try {
      console.log(localStorage);
      const response = await axios.get(`${url}/user/logout`, {
        withCredentials: true,
      });
      console.log("console in Home",response);
      localStorage.removeItem('user');

      toast.success(response.data.message);
      setIsLoggIn(false);
      // localStorage.clear(); // 🔐 Clear all localStorage (including jwt)
      

      navigate("/");
    } catch (error) {
      // toast.error(error.response?.data?.message || "Error in logout");
      toast.error(error.response.data.message || "Error in logout");
      console.log("Logout error home:", error);
    }
  };

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`${url}/api/getCourses`, {
          withCredentials: true,
        });
        setCourses(response.data.getCourse);
      } catch (error) {
        console.log("Error fetching courses:", error);
      }
    };
    fetchCourses();
  }, []);

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  };

  return (
    <div className='bg-gradient-to-r from-black to-blue-950'>
      <div className='min-h-screen text-white'>

        {/* Navbar */}
        <header className='flex items-center justify-between p-4'>
          <div className='flex items-center space-x-2'>
            <img src="/logo.png" alt="CourseHeaven Logo" className='h-12 w-12 rounded-full' />
            <h1 className='text-2xl text-orange-500 font-bold'>CourseHeaven</h1>
          </div>

          <div className='space-x-2 flex'>
            {isLoggIn ? (
              <button onClick={handleLogout} className='bg-transparent text-white py-2 px-4 border border-white rounded'>Logout</button>
            ) : (
              <>
              <Link to="/admin/signup" className='bg-transparent text-white py-2 px-4 border border-white rounded'> Go to admin</Link>
                <Link to="/login" className='bg-transparent text-white py-2 px-4 border border-white rounded'>User Login</Link>
                <Link to="/signup" className='bg-transparent text-white py-2 px-4 border border-white rounded'>User Signup</Link>
              </>
            )}
          </div>
        </header>

        {/* Hero Section */}
        <section className='text-center py-20'>
          <h1 className='text-4xl font-semibold text-orange-500'>CourseHeaven</h1>
          <p className='text-gray-400 mt-2'>Sharpen your skills with courses created by experts.</p>
          <div className='space-x-4 mt-8'>
            <Link to="/courses" className='bg-green-500 px-6 py-3 text-white rounded font-semibold hover:bg-white hover:text-black duration-300'>Explore Courses</Link>
            <a
              href="https://www.youtube.com/@GcAnishyt"
              target="_blank"
              rel="noopener noreferrer"
              className='bg-white px-6 py-3 text-black rounded font-semibold hover:bg-green-500 hover:text-black duration-300'
            >
              Courses Video
            </a>
          </div>
        </section>

        {/* Courses Slider */}
        <section className='p-4'>
          {courses.length === 0 ? (
            <p className='text-center text-white'>Loading courses...</p>
          ) : (
            <Slider {...settings}>
              {courses.map((course) => (
                <div key={course._id} className='p-4'>
                  <div className="relative flex-shrink-0 w-full transition-transform duration-300 transform hover:scale-105">
                    <div className="bg-gray-900 rounded-lg overflow-hidden">
                      <img className='h-32 sm:h-40 md:h-48 w-full object-contain' src={course.image.url} alt={course.title} />
                      <div className='p-6 text-center'>
                        <h2 className='text-xl font-bold text-white'>{course.title}</h2>
                        <button className="mt-4 bg-orange-500 text-white py-2 px-4 rounded-full hover:bg-blue-500 duration-300">
                          Enroll Now
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          )}
        </section>

        <hr className='my-6 border-gray-600' />

        {/* Footer */}
        <footer className='mt-8 p-4'>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left'>
            {/* Left */}
            <div>
              <div className='flex items-center justify-center md:justify-start space-x-2'>
                <img src="/logo.png" alt="CourseHeaven Logo" className='h-12 w-12 rounded-full' />
                <h1 className='text-2xl text-orange-500 font-bold'>CourseHeaven</h1>
              </div>
              <div className='mt-4'>
                <p className='mb-2'>Follow us</p>
                <div className='flex justify-center md:justify-start space-x-4 mt-3'>
                  <a href="#"><FaFacebook className='hover:text-blue-600 text-2xl' /></a>
                  <a href="#"><FaInstagram className='hover:text-pink-600 text-2xl' /></a>
                  <a href="#"><FaTwitter className='hover:text-blue-600 text-2xl' /></a>
                </div>
              </div>
            </div>

            {/* Center */}
            <div>
              <h3 className='text-lg font-semibold mb-4'>Connects</h3>
              <ul className='space-y-2 text-gray-400'>
                <li className='hover:text-white cursor-pointer'>Youtube</li>
                <li className='hover:text-white cursor-pointer'>Telegram</li>
                <li className='hover:text-white cursor-pointer'>Github</li>
              </ul>
            </div>

            {/* Right */}
            <div>
              <h3 className='text-lg font-semibold mb-4'>Copyright © 2025</h3>
              <ul className='space-y-2 text-gray-400'>
                <li className='hover:text-white cursor-pointer'>Terms & Conditions</li>
                <li className='hover:text-white cursor-pointer'>Privacy & Policy</li>
                <li className='hover:text-white cursor-pointer'>Refund & Cancellation</li>
              </ul>
            </div>
          </div>
        </footer>

      </div>
    </div>
  );
}

export default Home;

