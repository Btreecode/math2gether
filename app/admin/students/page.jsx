"use client";

import { useEffect } from "react";
import { useState } from "react";
import { db } from "@/lib/firebase/config";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

export default function AdminStudentsPage() {
  let [students, setS] = useState([]);
  let [last_updated_id, setLUI] = useState(undefined);

  async function loadNames() {
    setS([]);
    let c = collection(db, "userData");
    let q = query(c, where("type", "!=", "teacher"));
    let snapshot = await getDocs(q);
    setS(snapshot.docs);
  }

  useEffect(() => {
    loadNames();
  }, []);

  async function changeActiveStatus(student_id, is_active) {
    let d = doc(db, "userData", student_id);
    await updateDoc(d, {
      is_active: is_active,
    });
    let updated_doc = await getDoc(d);
    setS(students.map((s) => (s.id === student_id ? updated_doc : s)));
    setLUI(student_id);
    setTimeout(() => {
      setLUI(-1);
    }, 2000);
  }

  return (
    <div>
      <button className="btn" onClick={loadNames}>
        reload
      </button>

      <h1 className="text-3xl">Active Students</h1>
      <Table
        students={students}
        changeActiveStatus={changeActiveStatus}
        last_updated_id={last_updated_id}
        is_active={true}
      />
      <hr />
      <h1 className="text-3xl">Inactive Students</h1>
      <Table
        students={students}
        changeActiveStatus={changeActiveStatus}
        last_updated_id={last_updated_id}
        is_active={false}
      />
    </div>
  );
}

function Table({ students, changeActiveStatus, last_updated_id, is_active }) {
  return (
    <table className="admin-table">
      <tr>
        <th colSpan={2} width={150}>
          Name
        </th>
        <th>Date of Enrollment</th>
        <th>type</th>
        <th></th>
      </tr>
      {students
        .filter((s) => !!s.data().is_active === is_active)
        .filter(s=>s.data().type === "student")
        .map((s) => (
          <tr
            key={s.id}
            className={`
                duration-150
                ${last_updated_id === s.id ? "bg-green-300" : "bg-white"}`}
          >
            <td>{s.data().fname}</td>
            <td>{s.data().lname}</td>
            <td>{s.data().doe.toDate().toLocaleDateString()}</td>
            <td>{s.data().type}</td>
            <td>
              <button
                className="btn"
                onClick={() => changeActiveStatus(s.id, !s.data().is_active)}
              >
                {s.data().is_active ? "deactivate" : "active"}
              </button>
            </td>
          </tr>
        ))}
    </table>
  );
}
