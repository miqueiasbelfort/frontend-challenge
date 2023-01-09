import React, {useState, FormEvent, useRef, useEffect} from 'react';
import styles from './Form.module.css';
import InputMask from 'react-input-mask'

import {AiOutlineClose} from 'react-icons/ai'
import { apiClients } from '../../services/api';


const Form: React.FC<any> = ({setCloset} : any) => {
  
  // states of form
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [cpf, setCpf] = useState('')

  const createAClient = async (e: FormEvent): Promise<void> => {
    e.preventDefault()
    await apiClients.post('/api/client/create', {
      name,
      email,
      phone,
      address,
      cpf
    }).then(() => alert('Cliente Criado!'))
      .catch(err => console.log(err))
  }
  

  return (
    <div className={styles.container}>
        <form className={styles.form} onSubmit={createAClient}>
            <div className={styles.header}>
              <h2>Criar um novo cliente</h2>
              <button onClick={() => setCloset(false)}><AiOutlineClose/></button>
            </div>
            <div className={styles.inputs}>
              <input 
                type="text" 
                placeholder='Nome'
                value={name || ''}
                onChange={e => setName(e.target.value)}
              />
              <input 
                type="text" 
                placeholder='Email'
                value={email || ''}
                onChange={e => setEmail(e.target.value)}
              />
              <InputMask 
                mask='(99) 9999-99999'
                placeholder='Número de telefone'
                value={phone}
                onChange={e => setPhone(e.target.value)}
              />
              <input 
                type="text" 
                placeholder='Endereço'
                value={address}
                onChange={e => setAddress(e.target.value)}
              />
              <InputMask 
                mask='999.999.999-99'
                placeholder='CPF'
                value={cpf}
                onChange={e => setCpf(e.target.value)}
              />
            </div>
            <button type='submit' className={styles.createBtn}>Criar</button>
        </form>
    </div>
  );
}

export default Form;