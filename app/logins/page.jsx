"use client";
import { useState, useContext } from "react";
import { kodchasan } from "../../components/font-loader";
import Link from "next/link";
import AppContext from "@/components/app-context";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase/config";
import { useParams, useSearchParams } from "next/navigation";

const ERR_MSGS = {
  "auth/invalid-credential": "Incorrect email/password"
};

export default function Logins() {
  let [username, setUsername] = useState("");
  let [password, setPassword] = useState("");
  let [err, setErr] = useState(undefined);
  let type = useSearchParams().get("type");
  let { setUser } = useContext(AppContext);

  async function signInWithEmail(ev) {
    ev.preventDefault();
    setErr(undefined);
    try {
      await signInWithEmailAndPassword(auth, username, password);
    } catch (e) {
      console.log(123, e.code);
      setErr(e.code);
    }
  }

  return (
    <div className={`${kodchasan.className} m-5 grayText`}>
      <Link href="/login" className="text-base flex">
        {" "}
        {"< BACK"}{" "}
      </Link>

      <form onSubmit={signInWithEmail}>
        <div className="flex flex-col items-center">
          <div className="text-xl sm:text-2xl"> {type?.toUpperCase()} LOGIN </div>
          <div className="text-base mt-5 sm:text-xl">
            EMAIL:{" "}
            <input
              className="border px-2 text-lg"
              placeholder="ex. JDoe@jd.com"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </div>
          <div className="text-base mt-5 sm:text-xl">
            PASSWORD:{" "}
            <input
              className="border px-2 text-lg"
              placeholder="ex. JDoe123"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <button className="underline text-sm mt-3">
            Forgot your password?
          </button>
          <button className="text-xl sm:text-2xl btn mt-4"> SIGN IN </button>

          {
            err && (
              <div className="text-red-500">{ERR_MSGS[err] || "Please try again"}</div>
            )
          }
        </div>
      </form>
    </div>
  )
}
