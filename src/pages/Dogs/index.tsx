import { AxiosResponse } from 'axios';
import React, {useEffect, useState} from 'react';
import Header from '../../components/Header';
import { apiRandomDogs } from '../../services/api';
import styles from './Dogs.module.css';

const Dogs: React.FC = () => {

  const [url, setUrl] = useState<string>('')
  const [clicked, setClicked] = useState<number>(1)
  const [isVideoFormat, setIsVideoFormat] = useState<boolean>(false)

  const checkedIfIsAFormatValiu = (res: AxiosResponse): void => {
    
    const split = res.data.url.split('.')
    if(split[2] == 'mp4' || split[2] == 'webm'){
      setIsVideoFormat(true)
    }
    setUrl(res.data.url)
  }

  const getRandomUrlDogs = async (): Promise<void> => {
    await apiRandomDogs.get('/woof.json?ref=apilist.fun')
      .then(res => checkedIfIsAFormatValiu(res))
  }

  const refreshPage = (): void => {
    setClicked(props => props + 1)
  }

  useEffect(() => {
    setClicked(1)
    setIsVideoFormat(false)
    getRandomUrlDogs()
  }, [clicked])

  return (
    <div className={styles.container}>
      <Header/>
      <div className={styles.main}>
          {
            !isVideoFormat ? <img src={url} alt="dog" /> : (
              <video width="500" autoPlay muted loop>
                <source src={url} type="video/mp4"/>
              </video>
            ) 
          }
          <button onClick={refreshPage}>Ver outro dog</button>
      </div>
    </div>
  );
}

export default Dogs;