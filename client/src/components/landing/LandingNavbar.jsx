import {} from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";

const LandingNavbar = () => {
  const menuItems = [
    { label: "Marketplace", path: "/marketplace" },
    { label: "Trade", path: "/trade" },
    { label: "Analytics", path: "/analytics" },
    { label: "About", path: "/about" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b-2 border-black">
      <div className="max-w-7xl mx-auto px-2 h-20">
        <div className="flex items-center justify-between h-full">
          <Link to="/" className="flex items-center gap-2">
            <div
              className="w-12 h-12 border-2 border-black bg-[#FFf] flex items-center justify-center"
              style={{ boxShadow: "4px 4px 0 0 #000" }}
            ><img src="logo.png" alt=""className="h-8 w-8" /></div>
            <span
              className="text-black text-xl font-bold "
              style={{ textShadow: "2px 2px 0 #d2d2d2" }}
            >
              NFT-AgeX
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {menuItems.map((item) => (
              <Link
                key={item.label}
                to={item.path}
                className="text-black font-bold hover:text-[#3E6BFF] transition-colors duration-200"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-[#FFD700] border-2 border-black text-black px-6 py-2 font-bold transition-all duration-300 hover:shadow-[4px_4px_0_0_#000]"
            style={{ boxShadow: "4px 4px 0 0 #000" }}
          >
            <Link to="/login">Get Started</Link>
          </motion.button>
        </div>
      </div>
    </nav>
  );
};

export default LandingNavbar;
