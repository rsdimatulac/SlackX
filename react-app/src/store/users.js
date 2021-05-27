const GET_USERS = 'users/GET_USERS'

const setUsers = (users) => ({
    type: GET_USERS,
    users
})

export const getUsers = () => async (dispatch) => {
    console.log("INSIDE GET USERS")
    const res = await fetch('/api/all_users/')

    try {
        if (!res.ok) throw res
        const users = await res.json()
        console.log("HIT REDUCER")
        console.log(users)
        dispatch(setUsers(users))
    } catch(err) {
        console.log(err)
    }
}

export default function users(state = {}, action) {
    switch(action.type) {
        case GET_USERS:
            return {...state, ...action.users}
        default: 
            return state;
    }
}