const GET_MESSAGES = "message/GET_MESSAGES"
const SET_MESSAGE = 'message/SET_MESSAGE'

const setMessages = (messages) => ({
    type: GET_MESSAGES,
    messages
})

const setMessage = (message) => ({
    type: SET_MESSAGE,
    message
})

export const getMessages = (channel_id) => async (dispatch) => {
    const res = await fetch(`/api/messages/${channel_id}`)

    try{
        if(!res.ok) throw res
        const messages = await res.json()
        dispatch(setMessages(messages))
        return messages
    } catch(err) {
        console.log(err)
    }

}

export const editMessage = (message_id, body) => async (dispatch) => {
    const res = await fetch(`/api/messages/${message_id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            message_id,
            body
        })
    })

    try {
        if (!res.ok) throw res
        // {message_id: id, body: body}
        const message = await res.json()
        dispatch(setMessage(message))
        return message
    } catch (err) {
        console.log(err)
    }

}

export default function messages(state = {}, action) {
    switch(action.type) {
        case GET_MESSAGES:
            return {...action.messages}
        case SET_MESSAGE:
            const state_dup = {...state}
            state_dup[action.message.id] = action.message 
            return state_dup
        default:
            return state;
    }
}
