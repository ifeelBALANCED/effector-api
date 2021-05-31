import {createStore, createEffect, forward, combine, restore} from "effector";
import {createGate} from "effector-react";

type User = {
    id: number,
    name: string,
    username: string,
    email: string,
    address: {
        street: string,
        suite: string,
        city: string,
        zipcode: string,
        geo: {
            lat: string,
            lng: string
        }
    },
    phone: string,
    website: string,
    company: {
        name: string,
        catchPhrase: string,
        bs: string
    }
}
type Store = {
    users: Array<User>
}

export const getUsersFx = createEffect(async () => {
    const url = `https://jsonplaceholder.typicode.com/users`
    const req = await fetch(url)
    return req.json()
})
export const $fetchError = restore<Error>(getUsersFx.failData, null);
getUsersFx.done.watch(({params, result}) => {
    console.log(result)
})

export const store = createStore<Store>({
    users: [],
})
    .on(getUsersFx.doneData, (state, users) => ({
        ...state,
        users
    }))
const UsersGate = createGate<string>('users')
export const $usersGetStatus = combine({
    loading: getUsersFx.pending,
    error: $fetchError,
    data: store,
});
forward({from: UsersGate.state, to: getUsersFx})


