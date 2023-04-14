const sizes = {
    mobile: 576,
    tablet: 768,
    laptop: 1200,
    desktop: 1700,
    desktopL: 2560,
}

const devices = {
    mobile: `@media screen and (min-width: ${sizes.tablet - 1}px)`,
    tablet: `@media screen and (min-width: ${sizes.laptop - 1}px)`,
    laptop: `@media screen and (min-width: ${sizes.desktop - 1}px)`,
    desktop: `@media screen and (min-width: ${sizes.desktopL - 1}px)`,
}

export const breakpoints = {
    sizes,
    devices,
}
