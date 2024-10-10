"use client";
import React, {  useState } from "react";
import {
  useStripe,
  useElements,
  Elements,
} from "@stripe/react-stripe-js";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { CardElement,} from "@stripe/react-stripe-js";
import { loadStripe } from '@stripe/stripe-js';

const stripeKey = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

const CheckoutForm = ({
  amount,
  clientSecret,
  paymentIntentId,
}: {
  amount: number;
  clientSecret: string;
  paymentIntentId: string;
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      console.error("Stripe.js hasn't loaded yet.");
      setLoading(false);
      return;
    }
    const { error } = await elements.submit();
    if (error) {
      alert("ERROR")
    } 
    const payment = elements.getElement(CardElement);

    if(!payment){
      return;
    }

    const { error: submitError, paymentMethod } = await stripe.createPaymentMethod({
      card:payment,
      type:'card'
    });

    if (submitError) {
      console.error("Error creating payment method:", submitError);
      setErrorMessage(submitError.message);
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/stripe/confirm-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          paymentIntentId: paymentIntentId,
          paymentMethod: paymentMethod.id,
        }),
      });

      const result = await response.json();
    } catch (error) {
      console.error("Error confirming payment:", error);
      setErrorMessage("An unexpected error occurred. Please try again.");
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement  />
      {errorMessage && <div className="text-red-500 mt-2">{errorMessage}</div>}
      <button
        type="submit"
        disabled={loading || !stripe || !elements}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        {!loading ? `Pay $${amount}` : "Processing..."}
      </button>
    </form>
  );
};

const CheckoutPage = ({
  amount,
  clientSecret,
  paymentIntentId,
  handleClientSecret,
}: {
  amount: number;
  clientSecret: string;
  paymentIntentId: string;
  handleClientSecret: (value: number) => void;
}) => {

  const options = {
    mode: 'payment',
    amount: 1099, // TODO make the amount dynamic 
    currency: 'usd', // this will always be usd
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          className="text-white rounded-full py-2 bg-PrimaryColor"
          onClick={() => handleClientSecret(amount)}
        >
          Top Up ${amount}
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Top Up</DialogTitle>
        <DialogDescription>Complete your payment below.</DialogDescription>
        {clientSecret && (
          <Elements stripe={stripeKey} options={options as any} >
            <CheckoutForm amount={amount} clientSecret={clientSecret} paymentIntentId={paymentIntentId} />
          </Elements>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CheckoutPage;
    // try {
    //   const response = await fetch('/stripe/confirm-payment', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //       paymentIntentId: paymentIntentId,
    //       paymentMethod: paymentMethod.id,
    //     }),
    //   });

    //   const result = await response.json();
    // console.log("RESULTS",result)
    // } catch (error) {
    //   console.error("Error confirming payment:", error);
    //   setErrorMessage("An unexpected error occurred. Please try again.");
    // }