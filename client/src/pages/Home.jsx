import React, { useState } from "react";

import { motion } from "framer-motion";
import {
  FiHome,
  FiDollarSign,
  FiActivity,
  FiSettings
} from "react-icons/fi";
import { FaHistory } from "react-icons/fa";
import { IoSparklesSharp } from "react-icons/io5";
import Dashboard from "./Dashboard";
import Navbar from "../components/Navbar";
import AnalyticsDashboard from "../components/AnalyticsDash/AnalyticsDashboard";
import AISection from "../components/AIPart/AISection";
import RecentTransactions from "../components/RecentTransactions";

const Home = () => {
  const [activeSection, setActiveSection] = useState("dashboard");

  return (
    <div className="h-screen flex flex-col bg-white overflow-hidden border-2 border-black">
      <Navbar />

      <div className="flex flex-1 overflow-hidden">
        <aside className="w-16 bg-white border-r-2 border-black flex flex-col z-50">
          

          <nav className="flex-1 p-2 space-y-2">
            {[
              { icon: <FiHome />, text: "Dashboard", section: "dashboard" },
              {
                icon: <IoSparklesSharp />,
                text: "AI Insights",
                section: "ai-section",
              },
              {
                icon: <FiDollarSign />,
                text: "Transactions",
                section: "transactions",
              },
              {
                icon: <FiActivity />,
                text: "Live Trading",
                section: "live-trading",
              },
              { icon: <FiSettings />, text: "Settings", section: "settings" },
            ].map((item, index) => (
              <motion.button
                key={index}
                onClick={() => setActiveSection(item.section)}
                className={`w-full flex items-center justify-center p-3 ${
                  activeSection === item.section ? "border-2 border-black bg-[#FFD700]" : ""
                } relative group`}
                style={{
                  boxShadow:
                    activeSection === item.section
                      ? "4px 4px 0 0 #000"
                      : "none",
                }}
                whileHover={{
                  backgroundColor:
                    activeSection !== item.section ? "#f3f4f6" : "#FFD700",
                  borderColor: "#000",
                  boxShadow: "4px 4px 0 0 #000",
                }}
                whileTap={{ scale: 0.95 }}
              >
                <span
                  className="text-xl text-black"
                  style={{ strokeWidth: 2.5 }}
                >
                  {React.cloneElement(item.icon, { strokeWidth: 2.5 })}
                </span>
                <div
                  className="absolute left-16 ml-2 hidden group-hover:block bg-white border-2 border-black px-3 py-1 font-bold text-sm z-50"
                  style={{ boxShadow: "4px 4px 0 0 #000" }}
                >
                  {item.text}
                </div>
              </motion.button>
            ))}
          </nav>
        </aside>

        <main className="flex-1 overflow-y-auto p-4 border-l-2 border-black">
          {activeSection === "dashboard" && <Dashboard />}
          {activeSection === "live-trading" && <AnalyticsDashboard />}
          {activeSection === "ai-section" && <AISection />}
          {activeSection === "transactions" && <RecentTransactions />}
        </main>
      </div>
    </div>
  );
};

export default Home;
