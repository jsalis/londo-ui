import * as icons from "../../src/icons";

export const iconList = Object.entries(icons)
    .filter(([key]) => key[0] === key[0].toUpperCase())
    .sort(([a], [b]) => a.localeCompare(b));
