import styles from './EasterEgg.module.css'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Emote from './components/Emote'
import Nickname from './components/Nickname'

const EasterEgg = () => {
    const { t } = useTranslation()
    const [bigsOpen, setBigsOpen] = useState(false)

    return (
        <div className={styles.container}>
            <div className={styles.creators}>
                <span onClick={() => setBigsOpen(!bigsOpen)}>
                    <Emote path="/emotes/peepoArt.png" alt=" peepoArt " />
                </span>
                <Emote path="/emotes/HACKERMANS.gif" alt=" HACKERMANS " />
                <Emote path="/emotes/FeelsWowMan.png" alt=" FeelsWowMan " />
            </div>
            {bigsOpen && (
                <div className={styles.bigs}>
                    <span className={styles.bigs__title}>
                        {t('special-thanks')}
                    </span>

                    <div className={styles.big}>
                        <Emote path="/emotes/Meow.gif" alt=" Meow " />
                        <Nickname nickname="Iron_Meow" />
                    </div>
                    <div className={styles.big}>
                        <Nickname nickname="TheAwkwardRabbit_ " />
                        <Emote path="/emotes/big.png" alt=" big " />
                    </div>
                    <div className={styles.big}>
                        <Nickname nickname="kimonoska" />
                        <Emote path="/emotes/kimonoska.png" alt=" kimonoska " />
                    </div>

                    <span className={styles.bigs__title}>
                        {t('bigs-and-pigs')}
                    </span>

                    <div className={styles.big}>
                        !main
                        <Nickname nickname="Enderoman" />
                        <Emote path="/emotes/PoroGP.png" alt=" PoroGP " />
                    </div>
                    <div className={styles.big}>
                        <Nickname nickname="justwannaSleeeeep" />
                        <Emote
                            path="/emotes/OkaygeBusiness.png"
                            alt=" OkaygeBusiness "
                        />
                    </div>
                    <div className={styles.big}>
                        <Nickname nickname="ipso_0" />
                        <Emote path="/emotes/OMEGALOG.png" alt=" OMEGALOG " />
                    </div>
                    <div className={styles.big}>
                        <Emote path="/emotes/YEP.png" alt=" YEP " />
                        🔪
                        <Nickname nickname="Karagez_" />
                    </div>
                    <div className={styles.big}>
                        <Emote path="/emotes/BOOBA.gif" alt=" BOOBA " />
                        <Nickname nickname="boobatic" />
                    </div>
                    <div className={styles.big}>
                        <Nickname nickname="loveless_7272" />
                        <Emote path="/emotes/D.png" alt=" D: " />
                    </div>
                    <div className={styles.big}>
                        <Emote path="/emotes/Pog.png" alt=" Pog " />
                        🥥
                        <Nickname nickname="Kokoc404" />
                    </div>
                    <div className={styles.big}>
                        <Nickname nickname="Aski_v1" />
                        <Emote path="/emotes/AYAYA.png" alt=" AYAYA " />
                        <Emote path="/emotes/AYAYA2.png" alt=" AYAYA " />
                        <Nickname nickname="MrKoya" />
                    </div>
                    <div className={styles.big}>
                        <Nickname nickname="LeamasRein_" />
                        <Emote path="/emotes/PoroSex.png" alt=" PoroGP " />
                    </div>
                    <div className={styles.big}>
                        <Emote path="/emotes/catChill.gif" alt=" catChill " />
                        <Nickname nickname="east__on" />
                    </div>
                    <div className={styles.big}>
                        <Nickname nickname="Mobdyt" />
                        <Emote path="/emotes/hug.png" alt=" hug " />
                    </div>
                    <div className={styles.big}>
                        <Nickname nickname="hieteo" />
                        <Emote path="/emotes/Gladge.png" alt=" Gladge " />
                    </div>
                    <div className={styles.big}>
                        <Emote path="/emotes/BearBite.gif" alt=" BearBite " />
                        <Nickname nickname="lissa_lie" />
                    </div>
                    <div className={styles.big}>
                        <Nickname nickname="Kreokid" />
                        <Emote path="/emotes/Kreokid.gif" alt=" Kreokid " />
                    </div>
                    <div className={styles.big}>
                        <Nickname nickname="ZeroTwoZero_" />
                        <Emote path="/emotes/Gayge.png" alt=" Gayge " />
                    </div>
                </div>
            )}
        </div>
    )
}

export default EasterEgg
