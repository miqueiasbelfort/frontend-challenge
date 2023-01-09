import React, {useState} from 'react';
import Header from '../../components/Header';
import styles from './LittelCats.module.css';

const LittelCats: React.FC = () => {

    const [status, setStatus] = useState<number>(0)

  return (
    <div className={styles.container}>
        <Header/>
        <div className={styles.main}>
            <h2>Digite um código para ver os gatinhos</h2>
            <div>
                <input 
                    type="text"
                    onChange={e => setStatus(Number(e.target.value))}   
                />
            </div>
            
            <img src={`https://http.cat/${status}`} alt={`${status}`} />
            
        </div>
    </div>
  );
}

export default LittelCats;