import { useEffect, useState } from 'react'
import api from './api/axios'
import './App.css'
import AddStockForm from './components/stocks/AddStockForm'
import StockList from './components/stocks/StockList'
import AddJobForm from './components/jobs/AddJobForm'
import AddMaterialForm from './components/materials/AddMaterialForm'
import MaterialList from './components/materials/MaterialList'
import JobList from './components/jobs/JobList'
import { Anvil } from 'lucide-react'

function App() {
  const [materials, setMaterials] = useState([])
  const [stocks, setStocks] = useState([])
  const [jobs, setJobs] = useState([])
  const [showAddForm, setShowAddForm] = useState('materials')
  const [showList, setShowList] = useState('materials')
  const [globalError, setGlobalError] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      const [stockRes, materialRes] = await Promise.all([
        api.get('/api/stockitems'),
        api.get('/api/materials'),
        //api.get('/api/jobs')
      ])
      setStocks(stockRes.data)
      setMaterials(materialRes.data)
      //setJobs(jobRes.data)
    }
    fetchData()
  }, [])

  const handleAddStock = async (newStock) => {
    try {
      await api.post('/api/stockitems', newStock)
      // 再取得してリストを更新
      const res = await api.get('/api/stockitems')
      setStocks(res.data)
    } catch (err) {
      console.error("[Add Stock Error]:", err)
    }
  }

  const handleAddMaterial = async (newMaterial) => {
    try {
      await api.post('/api/materials', newMaterial)
      // 再取得してリストを更新
      const res = await api.get('/api/materials')
      setMaterials(res.data)
      setGlobalError('')
    } catch (err) {
      const message = err.response?.data || "Could not add material."
      setGlobalError(message)
    }
  }

  const handleAddJob = async (newJob) => {
    try {
      await api.post('/api/jobs', newJob)
      // 再取得してリストを更新
      const res = await api.get('/api/jobs')
      setJobs(res.data)
      
    } catch (err) {
      console.error("[Add Job] Error:", err)
    }
  }

  const styles = {
    container: {
      maxWidth: '900px',
      margin: '40px auto',
      padding: '30px',
      backgroundColor: '#1a1a1a', // 深いダークグレー
      color: '#e0e0e0',
      borderRadius: '12px',
      boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
      fontFamily: '"Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    },
    header: {
      textAlign: 'center',
      marginBottom: '30px',
      borderBottom: '2px solid #333',
      paddingBottom: '15px',
      color: '#ffffff',
      letterSpacing: '1px'
    },
    navGroup: {
      display: 'flex',
      justifyContent: 'center',
      gap: '15px',
      marginBottom: '25px',
      padding: '10px',
      backgroundColor: '#252525',
      borderRadius: '8px',
    },
    navButton: (active) => ({
      padding: '10px 20px',
      cursor: 'pointer',
      backgroundColor: active ? '#3498db' : '#333',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      fontWeight: 'bold',
      transition: 'all 0.3s ease',
      boxShadow: active ? '0 0 10px rgba(52, 152, 219, 0.5)' : 'none',
      flex: 1,
      maxWidth: '150px'
    }),
    sectionCard: {
      backgroundColor: '#252525',
      padding: '20px',
      borderRadius: '10px',
      marginBottom: '30px',
      border: '1px solid #333'
    },
    errorBanner: {
      backgroundColor: '#cf6679',
      color: '#000',
      padding: '12px',
      borderRadius: '6px',
      marginBottom: '20px',
      fontWeight: 'bold',
      textAlign: 'center',
      boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
    }
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          gap: '10px' // アイコンと文字の間の距離
        }}>
          <Anvil size={40} color='#3e9392'/>
          <span>Raw Material Tracker</span>
        </h1>
      </header>

      {globalError && (
        <div style={styles.errorBanner}>
          ⚠️ {globalError}
        </div>
      )}

      {/* 登録セクションのナビゲーション */}
      <div style={{ marginBottom: '10px', fontSize: '0.9rem', color: '#888', textAlign: 'center' }}>Registration</div>
      <div style={styles.navGroup}>
        <button style={styles.navButton(showAddForm === 'materials')} onClick={() => setShowAddForm('materials')}>+ Materials</button>
        <button style={styles.navButton(showAddForm === 'stocks')} onClick={() => setShowAddForm('stocks')}>+ Stocks</button>
        <button style={styles.navButton(showAddForm === 'jobs')} onClick={() => setShowAddForm('jobs')}>+ Jobs</button>
      </div>

      <div style={styles.sectionCard}>
        {showAddForm === 'materials' && <AddMaterialForm onAdd={handleAddMaterial}/>}
        {showAddForm === 'stocks' && <AddStockForm materials={materials} onAdd={handleAddStock} />}
        {showAddForm === 'jobs' && <AddJobForm materials={materials} onAdd={handleAddJob} />}
      </div>

      <hr style={{ border: 'none', borderTop: '1px solid #333', margin: '40px 0' }} />

      <div style={{ marginBottom: '10px', fontSize: '0.9rem', color: '#888', textAlign: 'center' }}>Dashboard View</div>
      <div style={styles.navGroup}>
        <button style={styles.navButton(showList === 'materials')} onClick={() => setShowList('materials')}>Material List</button>
        <button style={styles.navButton(showList === 'stocks')} onClick={() => setShowList('stocks')}>Stock List</button>
        <button style={styles.navButton(showList === 'jobs')} onClick={() => setShowList('jobs')}>Job List</button>
      </div>

      <div>
        {showList === 'materials' && <MaterialList materials={materials} setMaterials={setMaterials}/>}
        {showList === 'stocks' && <StockList stocks={stocks} />}
        {showList === 'jobs' && <JobList jobs={jobs} />}
      </div>
    </div>
  )
}

export default App
