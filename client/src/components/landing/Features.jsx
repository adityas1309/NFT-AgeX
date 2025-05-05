import React from "react";
import { motion } from "framer-motion";
import { FiShield, FiZap, FiBarChart2 } from "react-icons/fi";

const Features = () => {
  const features = [
    {
      icon: <FiShield />,
      title: "Secure Trading",
      description:
        "Advanced security protocols and encrypted transactions keep your assets protected at all times.",
      color: "#FF3E3E",
    },
    {
      icon: <FiZap />,
      title: "Lightning Fast",
      description:
        "Execute trades with minimal latency thanks to our optimized infrastructure and smart routing.",
      color: "#3E6BFF",
    },
    {
      icon: <FiBarChart2 />,
      title: "AI Analytics",
      description:
        "Leverage cutting-edge AI tools to analyze market trends and make data-driven decisions.",
      color: "#FFD700",
    },
  ];

  return (
    <section className="relative py-20 px-6 bg-white">
      <motion.div
        className="max-w-7xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2 },
          },
        }}
      >
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-center mb-16"
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { type: "spring", stiffness: 100 },
            },
          }}
          style={{ textShadow: "4px 4px 0 #000" }}
        >
          <span className="text-[#FF3E3E]">Why Choose Us?</span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-white p-8 border-2 border-black relative"
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { type: "spring", stiffness: 120 },
                },
              }}
              whileHover={{
                y: -5,
                boxShadow: "8px 8px 0 0 #000",
                transition: { duration: 0.2 },
              }}
              style={{ boxShadow: "4px 4px 0 0 #000" }}
            >
              <div
                className={`inline-flex p-3 mb-6 border-2 border-black`}
                style={{
                  backgroundColor: feature.color,
                  boxShadow: "3px 3px 0 0 #000",
                }}
              >
                {React.cloneElement(feature.icon, {
                  className: "w-6 h-6 text-black",
                  strokeWidth: 2.5,
                })}
              </div>

              <h3 className="text-xl font-bold text-black mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-800 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Features;
