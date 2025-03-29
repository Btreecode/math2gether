export default function RecordTable({ records }) {
  return (
    <>
      <h4 className="text-lg font-bold">Records</h4>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          {records.map((r) => (
            <tr key={r.id}>
              <td>{r.data().date.toDate().toLocaleString()}</td>
              <td>{r.data().type}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
