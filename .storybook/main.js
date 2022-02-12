module.exports = {
    stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(ts|tsx)"],
    addons: ["@storybook/addon-essentials", "storybook-addon-styled-component-theme/dist/preset"],
    features: {
        postcss: false,
    },
};
