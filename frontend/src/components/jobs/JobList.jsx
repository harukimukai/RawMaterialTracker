const JobList = ({ jobs }) => {
    return (
    <div className="job-list" style={{ marginTop: '40px' }}>
      <h2>Job List</h2>
      <table border="1" style={{ width: '100%', marginTop: '10px' }}>
        <thead>
          <tr>
            <th>Part Name</th>
            <th>Material</th>
            <th>Required Size (L x W in)</th>
            <th>Quantity</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {jobs.length === 0 ? (
            <tr><td colSpan="5" style={{ textAlign: 'center' }}>No Jobs</td></tr>
          ) : (
            jobs.map(j => (
              <tr key={j.id}>
                <td>{j.partName}</td>
                <td>{j.material?.name} ({j.material?.thicknessLabel})</td>
                <td>{j.requiredLength}" x {j.requiredWidth}"</td>
                <td>{j.quantity}</td>
                <td>{j.isCompleted ? 'Completed' : 'Pending'}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}

export default JobList