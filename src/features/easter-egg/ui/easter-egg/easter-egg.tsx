import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { Emote } from '../emote/emote'

import AYAYA from '../emotes/AYAYA.png'
import AYAYA2 from '../emotes/AYAYA2.png'
import BearBite from '../emotes/BearBite.gif'
import BigEmote from '../emotes/big.png'
import BOOBA from '../emotes/BOOBA.gif'
import catChill from '../emotes/catChill.gif'
import D from '../emotes/D.png'
import FeelsWowMan from '../emotes/FeelsWowMan.png'
import Gayge from '../emotes/Gayge.png'
import Gladge from '../emotes/Gladge.png'
import HACKERMANS from '../emotes/HACKERMANS.gif'
import Hug from '../emotes/hug.png'
import Kimonoska from '../emotes/kimonoska.png'
import Kreokid from '../emotes/Kreokid.gif'
import Meow from '../emotes/Meow.gif'
import OkaygeBusiness from '../emotes/OkaygeBusiness.png'
import OMEGALOG from '../emotes/OMEGALOG.png'
import peepoArt from '../emotes/peepoArt.png'
import Perry from '../emotes/perryRun.gif'
import Pog from '../emotes/Pog.png'
import PoroGP from '../emotes/PoroGP.png'
import PoroSex from '../emotes/PoroSex.png'
import YEP from '../emotes/YEPP.png'

import { Nickname } from '../nickname/nickname'
import styles from './easter-egg.module.scss'

const Title = styled.span`
    margin-top: 15px;
    color: var(--secondary-text-color);
`
const Big = styled.div`
    display: flex;
    margin: 5px 0;
    color: var(--text-color);
    font-size: var(--primary-text-size);
    align-items: center;
    justify-content: center;
`
export const EasterEgg = () => {
    const { t } = useTranslation()
    const [isEasterEggOpen, setEasterEggOpen] = useState(false)

    // prettier-ignore
    const bigs: [string,  readonly(JSX.Element | string)[]][] = [
    ['Perry_Cl', [ <Nickname nickname='Perry_Cl' key={1}/> , <Emote src={Perry} alt='perryRun' key={2} />]],
    ['Iron_Meow', [<Emote src={Meow} alt='Meow' key={1} />, <Nickname nickname="Iron_Meow" key={2} />]],
    ['TheAwkwardRabbit_', [<Nickname nickname="TheAwkwardRabbit_" key={1} />, <Emote src={BigEmote} alt='Big' key={2} />]],
    ['kimonoska', [<Nickname nickname="kimonoska" key={1} />, <Emote src={Kimonoska} alt='kimonoska' key={2} />]],
]

    // prettier-ignore
    const bigsAndPings: [string, readonly(JSX.Element | string)[]][] = [
    ['Enderoman', [<span key={1}>!main</span>, <Nickname nickname="Enderoman" key={2} />, <Emote src={PoroGP} alt='PoroGP' key={3} />]],
    ['justwannaSleeeeep', [<Nickname nickname="justwannaSleeeeep" key={1} />, <Emote src={OkaygeBusiness} alt='OkaygeBusiness' key={2} />]],
    ['ipso_0', [<Nickname nickname="ipso_0" key={1} />, <Emote src={OMEGALOG} alt="OMEGALOG" key={2} />]],
    ['Karagez_', [<Emote src={YEP} alt="YEPP" key={1} />, <span key={2}>🔪</span>, <Nickname nickname="Karagez_" key={3} />]],
    ['boobatic', [<Emote src={BOOBA} alt="BOOBA" key={1} />, <Nickname nickname="boobatic" key={2} />]],
    ['loveless_7272', [<Nickname nickname="loveless_7272" key={1} />, <Emote src={D} alt="D" key={2} />]],
    ['Kokoc404', [<Emote src={Pog} alt="Pog" key={1} />, <span key={2}>🥥</span>, <Nickname nickname="Kokoc404" key={3} />]],
    ['Aski_v1 and MrKoya', [<Nickname nickname="Aski_v1" key={1} />, <Emote src={AYAYA} alt="AYAYA" key={2} />, <Emote src={AYAYA2} alt="AYAYA2" key={3} />, <Nickname nickname="MrKoya" key={4} />]],
    ['LeamasRein_', [<Nickname nickname='LeamasRein_' key={1} />, <Emote src={PoroSex} alt='PoroSex' key={2} />]],
    ['east__on', [<Emote src={catChill} alt='catChill' key={1} />, <Nickname nickname='east__on' key={2} />]],
    ['Mobdyt', [<Nickname nickname='Mobdyt' key={1} />, <Emote src={Hug} alt='AYAYAhug' key={2} />]],
    ['hieteo', [<Nickname nickname='hieteo' key={1} />, <Emote src={Gladge} alt='Gladge' key={2} />]],
    ['lissa_lie', [<Emote src={BearBite} alt='BearBite' key={1} />, <Nickname nickname='lissa_lie' key={2} />]],
    ['Kreokid', [<Nickname nickname='Kreokid' key={1} />, <Emote src={Kreokid} alt='Kreokid' key={2} />]],
    ['ZeroTwoZero_', [<Nickname nickname='ZeroTwoZero_' key={1} />, <Emote src={Gayge} alt='Gayge' key={2} />]],
]

    return (
        <div className={styles.easterEgg}>
            <div className={styles.easterEggCreators}>
                <button type="button" onClick={() => setEasterEggOpen(!isEasterEggOpen)}>
                    <Emote src={peepoArt} alt="peepoArt" />
                </button>
                <Emote src={HACKERMANS} alt="HACKERMANS" />
                <Emote src={FeelsWowMan} alt="FeelsWowMan" />
            </div>
            {isEasterEggOpen && (
                <>
                    <Title>{t('special-thanks')}</Title>
                    {bigs.map((big) => (
                        <Big key={big[0]}>{big[1]}</Big>
                    ))}
                    <Title>{t('bigs-and-pigs')}</Title>
                    {bigsAndPings.map((bigOrPig) => (
                        <Big key={bigOrPig[0]}>{bigOrPig[1]}</Big>
                    ))}
                </>
            )}
        </div>
    )
}
