/** @type {Partial<import("typedoc").TypeDocOptions>} */
const options = {
  entryPoints: ['./src/index.ts'],
  out: 'doc',
  plugin: [
    'typedoc-github-theme',
    'typedoc-plugin-rename-defaults',
    'typedoc-plugin-missing-exports',
  ],
  internalModule: 'Components',
  collapseInternalModule: true,
}

export default options
