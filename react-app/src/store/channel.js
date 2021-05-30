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

    try {
        if (!res.ok) throw res
        const channels = await res.json()
        dispatch(setChannels(channels))

    } catch (error) {
        console.log(error)
    }
}

export const createChannel = (name, channel_type) => async (dispatch) => {
    const res = await fetch(`/api/channels/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, channel_type })
    })
    try {
        if (!res.ok) throw res
        const channel = await res.json();
        if (channel.errors) {
            return channel;
        }
        dispatch(addChannel(channel))
        return channel;
    } catch (error) {
        console.log(error)
    }
}

export const createDM = (user_ids) => async (dispatch) => {
    const res = await fetch(`/api/channels/dm`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ user_ids })
    })
    try {
        if (!res.ok) throw res
        const dm = await res.json();
        console.log("THUNK STORE", dm)
        dispatch(addChannel(dm))
        return dm;
    } catch (error) {
        console.log(error)
    }
}


export default function channels(state = {}, action) {
    switch (action.type) {
        case GET_CHANNELS:
            return { ...state, ...action.channels }
        case ADD_CHANNEL:
            const newChannel = { ...state }
            newChannel[action.channel.id] = action.channel
            return newChannel;
        default:
            return state;
    }
}
