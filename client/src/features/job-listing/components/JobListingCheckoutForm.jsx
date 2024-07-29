import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/utils/formatters";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useState } from "react";

export function JobListingCheckoutForm({ amount }) {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState();
  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();

    if (stripe == null || elements == null) return;

    setIsLoading(true);
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/jobs/order-complete`,
      },
    });

    if (error.type === "card_error" || error.type === "validation_error") {
      setErrorMessage(error.message);
    } else {
      setErrorMessage("An unexpected error occurred.");
    }

    setIsLoading(false);
  }

  return (
    <form onSubmit={onSubmit}>
      {errorMessage != null && (
        <p className="text-red-500 dark:text-red-900 text-sm mb-4">
          {errorMessage}
        </p>
      )}
      <PaymentElement />
      <Button
        disabled={isLoading || stripe == null || elements == null}
        className="mt-4 w-full"
      >
        Pay {formatCurrency(amount)}
      </Button>
    </form>
  );
}
