import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  selectCard,
  selectBank,
  fetchCardAndBankData,
  saveNewCard,
  saveNewBank,
  resetCheckout,
  setPaymentMethod_1,
} from "../../redux/checkout/checkoutActions";
import LoadingScreen from "../common/LoadingScreen";

export default function PaymentSelection() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { method_1, cards, banks, loading, registering, error } = useSelector(
    (state) => state.checkout
  );

  const [paymentMethod_2, setPaymentMethod_2] = useState(
    method_1 === "bank" ? "bank" : "card"
  );
  const [pendingCard, setPendingCard] = useState(null);
  const [pendingBank, setPendingBank] = useState(null);

  useEffect(() => {
    const user_id = JSON.parse(localStorage.getItem("authUser")).id;
    dispatch(fetchCardAndBankData(user_id));
    const method_1 = sessionStorage.getItem("method_1");
    dispatch(setPaymentMethod_1(method_1));
  }, [dispatch]);

  useEffect(() => {
    if (method_1 === "card" || method_1 === "bank") {
      setPaymentMethod_2(method_1);
    }
  }, [method_1]);

  const showMethodToggle = method_1 === "crypto";

  const [newCard, setNewCard] = useState({
    holder_name: "",
    number: "",
    exp_month: "",
    exp_year: "",
    brand: "",
  });

  const [newBank, setNewBank] = useState({
    holder_name: "",
    account_number: "",
    routing_number: "",
    bank_name: "",
  });

  const handleContinue = () => {
    if (paymentMethod_2 === "card" && pendingCard) {
      sessionStorage.setItem("method_2", JSON.stringify(pendingCard));
      dispatch(selectCard(pendingCard));
    } else if (paymentMethod_2 === "bank" && pendingBank) {
      sessionStorage.setItem("method_2", JSON.stringify(pendingBank));
      dispatch(selectBank(pendingBank));
    }
    navigate("/paymentsummary");
  };

  const handleCardRegister = async () => {
    const card = {
      card_id: `card_${Date.now()}`,
      brand: newCard.brand,
      last_4: newCard.number.slice(-4),
      exp_month: newCard.exp_month,
      exp_year: newCard.exp_year,
      holder_name: newCard.holder_name,
    };
    await dispatch(saveNewCard(card));
    setPendingCard(card);
    setNewCard({
      holder_name: "",
      number: "",
      exp_month: "",
      exp_year: "",
      brand: "",
    });
  };

  const handleBankRegister = async () => {
    const bank = {
      bank_id: `bank_${Date.now()}`,
      bank_name: newBank.bank_name,
      account_number: newBank.account_number.slice(-4),
      routing_number: newBank.routing_number,
      holder_name: newBank.holder_name,
    };
    await dispatch(saveNewBank(bank));
    setPendingBank(bank);
    setNewBank({
      holder_name: "",
      account_number: "",
      routing_number: "",
      bank_name: "",
    });
  };

  if (loading) {
    return <LoadingScreen message="Loading your card and bank information" />;
  }

  return (
    <div className="h-full px-4 py-12 flex flex-col items-center text-white">
      <h1 className="text-[40px] md:text-[59px] text-center font-grifter font-bold mb-2">
        {method_1 === "crypto"
          ? "Choose your payment method"
          : method_1 === "card"
          ? "Choose your card or create new one"
          : "Choose your bank or create new one"}
      </h1>

      {showMethodToggle && (
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setPaymentMethod_2("card")}
            className={`px-4 py-2 rounded-full border transition font-aeonik ${
              paymentMethod_2 === "card"
                ? "bg-cyan-400 text-white"
                : "bg-transparent border-white/20 text-white/70 hover:border-white/40"
            }`}
          >
            Card
          </button>
          <button
            onClick={() => setPaymentMethod_2("bank")}
            className={`px-4 py-2 rounded-full border transition font-aeonik ${
              paymentMethod_2 === "bank"
                ? "bg-cyan-400 text-white"
                : "bg-transparent border-white/20 text-white/70 hover:border-white/40"
            }`}
          >
            Bank
          </button>
        </div>
      )}

      <div className="space-y-4 w-full max-w-md">
        {paymentMethod_2 === "card" &&
          cards.map((card) => (
            <div
              key={card.card_id}
              onClick={() => setPendingCard(card)}
              className={`cursor-pointer rounded-xl border px-4 py-3 transition ${
                pendingCard?.card_id === card.card_id
                  ? "bg-cyan-500/10 border-cyan-400"
                  : "bg-white/5 border-white/10"
              }`}
            >
              <p className="text-lg font-aeonik text-white">
                {card.brand} •••• {card.last_4}
              </p>
              <p className="text-sm text-white/60">
                Expires {card.exp_month}/{card.exp_year} — {card.holder_name}
              </p>
            </div>
          ))}

        {paymentMethod_2 === "bank" &&
          banks.map((bank) => (
            <div
              key={bank.bank_id}
              onClick={() => setPendingBank(bank)}
              className={`cursor-pointer rounded-xl border px-4 py-3 transition ${
                pendingBank?.bank_id === bank.bank_id
                  ? "bg-cyan-500/10 border-cyan-400"
                  : "bg-white/5 border-white/10"
              }`}
            >
              <p className="text-lg font-aeonik text-white">
                {bank.bank_name} — •••• {bank.account_number}
              </p>
              <p className="text-sm text-white/60">
                Routing: {bank.routing_number} — {bank.holder_name}
              </p>
            </div>
          ))}

        <button
          onClick={handleContinue}
          disabled={
            (paymentMethod_2 === "card" && !pendingCard) ||
            (paymentMethod_2 === "bank" && !pendingBank)
          }
          className={`w-full mt-2 font-aeonik py-2 rounded-full transition ${
            (paymentMethod_2 === "card" && pendingCard) ||
            (paymentMethod_2 === "bank" && pendingBank)
              ? "bg-emerald-400 text-white hover:bg-emerald-500"
              : "bg-white/10 text-white/40 cursor-not-allowed"
          }`}
        >
          Continue
        </button>

        <div className="mt-6">
          <h2 className="text-lg font-aeonik mb-2">
            Register New {paymentMethod_2 === "card" ? "Card" : "Bank Account"}
          </h2>

          {paymentMethod_2 === "card" ? (
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Name on Card"
                value={newCard.holder_name}
                onChange={(e) =>
                  setNewCard({ ...newCard, holder_name: e.target.value })
                }
                className="w-full rounded-lg bg-white/5 text-white placeholder-white/50 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              />
              <input
                type="text"
                placeholder="Card Number"
                value={newCard.number}
                onChange={(e) =>
                  setNewCard({ ...newCard, number: e.target.value })
                }
                className="w-full rounded-lg bg-white/5 text-white placeholder-white/50 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              />
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="MM"
                  value={newCard.exp_month}
                  onChange={(e) =>
                    setNewCard({ ...newCard, exp_month: e.target.value })
                  }
                  className="w-1/2 rounded-lg bg-white/5 text-white placeholder-white/50 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                />
                <input
                  type="text"
                  placeholder="YY"
                  value={newCard.exp_year}
                  onChange={(e) =>
                    setNewCard({ ...newCard, exp_year: e.target.value })
                  }
                  className="w-1/2 rounded-lg bg-white/5 text-white placeholder-white/50 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                />
              </div>
              <input
                type="text"
                placeholder="Brand (Visa, MasterCard)"
                value={newCard.brand}
                onChange={(e) =>
                  setNewCard({ ...newCard, brand: e.target.value })
                }
                className="w-full rounded-lg bg-white/5 text-white placeholder-white/50 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              />
              <button
                type="button"
                onClick={handleCardRegister}
                disabled={registering}
                className={`w-full font-aeonik py-2 rounded-full transition ${
                  registering
                    ? "bg-white/10 text-white/40 cursor-not-allowed"
                    : "bg-cyan-400 text-white hover:bg-cyan-500"
                }`}
              >
                {registering ? "Registering..." : "Register Card"}
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Account Holder Name"
                value={newBank.holder_name}
                onChange={(e) =>
                  setNewBank({ ...newBank, holder_name: e.target.value })
                }
                className="w-full rounded-lg bg-white/5 text-white placeholder-white/50 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              />
              <input
                type="text"
                placeholder="Account Number"
                value={newBank.account_number}
                onChange={(e) =>
                  setNewBank({ ...newBank, account_number: e.target.value })
                }
                className="w-full rounded-lg bg-white/5 text-white placeholder-white/50 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              />
              <input
                type="text"
                placeholder="Routing Number"
                value={newBank.routing_number}
                onChange={(e) =>
                  setNewBank({ ...newBank, routing_number: e.target.value })
                }
                className="w-full rounded-lg bg-white/5 text-white placeholder-white/50 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              />
              <input
                type="text"
                placeholder="Bank Name"
                value={newBank.bank_name}
                onChange={(e) =>
                  setNewBank({ ...newBank, bank_name: e.target.value })
                }
                className="w-full rounded-lg bg-white/5 text-white placeholder-white/50 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              />
              <button
                type="button"
                onClick={handleBankRegister}
                disabled={registering}
                className={`w-full font-aeonik py-2 rounded-full transition ${
                  registering
                    ? "bg-white/10 text-white/40 cursor-not-allowed"
                    : "bg-cyan-400 text-white hover:bg-cyan-500"
                }`}
              >
                {registering ? "Registering..." : "Register Bank Account"}
              </button>
            </div>
          )}
        </div>

        <button
          onClick={() => {
            dispatch(resetCheckout());
            navigate("/checkout");
          }}
          className="mt-6 w-full py-2 border border-white text-white hover:bg-white/10 rounded-full"
        >
          Go To Previous Page
        </button>
      </div>
    </div>
  );
}
