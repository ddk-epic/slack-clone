"use client";

import SignInCard from "./sign-in-card";
import SignUpCard from "./sign-up-card";

import { useState } from "react";
import { SignInFlow } from "../types";

export default function AuthScreen() {
  const [state, setState] = useState<SignInFlow>("signIn");

  return (
    <div className="h-full flex items-center justify-center bg-[#5C3B58]">
      <div className="md:h-auto md:w-105">
        {state === "signIn" ? <SignInCard /> : <SignUpCard />}
      </div>
    </div>
  );
}
