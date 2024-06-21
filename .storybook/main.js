module.exports = {
    stories: ["../docs/**/*.mdx", "../src/**/*.stories.@(ts|tsx)"],
    addons: [
        "@storybook/addon-essentials",
        "@storybook/addon-mdx-gfm",
        "@storybook/addon-webpack5-compiler-babel",
        "@storybook/addon-themes",
    ],
    framework: {
        name: "@storybook/react-webpack5",
        options: {},
    },
    typescript: {
        reactDocgen: "react-docgen-typescript",
    },
    core: {
        disableTelemetry: true,
    },
    features: {
        postcss: false,
    },
};
