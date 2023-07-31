import { useEffect, useState } from 'react'

import catRave from './emotes/catRAVE.gif'
import Dance from './emotes/Dance.gif'
import PartyKirby from './emotes/PartyKirby.gif'
import pepeGuitar from './emotes/pepeGuitar.gif'
import RainbowPls from './emotes/RainbowPls.gif'
import VIBE from './emotes/VIBE.gif'

export const useDanceEmote = () => {
    const danceEmotes = [catRave, Dance, PartyKirby, pepeGuitar, RainbowPls, VIBE]
    const [danceEmote, setDanceEmote] = useState('')

    useEffect(() => {
        setDanceEmote(danceEmotes[Math.floor(Math.random() * danceEmotes.length)])
    }, [])

    return danceEmote
}
