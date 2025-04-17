/**
 * 禁用Prism高亮的解决方案
 */
(function() {
  // 定义一个占位Prism对象，阻止真正的Prism初始化
  window.Prism = window.Prism || {
    manual: true,
    disableWorkerMessageHandler: true,
    
    // 提供空方法以避免错误
    highlightAll: function() { console.log('Prism高亮已禁用'); },
    highlightElement: function() { console.log('Prism高亮已禁用'); },
    highlightAllUnder: function() { console.log('Prism高亮已禁用'); },
    
    // 提供基本语言定义以避免错误
    languages: {
      extend: function() {},
      insertBefore: function() {},
      diff: {
        'coord': [/^(?:\+{3}|-{3}|\*{3}).*$/m, /^@@.*@@$/m, /^\d.*$/m],
        'deleted': /^[-<].*$/m,
        'inserted': /^[+>].*$/m,
        'diff': {
          'pattern': /^diff.*$/m,
          'alias': 'keyword'
        }
      }
    },
    
    // 防止插件报错
    plugins: {
      autoloader: {
        loadLanguages: function() {}
      }
    },
    
    // 空钩子
    hooks: {
      all: {},
      add: function() {},
      run: function() {}
    }
  };
  
  // 拦截控制台警告
  const originalConsoleWarn = console.warn;
  console.warn = function(message) {
    if (typeof message === 'string' && message.includes("Prism")) {
      return; // 不显示Prism相关警告
    }
    originalConsoleWarn.apply(console, arguments);
  };
  
  console.log('Prism高亮功能已被禁用替代方案接管');
  
  // 添加对highlight.js的支持
  document.addEventListener('DOMContentLoaded', function() {
    if (typeof hljs !== 'undefined') {
      hljs.highlightAll();
      console.log('已使用highlight.js代替Prism');
    }
  });
})(); 