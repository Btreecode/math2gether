"use client";
import { useState } from "react";
import { kodchasan } from "../../components/font-loader";

export default function SignUp() {
  return (
    <div
      className={`${kodchasan.className} grayText flex flex-col items-center`}
    >
      <div className=" text-2xl grayText m-5">STUDENT SIGN UP</div>
      <div>
        <div className="mx-5 text-lg">First Name: </div>
        <input
          className="border text-lg px-2 mx-5 mb-2 pt-1 w-96"
          placeHolder="ex. John"
        />
      </div>
      <div className="mx-5 text-lg">Preferred Name(Optional): </div>
      <input
        className="border text-lg px-2 mx-5 mb-2 pt-1 w-60"
        placeHolder="ex. Johnny Boy"
      />
      <div className="mx-5 text-base">Last Name: </div>
      <input
        className="border text-base px-2 mx-5 mb-2 pt-1 w-60"
        placeHolder="ex. Doe"
      />
      <div className="mx-5 text-sm">Date of Birth(mm/dd/yyyy): </div>
      <input
        className="border text-sm px-2 mx-5 mb-2 w-60"
        placeHolder="ex. 01/24/2015"
      />
      <div className="mx-5 text-sm">School: </div>
      <input
        className="border text-sm px-2 mx-5 mb-2 w-60"
        placeHolder="ex. Hello Elementary"
      />
      <div className="mx-5 text-sm">Grade(2024-2025): </div>
      <input
        className="border text-sm px-2 mx-5 mb-2 w-60"
        placeHolder="ex. 6"
      />
      <div className="mx-5 text-sm">Phone Number: </div>
      <input
        className="border text-sm px-2 mx-5 mb-2 w-60"
        placeHolder="ex. 949-123-4567"
      />
      <div className="mx-5 text-sm">Email: </div>
      <input
        className="border text-sm px-2 mx-5 mb-2 w-60"
        placeHolder="ex. JohnDoe@jdoe.com"
      />
      <div className="mx-5 text-sm">Reason for Enrollment: </div>
      <input className="border text-sm px-2 mx-5 w-4/5" placeHolder="" />
    </div>
  );
}
