import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
const stripePromise = loadStripe("pk_test_51RF7da2KwMt4cWgWv7NxOn57l6SpvXlvvMvG4gCR81CKDkdbYkNypvpodp5k6foJ3KOhmzFhbkjwN09dtCHUckji0089b9K5rZ");
createRoot(document.getElementById('root')).render(
 



<Elements  stripe={stripePromise}>
<BrowserRouter>
  <App />
  </BrowserRouter>
</Elements>
    
  
)
