import { kodchasan } from "../../components/font-loader";
import Link from "next/link";

export default function LogIn() {
  return <div>login</div>;
}

function LogInOld() {
  let text = "h-52 rounded-2xl flex justify-center items-end p-5";
  return (
    <div>
      <div className={`${kodchasan.className} text-2xl grayText m-5`}>
        {" "}
        I AM A...{" "}
      </div>
      <div
        className={`grid grid-cols-3 ${kodchasan.className} text-lg sm:text-2xl grayText m-2 lg:mt-2 sm:m-5 lg:m-10 gap-2 sm:gap-5 lg:gap-10 `}
      >
        <Link className={`blueBody ${text}`} href="/logins">
          STUDENT
        </Link>
        <Link className={`grayBody ${text}`} href="/logint">
          TEACHER
        </Link>
      </div>
    </div>
  );
}
