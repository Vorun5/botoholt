import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { Emote } from '../emote/emote'
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
    ['Iron_Meow', [<Emote emoteName="Meow.gif" key={1} />, <Nickname nickname="Iron_Meow" key={2} />]],
    ['TheAwkwardRabbit_', [<Nickname nickname="TheAwkwardRabbit_" key={1} />, <Emote emoteName="big.png" key={2} />]],
    ['kimonoska', [<Nickname nickname="kimonoska" key={1} />, <Emote emoteName="kimonoska.png" key={2} />]],
]

    // prettier-ignore
    const bigsAndPings: [string, readonly(JSX.Element | string)[]][] = [
    ['Enderoman', [<span key={1}>!main</span>, <Nickname nickname="Enderoman" key={2} />, <Emote emoteName="PoroGP.png" key={3} />]],
    ['justwannaSleeeeep', [<Nickname nickname="justwannaSleeeeep" key={1} />, <Emote emoteName="OkaygeBusiness.png" key={2} />]],
    ['ipso_0', [<Nickname nickname="ipso_0" key={1} />, <Emote emoteName="OMEGALOG.png" key={2} />]],
    ['Karagez_', [<Emote emoteName="YEPP.png" key={1} />, <span key={2}>🔪</span>, <Nickname nickname="Karagez_" key={3} />]],
    ['boobatic', [<Emote emoteName="BOOBA.gif" key={1} />, <Nickname nickname="boobatic" key={2} />]],
    ['loveless_7272', [<Nickname nickname="loveless_7272" key={1} />, <Emote emoteName="D.png" key={2} />]],
    ['Kokoc404', [<Emote emoteName="Pog.png" key={1} />, <span key={2}>🥥</span>, <Nickname nickname="Kokoc404" key={3} />]],
    ['Aski_v1 and MrKoya', [<Nickname nickname="Aski_v1" key={1} />, <Emote emoteName="AYAYA.png" key={2} />, <Emote emoteName="AYAYA2.png" key={3} />, <Nickname nickname="MrKoya" key={4} />]],
    ['LeamasRein_', [<Nickname nickname='LeamasRein_' key={1} />, <Emote emoteName='PoroSex.png'key={2} />]],
    ['east__on', [<Emote emoteName='catChill.gif'key={1} />, <Nickname nickname='east__on' key={2} />]],
    ['Mobdyt', [<Nickname nickname='Mobdyt' key={1} />, <Emote emoteName='hug.png' key={2} />]],
    ['hieteo', [<Nickname nickname='hieteo' key={1} />, <Emote emoteName='Gladge.png' key={2} />]],
    ['lissa_lie', [<Emote emoteName='BearBite.gif' key={1} />, <Nickname nickname='lissa_lie' key={2} />]],
    ['Kreokid', [<Nickname nickname='Kreokid' key={1} />, <Emote emoteName='Kreokid.gif' key={2} />]],
    ['ZeroTwoZero_', [<Nickname nickname='ZeroTwoZero_' key={1} />, <Emote emoteName='Gayge.png' key={2} />]],
]

    return (
        <div className={styles.easterEgg}>
            <div className={styles.easterEggCreators}>
                <button type="button" onClick={() => setEasterEggOpen(!isEasterEggOpen)}>
                    <Emote emoteName="peepoArt.png" />
                </button>
                <Emote emoteName="HACKERMANS.gif" />
                <Emote emoteName="FeelsWowMan.png" />
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
