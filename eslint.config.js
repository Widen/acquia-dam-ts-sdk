import base from 'eslint-config-widen-base'
import jest from 'eslint-config-widen-jest'
import typescript from 'eslint-config-widen-typescript'

const config = [
  ...base,
  ...typescript,
  ...[{ ignores: ['dist/**/*', 'doc/**/*'] }, ...jest],
]

export default config
