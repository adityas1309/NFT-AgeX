import { FiAlertTriangle } from "react-icons/fi";

const ErrorMessage = ({ error }) => {
  if (!error) return null;

  return (
    <div className="mb-6 p-4 bg-red-900/30 border border-red-700 rounded-xl flex items-center gap-3">
      <FiAlertTriangle className="text-red-400 text-xl" />
      <p className="text-red-300">{error}</p>
    </div>
  );
};

export default ErrorMessage;
