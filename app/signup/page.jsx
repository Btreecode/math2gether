"use client";
import { Suspense, useContext, useState } from "react";
import { kodchasan } from "../../components/font-loader";
import AppContext from "@/components/app-context";
import { addDoc, collection, doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase/config";
import { parse } from "date-fns"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { useSearchParams } from "next/navigation";

export default function SignUp() {
  let params = useSearchParams();
  let type = params.get("type");


  return <SignUp2 type={type} />;
  return <Suspense><SignUp2 type={undefined} /></Suspense>
}

function SignUp2({ type }) {
  let { user, setUser } = useContext(AppContext);
  let [err, setErr] = useState(false);

  async function handleSubmit(ev) {
    ev.preventDefault();
    const formData = Object.fromEntries(new FormData(ev.target))
    if (formData.pswd != formData.cpswd) {
      setErr(true);
      return;
    }
    let d = await createUserWithEmailAndPassword(auth, ev.target.email.value, formData.pswd)
    let uid = d.user.uid;

    formData.grade = parseInt(formData.grade)
    formData.bday = parse(formData.bday, 'yyyy-MM-dd', new Date())
    formData.type = type;
    formData.uid = uid;
    formData.doe = new Date()
    let c = collection(db, "userData")
    let { id } = await addDoc(c, formData)
    let newDoc = await getDoc(doc(db, "userData", id))
  }
  return (
    <div
      className={`${kodchasan.className} grayText text-base sm:text-xl`}
    >
      <form className="flex flex-col items-center" onSubmit={handleSubmit}>
        <div className="grayText m-5 text-xl sm:text-2xl">{type.toUpperCase()} SIGN UP</div>

        <UserInput name="fname" type="First Name: " PH="John" />
        <UserInput name="pname" type="Preferred Name (Optional) " PH="Johnny" req={false} />
        <UserInput name="lname" type="Last Name: " PH="Doe" />
        <UserInput name="bday" type="Date of Birth (mm/dd/yyyy): " PH="01/24/2015" itype="date" />
        <UserInput name="school" type="School: " PH="Hello Elementary" />
        <UserInput name="grade" type="Grade (2024-2025): " PH="6" itype="number" />
        <UserInput name="phone" type="Phone Number: " PH="949-123-4567" />
        <UserInput name="email" type="Email: " PH="example@email.com" itype="email" />
        <UserInput name="pswd" type="Password" itype="password" ph={false} />
        <UserInput name="cpswd" type="Confirm Password" itype="password" ph={false} />
        {err && <div className="text-red-500 text-xs sm:text-sm -mt-2">Passwords do not match. </div>
        }

        <div className="mx-5 " > Reason for Enrollment: </div>
        <input
          className="border px-2 mx-5 mb-2 w-4/5 sm:w-3/5"
          name="rfe"
        />
        <button className="text-xl sm:text-2xl btn my-4 mb-20"> Sign Up </button>
      </form>
    </div>
  );
}

function UserInput({ name, type, ph = true, PH, req = true, itype = "text" }) {
  return (
    <div className="flex flex-col items-center">
      <div className="mx-5 "> {type} {req && <div className="text-red-500 inline">*</div>}</div>
      <input
        name={name}
        className="border px-2 mx-5 mb-2 w-60"
        placeHolder={ph && ("ex. " + PH)}
        required={req}
        type={itype}
      // value={username}
      // onChange={(event) => setUsername(event.target.value)}
      />
    </div>
  )
}