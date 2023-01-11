import {Routes, Route} from "react-router-dom";
import StreamerPage from "./pages/StreamerPage/StreamerPage";
import Header from "./components/Header/Header";
import HomePage from "./pages/HomePage/HomePage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage"

function App() {

    return (
        <div className="app-container">
            <Header/>
            <Routes>
                <Route path="/" element={<HomePage/>} />
                <Route path="/:streamerLogin" element={<StreamerPage/>} />
                <Route path="*" element={<NotFoundPage/>}/>
            </Routes>
        </div>
    );
}

export default App;
