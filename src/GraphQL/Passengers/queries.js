import { gql } from "@apollo/client";

export const GET_PASSENGERS = gql`
    query data {
        data {
            id
            nama
            umur
            jenisKelamin
        }
    }
`;

export const SUBS_PASSENGERS = gql`
    subscription data {
        data {
            id
            nama
            umur
            jenisKelamin
        }
    }
`;

export const DELETE_PASSENGER = gql`
mutation deletePassenger($id: Int!) {
    delete_data_by_pk(id: $id) {
      id
      nama
      umur
      jenisKelamin
    }
  }
`;

export const ADD_PASSENGER = gql`
mutation addPassenger($nama: String!, $umur: Int!, $jenisKelamin: String!) {
        insert_data_one(object: {nama: $nama, umur: $umur, jenisKelamin: $jenisKelamin}) {
            id
            nama
            umur
            jenisKelamin
        }
      }
`;

export const UPDATE_PASSENGER = gql`
mutation updatePassenger($id: Int!, $nama: String!, $umur: Int!, $jenisKelamin: String!) {
  update_data_by_pk(pk_columns: {id: $id}, _set: {nama: $nama, umur: $umur, jenisKelamin: $jenisKelamin}) {
    id
    nama
    umur
    jenisKelamin
  }
}
`;