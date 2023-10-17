import { fileURLToPath, URL } from 'node:url'
import { UserConfigExport, ConfigEnv, loadEnv } from 'vite'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
//@ts-ignore
export default defineConfig(({ command, mode }: ConfigEnv) => {
  const env = loadEnv(mode, process.cwd())
  return {
    plugins: [vue()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    server: {
      host: '0.0.0.0',
      port: env.VITE_PORT,
      proxy: {
        [env.VITE_APP_BASE_API]: {
          // 设置跨域
          target: env.VITE_SERVER,
          // 代理服务器在转发请求时自动修改请求头中的 Host 字段，使其与目标服务器的域名相同
          changeOrigin: true,
        },
      }
    }
  }
})
