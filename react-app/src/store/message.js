const GET_MESSAGES = "message/GET_MESSAGES"

const setMessages = (messages) => ({
    type: GET_MESSAGES,
    messages
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

export default function messages(state = {}, action) {
    switch(action.type) {
        case GET_MESSAGES:
            return {...action.messages}
        default:
            return state;
    }
}
