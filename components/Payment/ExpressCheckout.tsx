"use client";
import React, { useEffect, useState } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
  Elements,
} from "@stripe/react-stripe-js";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { loadStripe, StripeElementsOptions } from "@stripe/stripe-js";

const stripePromise = loadStripe(
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

    const { error: submitError, paymentMethod } = await stripe.createPaymentMethod({
      elements,
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
      <PaymentElement />
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
  const options: StripeElementsOptions = {
    clientSecret: clientSecret,
    appearance: {
      theme: "stripe",
    },
  };

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
          <Elements stripe={stripePromise} options={options}>
            <CheckoutForm amount={amount} clientSecret={clientSecret} paymentIntentId={paymentIntentId} />
          </Elements>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CheckoutPage;
