import React, {useState, useEffect} from 'react';
import styles from './Clients.module.css';

import Header from '../../components/Header';
import Form from '../../components/Form';

import { Link } from 'react-router-dom';
import { ClientsT } from '../../interfaces/apiClients';
import { apiClients } from '../../services/api';
import {BsFillTrashFill, BsFillPenFill} from 'react-icons/bs'
import {MdCreateNewFolder} from 'react-icons/md'

const Clients: React.FC = () => {

    const [clients, setClients] = useState<[ClientsT]>()
    const [modal, setModal] = useState<boolean>(false)

    const getAllClients = async (): Promise<void> => {
        await apiClients.get('/api/client')
            .then(res => setClients(res.data))
    }

    const handleDelete = async (id: string): Promise<void> => {
        await apiClients.delete(`/api/client/${id}`)
    }

    const handleActiveModal = () => {
        setModal(true)
    }

    useEffect(() => {
        getAllClients()
    }, [])

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.content}>
        <div className={styles.createContainer}>
          <button onClick={() => handleActiveModal()}>
            <MdCreateNewFolder />
          </button>
        </div>
        {clients?.map((client, i) => (
          <div key={i} className={styles.clients}>
            <div className={styles.client}>
              <div className={styles.clientInfo}>
                <Link to={`/clients/${client._id}`}>{client.name}</Link>
                <p className={styles.email}>{client.email}</p>
                <p>{client.phone}</p>
              </div>
              <div className={styles.actions}>
                <button
                  onClick={() => handleDelete(client._id)}
                  className={styles.trash}
                >
                  <BsFillTrashFill />
                </button>
              </div>
            </div>
            {modal && (
              <div className={styles.modal}>
                <Form setCloset={setModal} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Clients;