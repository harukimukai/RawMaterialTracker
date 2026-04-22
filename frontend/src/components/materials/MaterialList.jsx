import { useState } from "react"
import { MaterialDeleteButton } from "../DeleteButton"

const MaterialList = ({ materials, setMaterials }) => {
  const [errorMessage, setErrorMessage] = useState('')

  // 💡 ここで厚み（thickness）の昇順（薄い順）に並び替える
  // なぜ [...materials] と書くの？
  //JavaScriptの .sort() は、元のデータを直接書き換えてしまう性質（破壊的メソッド）がある。Reactでは「元のState（materials）を勝手に変えてはいけない」というルールがあるため、一度 [...] でコピーを作ってから並び替えるのが、バグを防ぐための作法。
  const sortedMaterials = [...materials].sort((a, b) => {
      // 1. まず素材名で比較 (Aluminum -> Mild -> Stainless)
      if (a.materialName < b.materialName) return -1;
      if (a.materialName > b.materialName) return 1;
      
      // 2. 素材名が同じなら、厚みで比較
      return a.thickness - b.thickness;
  })

  return (
    <div className="stock-list">
      <h2>Material List</h2>
      {errorMessage && (
        <div style={{
          backgroundColor: '#ffebee', // 薄い赤
          color: '#c62828',           // 濃い赤
          padding: '10px',
          border: '1px solid #c62828',
          borderRadius: '4px',
          marginBottom: '10px',
          fontWeight: 'bold'
        }}>
          {errorMessage}
        </div>
      )}
      <table border="1" style={{ width: '100%', marginTop: '10px' }}>
        <thead>
          <tr>
            <th>Materials</th>
            <th>Thickness Label</th>
            <th>Thickness (in)</th>
            <th>Standard Size (L x W)</th>
          </tr>
        </thead>
        <tbody>
          {sortedMaterials.map(m => (
            <tr key={m.id}>
              <td>{m.materialName}</td>
              <td>{m.thicknessLabel}</td>
              <td>{m.thickness.toFixed(3)}</td>
              <td>{m.standardLength}" x {m.standardWidth}"</td>
              <MaterialDeleteButton id={m.id} setMaterials={setMaterials} setErrorMessage={setErrorMessage}/>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default MaterialList