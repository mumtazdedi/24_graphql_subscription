import React, { useState } from 'react';
import PassengerInput from './PassengerInput';
import ListPassenger from './ListPassenger';
import Header from './Header';
import { useQuery, useMutation, useSubscription } from '@apollo/client';
import { SUBS_PASSENGERS, DELETE_PASSENGER, ADD_PASSENGER, UPDATE_PASSENGER } from '../GraphQL/Passengers/queries';

const Home = () => {

    const { loading, error, data } = useSubscription(SUBS_PASSENGERS);

    const [addPassenger] = useMutation(ADD_PASSENGER, {
        onCompleted(data) {
            console.log(data);
            // refetch();
        },
        onError(error) {
            console.log(error);
        }
    });

    const [deletePassenger, { error: deleteError }] = useMutation(DELETE_PASSENGER, {
        onCompleted(data) {
            console.log(data);
            // refetch();
        },
        onError(error) {
            console.log(error);
        }
    });

    const [updatePassenger, { error: updateError }] = useMutation(UPDATE_PASSENGER, {
        onCompleted(data) {
        },
        onError(error) {
            console.log(error);
        }
    });

    const [idUpdate, setIdUpdate] = useState(null);
    const [isUpdate, setIsUpdate] = useState(false);
    const [dataForUpdate, setDataForUpdate] = useState({
        id: null,
        nama: "",
        umur: 0,
        jenisKelamin: "",
    });

    const hapusPengunjung = (id) => {
        deletePassenger({
            variables: {
                id: id
            }
        });
    };

    const handleUpdateButton = (id) => {
        setIsUpdate(true);
        setIdUpdate(id);
        const newData = data.data.find(item => item.id === id);
        setDataForUpdate(newData);
    }

    const updatePengunjung = newData => {
        updatePassenger({
            variables: {
                id: newData.id,
                nama: newData.nama,
                umur: newData.umur,
                jenisKelamin: newData.jenisKelamin
            }
        });
        setIdUpdate(null);
        setIsUpdate(false);
        setDataForUpdate({
            id: null,
            nama: "",
            umur: 0,
            jenisKelamin: "",
        });
    }

    const tambahPengunjung = newUser => {
        addPassenger({
            variables: {
                nama: newUser.nama,
                umur: newUser.umur,
                jenisKelamin: newUser.jenisKelamin
            }
        });
    };

    return (
        <div>
            {
                loading ?
                    <div>Loading...</div> :
                    <div>
                        <Header />
                        <PassengerInput isUpdate={isUpdate} updatePengunjung={updatePengunjung} idUpdate={idUpdate} newInput={dataForUpdate} tambahPengunjung={tambahPengunjung} />
                        <ListPassenger data={data} updatePengunjung={handleUpdateButton} hapusPengunjung={hapusPengunjung} />
                    </div>
            }
        </div>
    );
}

export default Home;
