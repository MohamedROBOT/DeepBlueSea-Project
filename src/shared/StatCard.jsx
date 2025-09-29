import { motion } from "framer-motion";

export default function StatCard({ icon: Icon, label, value, color }) {
  return (
    <motion.div
      className="flex flex-col items-center justify-center bg-gradient-to-b from-[#091C2D] to-[#1A2332] text-white px-6 py-6 rounded-2xl shadow w-44"
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 200 }}
    >
      <Icon className={`text-3xl mb-2 ${color}`} />
      <span className="text-sm opacity-80">{label}</span>
      <motion.span
        key={value}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-xl font-bold"
      >
        {value}
      </motion.span>
    </motion.div>
  );
}
