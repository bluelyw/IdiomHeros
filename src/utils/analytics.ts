// Google Analytics 4 跟踪工具

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

// 页面浏览跟踪
export const trackPageView = (pageName: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'page_view', {
      page_title: pageName,
      page_location: window.location.href,
      page_path: window.location.pathname
    });
  }
};

// 点击事件跟踪
export const trackClick = (elementName: string, elementType: string, pageName?: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'click', {
      event_category: 'engagement',
      event_label: elementName,
      element_type: elementType,
      page_name: pageName || 'unknown'
    });
  }
};

// 滚动事件跟踪
export const trackScroll = (scrollDepth: number, pageName?: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'scroll', {
      event_category: 'engagement',
      scroll_depth: scrollDepth,
      page_name: pageName || 'unknown'
    });
  }
};

// 初始化滚动跟踪
export const initScrollTracking = (pageName: string) => {
  if (typeof window === 'undefined') return;

  let scrollDepth = 0;
  let scrollTracked = false;

  const handleScroll = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = Math.round((scrollTop / docHeight) * 100);

    // 跟踪滚动到25%, 50%, 75%, 100%
    if (scrollPercent >= 25 && scrollDepth < 25) {
      trackScroll(25, pageName);
      scrollDepth = 25;
    } else if (scrollPercent >= 50 && scrollDepth < 50) {
      trackScroll(50, pageName);
      scrollDepth = 50;
    } else if (scrollPercent >= 75 && scrollDepth < 75) {
      trackScroll(75, pageName);
      scrollDepth = 75;
    } else if (scrollPercent >= 100 && !scrollTracked) {
      trackScroll(100, pageName);
      scrollTracked = true;
    }
  };

  window.addEventListener('scroll', handleScroll);
  
  // 返回清理函数
  return () => {
    window.removeEventListener('scroll', handleScroll);
  };
};

// 初始化点击跟踪
export const initClickTracking = (pageName: string) => {
  if (typeof window === 'undefined') return;

  const handleClick = (event: Event) => {
    const target = event.target as HTMLElement;
    if (!target) return;

    // 获取元素信息
    const tagName = target.tagName.toLowerCase();
    const className = target.className || '';
    const text = target.textContent?.trim() || '';

    // 确定元素类型和名称
    let elementType = tagName;
    let elementName = '';

    if (target.closest('button')) {
      elementType = 'button';
      elementName = text || className || 'button';
    } else if (target.closest('a')) {
      elementType = 'link';
      elementName = text || className || 'link';
    } else if (target.closest('.level-card')) {
      elementType = 'level_card';
      elementName = text || className || 'level_card';
    } else if (target.closest('.card')) {
      elementType = 'card';
      elementName = text || className || 'card';
    }

    // 跟踪点击事件
    if (elementName) {
      trackClick(elementName, elementType, pageName);
    }
  };

  document.addEventListener('click', handleClick);
  
  // 返回清理函数
  return () => {
    document.removeEventListener('click', handleClick);
  };
}; 