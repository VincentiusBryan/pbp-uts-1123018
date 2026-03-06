import { useCallback, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./Global.css"

export default function AmbilBuku() {
    const navigate = useNavigate()
    const [posts, setPosts] = useState<any[]>([])

    const reloadPost = useCallback(async () => {
        const response = await fetch("/api/buku")

        if (!response.ok) {
            alert("Failed to reload post")
            return
        }

        const data = await response.json()
        setPosts(data.data)
    }, [])

    useEffect(() => {
        reloadPost()
    }, [reloadPost])

    return (
        <div className="page-container">
            <h1 className="page-title">Daftar Buku</h1>

            <ul className="menu-list">
                {posts.map((post) => (
                    <li key={post.id} className="menu-item">
                        <h2>{post.judul}</h2>
                        <p>Deskripsi: {post.deskripsi}</p>
                        <p>Tahun: {post.tahun}</p>
                        <p>Kategori: {post.kategori}</p>
                        <p>Status: {post.status}</p>

                        <button
                            className="btn btn-secondary"
                            onClick={() => navigate(`/DetailBuku/${post.id}`)}
                            style={{ marginRight: "10px" }}
                        >
                            Detail
                        </button>

                        <button
                            className="btn btn-primary"
                            onClick={() => navigate(`/UpdateBuku/${post.id}`)}
                            style={{ marginRight: "10px" }}
                        >
                            Update
                        </button>

                        <button
                            className="btn btn-primary"
                            onClick={() => navigate(`/PinjamBuku/${post.id}`)}
                            style={{ marginRight: "10px" }}
                        >
                            Pinjam
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}