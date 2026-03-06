import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import "./Global.css"

export default function PinjamBuku() {
    const navigate = useNavigate()
    const { id } = useParams<{ id: string }>()

    const [buku, setBuku] = useState<any>(null)
    const [nama, setNama] = useState("")

    const fetchDetail = async () => {
        const response = await fetch(`/api/buku/${id}`)

        if (!response.ok) {
            alert("Gagal mengambil data buku")
            navigate("/")
            return
        }

        const data = await response.json()
        setBuku(data.data)
    }

    useEffect(() => {
        fetchDetail()
    }, [id])

    const handlePinjam = async (e: React.FormEvent) => {
        e.preventDefault()

        const response = await fetch(`/api/buku/${id}/pinjam`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                peminjam: {
                    nama: nama
                }
            })
        })

        if (!response.ok) {
            alert("Gagal meminjam buku")
            return
        }

        alert("Buku berhasil dipinjam")
        fetchDetail()
    }

    const handleBalik = async () => {
        const response = await fetch(`/api/buku/${id}/balik`, {
            method: "POST"
        })

        if (!response.ok) {
            alert("Gagal mengembalikan buku")
            return
        }

        alert("Buku berhasil dikembalikan")
        fetchDetail()
    }

    if (!buku) return <h2 style={{ textAlign: "center" }}>Loading...</h2>

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

            {buku.status === "available" && (
                <form onSubmit={handlePinjam}>
                    <div className="form-group">
                        <label>Peminjam</label>
                        <input
                            type="text"
                            value={nama}
                            onChange={(e) => setNama(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-actions">
                        <button
                            type="button"
                            className="btn btn-danger"
                            onClick={() => navigate("/AmbilBuku")}
                            style={{ marginRight: "10px" }}
                        >
                            Batal
                        </button>

                        <button
                            type="submit"
                            className="btn btn-primary"
                        >
                            Pinjam Buku
                        </button>
                    </div>
                </form>
            )}

            {buku.status === "borrowed" && (
                <div className="form-actions">
                    <button
                        className="btn btn-danger"
                        onClick={handleBalik}
                        style={{ marginRight: "10px" }}
                    >
                        Kembalikan Buku
                    </button>

                    <button
                        className="btn btn-secondary"
                        onClick={() => navigate("/AmbilBuku")}
                    >
                        Kembali
                    </button>
                </div>
            )}
        </div>
    )
}