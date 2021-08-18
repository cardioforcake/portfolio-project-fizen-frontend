export default function DashboardPage({ goals }) {
  return (
    <div>
      <h1>Dashboard</h1>
      <h2>My Goals</h2>
      {
        goals.length ?
          goals.map((goal) => <li key={goal._id}>{goal.title}</li>)
          : <span>no goals</span>
      }
    </div>
  );
}
