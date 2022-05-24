const path = require('path')

/**
 * @param {import('rollup').RollupWarning} warning
 * @returns
 */
exports.isVueResolveDirective = function (warning) {
  if (warning.code !== 'UNUSED_EXTERNAL_IMPORT') return false
  if (!warning.names || !warning.names.includes('resolveDirective')) return false
  if (warning.source != 'vue') return false
  return true
}

/**
 * @type {import('rollup').RollupOptions}
 */
exports.rollupWarn = {
  onwarn(warning, warn) {
    if (!exports.isVueResolveDirective(warning)) {
      warn(warning)
    }
  }
}

const umdExternals = ['vue',
  'ant-design-vue',
  'dot-prop',
  'lodash-es',
  'lodash']
/**
 * @type {import('rollup').ExternalOption}
 */
exports.cjsExternal = (source) => {
  if (umdExternals.includes(source)) return true
  if (source == 'vue-types') return true
  return false
}

/**
 * @type {import('rollup').ExternalOption}
 */
exports.umdExternal = (source) => {
  if (umdExternals.includes(source)) return true
  return false
}


/**
 * 打包的入口文件
 */
exports.entryDir = path.resolve(__dirname, '../src')
exports.entryFile = path.resolve(__dirname, '../src/index.ts')
/**
 * 出口文件夹
 */
exports.outDir = path.resolve(__dirname, '../lib')