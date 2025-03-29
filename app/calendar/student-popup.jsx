import AppContext from "@/components/app-context";
import { db } from "@/lib/firebase/config";
import { isBefore, isSameDay } from "date-fns";
import { addDoc, collection, deleteDoc, doc, getDoc } from "firebase/firestore";
import { useContext } from "react";

export default function StudentPopup({ popup, myRecords, setMyRecords }) {
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
