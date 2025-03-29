"use client";

import { db } from "@/lib/firebase/config";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import RecordTable2 from "./record-table2";

export default function StudentPage() {
  let [records, setRecords] = useState([]);
  let { id } = useParams();

  useEffect(() => {
    if (id) loadRecords();
  }, [id]);

  async function loadRecords() {
    const ref = collection(db, "records");
    const q = query(ref, where("uid", "==", id));
    const querySnap = await getDocs(q);
    setRecords(querySnap.docs);
  }

  return (
    <div>
      <h1>{id}</h1>
      <button className="btn" onClick={loadRecords}>
        refresh
      </button>
      {/* <RecordTable records={records} /> */}
      <RecordTable2 records={records} />
    </div>
  );
}
