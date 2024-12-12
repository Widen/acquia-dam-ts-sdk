import { base, jest, typescript } from 'eslint-config-widen'

const config = [
  ...base,
  ...typescript,
  ...[{ ignores: ['dist/**/*', 'doc/**/*'] }, ...jest],
]

export default config
