import { useEffect, useState } from 'react'

// get random emote
const useEmote = (
    basePath = '/emotes/',
    emotes = [
        'catRAVE.gif',
        'RainbowPls.gif',
        'VIBE.gif',
        'Dance.gif',
        'PartyKirby.gif',
        'pepeGuitar.gif',
    ],
) => {
    const [emote, setEmote] = useState('')

    useEffect(() => {
        setEmote(basePath + emotes[Math.floor(Math.random() * emotes.length)])
    }, [])

    return { emote }
}

export default useEmote
