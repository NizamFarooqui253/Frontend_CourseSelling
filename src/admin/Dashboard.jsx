import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
const url=import.meta.env.VITE_BACKENDURL
function Dashboard() {

  const handleLogout = async () => {
    try {
      console.log(localStorage);

      const response = await axios.get(`${url}/admin/logout`, {
        withCredentials: true,
      });
      console.log("console in Home",response);
      localStorage.removeItem('admin');

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
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-100 p-5">
        <div className="flex items-center flex-col mb-10">
          <img src="/logo.png" alt="Profile" className="rounded-full h-20 w-20" />
          <h2 className="text-lg font-semibold mt-4">I'm Admin</h2>
        </div>
        <nav className="flex flex-col space-y-4">
          <Link to="/admin/our-courses">
            <button className="w-full bg-green-700 hover:bg-green-600 text-white py-2 rounded">
              Our Courses
            </button>
          </Link>
          <Link to="/admin/create-course">
            <button className="w-full bg-orange-500 hover:bg-blue-600 text-white py-2 rounded">
              Create Course
            </button>
          </Link>
          <Link to="/">
            <button className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded">
              Home
            </button>
          </Link>
          <Link onClick={handleLogout} to="/admin/login">
            <button className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded">
              Logout
            </button>
          </Link>
        </nav>
      </div>
      <div className="flex h-screen items-center justify-center ml-[40%]">
        Welcome!!!
      </div>
    </div>
  );
}

export default Dashboard;

