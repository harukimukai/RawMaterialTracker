import { useEffect, useState } from "react"

const GAUGE_MAP = {
    Aluminum: {
        '11': '0.125',
        '12': '0.100',
        '14': '0.080',
        '16': '0.063',
    },
    Mild: {
        '11': '0.120',
        '12': '0.100',
        '14': '0.073',
        '16': '0.060',
    },
    Stainless: {
        '11': '0.120',
        '12': '0.100',
        '14': '0.073',
        '16': '0.060',
    },
}

const AddMaterialForm = ({ onAdd }) => {
    const [formData, setFormData] = useState({
        materialName: '',
        thickness: '',
        thicknessLabel: '',
        standardLength: '120.0',
        standardWidth: '48.0',
        minKeepSize: '5.0'
    })
    const [unit, setUnit] = useState('g')

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => {
            const newState = { ...prev, [name]: value }

            if (unit === 'GA' && (name === 'thicknessLabel' || name === 'materialName')) {
                const autoThickness = GAUGE_MAP[newState.materialName]?.[newState.thicknessLabel]
                if (autoThickness) {
                    newState.thickness = autoThickness
                }
            } else if (unit === 'In') {
                if (name === 'thicknessLabel') {
                    newState.thickness = value
                } else if (name === 'thickness') {
                    newState.thicknessLabel = value
                }
            }
            return newState
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        let finalLabel = formData.thicknessLabel

        if (unit === 'In' && finalLabel && !finalLabel.endsWith('"')) {
            finalLabel = `${finalLabel}"`
        } else if (unit === 'GA' && finalLabel && !finalLabel.endsWith('GA')){
            finalLabel = `${finalLabel}GA`
        }

        onAdd({
            ...formData,
            materialName: formData.materialName,
            thickness: parseFloat(formData.thickness),
            thicknessLabel: finalLabel,
            standardLength: parseFloat(formData.standardLength),
            standardWidth: parseFloat(formData.standardWidth),
            minKeepSize: parseFloat(formData.minKeepSize)
        })
        setFormData({
            materialName: '',
            thickness: '',
            thicknessLabel: '',
            standardLength: '120.0',
            standardWidth: '48.0',
            minKeepSize: '5.0'
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
            <h3 style={formStyles.title}>Register New Material</h3>
            
            {/* Row 1: Material & Unit */}
            <div style={formStyles.row}>
                <div style={formStyles.inputGroup}>
                    <label style={formStyles.label}>Material Name</label>
                    <select name="materialName" value={formData.materialName} onChange={handleChange} required style={formStyles.input}>
                        <option value="">Select</option>
                        <option value="Aluminum">Aluminum</option>
                        <option value="Mild">Mild</option>
                        <option value="Stainless">Stainless</option>
                    </select>
                </div>
                <div style={formStyles.inputGroup}>
                    <label style={formStyles.label}>Thickness Unit</label>
                    <select name="unit" value={unit} onChange={e => setUnit(e.target.value)} style={formStyles.input}>
                        <option value="">Select</option>
                        <option value="GA">GA</option>
                        <option value="In">In</option>
                    </select>
                </div>
            </div>

            {/* Row 2: Thickness Details */}
            <div style={formStyles.row}>
                <div style={formStyles.inputGroup}>
                    <label style={formStyles.label}>Thickness Label</label>
                    <input type="number" name="thicknessLabel" step="0.001" value={formData.thicknessLabel} onChange={handleChange} required style={formStyles.input} />
                </div>
                <div style={formStyles.inputGroup}>
                    <label style={formStyles.label}>Decimal Thickness (in)</label>
                    <input type="number" name="thickness" step="0.001" value={formData.thickness} onChange={handleChange} required style={formStyles.input} />
                </div>
            </div>

            {/* Row 3: Standard Dimensions */}
            <div style={formStyles.row}>
                <div style={formStyles.inputGroup}>
                    <label style={formStyles.label}>Length (Inch)</label>
                    <input type="number" name="standardLength" step="0.001" value={formData.standardLength} onChange={handleChange} required style={formStyles.input} />
                </div>
                <div style={formStyles.inputGroup}>
                    <label style={formStyles.label}>Width (Inch)</label>
                    <input type="number" name="standardWidth" step="0.001" value={formData.standardWidth} onChange={handleChange} required style={formStyles.input} />
                </div>
            </div>

            {/* Row 4: Logic Settings */}
            <div style={formStyles.row}>
                <div style={formStyles.inputGroup}>
                    <label style={formStyles.label}>Scrap Threshold (Inches)</label>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ fontSize: '0.9rem' }}>Scrap if less than</span>
                        <input 
                            type="number" 
                            name="minKeepSize" 
                            step="0.1" 
                            value={formData.minKeepSize} 
                            onChange={handleChange} 
                            required 
                            style={{ ...formStyles.input, flex: 1 }} 
                        />
                    </div>
                </div>
            </div>

            <button type="submit" style={formStyles.submitBtn}>
                + Add to Database
            </button>
        </form>
    )
}

export default AddMaterialForm