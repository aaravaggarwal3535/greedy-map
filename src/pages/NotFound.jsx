
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/Layout";
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
    <Layout>
      <section className="flex flex-col items-center justify-center min-h-[70vh] py-12 px-4">
        <div className="text-center space-y-5 max-w-md mx-auto animate-fade-up">
          <h1 className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">404</h1>
          <h2 className="text-2xl font-medium">Page Not Found</h2>
          <p className="text-gray-600">
            We couldn't find the page you're looking for. The page might have been moved, deleted, or never existed.
          </p>
          <div className="pt-4">
            <Button asChild>
              <a href="/" className="inline-flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Home
              </a>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default NotFound;
