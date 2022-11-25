import React, { useState, useEffect } from "react";
import Link from "next/link";
import { BsBagCheckFill } from "react-icons/bs";

import { useProductContext } from ".././lib/context";
import { runFireworks } from "../lib/utils";

const SuccessPage = () => {
  const { setCartItems, setTotalQunatities, setSubtotalPrice } =
    useProductContext();

  useEffect(() => {
    localStorage.clear();
    setCartItems([]);
    setTotalQunatities(0);
    setSubtotalPrice(0);
    runFireworks();
  }, []);

  return (
    <div className="success-wrapper">
      <div className="success">
        <p className="icon">
          <BsBagCheckFill />
        </p>
        <h2>Thank you for your order!</h2>
        <p className="email-msg">Check your email inbox for the receipt.</p>
        <p className="description">
          If you have any questions, please email
          <a
            className="ml-[5px] text-indigo-600"
            href="mailto:order@example.com"
          >
            order@example.com
          </a>
        </p>
        <Link href="/">
          <button
            type="button"
            className="w-full rounded-md border border-transparent bg-indigo-600 py-3 px-5 text-base font-medium text-white shadow-sm hover:bg-indigo-700 mt-6"
          >
            Continue Shopping
          </button>
        </Link>
      </div>
    </div>
  );
};

export default SuccessPage;
