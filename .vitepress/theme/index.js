import DefaultTheme from 'vitepress/theme'
import './custom.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app, router, siteData }) {
    // 客户端增强
    if (typeof window !== 'undefined') {
      // 添加页面加载性能监控
      router.onAfterRouteChanged = (to) => {
        // Google Analytics 或其他分析工具
        if (window.gtag) {
          window.gtag('config', 'GA_MEASUREMENT_ID', {
            page_path: to
          })
        }
      }
      
      // 预加载关键页面
      const preloadPages = [
        '/HTML/HTML性能优化点'
      ]
      
      // 延迟预加载以避免影响初始页面性能
      setTimeout(() => {
        preloadPages.forEach(page => {
          const link = document.createElement('link')
          link.rel = 'prefetch'
          link.href = page
          document.head.appendChild(link)
        })
      }, 2000)
    }
  }
}