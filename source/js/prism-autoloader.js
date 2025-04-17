// Prism自动加载器 - 解决Diff插件加载问题
(function () {
  // 只在网页加载完成后执行
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    initPrismAutoloader();
  } else {
    document.addEventListener('DOMContentLoaded', initPrismAutoloader);
  }

  function initPrismAutoloader() {
    // 检查Prism是否存在
    if (typeof Prism === 'undefined') {
      console.error('Prism未加载，无法初始化自动加载器');
      return;
    }

    console.log('初始化Prism自动加载器');

    // 确保Diff语言定义存在
    if (!Prism.languages.diff) {
      console.log('添加Diff语言定义');
      
      // 如果Prism.languages.diff不存在，手动添加
      Prism.languages.diff = {
        'coord': [
          /^(?:\+{3}|-{3}|\*{3}).*$/m,
          /^@@.*@@$/m,
          /^\d.*$/m
        ],
        'deleted': /^[-<].*$/m,
        'inserted': /^[+>].*$/m,
        'diff': {
          'pattern': /^diff.*$/m,
          'alias': 'important'
        }
      };
    }

    // 拦截警告
    var originalConsoleWarn = console.warn;
    console.warn = function(message) {
      // 忽略特定的Prism警告
      if (typeof message === 'string' && 
          message.includes("Prism's Diff Highlight plugin requires")) {
        return; // 不显示这个警告
      }
      // 其他警告正常显示
      originalConsoleWarn.apply(console, arguments);
    };

    // 告知Prism已处理Diff语言
    if (Prism.plugins && Prism.plugins.autoloader) {
      // 如果已有autoloader插件，注册diff语言
      Prism.plugins.autoloader.languages_path = '/js/prism-components/';
    } else {
      // 否则创建简单的替代
      Prism.plugins = Prism.plugins || {};
      Prism.plugins.autoloader = {
        languages_path: '/js/prism-components/'
      };
    }

    console.log('Prism自动加载器初始化完成');
  }
})(); 