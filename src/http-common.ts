import axios from "axios";

export default axios.create({
    baseURL: "https://bho.lt/api",
    headers: {
        "Content-type": "application/json"
    }
});
