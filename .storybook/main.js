module.exports = {
    stories: ["../docs/**/*.mdx", "../src/**/*.mdx", "../src/**/*.stories.@(ts|tsx)"],
    addons: ["@storybook/addon-essentials", "storybook-addon-styled-component-theme/dist/preset"],
    features: {
        postcss: false,
    },
};
