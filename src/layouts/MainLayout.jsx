import UserNavbar from "../components/common/NavBar/UserNavBar";
import MerchantNavbar from "../components/common/NavBar/MerchantNavbar";

export default function MainLayout({ children, role = "user" }) {
  return (
    <div className="flex flex-col h-screen">
      {/* Navbar takes 10% height */}
      <div className="basis-[10%] flex-shrink-0">
        {role === "user" ? <UserNavbar /> : <MerchantNavbar />}
      </div>

      {/* Main content takes 90% height */}
      <main className="basis-[90%] overflow-auto">{children}</main>
    </div>
  );
}
