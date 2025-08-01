// 成语闯关游戏主应用组件
import { useState, useEffect } from 'react';
import { loadProgress, saveProgress, GameProgress } from './utils/storage';
import { LEVELS } from './data/levels';
import { 
  trackPageView, 
  initScrollTracking,
  initClickTracking
} from './utils/analytics';
import StartScreen from './components/StartScreen';
import LevelMap from './components/LevelMap';
import LevelPlay from './components/LevelPlay';
import Summary from './components/Summary';

function App() {
  const [currentPage, setCurrentPage] = useState<'start' | 'map' | 'play' | 'summary'>('start');
  const [progress, setProgress] = useState<GameProgress>(loadProgress());
  const [currentLevelId, setCurrentLevelId] = useState<string | null>(null);

  // 保存进度
  useEffect(() => {
    saveProgress(progress);
  }, [progress]);

  // 页面浏览跟踪
  useEffect(() => {
    const pageNames = {
      start: '开始页面',
      map: '关卡地图',
      play: '游戏页面',
      summary: '学习总结'
    };
    
    trackPageView(pageNames[currentPage]);
    
    // 初始化滚动和点击跟踪
    const cleanupScroll = initScrollTracking(pageNames[currentPage]);
    const cleanupClick = initClickTracking(pageNames[currentPage]);
    
    return () => {
      cleanupScroll?.();
      cleanupClick?.();
    };
  }, [currentPage]);

  // 开始游戏
  const handleStartGame = () => {
    setCurrentPage('map');
  };

  // 选择关卡
  const handleSelectLevel = (levelId: string) => {
    setCurrentLevelId(levelId);
    setCurrentPage('play');
  };

  // 完成关卡
  const handleLevelComplete = (levelId: string, score: number) => {
    const newProgress = { ...progress };
    
    // 更新关卡状态
    if (!newProgress.cleared.includes(levelId)) {
      newProgress.cleared.push(levelId);
      newProgress.stickers += 1;
      
      // 每5个贴纸获得1个奖牌
      newProgress.medals = Math.floor(newProgress.stickers / 5);
      
      // 解锁下一个关卡
      const currentLevelIndex = LEVELS.findIndex(level => level.id === levelId);
      if (currentLevelIndex !== -1 && currentLevelIndex < LEVELS.length - 1) {
        const nextLevelId = LEVELS[currentLevelIndex + 1].id;
        if (!newProgress.unlocked.includes(nextLevelId)) {
          newProgress.unlocked.push(nextLevelId);
          console.log(`解锁新关卡: ${nextLevelId}`);
        }
      }
      
      console.log(`完成关卡 ${levelId}，当前解锁关卡:`, newProgress.unlocked);
    }
    
    newProgress.score += score;
    setProgress(newProgress);
    setCurrentPage('map');
  };

  // 查看总结
  const handleViewSummary = () => {
    setCurrentPage('summary');
  };

  // 重置进度
  const handleResetProgress = () => {
    if (window.confirm('确定要重置所有进度吗？这将清除所有已获得的贴纸、奖牌和分数。')) {
      const newProgress: GameProgress = {
        unlocked: ['L1'],
        cleared: [],
        stickers: 0,
        medals: 0,
        score: 0
      };
      console.log('重置进度，初始解锁关卡:', newProgress.unlocked);
      setProgress(newProgress);
      setCurrentPage('start');
    }
  };

  // 返回地图
  const handleBackToMap = () => {
    setCurrentPage('map');
  };

  // 渲染当前页面
  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'start':
        return (
          <StartScreen 
            onStart={handleStartGame}
            onReset={handleResetProgress}
          />
        );
      case 'map':
        return (
          <LevelMap 
            progress={progress}
            onLevelSelect={handleSelectLevel}
            onViewSummary={handleViewSummary}
          />
        );
      case 'play':
        return currentLevelId !== null ? (
          <LevelPlay 
            levelId={currentLevelId}
            onComplete={handleLevelComplete}
            onBack={handleBackToMap}
          />
        ) : null;
      case 'summary':
        return (
          <Summary 
            progress={progress}
            onBack={handleBackToMap}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen">
      <div className="container">
        {renderCurrentPage()}
      </div>
    </div>
  );
}

export default App; 