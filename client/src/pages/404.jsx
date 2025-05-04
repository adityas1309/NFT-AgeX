import { useLocation, Link } from "react-router";
import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#0B0F19] to-[#0E1225] text-white relative overflow-hidden">
      <div className="relative z-10 text-center glass-card p-10 rounded-xl max-w-md">
        <h1 className="text-6xl font-bold text-gradient-blue-purple mb-4">
          404
        </h1>
        <p className="text-xl text-blue-100 mb-8">
          This page has been lost in the metaverse.
        </p>
        <button className="btn-gradient-primary">
          <Link to="/" className="flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Return to Homepage
          </Link>
        </button>
      </div>
    </div>
  );
};

export default NotFound;
