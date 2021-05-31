import React, {FC, useEffect} from 'react';
import {useStore} from "effector-react";
import {$usersGetStatus, getUsersFx, store} from "./models"

const Users: FC = () => {
    useEffect(() => {
        getUsersFx()
    }, [])
    const {loading, error} = useStore($usersGetStatus)
    const {users} = useStore(store)
    const userBody = users.map(({name, username, email, id}) => (
        <div key={id} style={{padding: '10px', border: '2px solid #000'}}>
            <div>Name - {name}</div>
            <span>Username - {username}</span>
            <span>Email - {email}</span>
        </div>
    ))
    if (error) {
        return (
            <div>
                <span><b>Произошла ошибка: </b></span>
                <span>{error as React.ReactNode}</span>
            </div>
        );
    }
    if (loading) {
        return <div>Loading...</div>
    }

    if (Object.keys(users).length === 0) {
        return <div>empty</div>
    }

    return (
        <>
            {userBody}
        </>
    );
};

export default Users;
