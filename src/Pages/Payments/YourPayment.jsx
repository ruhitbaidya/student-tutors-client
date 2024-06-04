
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useSecureApi from "../../Hooks/SecureApi/useSecureApi";
import CheckOut from "./CheckOut";

const stripePromise = loadStripe(import.meta.env.VITE_CLIENT_SECRATE_payment);

// console.log("primise",import.meta.env.VITE_CLIENT_SECRATE_payment)
const YourPayment = () => {
  const price = JSON.parse(localStorage.getItem("price"));
 

  console.log(price)
  const [clientSecret , setClientsec] = useState("");
  const secureApiCall = useSecureApi();
  console.log(price)
  useEffect(()=>{
      secureApiCall.post("/payment-money", {price})
    .then((res)=> setClientsec(res?.data?.clientSecrate))
    .catch((err)=> console.log(err))
  }, [secureApiCall, price])

  if(!clientSecret){
    return;
  }

  const option = {
    clientSecret 
  }
  // console.log(clientsec)
  return (
    <div>
      {
         <Elements options={option} stripe={stripePromise}>
            <CheckOut></CheckOut>
        </Elements>
      }
    </div>
  )
}

export default YourPayment