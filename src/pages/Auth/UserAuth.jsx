import { useState } from "react";
import { useLocation } from "react-router-dom";
import AuthForm from "../../components/auth/AuthForm/UserAuthForm";
import FeatureComboBox from "../../components/auth/FeatureComboBox";

export default function Auth() {
  const [isSignIn, setIsSignIn] = useState(true);
  const toggleForm = () => setIsSignIn(!isSignIn);

  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const redirectPath = queryParams.get("redirect") || "/checkout";

  const features = [
    {
      title: "No Wallet Needed",
      content: "Pay directly using your email — no crypto wallet required.",
    },
    {
      title: "Instant Rewards",
      content: "Earn cashback and tokens immediately after each transaction.",
    },
    {
      title: "Crypto and Card Friendly",
      content:
        "Pay with crypto or traditional cards — your choice, no friction.",
    },
    {
      title: "Instant Sign Up",
      content: "Create your account in seconds — no wallet or app needed.",
    },
  ];

  return (
    <div className="relative h-full flex items-center justify-center px-4 py-4 overflow-hidden">
      <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 rounded-[30px] p-3 md:p-6 bg-[#ffffff] bg-opacity-10 backdrop-blur-lg shadow-2xl">
        <div className="w-[90%] mx-auto md:mx-0 order-2 md:order-1 flex flex-col space-y-6 bg-[#ffffff] bg-opacity-10 rounded-[20px] p-6 text-white text-lg font-medium">
          {features.map((feature, index) => (
            <FeatureComboBox
              key={index}
              title={feature.title}
              content={feature.content}
            />
          ))}
        </div>

        <div className="w-full order-1 md:order-2 flex flex-col justify-center text-white my-7">
          <div className="font-grifter font-bold text-[56px] leading-[100%] text-[#F2F2F2] text-center">
            Smarter Payments,
            <br /> Real Rewards.
          </div>
          <p className="font-aeonik text-center text-[#F2F2F2] text-[18px] text-opacity-80 mt-2">
            Earn crypto rewards at checkout — no wallet required.
          </p>
          <AuthForm
            isSignIn={isSignIn}
            toggleForm={toggleForm}
            redirectPath={redirectPath}
          />
        </div>
      </div>
    </div>
  );
}
