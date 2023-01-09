import React, {useEffect, useState} from 'react';
import styles from './Client.module.css';
import Header from '../../components/Header';
import InputMask from 'react-input-mask'

import { useParams } from 'react-router-dom';
import { apiClients } from '../../services/api';
import { ClientsT } from '../../interfaces/apiClients';

const Client: React.FC = () => {

  const {id} = useParams()

  const [aClient, setAClient] = useState<ClientsT>()
  const [modal, setModal] = useState<boolean>(false)

  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [phone, setPhone] = useState<string>('')
  const [address, setAddress] = useState<string>('')
  const [cpf, setCpf] = useState<string>('')

  const getAClient = async (): Promise<void> => {
    await apiClients.get(`/api/client/${id}`)
      .then(res => setAClient(res.data))
      .catch()
  }

  const editAClient = async (): Promise<void> => {
    await apiClients.put(`/api/client/${id}`, {
      name,
      email,
      phone,
      address,
      cpf
    }).then(() => {
      alert("Informações editas")
    }).catch(err => console.log(err))
  }

  const deleteAClient = async (): Promise<void> => {
    await apiClients.delete(`/api/client/${id}`)
      .then(() => alert('Cliente deletado'))
      .catch(err => console.error(err))
  }

  useEffect(() => {
    getAClient()
  },[])

  return (
    <div className={styles.container}>
        <Header />
        <div className={styles.content}>
            <div className={styles.info}>
              <h1>{aClient?.name}</h1>
              <p><span>Email:</span> {aClient?.email}</p>
              <p><span>Telefone:</span> {aClient?.phone}</p>
              <p><span>Endereço:</span> {aClient?.address}</p>
              <p><span>CPF:</span> {aClient?.cpf}</p>
            </div>
            <div className={styles.actions}>
              <button className={styles.editbtn} onClick={() => setModal(!modal)}>Editar</button>
              <button onClick={deleteAClient} id={styles.deletebtn}>Excluir</button>
            </div>
        </div>
        {
          modal && (
            <div className={styles.modalForm}>
              <form className={styles.form}>
                <h2>Editar: {aClient?.name}</h2>
                <label>
                  <span>Nome</span>
                  <input 
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                  />
                </label>
                <label>
                  <span>Email</span>
                  <input 
                    type="text"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                </label>
                <label>
                  <span>Telefone</span>
                  <InputMask 
                    mask="(99) 9999-9999"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                  />
                </label>
                <label>
                  <span>Endereço</span>
                  <input 
                    type="text"
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                  />
                </label>
                <label>
                  <span>CPF</span>
                  <InputMask 
                    mask="999.999.999-99"
                    value={cpf}
                    onChange={e => setCpf(e.target.value)}
                  />
                </label>
              </form>
              <button 
                style={{marginTop: 10}} 
                className={styles.editbtn}
                onClick={editAClient}
              >Confirmar & Editar</button>
            </div>
          )
        }
    </div>
  );
}

export default Client;