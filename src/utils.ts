import {TFunction} from "i18next";

const capitalize = (str: string | undefined | null): string => {
    if (!str || str.length === 0) return "";

    const trimStr = str.trim()

    return trimStr.charAt(0).toUpperCase() + trimStr.slice(1);
}

const formatTime = (time: number, translation: TFunction<"translation", undefined, "translation">) =>
    `${Math.floor(time! / 60)}${translation("minutes")} ${time! % 60}${translation("seconds")}`;


export {capitalize, formatTime};
