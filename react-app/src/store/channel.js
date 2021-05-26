const GET_CHANNELS = "channel/GET_CHANNELS"
const ADD_CHANNEL = "channel/ADD_CHANNEL"

const setChannels = (channels) => ({
    type: GET_CHANNELS,
    channels
})

const addChannel = (channel) => ({
    type: ADD_CHANNEL,
    channel

})

export const getChannels = () => async (dispatch) => {
    const res = await fetch("/api/channels/")

    try{
        if(!res.ok) throw res
        const channels = await res.json()
        console.log(channels)
        dispatch(setChannels(channels))

    } catch(err) {
        console.log(err)
    }

}

export const createChannel = (name, channel_type) => async (dispatch) => {
    const res = await fetch("/api/channels", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({name, channel_type})
    })
    try{
        if(!res.ok) throw res
        const channel = await res.json()
        // console.log(channels)
        dispatch(addChannel(channel))

    } catch(err) {
        console.log(err)
    }
}

export default function channels(state = {}, action) {
    switch(action.type) {
        case GET_CHANNELS:
            return {...state, ...action.channels}
        case ADD_CHANNEL:
            return {...state, ...action.channel}
        default:
            return state;
    }
}
