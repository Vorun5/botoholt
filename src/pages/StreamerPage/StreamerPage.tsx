import {useParams} from "react-router-dom";

const StreamerPage = () => {
    const {streamerLogin} = useParams();

    return <div>
        {streamerLogin}
    </div>
}

export default StreamerPage;
