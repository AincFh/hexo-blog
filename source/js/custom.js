// 防止加载MiniValine
window.MV_CONFIG = null;
window.MV_PAGEVIEW = null;

// 禁用不需要的脚本加载
document.addEventListener('DOMContentLoaded', function() {
  // 移除MiniValine相关脚本
  const scripts = document.querySelectorAll('script');
  scripts.forEach(script => {
    if (script.src && (
      script.src.includes('minivaline') || 
      script.src.includes('valine')
    )) {
      script.remove();
    }
  });

  // 防止404资源加载
  const links = document.querySelectorAll('link[rel="stylesheet"]');
  links.forEach(link => {
    if (link.href && link.href.includes('fonts.googleapis.com')) {
      link.remove();
    }
  });
  
  // 修复链接中的错误格式 - 清理URL中的特殊字符
  document.querySelectorAll('a').forEach(link => {
    if (link.href.includes('%20%7C%7C%20') || 
        link.href.includes('%5Bobject%20Object%5D')) {
      const cleanUrl = link.href.split('?')[0].split('#')[0].split('%20')[0];
      link.href = cleanUrl;
    }
  });
  
  // 禁用quicklink对语言切换路径的预加载
  if (window.quicklink) {
    window.quicklink.listen({
      ignores: [
        /\/en\//,
        uri => uri.includes('/en/'),
        uri => uri.includes('%20'),
        uri => uri.includes('[object'),
        (uri, elem) => elem.hasAttribute('data-no-prefetch')
      ]
    });
  }
  
  // 语言切换处理
  const languageSwitch = document.getElementById('language-switch');
  if (languageSwitch) {
    languageSwitch.addEventListener('click', function(e) {
      e.preventDefault();
      
      // 切换语言逻辑 - 使用cookie或localStorage
      const currentLang = localStorage.getItem('blog_language') || 'zh-CN';
      const newLang = currentLang === 'zh-CN' ? 'en' : 'zh-CN';
      
      // 存储新语言设置
      localStorage.setItem('blog_language', newLang);
      
      // 应用语言变化 - 这里只切换界面文本而不是通过URL
      document.documentElement.setAttribute('lang', newLang);
      
      // 更新界面文本
      updateInterfaceLanguage(newLang);
      
      // 显示切换提示
      showLanguageNotification(newLang);
    });
  }
  
  // 初始化语言设置
  initializeLanguage();
});

// 初始化语言设置
function initializeLanguage() {
  const savedLang = localStorage.getItem('blog_language') || 'zh-CN';
  document.documentElement.setAttribute('lang', savedLang);
  
  // 加载初始界面语言
  updateInterfaceLanguage(savedLang);
}

// 更新界面文本
function updateInterfaceLanguage(lang) {
  // 菜单项翻译
  const translations = {
    'zh-CN': {
      'home': '首页',
      'posts': '文章',
      'about': '关于',
      'friends': '友链',
      'search': '搜索',
      'language_switch': '切换到英文'
    },
    'en': {
      'home': 'Home',
      'posts': 'Posts',
      'about': 'About',
      'friends': 'Friends',
      'search': 'Search',
      'language_switch': 'Switch to Chinese'
    }
  };
  
  // 更新导航菜单
  const menuItems = document.querySelectorAll('.menu .item a');
  menuItems.forEach(item => {
    const key = item.getAttribute('data-lang-key');
    if (key && translations[lang][key]) {
      item.textContent = translations[lang][key];
    }
  });
  
  // 更新语言切换按钮提示
  const langSwitch = document.getElementById('language-switch');
  if (langSwitch) {
    langSwitch.title = translations[lang]['language_switch'];
  }
}

// 显示语言切换通知
function showLanguageNotification(lang) {
  const message = lang === 'zh-CN' ? '已切换到中文' : 'Switched to English';
  
  // 创建通知元素
  const notification = document.createElement('div');
  notification.className = 'language-notification';
  notification.textContent = message;
  notification.style.position = 'fixed';
  notification.style.bottom = '20px';
  notification.style.right = '20px';
  notification.style.padding = '10px 15px';
  notification.style.backgroundColor = 'rgba(0,0,0,0.7)';
  notification.style.color = '#fff';
  notification.style.borderRadius = '5px';
  notification.style.zIndex = '9999';
  notification.style.transition = 'opacity 0.3s ease';
  
  // 添加到页面
  document.body.appendChild(notification);
  
  // 3秒后移除
  setTimeout(() => {
    notification.style.opacity = '0';
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 3000);
} 