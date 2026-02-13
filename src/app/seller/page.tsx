import Link from "next/link";
import React from "react";

const Seller = () => {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Seller Dashboard</h1>
      <Link
        href="/seller/form"
        className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded"
      >
        Click Here
      </Link>
    </div>
  );
};

export default Seller;
