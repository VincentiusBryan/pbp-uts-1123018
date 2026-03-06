import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import "./Global.css"

export default function DetailBuku() {
    const navigate = useNavigate()
    const { id } = useParams<{ id: string }>()
    const [buku, setBuku] = useState<any>(null)

    useEffect(() => {
        if (!id) {
            navigate("/")
            return
        }

        const fetchData = async () => {
            const response = await fetch(`/api/buku/${id}`)

            if (!response.ok) {
                alert("Gagal mengambil detail")
                navigate("/")
                return
            }

            const data = await response.json()
            setBuku(data.data)
        }

        fetchData()
    }, [id, navigate])

    if (!buku) {
        return (
            <div className="page-container">
                <h2 className="page-title">Loading...</h2>
            </div>
        )
    }

    return (
        <div className="page-container">
            <h1 className="page-title">{buku.judul}</h1>

            {buku.imageUrl && (
                <img src={buku.imageUrl} width="200" />
            )}

            <p>Deskripsi: {buku.deskripsi}</p>
            <p>Tahun: {buku.tahun}</p>
            <p>Kategori: {buku.kategori}</p>
            <p>Status: {buku.status}</p>
            <p>Peminjam: {buku.peminjam ? buku.peminjam.nama : "-"}</p>
            <p>CreatedAt: {buku.createdAt}</p>
            <p>UpdatedAt: {buku.updatedAt}</p>

            <button
                className="btn btn-secondary"
                onClick={() => navigate("/AmbilBuku")}
            >
                Kembali
            </button>
        </div>
    )
}