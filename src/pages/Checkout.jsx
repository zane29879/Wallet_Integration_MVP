import PaymentMethodSelection from "../components/checkout/PaymentMethodSelector";

export default function Checkout() {
  return (
    <div className="w-ful flex items-center justify-center px-4 py-12">
      <PaymentMethodSelection />
    </div>
  );
}
