'use client'

import { useEffect } from "react";
import { useState } from "react"
import { db } from "@/lib/firebase/config";
import { collection, getDocs } from "firebase/firestore";

export default function AdminStudentsPage() {
    let [students, setS] = useState([]);

    async function loadNames() {
        let c = collection(db, "userData");
        let snapshot = await getDocs(c);
        setS(snapshot.docs);
    }

    useEffect(() => {
        loadNames()
    }, [])

    return (
        <div>
            <table>
                {students.map(s => <tr key={s.id}>
                    <td>{s.id}</td>
                    <td>{s.data().fname}</td>
                </tr>)}
            </table>

        </div>

    );
}