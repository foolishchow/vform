const path = require('path')
const { defineConfig, build: viteBuild } = require('vite')
/**  @type {(option?:import('@vitejs/plugin-vue').Options)=>import('vite').Plugin} */
const vue = require('@vitejs/plugin-vue')
/**  @type {()=>import('vite').Plugin} */
const vueJsx = require('@vitejs/plugin-vue-jsx')
const buildDeclaration = require('./build-declaration')
const { entryFile, outDir, rollupWarn, cjsExternal, umdExternal } = require('./utils')

// vite基础配置
const baseConfig = defineConfig({
  build: {
    minify: false
  },
  // configFile: false,
  publicDir: false,
  plugins: [vue(), vueJsx()]
})


/**
 *
 * @param {import('vite').InlineConfig} option
 */
function Build(option) {
  return viteBuild({
    ...baseConfig,
    ...option
  })
}

function buildCjsAndEs() {
  return Build({
    build: {
      minify: false,
      rollupOptions: {
        external: cjsExternal,
        ...rollupWarn
      },
      lib: {
        entry: entryFile,
        fileName: (format) => `index.${format}.js`, // 输出文件名
        formats: ['es', 'cjs'],
      },
      outDir
    }
  })
}

function buildUmd() {
  return Build({
    build: {
      emptyOutDir: false,
      minify: false,
      rollupOptions: {
        ...rollupWarn,
        external: umdExternal,
        output: {
          globals: {
            vue: 'Vue',
            'ant-design-vue': 'antd',
            'lodash-es': '_',
          }
        }
      },
      lib: {
        name: 'vform',
        entry: entryFile,
        fileName: (format) => `index.${format}.js`, // 输出文件名
        formats: ['umd'],
      },
      outDir
    }
  })
}
// 全量打包构建
const buildAll = async () => {
  await buildCjsAndEs()
  await buildUmd()
  await buildDeclaration()
}

buildAll()
