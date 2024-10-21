"use client";

import { useState } from "react";
import { kodchasan, openSans } from "../components/font-loader";

export default function Home() {
  return (
    <div>
      <Top />

      <Bottom />
    </div>
  );
}

function Top() {
  let text =
    "At Math Together, we believe in the transformative power of education. Our mission is to provide free, personalized math tutoring to middle school students, fostering a love for learning and improving academic performance. By connecting students with dedicated tutors, we aim to bridge educational gaps and build confidence in math. Join us in empowering young minds and creating a brighter future for our community.";

  return (
    <div className={`grid grid-cols-7 mt-5 ${openSans.className}`}>
      <div className="col-span-7 h-52 sm:h-auto sm:col-span-3 bg-black">
        {" "}
        hello
      </div>
      <div className="blueBody col-span-7 sm:col-span-4 p-5 md:p-7 grayText sm:py-7 md:py-10 lg:p-10 lg:py-14 text-base lg:text-xl xl:text-2xl">
        {" "}
        {text}{" "}
      </div>
    </div>
  );
}

function Bottom() {
  let subtext = `${openSans.className} `;
  return (
    <div className={`grid sm:grid-cols-3`}>
      <Desc type="SCHOOL" />
      <Desc type="SAT" />
      <Desc type="COMPETITIONS" />
    </div>
  );
}

function Desc({ type }) {
  let types = {
    SCHOOL: [
      "Helps catch up on school",
      "Offers homework help",
      "Previews for future classes",
      "Accelerates your student’s math pathway",
    ],
    SAT: [
      "Prepares students for SAT Math. Many colleges now consider SAT scores as a part of your student’s application.",
      "Digital SAT has harder math topics",
    ],
    COMPETITIONS: [
      "Develops skills for competitions such as AMC, Math Kangaroo, Math Olympiad",
      "Adds another extracurricular to your student’s academic portfolio",
      "Expands your student's field of knowledge",
    ],
  };
  let subtitle = `flex justify-center mt-5 text-xl sm:text-2xl grayText ${kodchasan.className}`;
  let subtext = `${openSans.className} grayText text-base lg:text-xl mx-3 md:mx-5 lg:mx-10`;
  return (
    <div>
      <div className={subtitle}>{type} </div>
      <div className={`p-3 ${subtext}`}>
        {types[type].map((v) => (
          <li className="my-1">{v} </li>
        ))}
      </div>
    </div>
  );
}
