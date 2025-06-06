// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import toast from "react-hot-toast";
// import { useNavigate, useParams } from "react-router-dom";
// import {} from "@stripe/stripe-js";
// import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
// function Buy() {
//   const { courseId } = useParams();
//   const [loading, setLoading] = useState(false);
//   const token = JSON.parse(localStorage.getItem("user"));
//   // console.log(token);
//   const [course, setCourses] = useState({});
//   const [clientSecret, setClientSecret] = useState("");
//   const [error, setError] = useState("");
//   const stripe = useStripe();
//   const elements = useElements();
//   const [cardError, setCardError] = useState("");

//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchCourseBuyData = async () => {
//       if (!token) {
//         // toast.error("Please Login To purchase the course..");
//         setError("Please Login To purchase the course..");
//       }
//       try {
//         const response = await axios.post(
//           `http://localhost:8000/api/buy/${courseId}`,
//           {},
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//             withCredentials: true,
//           }
//         );
//         console.log(response);
//         //  {} qki agar data nah pahuche backend pr toh ek empty object pahuche
//         setCourses(response.data.course);
//         setClientSecret(response.data.clientSecret);
//         setLoading(false);
//       } catch (error) {
//         setLoading(false);
//         if (error.response.status === 404) {
//           setError("You Have ALready Purchase This Course...");
//           navigate("/purchases");
//         }
//         // toast.error(error.response.data.error);
//         setError(error.response.data.error);
//       }
//     };
//     fetchCourseBuyData();
//   }, [courseId]); // jab jab course id change hogga tabhi ye useeffect chalega

//   const handlePurchase = async (event) => {
//     // Block native form submission.
//     event.preventDefault();

//     if (!stripe || !elements) {
//       console.log("stripe or element not found..");
//       return;
//     }
//     setLoading(true);

//     const card = elements.getElement(CardElement);

//     if (card == null) {
//       console.log("card elemt not found");
//       setLoading(false);

//       return;
//     }

//     const { error, paymentMethod } = await stripe.createPaymentMethod({
//       type: "card",
//       card,
//     });

//     if (error) {
//       console.log("Stripe payemnt Method Error", error);
//       setLoading(false);
//       setCardError(error.message);
//     } else {
//       console.log("[PaymentMethod created]", paymentMethod);
//     }
//     if (!clientSecret) {
//       console.log("No Client Secret Found");
//       setLoading(false);
//       return;
//     }

//     const { paymentIntent, error: confirmError } =
//       await stripe.confirmCardPayment(clientSecret, {
//         payment_method: {
//           card: card,
//           billing_details: {
//             name: user?.user?.firstName,
//             email: user?.user?.email,
//           },
//         },
//       });
//     if (confirmError) {
//       setCardError(confirmError.message);
//     } else if (paymentIntent.status === "succeeded") {
//       console.log("Payment succeeded: ", paymentIntent);
//       setCardError("your payment id: ", paymentIntent.id);
//       const paymentInfo = {
//         email: user?.user?.email,
//         userId: user.user._id,
//         courseId: courseId,
//         paymentId: paymentIntent.id,
//         amount: paymentIntent.amount,
//         status: paymentIntent.status,
//       };
//       console.log("Payment info: ", paymentInfo);
//       toast.message("Payment Successfully")
//       navigate("/purchases");
//     }
//     setLoading(false)
//   };

//   return (
//     <>
//       {error ? (
//         <div className="flex justify-center items-center h-screen">
//           <div className="bg-red-100 text-red-700 px-6 py-4 rounded-lg">
//             <p className="text-lg font-semibold">{error}</p>
//             <Link
//               className="w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 transition duration-200 mt-3 flex items-center justify-center"
//               to={"/purchases"}
//             >
//               Purchases
//             </Link>
//           </div>
//         </div>
//       ) : (
//         <div className="flex flex-col sm:flex-row my-40 container mx-auto">
//           <div className="w-full md:w-1/2">
//             <h1 className="text-xl font-semibold underline">Order Details</h1>
//             <div className="flex items-center text-center space-x-2 mt-4">
//               <h2 className="text-gray-600 text-sm">Total Price</h2>
//               <p className="text-red-500 font-bold">${course.price}</p>
//             </div>
//             <div className="flex items-center text-center space-x-2">
//               <h1 className="text-gray-600 text-sm">Course name</h1>
//               <p className="text-red-500 font-bold">{course.title}</p>
//             </div>
//           </div>
//           <div className="w-full md:w-1/2 flex justify-center items-center">
//             <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-sm">
//               <h2 className="text-lg font-semibold mb-4">
//                 Process your Payment!
//               </h2>
//               <div className="mb-4">
//                 <label
//                   className="block text-gray-700 text-sm mb-2"
//                   htmlFor="card-number"
//                 >
//                   Credit/Debit Card
//                 </label>
//                 <form onSubmit={handlePurchase}>
//                   <CardElement
//                     options={{
//                       style: {
//                         base: {
//                           fontSize: "16px",
//                           color: "#424770",
//                           "::placeholder": {
//                             color: "#aab7c4",
//                           },
//                         },
//                         invalid: {
//                           color: "#9e2146",
//                         },
//                       },
//                     }}
//                   />

//                   <button
//                     type="submit"
//                     disabled={!stripe || loading} // Disable button when loading
//                     className="mt-8 w-full bg-indigo-500 text-white py-2 rounded-md hover:bg-indigo-600 transition duration-200"
//                   >
//                     {loading ? "Processing..." : "Pay"}
//                   </button>
//                 </form>
//                 {cardError && (
//                   <p className="text-red-500 font-semibold text-xs">
//                     {cardError}
//                   </p>
//                 )}
//               </div>

//               <button className="w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 transition duration-200 mt-3 flex items-center justify-center">
//                 <span className="mr-2">🅿️</span> Other Payments Method
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }

// export default Buy;



import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams, Link } from "react-router-dom";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
// import { jwtDecode } from "jwt-decode";
const url=import.meta.env.VITE_BACKENDURL
function Buy() {
  const { courseId } = useParams();
  const [loading, setLoading] = useState(false);
  const [course, setCourse] = useState({});
  const [clientSecret, setClientSecret] = useState("");
  const [error, setError] = useState("");
  const [cardError, setCardError] = useState("");

  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  // const decode_user=jwtDecode(token);
  // console.log("DECODED USER EMAIL...",decode_user.email,decode_user.id);
  
  const token = user.token;


  console.log("user Token ..",user.existUser.email,user.existUser._id);

  useEffect(() => {
    const fetchCourseBuyData = async () => {
      if (!token) {
        setError("Please Login To purchase the course..");
        return;
      }

      try {
        const response = await axios.post(
          `${url}/api/buy/${courseId}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          }
        );

        setCourse(response.data.course);
        setClientSecret(response.data.clientSecret);
        setLoading(false);
        console.log(response);
      } catch (err) {
        setLoading(false);
        if (err.response?.status === 404) {
          // setError("You have already purchased this course.");
          toast.success("You have already purchased this course.");
          navigate("/purchases");
        } else {
          setError(err.response?.data?.error || "Something went wrong.");
        }
      }
    };

    fetchCourseBuyData();
  }, [courseId]);

  const handlePurchase = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setLoading(true);
    setCardError("");

    const card = elements.getElement(CardElement);
    if (!card) {
      setCardError("Card Element not found.");
      setLoading(false);
      return;
    }

    try {
      const { error: methodError, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card,
      });

      if (methodError) {
        setCardError(methodError.message);
        setLoading(false);
        return;
      }

      console.log("PaymentMethod created:", paymentMethod);

      if (!clientSecret) {
        setCardError("Client Secret not found.");
        setLoading(false);
        return;
      }

      const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card,
          billing_details: {
            // name: user?.user?.firstName || "Customer",
            name: user?.existUser?.firstName || "Customer",
            email: user?.existUser?.email || "unknown@example.com",
          },
        },
      });

      if (confirmError) {
        setCardError(confirmError.message);
        setLoading(false);
        return;
      }

      if (paymentIntent.status === "succeeded") {
        // toast.success("Payment Successful!");

        const paymentInfo = {
          email: user?.existUser?.email,    
          userId: user?.existUser?._id,
          courseId,
          paymentId: paymentIntent.id,
          amount: paymentIntent.amount,
          status: paymentIntent.status,
        };

        console.log("PaymentInfo:", paymentInfo);
        await axios.post("",axios.post(
          `${url}/api/order/`,
          paymentInfo,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          }
        )
      ).then((response)=>{
        console.log(response.data);
        toast.error("error in making payment")

      }).catch((error)=>{
        console.log(error);

      })

        
      toast.success("Payment Successful!");
        navigate("/purchases");
      } else {
        setCardError("Payment not successful. Try again.");
      }
    } catch (err) {
      console.error("Payment error:", err);
      setCardError("An unexpected error occurred.");
    }

    setLoading(false);
  };

  return (
    <>
      {error ? (
        <div className="flex justify-center items-center h-screen">
          <div className="bg-red-100 text-red-700 px-6 py-4 rounded-lg">
            <p className="text-lg font-semibold">{error}</p>
            <Link
              className="w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 transition duration-200 mt-3 flex items-center justify-center"
              to={"/purchases"}
            >
              Go to Purchases
            </Link>
          </div>
        </div>
      ) : (
        <div className="flex flex-col sm:flex-row my-40 container mx-auto">
          <div className="w-full md:w-1/2">
            <h1 className="text-xl font-semibold underline">Order Details</h1>
            <div className="flex items-center text-center space-x-2 mt-4">
              <h2 className="text-gray-600 text-sm">Total Price</h2>
              {/* <p className="text-red-500 font-bold">${course.price}</p> */}
              <p className="text-red-500 font-bold">${course?.price || 0}</p>

              
            </div>
            <div className="flex items-center text-center space-x-2">
              <h1 className="text-gray-600 text-sm">Course name</h1>
              <p className="text-red-500 font-bold">{course?.title || "Loading..."}</p>
            </div>
          </div>

          <div className="w-full md:w-1/2 flex justify-center items-center">
            <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-sm">
              <h2 className="text-lg font-semibold mb-4">Process your Payment!</h2>
              <form onSubmit={handlePurchase}>
                <label className="block text-gray-700 text-sm mb-2">
                  Credit/Debit Card
                </label>
                <CardElement
                  options={{
                    style: {
                      base: {
                        fontSize: "16px",
                        color: "#424770",
                        "::placeholder": {
                          color: "#aab7c4",
                        },
                      },
                      invalid: {
                        color: "#9e2146",
                      },
                    },
                    hidePostalCode: true,
                  }}
                />
                <button
                  type="submit"
                  disabled={!stripe || loading}
                  className="mt-8 w-full bg-indigo-500 text-white py-2 rounded-md hover:bg-indigo-600 transition duration-200"
                >
                  {loading ? "Processing..." : "Pay"}
                </button>
              </form>
              {cardError && (
                <p className="text-red-500 font-semibold text-xs mt-2">
                  {cardError}
                </p>
              )}
              <button className="w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 transition duration-200 mt-3 flex items-center justify-center">
                <span className="mr-2">🅿️</span> Other Payment Methods
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Buy;
