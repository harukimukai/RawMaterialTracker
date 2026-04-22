import { useEffect, useState } from "react"
import api from '../../api/axios'

const AddJobForm = ({ materials, onAdd }) => {
    const [formData, setFormData] = useState({
        jobNumber: '',
        partNumber: '',
        materialId: '',
        remnantLength: 0,
        requiredWidth: '48.0',
        partQuantity: 1
    })
    const [stockSummary, setStockSummary] = useState(null)
    const [fullSheetCount, setFullSheetCount] = useState(0)
    const totalLength = (parseInt(fullSheetCount || 0) * 120) + parseFloat(formData.remnantLength || 0)

    useEffect(() => {
        if (!formData.materialId) {
            setStockSummary(null)
            return
        }

        const fetchStockStatus = async () => {
            try {
                const res = await api.get('/api/stockitems')
                const available = res.data.filter(s => s.materialId == parseInt(formData.materialId) && s.status == 'Available')

                const currentMaterial = materials.find(m => m.id == parseInt(formData.materialId))
                if (!currentMaterial) return

                const summary = available.reduce((acc, item) => {
                    console.log(Math.abs(item.length - currentMaterial.standardLength))
                    const isFullSheet = Math.abs(item.length - currentMaterial.standardLength) < 0.1 && Math.abs(item.width - currentMaterial.standardWidth) < 0.1

                    const qty = Number(item.quantity || 1)

                    if (isFullSheet) {
                        acc.fullSheets += qty
                    } else {
                        acc.remnants += qty
                    }
                    return acc
                }, { fullSheets: 0, remnants: 0 })
                setStockSummary(summary)
            } catch (error) {
                console.error("Failed to fetch stock status: ", error)
            }
        }

        fetchStockStatus()
    }, [formData.materialId])

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ... prev, [name]: value }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        onAdd({
            jobNumber: formData.jobNumber,
            partNumber: formData.partNumber,
            materialId: parseInt(formData.materialId),
            requiredLength: totalLength,
            requiredWidth: parseFloat(formData.requiredWidth),
            partQuantity: parseInt(formData.partQuantity)
        })
        setFormData({ 
            jobNumber: '',
            partNumber: '', 
            materialId: '', 
            remnantLength: 0, 
            requiredWidth: '48.0', 
            partQuantity: 1 
        })
    }

    const formStyles = {
        container: {
            backgroundColor: '#252525',
            padding: '20px',
            borderRadius: '8px',
            color: '#e0e0e0'
        },
        title: {
            marginTop: 0,
            marginBottom: '20px',
            fontSize: '1.2rem',
            color: '#3498db',
            borderBottom: '1px solid #333',
            paddingBottom: '10px'
        },
        row: {
            display: 'flex',
            gap: '20px',
            marginBottom: '15px',
            flexWrap: 'wrap'
        },
        inputGroup: {
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            minWidth: '150px'
        },
        label: {
            fontSize: '0.85rem',
            color: '#888',
            marginBottom: '5px'
        },
        input: {
            padding: '10px',
            backgroundColor: '#333',
            border: '1px solid #444',
            borderRadius: '4px',
            color: '#fff',
            fontSize: '1rem',
            outline: 'none'
        },
        submitBtn: {
            backgroundColor: '#3498db',
            color: 'white',
            border: 'none',
            padding: '12px 25px',
            borderRadius: '5px',
            fontWeight: 'bold',
            cursor: 'pointer',
            marginTop: '10px',
            transition: 'background-color 0.2s',
            width: '100%'
        }
    }

    return (
      <form onSubmit={handleSubmit} style={formStyles.container}>
          <h3 style={formStyles.title}>Register New Job</h3>
          
          <div style={formStyles.row}>
              <div style={formStyles.inputGroup}>
                  <label style={formStyles.label}>Job Number</label>
                  <input type="text" name="jobNumber" value={formData.jobNumber} onChange={handleChange} required style={formStyles.input} placeholder="12345-0" />
              </div>
              <div style={formStyles.inputGroup}>
                  <label style={formStyles.label}>Part Number</label>
                  <input type="text" name="partNumber" value={formData.partNumber} onChange={handleChange} required style={formStyles.input} placeholder="Bracket-B" />
              </div>
          </div>

          <div style={formStyles.row}>
              <div style={formStyles.inputGroup}>
                  <label style={formStyles.label}>Material</label>
                  <select name="materialId" value={formData.materialId} onChange={handleChange} required style={formStyles.input}>
                      <option value="">Select Material</option>
                      {materials.map(m => (
                          <option key={m.id} value={m.id}>{m.materialName} ({m.thicknessLabel})</option>
                      ))}
                  </select>
              </div>
          </div>

          <div style={formStyles.row}>
              <div style={formStyles.inputGroup}>
                  <label style={formStyles.label}>Full Sheets (120")</label>
                  <input type="number" value={fullSheetCount} onChange={(e) => setFullSheetCount(e.target.value)} style={formStyles.input} />
              </div>
              <div style={formStyles.inputGroup}>
                  <label style={formStyles.label}>+ Remnant Length (in)</label>
                  <input type="number" name="remnantLength" step="0.001" value={formData.remnantLength} onChange={handleChange} style={formStyles.input} />
              </div>
          </div>

          <div style={{ ...formStyles.row, backgroundColor: '#333', padding: '10px', borderRadius: '4px' }}>
              <div style={formStyles.inputGroup}>
                  <label style={{ ...formStyles.label, color: '#3498db' }}>Calculated Total Length</label>
                  <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{totalLength.toFixed(3)}"</div>
              </div>
              <div style={formStyles.inputGroup}>
                  <label style={formStyles.label}>Required Width</label>
                  <input type="number" name="requiredWidth" step="0.001" value={formData.requiredWidth} onChange={handleChange} required style={formStyles.input} />
              </div>
          </div>

          <div style={formStyles.row}>
              <div style={formStyles.inputGroup}>
                  <label style={formStyles.label}>Part Quantity</label>
                  <input type="number" name="partQuantity" value={formData.partQuantity} onChange={handleChange} required style={formStyles.input} />
              </div>
          </div>

        {formData.materialId && stockSummary && (
            <div style={{ marginTop: '10px', padding: '10px', backgroundColor: '#1a1a1a', borderRadius: '4px', borderLeft: '4px solid #3498db' }}>
                <div style={{ fontSize: '0.9rem', marginBottom: '5px' }}>
                    <span style={{ color: '#fff', fontWeight: 'bold' }}>Stock Status:</span>
                </div>
                <div style={{ display: 'flex', gap: '20px' }}>
                    <div style={{ color: stockSummary.fullSheets > 0 ? '#4CAF50' : '#888' }}>
                        Full Sheets: <strong>{stockSummary.fullSheets}</strong>
                    </div>
                    <div style={{ color: stockSummary.remnants > 0 ? '#f1c40f' : '#888' }}>
                        Remnants: <strong>{stockSummary.remnants}</strong>
                    </div>
                </div>
            </div>
        )}

          <button type="submit" style={formStyles.submitBtn}>Add Job to Schedule</button>
      </form>
    )
}

export default AddJobForm
