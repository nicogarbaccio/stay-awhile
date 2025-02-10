"use client";

import Modal from "./Modal";
import useLoginModal from "@/app/hooks/useLoginModal";
import { useState } from "react";
import CustomButton from "../forms/CustomButton";

const LoginModal = () => {
  const loginModal = useLoginModal();

  const content = (
    <>
      <form className="space-y-4">
        <input
          type="email"
          placeholder="Email address"
          className="w-full h-[54px] px-4 border border-gray-300 rounded-xl"
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full h-[54px] px-4 border border-gray-300 rounded-xl"
        />
        <div className="p-5 bg-red-700 text-white rounded-xl opacity-80">
          Error message
        </div>
        <CustomButton label="Log in" onClick={() => console.log("It works")} />
      </form>
    </>
  );
  return (
    <Modal
      isOpen={loginModal.isOpen}
      close={loginModal.close}
      label="Log in"
      content={content}
    />
  );
};

export default LoginModal;
