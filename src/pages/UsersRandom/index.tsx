import React, {useState, useEffect} from 'react';
import styles from './UserRandom.module.css';
import { apiRandamUser } from '../../services/api';

import {RandomUsersI, UserT} from "../../interfaces/apiRandomUsers"

import Header from '../../components/Header';
import Users from '../../components/Users';

const UsersRandom: React.FC = () => {

  const [allUsers, setAllUsers] = useState<RandomUsersI>()
  const [page, setPage] = useState<number>(1)
  const [resultsQuantity] = useState<number>(16)
  const [modal, setModal] = useState<boolean>(false)
  const [searchTextValue, setSearchTextValue] = useState<string>("")
  const [searchUser, setSearchUser] = useState<UserT[]>()

  const [loading, setLoading] = useState<boolean>(true)

  const getRandomUsers = async (): Promise<void> => {
      await apiRandamUser.get(`&seed=abc&results=${resultsQuantity}&page=${page}`)
        .then(res => setAllUsers(res.data))
  }

  useEffect(() => {
    getRandomUsers()
    setLoading(false)
  }, [page])

  const searchAUser = async () => {
    setModal(true)

    let splitTextSearch = searchTextValue.split(' ')[0]

    const newDate = allUsers?.results.filter((user) =>{

      const check = user.login.username == searchTextValue || user.email == searchTextValue || user.name.first == splitTextSearch
      if(check){
        return true
      }
      return false
    })

    setSearchUser(newDate)
  }

  if(loading){
    return (
      <div className={styles.loading}>
          <h2>Carregando...</h2>
      </div>
    )
  }

  return (
    <div className={styles.container}>
        <Header/>

        <div className={styles.searchContainer}>
            <input 
              type="text" 
              placeholder='Pesquise por um usuário'
              onChange={e => setSearchTextValue(e.target.value)}
            />
            <button onClick={() => searchAUser()}>Pesquisar</button>
        </div>

        <ul className={styles.mainUsers}>

          {allUsers?.results.map((user, i) => (
            <Users
              key={i}
              titleName={user.name.title}
              img={user.picture.medium}
              firstName={user.name.first}
              lastName={user.name.last}
              username={user.login.username}
              email={user.email}
              age={user.dob.age}
            />
          ))}

        </ul>
        
        <div className={styles.pagination}>
            <button onClick={() => setPage(1)} className={page == 1 ? styles.selected : ''}>1</button>
            <button onClick={() => setPage(2)} className={page == 2 ? styles.selected : ''}>2</button>
            <button onClick={() => setPage(3)} className={page == 3 ? styles.selected : ''}>3</button>
        </div>

        {
          modal && (
            <div onClick={() => setModal(false)} className={styles.containerModalMaster}>
              <div className={styles.containerModal}> 

                  <ul className={styles.modal}>

                      <h2>Procurando por: {searchTextValue}</h2>

                      {
                        searchUser?.map((user, i) => (
                          <Users
                            key={i}
                            titleName={user.name.title}
                            img={user.picture.medium}
                            firstName={user.name.first}
                            lastName={user.name.last}
                            username={user.login.username}
                            email={user.email}
                            age={user.dob.age}
                          />
                        ))
                      }

                  </ul>

              </div>
            </div>
          )
        }

    </div>
  );
}

export default UsersRandom;