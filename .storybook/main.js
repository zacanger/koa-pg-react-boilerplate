/** @type { import('@storybook/react-vite').StorybookConfig } */
const config = {
  stories: ['../src/client/**/*.story.@(js|jsx|ts|tsx)'],
  staticDirs: ['../'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  core: {
    disableTelemetry: true,
  },
}

export default config
