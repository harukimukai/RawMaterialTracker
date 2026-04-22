import { useState } from "react"

const AddStockForm = ({ materials, onAdd }) => {
    const [formData, setFormData] = useState({
        materialId: '',
        length: '',
        width: '48.0',
        quantity: 1,
        location: 'Floor'
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        onAdd({
            ...formData,
            materialId: parseInt(formData.materialId),
            length: parseFloat(formData.length),
            width: parseFloat(formData.width),
            quantity: parseInt(formData.quantity)
        })
        setFormData({ materialId: '', length: '', width: '48.0', quantity: 1 });
    }

    return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '30px', padding: '15px', border: '1px solid #cccccc' }}>
      <h3>Register New Stock</h3>
      <div>
        <label>Material: </label>
        <select name="materialId" value={formData.materialId} onChange={handleChange} required>
          <option value="">Select</option>
          {materials.map(m => (
            <option key={m.id} value={m.id}>{m.materialName} ({m.thickness})</option>
          ))}
        </select>
      </div>
      <div>
        <label>Length (Inch): </label>
        <input type="number" name="length" step="0.001" value={formData.length} onChange={handleChange} required />
        <label> Width (Inch): </label>
        <input type="number" name="width" step="0.001" value={formData.width} onChange={handleChange} required />
      </div>
      <div>
        <label>Quantity: </label>
        <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} required />
      </div>
      <button type="submit" style={{ marginTop: '10px' }}>Add</button>
    </form>
  )
} 


export default AddStockForm