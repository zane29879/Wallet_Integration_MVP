import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDashboardData } from "../../redux/dashboard/dashboardActions";

import AccountInfo from "../../components/dashboard/AccountInfo";
import MarketData from "../../components/dashboard/MarketData";
import PurchaseHistory from "../../components/dashboard/PurchaseHistory";
import RewardHistory from "../../components/dashboard/RewardHistory";
import LoadingScreen from "../../components/common/LoadingScreen";

export default function Dashboard() {
  const loginUser = JSON.parse(localStorage.getItem("authUser"));

  const dispatch = useDispatch();
  const { user, cryptos, purchaseHistory, rewardHistory, status, error } =
    useSelector((state) => state.dashboard);

  useEffect(() => {
    if (loginUser?.email) {
      dispatch(fetchDashboardData(loginUser.email));
    }
  }, [dispatch]);

  if (status === "loading")
    return <LoadingScreen message="Loading dashboard..." />;
  if (status === "failed")
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500 text-center">
        <p>Error: {error}</p>
      </div>
    );
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-700 text-center">
        <p>Please log in to continue.</p>
      </div>
    );
  }

  return (
    <div className="w-full text-white px-4 py-10 md:px-12">
      <h1 className="text-[40px] md:text-[59px] font-grifter font-bold mb-2 text-center">
        Manage your Rewards and Payments
      </h1>
      <p className="text-center text-sm font-aeonik text-gray-500 mb-10">
        Pay with Crypto
      </p>

      <div className="max-w-screen-xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <AccountInfo user={user} />
          <MarketData cryptos={cryptos} />
        </div>

        <div className="mb-10">
          <PurchaseHistory data={purchaseHistory} />
        </div>

        <RewardHistory data={rewardHistory} />
      </div>
    </div>
  );
}
