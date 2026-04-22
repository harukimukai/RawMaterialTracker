import { Trash } from 'lucide-react'
import api from '../api/axios'

export function MaterialDeleteButton({ id, setMaterials, setErrorMessage }){

    const handleDeleteMaterial = async () => {
        setErrorMessage('')
        if(!window.confirm('Are you sure deleting the material?')) return

        try {
            await api.delete(`/api/materials/${id}`)
            const res = await api.get('/api/materials')
            setMaterials(res.data)
        } catch (err) {
            const message = err.response?.data || "Failed to delete."

            setErrorMessage(message)
            console.log(message)
            
            setTimeout(() => setErrorMessage(''), 5000)
        }
    }

    return(
        <>
            <button>
                <Trash onClick={() => handleDeleteMaterial(id)}/>
            </button>
        </>
    )
}

export function JobDeleteButton({ id }){

}

export function StockDeleteButton({ id }){

}

