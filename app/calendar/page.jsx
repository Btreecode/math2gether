"use client";

import AppContext from "@/components/app-context";
import { db } from "@/lib/firebase/config";
import {
  endOfMonth,
  setDate,
  startOfMonth,
  isSameDay,
  isSameMonth,
} from "date-fns";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { kodchasan, openSans } from "../../components/font-loader";
import AdminPopup from "./admin-popup";

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
export default function Calendars() {
  let { user, setUser } = useContext(AppContext);
  let [d, setD] = useState(new Date());
  let [popup, setPopup] = useState(false);
  let [myRecords, setMyRecords] = useState([]);

  async function loadRecords() {
    let c = collection(db, "records");
    let { docs } = await getDocs(
      query(
        c,
        where("date", ">=", startOfMonth(d)),
        where("date", "<=", endOfMonth(d)),
        where("uid", "==", user.uid)
      )
    );
    setMyRecords(docs);
  }

  useEffect(() => {
    if (user) loadRecords();
  }, [user]);

  let now = new Date();
  function onchange(a) {
    let temp = new Date(d);
    temp.getDate(2);
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
    // return canceledDates.includes(
    //   d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + i
    // );
  }

  function doSignup() {
    // let dStr = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + popup.date;
    // setCD(canceledDates.filter((v) => v !== dStr));
    // let popupCopy = { ...popup };
    // popupCopy.isCanceled = false;
    // setPopup(popupCopy);
  }

  async function doCancel() {
    // let dStr = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + popup.date;
    // setCD([...canceledDates, dStr]);
    // let popupCopy = { ...popup };
    // popupCopy.isCanceled = true;
    // setPopup(popupCopy);
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
        {new Array(new Date(d.getFullYear(), d.getMonth()).getDay())
          .fill(0)
          .map((v, i) => (
            <Cell key={i} />
          ))}
        {new Array(getDaysInMnth(d)).fill(0).map((a, i) => (
          <div
            key={i}
            className={`
              border border-l-0 border-b-0 p-2 h-28 flex flex-col items-stretch select-none hover:bg-gray-100
              ${getDay(i + 1) == 6 ? "cursor-pointer " : ""}
              ${
                isSameMonth(d, new Date()) && new Date().getDate() == i + 1
                  ? "bg-red-50"
                  : ""
              }
            `}
            onClick={(ev) => {
              if (getDay(i + 1) == 6) {
                ev.stopPropagation();
                setPopup({
                  d: setDate(d, i + 1) /* calendar date (2025/01/01) */,
                  isCanceled: isCanceled(i + 1),
                });
              }
            }}
          >
            <div className="flex justify-end">{i + 1}</div>
            <div>
              {getDay(i + 1) == 6 ? (
                <ClassComponent
                  classRecords={myRecords.filter((v) =>
                    isSameDay(v.data().date.toDate(), setDate(d, i + 1))
                  )}
                />
              ) : (
                ""
              )}
            </div>
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
          myRecords={myRecords}
          setMyRecords={setMyRecords}
        />
      ) : undefined}
    </div>
  );
}

function Popup({ close, popup, myRecords, setMyRecords }) {
  let { userData } = useContext(AppContext);

  // if (userData.isAdmin) return <AdminPopup {...props} />;
  // else if (userData.type == "teacher") return <TeacherPopup {...props} />;
  // else return <StudentPopup {...props} />;

  return (
    <div
      className={`p-5 absolute grayText rounded-xl border-4 select-none ${kodchasan.className} w-72 sm:w-96 bg-white`}
      style={{
        top: 150,
        left: 50,
      }}
      onClick={(event) => {
        event.stopPropagation();
      }}
    >
      <div className="absolute top-2 right-3">
        <button onClick={close}>x</button>
      </div>

      <div>
        {userData.isAdmin ? (
          <AdminPopup popup={popup} />
        ) : (
          <StudentPopup
            popup={popup}
            myRecords={myRecords}
            setMyRecords={setMyRecords}
          />
        )}
      </div>
    </div>
  );
}

function StudentPopup({ popup, myRecords, setMyRecords }) {
  let { d } = popup;
  let { user } = useContext(AppContext);
  let todaysRecords = myRecords.filter((v) =>
    isSameDay(v.data().date.toDate(), d)
  );
  console.log(todaysRecords);
  let todaysRecord = todaysRecords.length === 0 ? undefined : todaysRecords[0];
  let isCancelled = todaysRecord?.data().type === "absent";

  async function doSignup() {
    if (todaysRecord) {
      setMyRecords(myRecords.filter((v) => v.id !== todaysRecord.id));
      await deleteDoc(doc(db, "records", todaysRecord.id));
    }
  }
  async function doCancel() {
    if (todaysRecord) {
      setMyRecords((myRecords) =>
        myRecords.filter((v) => v.id !== todaysRecord.id)
      );
      await deleteDoc(doc(db, "records", todaysRecord.id));
    }

    const ref = collection(db, "records");
    let docRef = await addDoc(ref, {
      date: d,
      type: "absent",
      uid: user.uid,
    });

    let newRecord = await getDoc(doc(db, "records", docRef.id));
    setMyRecords((myRecords) => [...myRecords, newRecord]);
  }

  return (
    <>
      <div className="pb-2">
        {" "}
        Class for {d.toLocaleDateString()} ({todaysRecord?.data().type})
      </div>
      <div className="">
        <div className="flex justify-center">
          {isCancelled
            ? "You are not coming on this date"
            : "You are signed up on this date"}
        </div>
        <div className="flex justify-center">
          <button
            className="darkBlueBorder border-4 rounded-xl p-1 px-2 blueBody"
            onClick={() => {
              isCancelled ? doSignup() : doCancel();
            }}
          >
            {isCancelled ? "Sign Up" : "Cancel"}
          </button>
        </div>
      </div>
    </>
  );
}

function TeacherPopup({ popup, close, doCancel, doSignup }) {
  let { date, month, isCanceled } = popup;
  let [text, setText] = useState("");
  return (
    <div
      className={`p-5 absolute grayText rounded-xl border-4 select-none ${
        kodchasan.className
      } w-72 sm:w-96
          ${!isCanceled ? `lightBlueBody blueBorder` : `lightRedBody redBorder`}
        `}
      style={{
        top: 150,
        left: 50,
      }}
      onClick={(event) => {
        event.stopPropagation();
      }}
    >
      <div className="absolute top-2 right-3">
        <button onClick={close}>x</button>
      </div>
      <div className="pb-2 text-lg text-bold">
        {" "}
        Class for {months[month] + " " + date}{" "}
      </div>
      {!isCanceled ? (
        <div className="">
          <div className="flex justify-center">
            You are teaching on this date.{" "}
          </div>
          <div className="py-2">
            If you are unable to attend, please explain below:
          </div>
          <textarea
            onChange={(ev) => setText(ev.target.value)}
            value={text}
            rows={5}
            className="border-2 w-64 sm:w-80 rounded-lg resize-none p-2"
            placeholder="Reason for absence.."
          />
          <div className="flex justify-center">
            <button
              className="darkBlueBorder border-4 rounded-xl p-1 px-2 m-3 blueBody disabled:disabledBlueBody "
              onClick={doCancel}
              disabled={text.length === 0}
            >
              {" "}
              SUBMIT
            </button>
          </div>
        </div>
      ) : (
        <div className="">
          <div className="text-center">You are not teaching on this date.</div>
          <div className="flex justify-center">
            <button
              className="darkRedBorder border-4 rounded-xl p-1 px-2 m-3 redBody"
              onClick={doSignup}
            >
              {" "}
              AVAILABLE
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function Cell() {
  return (
    <div className="text-right border border-l-0 border-b-0 p-2 h-28 flex justify-end"></div>
  );
}

function ClassComponent({ classRecords }) {
  let type = "";
  if (classRecords.length > 0) {
    type = classRecords[0].data().type;
  }

  return (
    <div>
      <div />
      <img
        className="h-12"
        src="https://i.imgur.com/qBZge9r.png"
        style={{ filter: "sephia(100%)" }}
      />
      {type === "absent" && "ABSENT"}
      {type === "present" && "PRESENT"}
    </div>
  );
}
