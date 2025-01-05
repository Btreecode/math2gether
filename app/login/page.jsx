import Link from "next/link";
import { kodchasan } from "../../components/font-loader";

export default function Idk() {
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
        <Link className={`blueBody ${text}`} href="/logins?type=student">
          STUDENT
        </Link>
        <Link
          className={`yellowBody ${text} flex flex-col items-center justify-center`}
          href="/logins?type=parent"
        >
          <img src="https://i.imgur.com/Jc7xxX0.png" />
          <div>PARENT</div>
        </Link>
        <Link className={`grayBody ${text}`} href="/logins?type=teacher">
          TEACHER
        </Link>
      </div>
    </div>
  );
}
