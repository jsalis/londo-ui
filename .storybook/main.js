module.exports = {
    stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
    addons: ["@storybook/addon-essentials", "storybook-addon-styled-component-theme/dist/preset"],
    features: {
        postcss: false,
    },
};
