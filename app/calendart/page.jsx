"use client";

import { useState } from "react";
import { openSans } from "../../components/font-loader";

export default function Calendart() {
  let [d, setD] = useState(new Date());
  let [popup, setPopup] = useState(false);
  let now = new Date();
  function onchange(a) {
    let temp = new Date(d);
    temp.setMonth(d.getMonth() + a);
    setD(temp);
  }
  let day = now.getDay();

  function getDaysInMnth(d) {
    let dd = new Date(d);
    dd.setDate(33);
    dd.setDate(0);
    return dd.getDate();
  }

  return (
    <div className={openSans.className}>
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
          <button
            key={i}
            className="text-right border border-l-0 border-b-0 p-2 h-28 flex justify-end"
            onClick={(ev) => {
              console.log(ev);
              setPopup({
                x: ev.pageX,
                y: ev.pageY,
              });
            }}
          >
            {i + 1} {i + 1 == 12 ? "" : ""}
          </button>
        ))}
        {new Array(
          7 -
            ((new Date(d.getFullYear(), d.getMonth()).getDay() +
              getDaysInMnth(new Date(d.getFullYear(), d.getMonth()))) %
              7)
        ).fill(<Cell />)}
      </div>
      {popup ? (
        <Popup popup={popup} close={() => setPopup(false)} />
      ) : undefined}
    </div>
  );
}

function Popup({ popup, close }) {
  let { x, y } = popup;
  return (
    <div
      className="bg-gray-300 p-3 absolute"
      style={{
        background: "rgba(0,0,0, 0.5)",
        top: y,
        left: x,
      }}
    >
      popup for {x}, {y}
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
