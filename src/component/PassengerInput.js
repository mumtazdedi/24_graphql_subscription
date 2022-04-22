import { useState, useEffect } from "react"
import "./Home.css"
import { useQuery } from '@apollo/client';
import { GET_PASSENGERS } from '../GraphQL/Passengers/queries';

function PassengerInput(props) {

  // const { data, loading, error } = useQuery(GET_PASSENGERS);

  const [state, setState] = useState({
    id: null,
    nama: "",
    umur: "",
    jenisKelamin: "Pria",
    editing: true,
  })

  const onChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    if (state.nama.trim() && state.umur && state.jenisKelamin) {
      const umur = state.umur
      if (umur >= 75 || umur <= 12) {
        alert("Umur tidak sesuai")
      } else {
        const newData = {
          id: state.id,
          nama: state.nama,
          umur: state.umur,
          jenisKelamin: state.jenisKelamin,
        }

        if (props.isUpdate) {
          props.updatePengunjung(newData)
        } else {
          props.tambahPengunjung(newData)
        }

        setState({
          ...state,
          id: null,
          nama: "",
          umur: "",
          jenisKelamin: "Pria",
        })
      }
    } else {
      alert("Data masih ada yang kosong")
    }
  }

  const handleBukaInput = () => {
    setState({
      ...state,
      editing: false,
    })
  }

  const handleTutupInput = () => {
    setState({
      ...state,
      id: null,
      nama: "",
      umur: "",
      jenisKelamin: "Pria",
      editing: true,
    })
  }

  let viewMode = {}
  let editMode = {}

  if (state.editing) {
    viewMode.display = "none"
  } else {
    editMode.display = "none"
  }

  useEffect(() => {
    if (props.idUpdate !== null) {
      setState({
        ...props.newInput,
        editing: false,
      })
    }
  }, [props.idUpdate]);



  return (
    <div>
      <div onSubmit={handleSubmit} style={viewMode}>
        <p>Masukkan Nama Anda</p>
        <input type="text" className="input-text" placeholder="Nama anda ..." value={state.nama} name="nama" onChange={onChange} />
        <p>Masukkan Umur Anda</p>
        <input type="number" className="input-text" placeholder="Umur anda ..." value={state.umur} name="umur" onChange={onChange} />
        <p>Masukkan Jenis Kelamin Anda</p>
        <select onChange={onChange} name="jenisKelamin">
          <option value="Pria" selected>
            Pria
          </option>
          <option value="Wanita">Wanita</option>
        </select>
        <p></p>
        <button onClick={handleSubmit}>Submit</button>
        <button onClick={handleTutupInput} style={{ marginLeft: "10px" }}>
          Selesai
        </button>
      </div>
      <button className="inputan" onClick={handleBukaInput} style={editMode}>
        Masukkan Nama Pelanggan
      </button>
    </div>
  )
}

export default PassengerInput
