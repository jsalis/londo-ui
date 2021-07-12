module.exports = (api) => {
    const envConfig = api.env("test") ? { targets: { node: "current" } } : { modules: false };
    return {
        presets: [["@babel/preset-env", envConfig], "@babel/preset-react"],
        plugins: ["babel-plugin-styled-components"],
        ignore: ["**/*.stories.jsx"],
    };
};
