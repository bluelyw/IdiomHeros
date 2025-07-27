// 成语闯关游戏主应用组件
import { useState, useEffect } from 'react';
import { loadProgress, saveProgress, GameProgress } from './utils/storage';
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