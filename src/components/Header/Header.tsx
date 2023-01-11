import {useMediaQuery} from "react-responsive";
import HeaderDesktop from "./HeaderDesktop";
import HeaderMobile from "./HeaderMobile";
import {Streamer} from "../../models/Streamer";

const streamers: Streamer[] = [
    {
        broadcaster_type: "partner",
        display_name: "Smurf_tv",
        view_count: 62923,
        login: "smurf_tv",
        profile_image_url: "https://static-cdn.jtvnw.net/jtv_user_pictures/309c7c07-6269-479d-8239-71a31ed35807-profile_image-300x300.png",
        description: "League of legends pro player. currently full time streamer. dmitry.smurf.tv@gmail.com",
    },
    {
        broadcaster_type: "affiliate",
        display_name: "Urbinholt",
        login: "urbinholt",
        view_count: 287,
        profile_image_url: "https://static-cdn.jtvnw.net/jtv_user_pictures/28f54f8f7e5e4d4e-profile_image-300x300.png",
        description: "Разнообразный и богатый опыт консультация с профессионалами из IT обеспечивает широкому кругу специалистов участие в формировании существующих финансовых и административных условий! Дорогие друзья, постоянное информационно-техническое обеспечение нашей деятельности обеспечивает актуальность всесторонне сбалансированных нововведений?"
    },
    {
        broadcaster_type: "",
        display_name: "Vorun5",
        login: "vorun5",
        profile_image_url: "https://static-cdn.jtvnw.net/jtv_user_pictures/81e238c5-c782-4180-84cc-48975a3472d6-profile_image-300x300.png",
        view_count: 5,
        stream_info: {
            title: "INSANECAT",
            game_name: "INSANECAT",
        },
        description: ".",
    },
    {
        description: "WWWWWWWWWWWWWWWWWWWWW",
        broadcaster_type: "",
        display_name: "montag_r",
        login: "montag_r",
        view_count: 56,
        profile_image_url: "https://static-cdn.jtvnw.net/jtv_user_pictures/3103dbcb-4f09-45be-b77c-a1792d9d0391-profile_image-300x300.png",
    },
    {
        broadcaster_type: "partner",
        display_name: "GeneraL_HS_",
        login: "general_hs_",
        view_count: 103932,
        profile_image_url: "https://static-cdn.jtvnw.net/jtv_user_pictures/76442814-883b-490e-a2d2-04b277b04d67-profile_image-300x300.png",
        description: "aksdakds",
    }
];

const Header = (): JSX.Element => {
    const isDesktop = useMediaQuery({
        query: "(min-width: 992px)"
    });

    if (isDesktop) return  <HeaderDesktop streamers={streamers}/>;

    return <HeaderMobile/>;
}

export default Header;
