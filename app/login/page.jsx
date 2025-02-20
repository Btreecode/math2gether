"use client";
import { useState, Suspense } from "react";
import { kodchasan } from "../../components/font-loader";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase/config";

const ERR_MSGS = {
  "auth/invalid-credential": "Incorrect email/password"
};

export default function Login() {
  return <Suspense><Logins2 /></Suspense>
}

function Logins2() {
  let [username, setUsername] = useState("");
  let [password, setPassword] = useState("");
  let [err, setErr] = useState(undefined);

  async function signInWithEmail(ev) {
    ev.preventDefault();
    setErr(undefined);
    try {
      await signInWithEmailAndPassword(auth, username, password);
    } catch (e) {
      setErr(e.code);
    }
  }

  return (
    <div className={`${kodchasan.className} m-5 grayText`}>
      <form onSubmit={signInWithEmail}>
        <div className="flex flex-col items-center">
          <div className="text-xl sm:text-2xl"> LOGIN </div>
          <div className="text-base mt-5 sm:text-xl">
            EMAIL:{" "}
            <input
              className="border px-2 text-lg"
              placeholder="example@email.com"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </div>
          <div className="text-base mt-5 sm:text-xl">
            PASSWORD:{" "}
            <input
              className="border px-2 text-lg"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <button type="button" className="underline text-sm mt-3">
            Forgot your password? (TODO)
          </button>
          <button className="text-xl sm:text-2xl btn mt-4" type="submit"> SIGN IN </button>

          {
            err && (
              <div className="text-red-500">{ERR_MSGS[err] || "Please try again"}</div>
            )
          }
        </div>
      </form>
      <button className="btn btn-primary" onClick={()=>signInWithEmailAndPassword(auth, "test2@test", "test123")}>student</button>
      <button className="btn btn-primary" onClick={()=>signInWithEmailAndPassword(auth, "jennyjaeheepark@gmail.com", "test123")}>admin/teacher</button>
    </div>
  )
}
