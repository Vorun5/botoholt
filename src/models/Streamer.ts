import StreamInfo from "./StreamInfo";

export type BroadcasterType = "affiliate" | "partner" | ""

export interface Streamer {
    login: string,
    display_name: string,
    broadcaster_type: BroadcasterType,
    profile_image_url: string,
    stream_info?: StreamInfo,
}

