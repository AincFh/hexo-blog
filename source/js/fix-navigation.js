/**
 * 网站导航和图标修复脚本 - 处理重复菜单和图标问题
 */
document.addEventListener('DOMContentLoaded', function() {
  console.log('修复脚本启动');

  // 1. 修复重复导航菜单
  const menuContainers = document.querySelectorAll('nav#nav');
  if (menuContainers.length > 1) {
    console.log('检测到重复导航菜单，准备修复');
    // 保留第一个导航菜单，删除其余的
    for (let i = 1; i < menuContainers.length; i++) {
      if (menuContainers[i] && menuContainers[i].parentNode) {
        menuContainers[i].parentNode.removeChild(menuContainers[i]);
      }
    }
  }

  // 2. 修复图标加载问题
  // 预加载字体图标
  try {
    console.log('准备预加载图标字体');
    const preloadLink = document.createElement('link');
    preloadLink.rel = 'preload';
    preloadLink.href = '/fonts/iconfont.woff2';
    preloadLink.as = 'font';
    preloadLink.type = 'font/woff2';
    preloadLink.crossOrigin = 'anonymous';
    document.head.appendChild(preloadLink);

    // 添加本地图标字体
    const fontStyle = document.createElement('style');
    fontStyle.textContent = `
      @font-face {
        font-family: 'ic';
        src: url('/fonts/iconfont.woff2') format('woff2');
        font-display: swap;
      }
    `;
    document.head.appendChild(fontStyle);
  } catch(e) {
    console.error('图标预加载失败:', e);
  }

  // 3. 修复错误URL链接
  try {
    console.log('准备修复错误URL');
    document.querySelectorAll('a').forEach(link => {
      // 修复包含错误标记的URL
      if (link.href.includes('%20%7C%7C%20') || 
          link.href.includes('%5Bobject%20Object%5D') ||
          link.href.includes(' || ')) {
        const cleanUrl = link.href.split('?')[0].split('#')[0].split('%20')[0].split(' || ')[0];
        link.href = cleanUrl;
      }
      
      // 检查链接是否包含双重路径
      if (link.pathname && (
          link.pathname.includes('/posts//posts/') || 
          link.pathname.includes('/about//about/') ||
          link.pathname.includes('/friends//friends/')
      )) {
        // 修复双重路径
        link.pathname = link.pathname.replace('/posts//posts/', '/posts/');
        link.pathname = link.pathname.replace('/about//about/', '/about/');
        link.pathname = link.pathname.replace('/friends//friends/', '/friends/');
      }
    });
  } catch(e) {
    console.error('URL修复失败:', e);
  }

  // 4. 移除重复的头部菜单项
  try {
    console.log('准备修复重复菜单项');
    const mainMenu = document.querySelector('ul.menu');
    if (mainMenu) {
      const menuItems = mainMenu.querySelectorAll('li.item:not(.title)');
      const seen = {};
      
      // 查找并移除重复项
      menuItems.forEach(item => {
        const link = item.querySelector('a');
        if (link) {
          const href = link.getAttribute('href');
          if (seen[href]) {
            item.parentNode.removeChild(item);
          } else {
            seen[href] = true;
          }
        }
      });
    }
  } catch(e) {
    console.error('菜单项修复失败:', e);
  }
  
  // 5. 禁用有问题的quicklink预加载
  try {
    console.log('准备配置quicklink');
    if (window.quicklink) {
      // 重置quicklink配置
      window.quicklink.listen({
        ignores: [
          /\/en\//,
          uri => uri.includes('/en/'),
          uri => uri.includes('%20'),
          uri => uri.includes('[object'),
          uri => uri.includes('||'),
          uri => uri.includes('undefined'),
          uri => uri.includes('/posts//'),
          uri => uri.includes('/about//'),
          uri => uri.includes('/friends//'),
          (uri, elem) => elem.hasAttribute('data-no-prefetch')
        ]
      });
    }
  } catch(e) {
    console.error('Quicklink配置失败:', e);
  }
  
  // 6. 修复404图标资源
  try {
    console.log('准备修复图标资源');
    // 检查所有样式表
    document.querySelectorAll('link[rel="stylesheet"]').forEach(style => {
      if (style.href && style.href.includes('fonts.googleapis.com')) {
        // 删除可能导致404的Google字体
        style.parentNode.removeChild(style);
      }
    });
    
    // 删除可能导致404的字体图标链接
    const links = Array.from(document.getElementsByTagName('link'));
    links.forEach(link => {
      if ((link.rel === 'stylesheet' || link.rel === 'preload') && 
          link.href && link.href.includes('alicdn.com')) {
        link.parentNode.removeChild(link);
      }
    });
  } catch(e) {
    console.error('图标资源修复失败:', e);
  }
  
  console.log('修复脚本执行完毕');
}); 