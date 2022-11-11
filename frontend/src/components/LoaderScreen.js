import React, { useEffect } from "react";
import { render } from "react-dom";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
import { useState } from "react";
import "../css/loaderScreen.css";

const LoaderScreen = ({ setisLoading }) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setisLoading(true);
    setTimeout(() => {
      setLoading(false);
      setisLoading(false);
    }, 3000);
  });

  return (
    <>
      <div className="loader_screen">
        <ClimbingBoxLoader
          color={"#2b7dcf"}
          loading={loading}
          size={20}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    </>
  );
};

export default LoaderScreen;
