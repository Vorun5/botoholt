import styles from "./EasterEgg.module.css";
import {useState} from "react";
import Emote from "./components/Emote";
import Nickname from "./components/Nickname";
import {useTranslation} from "react-i18next";

const EasterEgg = () => {
    const {t} = useTranslation();
    const [bigsOpen, setBigsOpen] = useState(false);

    return (
        <div className={styles.container}>
            <div className={styles.creators}>
                <span onClick={() => {
                    setBigsOpen(!bigsOpen);
                    console.log(bigsOpen);
                }}>
                    <Emote path="/emotes/peepoArt.png"/>
                </span>
                <Emote path="/emotes/HACKERMANS.gif"/>
                <Emote path="/emotes/FeelsWowMan.png"/>
            </div>
            {bigsOpen ?
                <div className={styles.bigs}>
                    <span className={styles.bigs__title}>{t("special-thanks")}</span>

                    <div className={styles.big}>
                        <Emote path="/emotes/Meow.gif"/><Nickname nickname="Iron_Meow"/>
                    </div>
                    <div className={styles.big}>
                        <Nickname nickname="TheAwkwardRabbit_ "/><Emote path="/emotes/big.png"/>
                    </div>
                    <div className={styles.big}>
                        <Nickname nickname="kimonoska"/><Emote path="/emotes/kimonoska.png"/>
                    </div>

                    <span className={styles.bigs__title}>{t("bigs-and-pigs")}</span>

                    <div className={styles.big}>
                        !main<Nickname nickname="Enderoman"/><Emote path="/emotes/PoroGP.png"/>
                    </div>
                    <div className={styles.big}>
                        <Nickname nickname="justwannaSleeeeep"/><Emote path="/emotes/OkaygeBusiness.png"/>
                    </div>
                    <div className={styles.big}>
                        <Nickname nickname="ipso_0"/><Emote path="/emotes/OMEGALOG.png"/>
                    </div>
                    <div className={styles.big}>
                        <Emote path="/emotes/YEP.png"/>🔪<Nickname nickname="Karagez_"/>
                    </div>
                    <div className={styles.big}>
                        <Emote path="/emotes/BOOBA.gif"/><Nickname nickname="boobatic"/>
                    </div>
                    <div className={styles.big}>
                        <Nickname nickname="loveless_7272"/><Emote path="/emotes/D.png"/>
                    </div>
                    <div className={styles.big}>
                        <Emote path="/emotes/Pog.png"/>🥥<Nickname nickname="Kokoc404"/>
                    </div>
                    <div className={styles.big}>
                        <Nickname nickname="Aski_v1"/>
                        <Emote path="/emotes/AYAYA.png"/>
                        <Emote path="/emotes/AYAYA2.png"/>
                        <Nickname nickname="MrKoya"/>
                    </div>
                    <div className={styles.big}>
                        <Nickname nickname="LeamasRein_"/><Emote path="/emotes/PoroSex.png"/>
                    </div>
                    <div className={styles.big}>
                        <Emote path="/emotes/catChill.gif"/><Nickname nickname="east__on"/>
                    </div>
                    <div className={styles.big}>
                        <Nickname nickname="Mobdyt"/><Emote path="/emotes/hug.png"/>
                    </div>
                    <div className={styles.big}>
                        <Nickname nickname="hieteo"/><Emote path="/emotes/Gladge.png"/>
                    </div>
                    <div className={styles.big}>
                        <Emote path="/emotes/BearBite.gif"/><Nickname nickname="lissa_lie"/>
                    </div>
                    <div className={styles.big}>
                        <Nickname nickname="Kreokid"/><Emote path="/emotes/Kreokid.gif"/>
                    </div>
                    <div className={styles.big}>
                        <Nickname nickname="ZeroTwoZero_"/><Emote path="/emotes/Gayge.png"/>
                    </div>
                </div> : <></>}
        </div>
    );
}

export default EasterEgg;
