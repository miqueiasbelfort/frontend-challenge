import React from 'react';
import styles from './Users.module.css';

type UserInterface = {
    img : string,
    titleName: string,
    firstName: string,
    lastName: string,
    username: string,
    email: string,
    age: number,
}

const Users: React.FC<UserInterface> = ({img, titleName, firstName, lastName, username, email, age}: UserInterface) => {
  return (
    <li className={styles.user}>
        <div>
            <img src={img} alt={titleName} />
        </div>
        <div>
            <h2>{firstName} {lastName}</h2>
            <p>@{username}</p>
            <p>{email}</p>
            <p>{age} anos</p>
        </div>
    </li>
  );
}

export default Users;