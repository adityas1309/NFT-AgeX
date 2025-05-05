import React from "react";
import { motion } from "framer-motion";

const CTA = () => {
  return (
    <section className="relative py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 bg-white overflow-hidden">
      <div className="relative z-10 max-w-4xl md:max-w-5xl lg:max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-4 sm:space-y-6 md:space-y-8"
        >
          <h2
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-2 sm:mb-4"
            style={{ textShadow: "4px 4px 0 #b6b6b6" }}
          >
            <span
              className="text-[#FF3E3E]"
              style={{ textShadow: "4px 4px 0 #000" }}
            >
              Start Trading
            </span>{" "}
            Smarter Today
          </h2>

          <p className="text-gray-800 text-base sm:text-lg md:text-xl max-w-xs sm:max-w-md md:max-w-2xl mx-auto font-medium">
            Join thousands of NFT traders leveraging{" "}
            <span className="text-[#3E6BFF] font-bold">
              AI-powered insights
            </span>{" "}
            to make better trading decisions.
          </p>

          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: "8px 8px 0 0 #000",
            }}
            whileTap={{ scale: 0.95 }}
            className="bg-[#FFD700] border-2 border-black text-black px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg font-bold"
            style={{ boxShadow: "4px 4px 0 0 #000" }}
          >
            Get Early Access
          </motion.button>
        </motion.div>
        
        <div
          className="absolute top-0 left-4 sm:left-10 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 border-2 border-black  bg-[#3E6BFF] -z-10"
          style={{ boxShadow: "6px 6px 0 0 #000" }}
        />
        <div
          className="absolute bottom-10 sm:bottom-20 right-4 sm:right-10 w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 border-2 border-black bg-[#FF3E3E] -z-10 "
          style={{ boxShadow: "6px 6px 0 0 #000" }}
        />
        <div
          className="hidden sm:block absolute top-40 md:top-52 right-1/4 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 border-2 border-black bg-[#FFD700]"
          style={{ boxShadow: "4px 4px 0 0 #000" }}
        />
      </div>
    </section>
  );
};

export default CTA;
