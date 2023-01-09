import React, {useState, useEffect, useContext} from 'react';
import styles from './SignIn.module.css';
import useCookie from '../../hooks/useCookie';

import {GiPadlock} from 'react-icons/gi'
import { Context } from '../../context/authentication';

const SignIn: React.FC = () => {

    const authContext = useContext(Context)
    const {setCookie, setCookiePassword, getCookie, removeCookie} = useCookie()

    const [remenberMe, setRemenberMe] = useState<boolean>()
    const [username, setUsername] = useState<any>('')
    const [password, setPassword] = useState<any>('')

    const thereAreUserInCookie = () => {
        
        const usernameCookie = getCookie('user')
        const passwordCookie = getCookie('psw')?.split(' ')[1]

        if(!usernameCookie || !passwordCookie){
            return
        }

        setUsername(usernameCookie)
        setPassword(passwordCookie)
        setRemenberMe(true)

    }

    useEffect(() => {
        if(!authContext?.logged){
            thereAreUserInCookie()
        }
    }, [])

    const addCookiesRemenberMe = () => {
        setCookie('user', username, 3)
        setCookiePassword('psw', password, 3)
    }

    function handleSubmit(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault()
        const isUsernameVal = username == 'desafiosharenergy'
        const isPasswordVal = password == 'sh@r3n3rgy'
        if(!isUsernameVal || !isPasswordVal){
            alert('Usuário não existe!')
            return
        }
        if(!remenberMe){
            removeCookie('user')
            removeCookie('psw')
        } else {
            addCookiesRemenberMe()
        }
        authContext?.login(username, password)
    }

  return (
    <div className={styles.container}>
        <div className={styles.formContainer}>
            
            <div className={styles.formHeader}>
                
                <GiPadlock/>
                <p>Autenticação</p>    
                
            </div>

            <form className={styles.formMain} onSubmit={handleSubmit}>
                <input type="text" placeholder='Nome de Usuário' onChange={e => setUsername(e.target.value)} value={username}/>
                <input type="text" placeholder='Senha' onChange={e => setPassword(e.target.value)} value={password}/>
                <div className={styles.checkboxContainer}>
                    <input type="checkbox" onChange={e => setRemenberMe(e.target.checked)} checked={remenberMe}/>
                    <span>Lembrar de mim!</span>
                </div>
                <input type="submit" value="Login" />
            </form>
            
        </div>
    </div>
  );
}

export default SignIn;