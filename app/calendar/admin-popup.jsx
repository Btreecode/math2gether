import { db } from "@/lib/firebase/config";
import { endOfDay, startOfDay, isBefore } from "date-fns";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";

export default function AdminPopup({ popup }) {
  let { d } = popup;
  let [allStudents, setAllStudents] = useState([]);
  let [records, setRecords] = useState([]);

  async function loadActiveStudents() {
    const snapshot = await getDocs(collection(db, "userData"));
    const docs = snapshot.docs;
    setAllStudents(docs);
  }

  async function loadRecords() {
    const q = query(
      collection(db, "records"),
      where("date", ">=", startOfDay(d)),
      where("date", "<=", endOfDay(d))
    );
    const snapshot = await getDocs(q);
    const docs = snapshot.docs;
    setRecords(docs);
    let ids = docs.map(d => d.id);

    // today or future
    // if (d >= )
    //   loadActiveStudents()
    // else
    //   loadStudents(ids)

  }

  async function updateRecord(sid, type) {

    const q = query(
      collection(db, "records"),
      where("date", ">=", startOfDay(d)),
      where("date", "<=", endOfDay(d)),
      where("uid", "==", sid)
    );
    const snapshot = await getDocs(q);
    const docs = snapshot.docs;

    docs.forEach(d => {
      const docRef = doc(db, "records", d.id)
      deleteDoc(docRef);

    });

    const docRef = await addDoc(collection(db, "records"), {
      date: d,
      type: type,
      uid: sid
    });

    loadRecords();
  }

  useEffect(() => {
    // loadStudents();
    loadRecords();
  }, []);

  return (
    <div>
      <div>{isBefore(d, startOfDay(new Date())) ? 1 : 0}</div>
      <h1>Students</h1>
      <div>
        {allStudents
          .filter((s) => s.data().type === "student")
          .map((s, i) => (
            <Student
              s={s}
              records={records.filter((r) => r.data().uid === s.id)}
              updateRecord={updateRecord}
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
              updateRecord={updateRecord}
              key={s.id}
            />
          ))}
      </div>
    </div>
  );
}

function Student({ s, records, updateRecord }) {
  let sd = s.data();

  let isPresent = records[0]?.data().type === "present";
  let isAbsent = records[0]?.data().type === "absent";

  // function addRecords(type) {
  //   // const q = query(
  //   //   collection(db, "records"),
  //   //   where("date", ">=", startOfDay(d)),
  //   //   where("date", "<=", endOfDay(d)),
  //   //   where("uid", "==", s.id)
  //   // );
  //   // let docs = getDocs(q);
  //   // if (docs.length > 1) {
  //   //     // delete
  //   // }
  //   // setRecords(records.filter(r => r.data().uid === u.id);
  //   // insert
  // }

  return (
    <div className="flex items-center justify-between space-x-2">
      <div className="w-24">
        {sd.fname} {sd.lname}
      </div>
      <div>
        <button
          className={`border px-2 py-0.5 ${isPresent ? "bg-green-300" : "bg-gray-100"
            }`}
          onClick={() => updateRecord(s.id, "present")}
        >
          P
        </button>
        <button
          className={`border px-2 py-0.5 ${isAbsent ? "bg-red-300" : "bg-gray-100"
            }`}
          onClick={() => updateRecord(s.id, "absent")}
        >
          A
        </button>
      </div>
    </div>
  );
}
