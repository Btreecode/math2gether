import { kodchasan } from "../../components/font-loader";

let title = "flex justify-center text-base sm:text-lg";
let body = "flex justify-center text-sm";
let shape = "w-full rounded-md yellowBody p-3";

export default function About() {
  let Jdes = "Hi! I'm Jenny Jaehee Park and I'm a junior in Portola High School. I've completed advanced math classes at my school such as AP Calculus BC and AP Statistics and I’m currently working on multivariable calculus. I received a 790 out of 800 on the SAT Math portion. I'm very eager to have this opportunity to teach in Math2gether!";
  let Cdes = "Hello! My name is Chloe Yumin Yang and I'm a senior at University High School. I've completed classes such as AP Calculus BC and am currently working on AP Statistics. I've also worked on SAT Math and received a 790 for math and have 4 years of experience teaching outside of this program.";
  let Sdes = "Hi! I'm Sophia Kim and I am a sophomore at Portola High School, currently taking the AP Precalculus course. I am experienced in beginning calculus as a learner of the Kumon level L curriculum. I am also a national winner of the USA Math Kangaroo competition. ";
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
            key={i}
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
