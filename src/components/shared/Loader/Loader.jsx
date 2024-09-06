import React from "react";
import { HashLoader } from "react-spinners";
const Loader = () => {
  return (
    <div className="h-screen flex items-center justify-center ">
      <HashLoader size={40} />
    </div>
  );
};

export default Loader;
