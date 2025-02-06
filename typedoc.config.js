/** @type {Partial<import("typedoc").TypeDocOptions>} */
const config = {
  entryPoints: ['./src/index.ts'],
  plugin: [
    'typedoc-plugin-rename-defaults',
    'typedoc-plugin-missing-exports',
    'typedoc-plugin-markdown',
  ],
  internalModule: 'Components',
  collapseInternalModule: true,
  outputs: [
    {
      name: 'markdown',
      path: './doc',
    },
  ],
}

export default config
