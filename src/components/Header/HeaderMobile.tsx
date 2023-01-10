import styles from "./Header.module.css";
import {Link} from "react-router-dom";
import {useState} from "react";
import CreateWith from "../CreateWith/CreateWith";
import Bloc from "../Bloc/Bloc";
import ToggleLanguage from "../ToggleLanguage/ToggleLanguage";
import ToggleTheme from "../ToggleTheme/ToggleTheme";

const HeaderMobile = () => {
    const [settingsOpen, setSettingsOpen] = useState(false);

    return <>
        <div className={styles.container}>
            <div className={styles.burger + " " + (settingsOpen ? styles.burger__open : "")}
                 onClick={() => setSettingsOpen(!settingsOpen)}>
                <div/>
                <div/>
                <div/>
            </div>
            <Link className={styles.logo} to="/">
                <img src="images/Logo.svg" alt="logo"/>
            </Link>
            <div className={styles.empty}></div>
        </div>
        <div className={styles.menu + " " + (settingsOpen ? styles.menu__open : "")}>
            <div className={styles.menu_container}>
                <div className={styles.menu_bth}>
                    <ToggleTheme/>
                </div>
            </div>
            <Bloc width="10px" height="16px"/>
            <div className={styles.menu_bth}>
                <ToggleLanguage/>
            </div>
            <Bloc width="10px" height="16px"/>
            <CreateWith/>
        </div>
    </>
}

export default HeaderMobile;
