// @ts-check
const { rollup } = require('rollup')
/**  @type {import('rollup').PluginImpl<import('rollup-plugin-dts').Options>} */
// @ts-ignore
const dts = require("rollup-plugin-dts").default;

const externals = [
  'vue-types',
  'vue',
  'ant-design-vue',
  'ant-design-vue/*',
  'vue-router',
  'lodash',
  'dayjs'
]
module.exports = async () => {
  const bundle = await rollup({
    input: "src/index.ts",
    output: {
      file: "lib/index.d.ts",
      format: "es"
    },
    external(source, importer, isResolved) {
      return externals.includes(source) || source.startsWith('ant-design-vue')
    },
    plugins: [dts({
      respectExternal: true,
      compilerOptions: {
        skipLibCheck: true,
        isolatedModules: true,
        esModuleInterop: true,
      }
    })],
  })
  // or write the bundle to disk
  await bundle.write({
    file: "lib/index.d.ts",
    format: "es"
  });
}


