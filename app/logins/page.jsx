"use client";
import { useState } from "react";
import { kodchasan } from "../../components/font-loader";
import Link from "next/link";

export default function Logins() {
  let [user, suser] = useState("");
  let [pass, spass] = useState("");
  return (
    <div className={`${kodchasan.className} m-5 grayText`}>
      <Link href="/idk" className="text-base flex">
        {" "}
        {"< BACK"}{" "}
      </Link>
      <div className="flex flex-col items-center">
        <div className="text-xl ml-6 sm:text-2xl"> STUDENT LOGIN </div>
        <div className="text-base mt-5 ml-10 sm:text-xl">
          USERNAME:{" "}
          <input
            className="border px-2 text-lg"
            placeHolder="ex. JohnDoe"
            value={user}
            onChange={(event) => suser(event.target.value)}
          />
        </div>
        <div className="text-base mt-5 ml-10 sm:text-xl">
          PASSWORD:{" "}
          <input
            className="border px-2 text-lg"
            placeHolder="ex. JDoe123"
            type="password"
            value={pass}
            onChange={(event) => spass(event.target.value)}
          />
        </div>
        <button className="underline text-sm mt-3">
          Forgot your password?
        </button>
      </div>
    </div>
  );
}
