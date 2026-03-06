import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import "./Global.css"

export default function UpdateBuku() {
    const navigate = useNavigate()
    const { id } = useParams<{ id: string }>()

    const [judul, setJudul] = useState("")
    const [deskripsi, setDeskripsi] = useState("")
    const [tahun, setTahun] = useState("")
    const [kategori, setKategori] = useState("")
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchDetail = async () => {
            const response = await fetch(`/api/buku/${id}`)

            if (!response.ok) {
                alert("Gagal mengambil data")
                navigate("/")
                return
            }

            const data = await response.json()
            const buku = data.data

            setJudul(buku.judul)
            setDeskripsi(buku.deskripsi)
            setTahun(buku.tahun)
            setKategori(buku.kategori)

            setLoading(false)
        }

        fetchDetail()
    }, [id, navigate])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const response = await fetch(`/api/buku/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                data: {
                    judul: judul,
                    deskripsi: deskripsi,
                    tahun: tahun,
                    kategori: kategori
                }
            })
        })

        if (!response.ok) {
            alert("Gagal update buku")
            return
        }

        alert("Buku berhasil diupdate")
        navigate("/")
    }

    return (
        <div className="page-container">
            <h1 className="page-title">Update Buku</h1>

            <form onSubmit={handleSubmit}>

                <div className="form-group">
                    <label>Judul</label>
                    <input
                        type="text"
                        value={judul}
                        onChange={(e) => setJudul(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Deskripsi</label>
                    <input
                        type="text"
                        value={deskripsi}
                        onChange={(e) => setDeskripsi(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Tahun</label>
                    <input
                        type="text"
                        value={tahun}
                        onChange={(e) => setTahun(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Kategori</label>
                    <select
                        value={kategori}
                        onChange={(e) => setKategori(e.target.value)}
                        required
                    >
                        <option value="">Pilih kategori</option>
                        <option value="komik">komik</option>
                        <option value="majalah">majalah</option>
                        <option value="novel">novel</option>
                    </select>
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

                    <button type="submit" className="btn btn-primary">
                        Update Buku
                    </button>
                </div>
            </form>
        </div>
    )
}