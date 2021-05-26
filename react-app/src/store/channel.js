const GET_CHANNELS = "channel/GET_CHANNELS"

const setChannels = (channels) => ({
    type: GET_CHANNELS,
    channels
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


export default function channels(state = {}, action) {
    switch(action.type) {
        case GET_CHANNELS:
            return {...state, ...action.channels}
        default:
            return state;
    }
}
