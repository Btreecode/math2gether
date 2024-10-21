"use client";

import { useState } from "react";
import { kodchasan, openSans } from "../../components/font-loader";

export default function Calendars() {
  let [d, setD] = useState(new Date());
  let [popup, setPopup] = useState(false);
  let [canceledDates, setCD] = useState([
    "2024-10-12",
    "2024-10-19",
    "2024-11-2",
  ]);

  let now = new Date();
  function onchange(a) {
    let temp = new Date(d);
    temp.setMonth(d.getMonth() + a);
    setD(temp);
  }

  function getDaysInMnth(d) {
    let dd = new Date(d);
    dd.setDate(33);
    dd.setDate(0);
    return dd.getDate();
  }

  function getDay(date) {
    let copy = new Date(d);
    copy.setDate(date);
    return copy.getDay();
  }

  function isCanceled(i) {
    return canceledDates.includes(
      d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + i
    );
  }

  function doSignup() {
    let dStr = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + popup.date;
    setCD(canceledDates.filter((v) => v !== dStr));

    let popupCopy = { ...popup };
    popupCopy.isCanceled = false;
    setPopup(popupCopy);
  }

  function doCancel() {
    let dStr = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + popup.date;
    setCD([...canceledDates, dStr]);

    let popupCopy = { ...popup };
    popupCopy.isCanceled = true;
    setPopup(popupCopy);
  }

  return (
    <div className={openSans.className} onClick={() => setPopup(false)}>
      <div className="flex">
        <button
          onClick={() => setD(now)}
          className="border m-2 h-5"
          style={{
            paddingBottom: "25px",
            width: "65px",
            fontSize: "16px",
          }}
        >
          {" "}
          TODAY{" "}
        </button>
        <div className="flex-1 flex justify-center">
          <div className="flex">
            <button
              onClick={() => onchange(-1)}
              className="border m-2 h-9 w-5 text-2xl"
            >
              {" "}
              {"<"}{" "}
            </button>
            <button className="text-center text-4xl font-extrabold">
              {" "}
              {d.getMonth() + 1 + " / " + d.getFullYear()}{" "}
            </button>
            <button
              onClick={() => onchange(1)}
              className="border m-2 h-9 w-5 text-2xl"
            >
              {" "}
              {" >"}{" "}
            </button>
          </div>
        </div>
        <div style={{ width: "60px" }}></div>
      </div>
      <div className="grid grid-cols-7 m-4 text-lg">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((a, i) => (
          <div key={i} className="text-right font-light p-2 pb-0 -my-4">
            {a}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 m-4 border-l border-b">
        {new Array(new Date(d.getFullYear(), d.getMonth()).getDay()).fill(
          <Cell />
        )}
        {new Array(getDaysInMnth(d)).fill(0).map((a, i) => (
          <div
            key={i}
            className={`
              border border-l-0 border-b-0 p-2 h-28 flex flex-col items-stretch select-none hover:bg-gray-100
              ${getDay(i + 1) == 6 ? "cursor-pointer " : ""}
            `}
            onClick={(ev) => {
              if (getDay(i + 1) == 6) {
                ev.stopPropagation();
                setPopup({
                  x: ev.pageX,
                  y: ev.pageY,
                  date: i + 1,
                  isCanceled: isCanceled(i + 1),
                });
              }
            }}
          >
            <div className="flex justify-end">{i + 1}</div>
            <div>{getDay(i + 1) == 6 ? <Class /> : ""}</div>
            <div>
              {getDay(i + 1) == 6 && isCanceled(i + 1) ? "canceled" : ""}
            </div>
          </div>
        ))}
        {7 -
          ((new Date(d.getFullYear(), d.getMonth()).getDay() +
            getDaysInMnth(new Date(d.getFullYear(), d.getMonth()))) %
            7) ==
        7
          ? ""
          : new Array(
              7 -
                ((new Date(d.getFullYear(), d.getMonth()).getDay() +
                  getDaysInMnth(new Date(d.getFullYear(), d.getMonth()))) %
                  7)
            ).fill(<Cell />)}
      </div>
      {popup ? (
        <Popup
          popup={popup}
          close={() => setPopup(false)}
          doCancel={doCancel}
          doSignup={doSignup}
        />
      ) : undefined}
    </div>
  );
}

function Popup({ popup, close, doCancel, doSignup }) {
  let { x, y, date, isCanceled } = popup;
  return (
    <div
      className={`p-3 absolute grayText rounded-xl border-4 ${
        kodchasan.className
      } w-48
          ${isCanceled ? `lightBlueBody blueBorder` : `lightRedBody redBorder`}
        `}
      style={{
        top: y,
        left: x > window.innerWidth / 2 ? x - 192 : x,
      }}
      onClick={(event) => {
        event.stopPropagation();
      }}
    >
      <div className="pb-2"> {date} </div>
      <div className="flex justify-center">
        {!isCanceled ? (
          <button
            className="darkRedBorder border-4 rounded-xl p-1 px-2 redBody"
            onClick={doCancel}
          >
            {" "}
            CANCEL
          </button>
        ) : (
          <button
            className="darkBlueBorder border-4 rounded-xl p-1 px-2 blueBody"
            onClick={doSignup}
          >
            {" "}
            SIGN UP
          </button>
        )}
      </div>
      <div>
        <button onClick={close}>x</button>
      </div>
    </div>
  );
}

function Cell() {
  return (
    <div className="text-right border border-l-0 border-b-0 p-2 h-28 flex justify-end"></div>
  );
}

function Class() {
  return (
    <div>
      <div />
      <img
        className="h-12"
        src="https://i.imgur.com/qBZge9r.png"
        style={{ filter: "sephia(100%)" }}
      />
    </div>
  );
}
