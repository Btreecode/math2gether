import { db } from "@/lib/firebase/config";
import { endOfDay, startOfDay } from "date-fns";
import {
  collection,
  deleteDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";

export default function AdminPopup({ popup }) {
  let { d } = popup;
  let [allStudents, setAllStudents] = useState([]);
  let [records, setRecords] = useState([]);

  async function loadStudents() {
    const snapshot = await getDocs(collection(db, "userData"));
    const docs = snapshot.docs;
    setAllStudents(docs);
  }

  async function loadRecords() {
    console.log(d);
    const q = query(
      collection(db, "records"),
      where("date", ">=", startOfDay(d)),
      where("date", "<=", endOfDay(d))
    );
    const snapshot = await getDocs(q);
    const docs = snapshot.docs;
    setRecords(docs);
  }

  useEffect(() => {
    loadStudents();
    loadRecords();
  }, []);

  return (
    <div>
      <h1>Students</h1>
      <div>
        {allStudents
          .filter((s) => s.data().type === "student")
          .map((s, i) => (
            <Student
              s={s}
              records={records.filter((r) => r.data().uid === s.id)}
              key={s.id}
            />
          ))}
      </div>

      <hr className="m-12" />

      <h1>Teachers</h1>
      <div>
        {allStudents
          .filter((s) => s.data().type === "teacher")
          .map((s, i) => (
            <Student
              s={s}
              records={records.filter((r) => r.data().uid === s.id)}
              key={s.id}
            />
          ))}
      </div>
    </div>
  );
}

function Student({ s, records }) {
  let sd = s.data();

  let isPresent = records[0]?.data().type === "present";
  let isAbsent = records[0]?.data().type === "absent";

  function addRecords(type) {
    // const q = query(
    //   collection(db, "records"),
    //   where("date", ">=", startOfDay(d)),
    //   where("date", "<=", endOfDay(d)),
    //   where("uid", "==", s.id)
    // );
    // let docs = getDocs(q);
    // if (docs.length > 1) {
    //     // delete
    // }
    // setRecords(records.filter(r => r.data().uid === u.id);
    // insert
  }

  return (
    <div className="flex items-center justify-between space-x-2">
      <div className="w-24">
        {sd.fname} {sd.lname}
      </div>
      <div>
        <button
          className={`border px-2 py-0.5 ${
            isPresent ? "bg-green-300" : "bg-gray-100"
          }`}
          onClick={() => addRecords("present")}
        >
          P
        </button>
        <button
          className={`border px-2 py-0.5 ${
            isAbsent ? "bg-red-300" : "bg-gray-100"
          }`}
          onClick={() => addRecords("absent")}
        >
          A
        </button>
      </div>
    </div>
  );
}
