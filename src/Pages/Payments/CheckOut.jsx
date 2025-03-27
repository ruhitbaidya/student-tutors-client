import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useSecureApi from "../../Hooks/SecureApi/useSecureApi";
import { toast, ToastContainer } from "react-toastify";

const CheckOut = () => {
  const infos = JSON.parse(localStorage.getItem("cId"));
  const secureApiCall = useSecureApi();
  const [payMessage, setPaymessage] = useState("");
  const stripes = useStripe();
  const elements = useElements();

  if (payMessage) {
    secureApiCall
      .post("/bookedSession", infos)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    setTimeout(() => {
      localStorage.removeItem("price");
      localStorage.removeItem("cId");
    }, 2000);
    document.getElementById("my_modal_4").showModal();
  }
  useEffect(() => {
    if (!stripes) {
      return;
    }
    const clientsec = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );
    if (!clientsec) {
      return;
    }

    stripes.retrievePaymentIntent(clientsec).then((res) => {
      setPaymessage(res?.paymentIntent);
      if (res?.paymentIntent?.status === "succeeded") {
        toast.success("payment Success");
      }
    });
  }, [stripes]);

  const handelSubmit = async (e) => {
    e.preventDefault();
    if (!stripes || !elements) {
      return;
    }

    const { error } = await stripes.confirmPayment({
      elements,
      confirmParams: {
        return_url: "https://students-tutors.web.app/payment",
      },
    });

    console.log(error);
  };

  //   id,amount,status
  //   const paymentElementOptions = {
  //     layout: "tabs"
  //   }
  return (
    <div className="w-[50%] mx-auto my-[80px]">
      <ToastContainer />
      <form onSubmit={handelSubmit}>
        <PaymentElement />
        <button className="w-full mt-[20px] bg-green-500 text-white rounded-lg py-[12px]">
          Pay Now
        </button>
      </form>
      {payMessage?.paymentIntent?.status === "Success" && (
        <p>Your Payment Success</p>
      )}

      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <dialog id="my_modal_4" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg bg-green-500 text-center text-white rounded-lg py-[5px] mb-[20px]">
            Your Payment Success
          </h3>
          <div>
            <p className="">
              Payment Id : <span className="font-[700]">{payMessage.id}</span>
            </p>
            <p className="">
              Payment Amount:{" "}
              <span className="font-[700]">${payMessage.amount / 100}</span>
            </p>
            <p className="">
              Payment Status :{" "}
              <span className="font-[700]">{payMessage.status}</span>
            </p>
          </div>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn bg-green-600 text-white">Ok</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default CheckOut;
