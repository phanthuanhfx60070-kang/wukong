import React, { useState, useEffect } from 'react';

// SVG 图标库 - 采用纤细线条设计
const ICONS = {
  hourglass: (
    <svg viewBox="0 0 24 24" className="w-full h-full stroke-current fill-none" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 2h14M5 22h14M15 2H9c0 4 2 6 5 8.5s5 4.5 5 8.5v3H5v-3c0-4 2-6 5-8.5S9 6 9 2" />
    </svg>
  ),
  timer: (
    <svg viewBox="0 0 24 24" className="w-full h-full stroke-current fill-none" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 2h4M12 14v-4M4 13a8 8 0 0 1 8-7 8 8 0 1 1-5.3 14L4 17.6" />
    </svg>
  ),
  circle: (
    <svg viewBox="0 0 24 24" className="w-full h-full stroke-current fill-none" strokeWidth="1.2"><circle cx="12" cy="12" r="9" /></svg>
  ),
  square: (
    <svg viewBox="0 0 24 24" className="w-full h-full stroke-current fill-none" strokeWidth="1.2"><rect x="4" y="4" width="16" height="16" rx="1" /></svg>
  ),
  triangle: (
    <svg viewBox="0 0 24 24" className="w-full h-full stroke-current fill-none" strokeWidth="1.2"><path d="M12 3L4 21h16L12 3z" /></svg>
  ),
  hexagon: (
    <svg viewBox="0 0 24 24" className="w-full h-full stroke-current fill-none" strokeWidth="1.2"><path d="M12 3l8 4.5v9l-8 4.5-8-4.5v-9L12 3z" /></svg>
  ),
  command: (
    <svg viewBox="0 0 24 24" className="w-full h-full stroke-current fill-none" strokeWidth="1.2">
      <path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z" />
    </svg>
  )
};

const App = () => {
  const [theme, setTheme] = useState('gold'); // 默认大圣风格
  const [currentPage, setCurrentPage] = useState(1);
  const [isFading, setIsFading] = useState(false);

  const totalApps = 100;
  const appsPerPage = 10;
  const geoIcons = ['circle', 'square', 'triangle', 'hexagon', 'command'];

  // 动态更新主题色彩
  useEffect(() => {
    const themes = {
      gold: { bg: '#1a1612', text: '#e2d5bc', box: '#25201a', border: '#3d352a', dim: '#8c7e6a', accent: '#d4af37' },
      dark: { bg: '#0a0a0a', text: '#ffffff', box: '#111', border: '#222', dim: '#555', accent: '#ff3e00' },
      light: { bg: '#f5f5f7', text: '#1d1d1f', box: '#ffffff', border: '#e0e0e0', dim: '#86868b', accent: '#0071e3' },
      cyber: { bg: '#050505', text: '#00ffcc', box: '#0d0d0d', border: '#1a1a1a', dim: '#006655', accent: '#ff00ff' }
    };

    const colors = themes[theme];
    document.body.style.backgroundColor = colors.bg;
    document.body.style.color = colors.text;
    document.body.style.transition = 'background-color 0.5s ease, color 0.5s ease';

    const root = document.documentElement;
    root.style.setProperty('--box-bg', colors.box);
    root.style.setProperty('--box-border', colors.border);
    root.style.setProperty('--text-main', colors.text);
    root.style.setProperty('--text-dim', colors.dim);
    root.style.setProperty('--accent', colors.accent);
  }, [theme]);

  // 构建数据
  const appData = Array.from({ length: totalApps }, (_, i) => {
    const id = i + 1;
    
    // 1. 悟空时光器
    if (id === 1) return { name: "悟空时光器", url: "http://year.wukong.lol/", icon: ICONS.hourglass };
    
    // 2. 悟空倒计时
    if (id === 2) return { name: "悟空倒计时", url: "https://react.wukong.lol/", icon: ICONS.timer };
    
    // 3. 悟空卡牌
    if (id === 3) return { name: "悟空卡牌", url: "https://kapai.wukong.lol/", icon: ICONS.command };

    // 4. 悟空BNS 提取工具
    if (id === 4) return { name: "悟空BNS提取", url: "https://www.kang.meme/bns", icon: ICONS.command };

    // 其余为占位方块
    // 注意：下面的 ${id} 是自动生成的，如果你不写上面的 if (id === 4)，
    // 这里会自动显示为 "App 004"，所以你不需要手动改这一行。
    return { 
      name: `App ${String(id).padStart(3, '0')}`, 
      url: null, 
      icon: ICONS[geoIcons[i % geoIcons.length]] 
    };
  });

  const handlePageChange = (newPage) => {
    if (currentPage === newPage) return;
    setIsFading(true);
    setTimeout(() => {
      setCurrentPage(newPage);
      setIsFading(false);
    }, 150);
  };

  const currentApps = appData.slice((currentPage - 1) * appsPerPage, currentPage * appsPerPage);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 overflow-hidden select-none">
      {/* 风格切换 */}
      <div className="absolute top-8 right-8 flex gap-3 z-50">
        {['gold', 'dark', 'light', 'cyber'].map((t) => (
          <button
            key={t}
            onClick={() => setTheme(t)}
            className={`cursor-pointer text-[10px] uppercase tracking-widest px-2 py-1 border transition-all duration-300 ${
              theme === t 
                ? 'border-[var(--accent)] text-[var(--text-main)]' 
                : 'border-[var(--box-border)] text-[var(--text-dim)] hover:text-[var(--text-main)]'
            }`}
          >
            {t === 'gold' ? '大圣' : t === 'dark' ? '深邃' : t === 'light' ? '纯白' : '霓虹'}
          </button>
        ))}
      </div>

      {/* 极简标题 */}
      <header className="mb-12 text-center">
        <h1 className="text-[1.25rem] font-light tracking-[0.6rem] uppercase opacity-90">
          WUKONG.LOL
        </h1>
      </header>

      {/* 方阵展示 */}
      <div className="w-full max-w-[700px] px-4 flex items-center justify-center min-h-[280px]">
        <div 
          className={`grid grid-cols-2 md:grid-cols-5 gap-6 w-full transition-all duration-200 ${
            isFading ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'
          }`}
        >
          {currentApps.map((app, index) => {
            const isLink = !!app.url;
            const Element = isLink ? 'a' : 'div';
            
            return (
              <Element
                key={index}
                href={app.url || undefined}
                target={isLink ? "_blank" : undefined}
                rel={isLink ? "noopener noreferrer" : undefined}
                className={`aspect-square bg-[var(--box-bg)] border border-[var(--box-border)] flex flex-col items-center justify-center text-center p-3 rounded-sm no-underline text-[var(--text-dim)] transition-all duration-300 
                  hover:border-[var(--accent)] hover:text-[var(--text-main)] hover:-translate-y-1 
                  ${isLink ? 'cursor-pointer' : 'cursor-default'}`}
              >
                <div className="w-6 h-6 mb-3 flex items-center justify-center">
                  {app.icon}
                </div>
                <span className="text-[10px] tracking-tight">{app.name}</span>
              </Element>
            );
          })}
        </div>
      </div>

      {/* 分页导航 */}
      <nav className="mt-16 flex gap-5 justify-center">
        {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
          <button
            key={num}
            onClick={() => handlePageChange(num)}
            className={`cursor-pointer text-[13px] px-1 py-1 transition-all duration-300 ${
              currentPage === num 
                ? 'text-[var(--text-main)] border-b border-[var(--accent)] font-medium' 
                : 'text-[var(--text-dim)] hover:text-[var(--text-main)]'
            }`}
          >
            {num}
          </button>
        ))}
      </nav>

      <style>{`
        :root {
          --box-bg: #25201a;
          --box-border: #3d352a;
          --text-main: #e2d5bc;
          --text-dim: #8c7e6a;
          --accent: #d4af37;
        }
        body {
          margin: 0;
          padding: 0;
          transition: background-color 0.5s ease;
        }
      `}</style>
    </div>
  );
};

export default App;