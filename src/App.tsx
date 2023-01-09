import React, {useState, useEffect} from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import SignIn from './pages/SignIn'
import UsersRandom from './pages/UsersRandom'
import Dogs from './pages/Dogs'
import LittelCats from './pages/LittelCats'
import Clients from './pages/Clients'
import Client from './pages/Client'

import { Context } from './context/authentication'
import { apiClients } from './services/api'

function App() {

  const [logged, setLogged] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if(!token){
      setLogged(false)
      return
    }
    setLogged(true)
  }, [])

  const handleAcessUser = (token: string) => {
    localStorage.setItem('token', token)
    setLogged(true)
  }

  const login = async(username: string, password: string): Promise<void> => {

    await apiClients.post('/api/auth/login', {
        username,
        password
    }).then(res => handleAcessUser(res.data.token))
      .catch(err => console.log(err))
  }

  const logout = () => {
    localStorage.removeItem('token')
    setLogged(false)
  }

  return (
    <div>
      
        <BrowserRouter>
          <Context.Provider value={{login, logout, logged}}>
            <Routes>
              <Route path='/signin' element={!logged ? <SignIn/> : <Navigate to="/"/>}/>
              <Route path='/' element={!logged ? <Navigate to="/signin"/> : <UsersRandom/>}  />
              <Route path='/cats' element={!logged ? <Navigate to="/signin"/> : <LittelCats/>}/>
              <Route path='/dogs' element={!logged ? <Navigate to="/signin"/> : <Dogs/>}/>
              
              <Route path='/clients' element={!logged ? <Navigate to="/signin"/> : <Clients/>} />
              <Route path='/clients/:id' element={!logged ? <Navigate to="/signin"/> : <Client/>} />
            </Routes> 
          </Context.Provider>
        </BrowserRouter>
      
    </div>
  )
}

export default App
