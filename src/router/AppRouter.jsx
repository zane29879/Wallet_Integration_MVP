import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Auth from "../pages/Auth/UserAuth";
import MerchantAuth from "../pages/Auth/MerchantAuth";
import Dashboard from "../pages/Dashboard/UserDashboard";
import MerchantDashboard from "../pages/Dashboard/MerchantDashboard";
import Checkout from "../pages/Checkout";
import PaymentSummary from "../pages/PaymentSummary";
import MainLayout from "../layouts/MainLayout";
import AuthNavbar from "../components/common/NavBar/AuthNavBar";
import PaymentSourceSelector from "../components/checkout/PaymentSourceSelector";
import CryptoPaymentSourceSelector from "../components/checkout/CryptoPaymentSourceSelector";
import { PublicRoute, UserRoute, MerchantRoute } from "./ProtectedRoute";
import LoadingScreen from "../components/common/LoadingScreenAuth";
import PageNotFound from "../components/common/PageNotFound";

export default function AppRouter() {
  const [currentUser, setCurrentUser] = useState(null);

  const { user, status } = useSelector((state) => state.auth);
  useEffect(() => {
    setCurrentUser(user);
  }, [user]);

  if (status === "loading") return <LoadingScreen message="Signing in......" />;

  return (
    <Routes>
      {/* PUBLIC ROUTES */}
      <Route element={<PublicRoute user={currentUser} />}>
        <Route
          path="/"
          element={
            <AuthNavbar role="user">
              <Auth />
            </AuthNavbar>
          }
        />
        <Route
          path="/merchant"
          element={
            <AuthNavbar role="merchant">
              <MerchantAuth />
            </AuthNavbar>
          }
        />
      </Route>

      {/* USER ROUTES */}
      <Route element={<UserRoute user={user} />}>
        <Route
          path="/dashboard"
          element={
            <MainLayout>
              <Dashboard />
            </MainLayout>
          }
        />
        <Route
          path="/checkout"
          element={
            <MainLayout>
              <Checkout />
            </MainLayout>
          }
        />
        <Route
          path="/payment-fiat"
          element={
            <MainLayout>
              <PaymentSourceSelector />
            </MainLayout>
          }
        />
        <Route
          path="/payment-crypto"
          element={
            <MainLayout>
              <CryptoPaymentSourceSelector />
            </MainLayout>
          }
        />
        <Route
          path="/paymentsummary"
          element={
            <MainLayout>
              <PaymentSummary />
            </MainLayout>
          }
        />
      </Route>

      {/* MERCHANT ROUTES */}
      <Route element={<MerchantRoute user={user} />}>
        <Route
          path="/merchant/dashboard"
          element={
            <MainLayout role="merchant">
              <MerchantDashboard />
            </MainLayout>
          }
        />
      </Route>

      {/* Catch-All Route */}
      {/* <Route path="*" element={<PageNotFound />} /> */}
    </Routes>
  );
}
