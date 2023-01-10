import {Streamer} from "./models/Streamer";
import {Routes, Route} from "react-router-dom";
import StreamerPage from "./pages/StreamerPage/StreamerPage";
import Header from "./components/Header/Header";
import HomePage from "./pages/HomePage/HomePage";

const streamer: Streamer = {
    broadcaster_type: "partner",
    display_name: "Smurf_tv",
    login: "smurf_tv",
    profile_image_url: "https://static-cdn.jtvnw.net/jtv_user_pictures/309c7c07-6269-479d-8239-71a31ed35807-profile_image-300x300.png",
}

const streamers: Streamer[] = [
    {
        broadcaster_type: "partner",
        display_name: "Smurf_tv",
        login: "smurf_tv",
        profile_image_url: "https://static-cdn.jtvnw.net/jtv_user_pictures/309c7c07-6269-479d-8239-71a31ed35807-profile_image-300x300.png",
    },
    {
        broadcaster_type: "affiliate",
        display_name: "Urbinholt",
        login: "urbinholt",
        profile_image_url: "https://static-cdn.jtvnw.net/jtv_user_pictures/28f54f8f7e5e4d4e-profile_image-300x300.png",
    },
    {
        broadcaster_type: "",
        display_name: "Vorun5",
        login: "vorun5",
        profile_image_url: "https://static-cdn.jtvnw.net/jtv_user_pictures/81e238c5-c782-4180-84cc-48975a3472d6-profile_image-300x300.png",
        stream_info: {
            title: "INSANECAT",
            game_name: "INSANECAT",
        }
    },
    {
        broadcaster_type: "",
        display_name: "montag_r",
        login: "montag_r",
        profile_image_url: "https://static-cdn.jtvnw.net/jtv_user_pictures/3103dbcb-4f09-45be-b77c-a1792d9d0391-profile_image-300x300.png",
    },
    {
        broadcaster_type: "partner",
        display_name: "GeneraL_HS_",
        login: "general_hs_",
        profile_image_url: "https://static-cdn.jtvnw.net/jtv_user_pictures/76442814-883b-490e-a2d2-04b277b04d67-profile_image-300x300.png",
    }
];

function App() {

    return (
        <div className="app-container">
            <Header/>
            <Routes>
                <Route path="/" element={<HomePage/>} />
                <Route path="/:streamerLogin" element={<StreamerPage/>} />
            </Routes>
        </div>
    );
}

export default App;
