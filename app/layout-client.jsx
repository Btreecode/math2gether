"use client";

import Link from "next/link";
import AppContext from "../components/app-context";
import { kodchasan } from "../components/font-loader";
import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";

const DEF_USER = { id: "test-student" };

export default function LayoutClient({ children }) {
  let [user, setUser] = useState(null);
  let [showPopup, setShowPopup] = useState(false);

  function doLogin() {
    setUser(DEF_USER);
  }

  function doLogOut() {
    setUser(undefined);
  }

  return (
    <AppContext.Provider value={{ user, setUser }}>
      <div onClick={() => setShowPopup(false)}>
        <nav
          className={`flex space-x-3 p-2 blueBorder text-xl grayText items-center ${kodchasan.className}`}
          style={{ borderBottomWidth: "6px" }}
        >
          <Link href="/">
            <img
              src="https://i.imgur.com/bUyADUT.png"
              className="h-10 select-none"
            />
          </Link>
          <div className="flex-1"></div>
          {user ? (
            <div>
              Hi User
              <button className="btn" onClick={doLogOut}>
                Log Out
              </button>
            </div>
          ) : (
            <>
              <button className="btn" onClick={doLogin}>
                Log In
              </button>
              <button className="btn" onClick={doLogin}>
                Sign Up
              </button>
            </>
          )}
          <div
            onClick={(event) => {
              event.stopPropagation();
              setShowPopup((v) => !v);
            }}
            className="select-none text-3xl grayText pr-4"
          >
            <GiHamburgerMenu />
          </div>
          {showPopup ? (
            <div className="absolute border-2 grayBorder right-3 top-14 grayBody flex flex-col items-center text-center rounded-md select-none">
              <Child link="/" name="Home" />
              <Child link="/about" name="About Us" />
              <Child link="/calendars" name="Calendar-student" />
              <Child link="/calendart" name="Calendar-teacher" />
              <Child link="/idk" name="idk" />
            </div>
          ) : undefined}
        </nav>
        <main>{children}</main>
      </div>
    </AppContext.Provider>
  );
}

function Child({ link, name }) {
  return (
    <Link
      href={link}
      className="border border-2 grayBorder p-2 w-32 hover:darkGrayBody"
    >
      {name}
    </Link>
  );
}
