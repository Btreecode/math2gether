import { isSameDay, subDays } from "date-fns";

function getSaturdays() {
  let ret = [];

  let d = new Date();
  while (d.getDay() != 6) {
    d = subDays(d, 1);
  }

  ret.push(d);

  for (let i = 0; i < 15; i++) {
    d = subDays(d, 7);
    ret.push(d);
  }

  // reverse
  for (let i = 0; i < ret.length / 2; i++) {
    let tp = ret[i];
    ret[i] = ret[ret.length - 1 - i];
    ret[ret.length - 1 - i] = tp;
  }

  return ret;
}

export default function RecordTable2({ records }) {
  let everySaturdays = getSaturdays();

  return (
    <div>
      <h4 className="text-lg font-bold mt-2">Records 2</h4>
      <div>
        {everySaturdays.map((v, i) => (
          <div key={i} className="flex gap-2">
            <div className="w-24">{v.toLocaleDateString()}</div>
            <div>
              {
                records
                  .filter((vv) => isSameDay(vv.data().date.toDate(), v))[0]
                  ?.data().type
              }
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
