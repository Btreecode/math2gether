import Link from "next/link";
import { kodchasan } from "../../components/font-loader";

export default function Sign() {
  let text = "h-52 sm:h-60 md:h-72 lg:h-96 rounded-2xl flex justify-center items-end p-5";
  return (
    <div>
      <div className={`${kodchasan.className} text-2xl grayText m-5`}>
        {" "}
        I AM A...{" "}
      </div>
      <div
        className={`grid grid-cols-2 ${kodchasan.className} text-lg sm:text-2xl grayText m-5 lg:mt-2 sm:m-10 lg:m-15 gap-5 sm:gap-10 lg:gap-15 `}
      >
        <Link className={`blueBody ${text}`} href="/signup?type=student">
          STUDENT
        </Link>
        <Link className={`grayBody ${text}`} href="/signup?type=teacher">
          TEACHER
        </Link>
      </div>
    </div>
  );
}
