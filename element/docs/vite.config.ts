import {defineConfig} from 'vite'
import {RollupWarning} from 'rollup'
function isVueResolveDirective(warning: RollupWarning){
  if(warning.code !== 'UNUSED_EXTERNAL_IMPORT') return false
  if(!warning.names || !warning.names.includes('resolveDirective')) return false
  if(warning.source != 'vue') return false
  return true
}
export default defineConfig(({mode})=>{
  // console.info(mode)
  return {

    build:{
      // minify:false,
      rollupOptions:{
        onwarn(warning, warn) {
          if (!isVueResolveDirective(warning)){
            warn(warning)
          }
        }
      }
    }
  }
})