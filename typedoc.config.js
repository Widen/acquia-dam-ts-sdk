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
      name: 'json',
      path: './doc/json/doc.json',
    },
    {
      name: 'markdown',
      path: './doc/markdown',
    },
  ],
}

export default config
