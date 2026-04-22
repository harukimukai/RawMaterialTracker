const StockList = ({ stocks }) => {
    return (
      <div className="stock-list">
      <h2>Current Stock List</h2>
      <table border="1" style={{ width: '100%', marginTop: '10px' }}>
        <thead>
          <tr>
            <th>Materials</th>
            <th>Size (L x W)</th>
            <th>Quantity</th>
            <th>Status</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          {stocks.map(s => (
            <tr key={s.id}>
              <td>{s.material?.materialName} ({s.material?.thickness})</td>
              <td>{s.length}" x {s.width}"</td>
              <td>{s.quantity}</td>
              <td style={{ color: s.status === 'PendingScrap' ? 'red' : 'green' }}>
                {s.status}
              </td>
              <td>{s.location}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}


export default StockList