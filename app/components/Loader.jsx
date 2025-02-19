"use client";
import { useState } from "react";
import BounceLoader from "react-spinners/BounceLoader";

function Loader() {
  let [loading, setLoading] = useState(true);

  return (
    <div className="flex items-center justify-center py-52">
    <div className="sweet-loading">
      <BounceLoader
        color={"#4d48e6"}
        loading={loading}
        size={80}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
    </div>
  );
}

export default Loader;
