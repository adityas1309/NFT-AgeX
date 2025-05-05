import React from "react";
import { motion } from "framer-motion";
import { FiArrowUp, FiTwitter, FiGithub } from "react-icons/fi";

const Footer = () => {
  const socialLinks = [
    { name: "Twitter", icon: <FiTwitter />, url: "#", color: "#1DA1F2" },
    { name: "GitHub", icon: <FiGithub />, url: "#", color: "#000000" },
    { name: "Medium", icon: <FiArrowUp />, url: "#", color: "#00AB6C" },
  ];

  return (
    <footer className="relative border-t-2 border-black mt-32 py-16 px-6 bg-white">
      <div className="container mx-auto max-w-7xl relative z-10">
        <motion.div
          className="flex flex-wrap justify-center gap-8 mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            visible: { transition: { staggerChildren: 0.1 } },
          }}
        >
          {socialLinks.map((item) => (
            <motion.a
              key={item.name}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative cursor-pointer"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { type: "spring", stiffness: 120 },
                },
              }}
              whileHover={{ y: -5 }}
            >
              <div
                className="flex items-center gap-2 p-3 border-2 border-black font-bold"
                style={{
                  boxShadow: "4px 4px 0 0 #000",
                  backgroundColor: item.color,
                  color: item.color === "#000000" ? "white" : "black",
                }}
              >
                {React.cloneElement(item.icon, {
                  className: "w-5 h-5",
                  strokeWidth: 2.5,
                })}
                <span>{item.name}</span>
              </div>
            </motion.a>
          ))}
        </motion.div>

        <motion.p
          className="text-black text-sm md:text-base font-bold text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          © {new Date().getFullYear()}{" "}
          <span className="text-[#FF3E3E]">Web3AI</span>. All rights reserved.
        </motion.p>

        <motion.button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-8 right-8 p-4 bg-white border-2 border-black"
          style={{ boxShadow: "4px 4px 0 0 #000" }}
          whileHover={{
            scale: 1.1,
            boxShadow: "6px 6px 0 0 #000",
          }}
          whileTap={{ scale: 0.95 }}
        >
          <FiArrowUp className="w-6 h-6 text-black" strokeWidth={2.5} />
        </motion.button>
      </div>

      <div
        className="absolute bottom-20 left-10 w-16 h-16 border-2 border-black bg-[#FFD700]"
        style={{ boxShadow: "4px 4px 0 0 #000" }}
      />
      <div
        className="absolute top-20 right-10 w-12 h-12 border-2 border-black bg-[#3E6BFF]"
        style={{ boxShadow: "4px 4px 0 0 #000" }}
      />
    </footer>
  );
};

export default Footer;
