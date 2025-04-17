// 语言切换功能
document.addEventListener('DOMContentLoaded', function() {
  const langSwitch = document.getElementById('lang-switch');
  if (langSwitch) {
    langSwitch.addEventListener('click', function(e) {
      e.preventDefault();
      const submenu = this.nextElementSibling;
      if (submenu.classList.contains('active')) {
        submenu.classList.remove('active');
      } else {
        submenu.classList.add('active');
      }
    });
  }
  
  // 获取URL参数中的语言设置
  const urlParams = new URLSearchParams(window.location.search);
  const lang = urlParams.get('lang');
  if (lang) {
    // 存储用户语言偏好
    localStorage.setItem('preferred_language', lang);
    // 如果URL中有语言参数，重定向到无参数页面
    if (urlParams.has('lang')) {
      urlParams.delete('lang');
      const newUrl = window.location.pathname + (urlParams.toString() ? '?' + urlParams.toString() : '');
      window.location.href = newUrl;
    }
  }
}); 