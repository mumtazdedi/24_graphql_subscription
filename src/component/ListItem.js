import "./Home.css"

const ListItem = ({ id, nama, umur, jenisKelamin, hapusPengunjung, updatePengunjung }) => {

    return (
        <tr>
            <td>{nama}</td>
            <td>{umur}</td>
            <td>{jenisKelamin}</td>
            <td className="removeBorder" onClick={() => hapusPengunjung(id)}><button>Hapus</button></td>
            <td className="removeBorder" onClick={() => updatePengunjung(id)}><button>Edit</button></td>
        </tr>
    )
}

export default ListItem;