import { kodchasan } from "../../components/font-loader";

let title = "flex justify-center text-base sm:text-lg";
let body = "flex justify-center text-sm";
let shape = "w-full rounded-md yellowBody p-3";

export default function About() {
  let Jdes = "hlelo im ur fav jenny ahahhahaha";
  let Cdes = "";
  let Sdes = "";
  let volunteers = [
    { firstName: "MICHELLE", lastName: "PARK", grade: 12 },
    { firstName: "SEONGWON", lastName: "JANG", grade: 11 },
    { firstName: "SEONGYUN", lastName: "JANG", grade: 11 },
    { firstName: "TIFFANIE", lastName: "CHANG", grade: 9 },
    { firstName: "KENNETH", lastName: "CHUNG", grade: 9 },
    { firstName: "BENJAMIN", lastName: "MOON", grade: 9 },
    // {firstName: "", lastName: "", grade:},
  ];
  return (
    <div>
      <div />
      <div
        className={`flex justify-center text-2xl grayText mt-5 ${kodchasan.className}`}
      >
        FOUNDERS
      </div>
      <div
        className={`grid sm:grid-cols-2 md:grid-cols-3 gap-1 m-5 grayText ${kodchasan.className}`}
      >
        <Board name="JAEHEE PARK" position="President" desc={Jdes} />
        <Board name="YUMIN YANG" position="Vice-President" desc={Cdes} />
        <Board name="SOPHIA KIM" position="Secretary" desc={Sdes} />
      </div>
      <div
        className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 m-5 grayText ${kodchasan.className}`}
      >
        {volunteers.map((v, i) => (
          <Volunteer
            firstName={v.firstName}
            lastName={v.lastName}
            grade={v.grade}
          />
        ))}
      </div>
    </div>
  );
}

function Board({ name, position, desc }) {
  return (
    <div className={`${shape} bg-gray-400`}>
      <div className={title}> {name} </div>
      <div className={body}>{position}</div>
      <div className="text-sm"> {desc}</div>
    </div>
  );
}

function Volunteer({ firstName, lastName, grade }) {
  return (
    <div className="m-1">
      <div className={title}> {firstName + " " + lastName}</div>
      <div className={body}> grade: {grade}</div>
    </div>
  );
}
