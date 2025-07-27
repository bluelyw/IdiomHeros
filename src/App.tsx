// 成语闯关游戏主应用组件
import React, { useState, useEffect } from 'react';
import { loadProgress, saveProgress, GameProgress } from './utils/storage';
import StartScreen from './components/StartScreen';
import LevelMap from './components/LevelMap';
import LevelPlay from './components/LevelPlay';
import Summary from './components/Summary';

type GameState = 'start' | 'map' | 'level' | 'summary';

interface AppState {
  currentState: GameState;
  currentLevel?: string;
  progress: GameProgress;
}

function App() {
  const [appState, setAppState] = useState<AppState>(() => ({
    currentState: 'start',
    progress: loadProgress(),
  }));

  // 当进度变化时保存到localStorage
  useEffect(() => {
    saveProgress(appState.progress);
  }, [appState.progress]);

  // 导航到不同页面
  const navigateTo = (state: GameState, levelId?: string) => {
    setAppState(prev => ({
      ...prev,
      currentState: state,
      currentLevel: levelId,
    }));
  };

  // 更新游戏进度
  const updateGameProgress = (levelId: string, levelScore: number) => {
    setAppState(prev => ({
      ...prev,
      progress: {
        ...prev.progress,
        cleared: [...prev.progress.cleared, levelId],
        score: prev.progress.score + levelScore,
        stickers: prev.progress.stickers + 1,
        medals: Math.floor((prev.progress.stickers + 1) / 5),
      },
    }));

    // 解锁下一关
    const levelIndex = parseInt(levelId.slice(1)) - 1;
    const nextLevelId = `L${levelIndex + 2}`;
    
    if (nextLevelId && !appState.progress.unlocked.includes(nextLevelId)) {
      setAppState(prev => ({
        ...prev,
        progress: {
          ...prev.progress,
          unlocked: [...prev.progress.unlocked, nextLevelId],
        },
      }));
    }
  };

  // 重置进度
  const resetProgress = () => {
    const defaultProgress = {
      unlocked: ['L1'],
      cleared: [],
      stickers: 0,
      medals: 0,
      score: 0,
    };
    setAppState(prev => ({
      ...prev,
      progress: defaultProgress,
    }));
  };

  // 渲染当前页面
  const renderCurrentPage = () => {
    switch (appState.currentState) {
      case 'start':
        return (
          <StartScreen
            onStart={() => navigateTo('map')}
            onReset={resetProgress}
          />
        );
      
      case 'map':
        return (
          <LevelMap
            progress={appState.progress}
            onLevelSelect={(levelId) => navigateTo('level', levelId)}
            onViewSummary={() => navigateTo('summary')}
          />
        );
      
      case 'level':
        return appState.currentLevel ? (
          <LevelPlay
            levelId={appState.currentLevel}
            onComplete={(levelId, score) => {
              updateGameProgress(levelId, score);
              navigateTo('map');
            }}
            onBack={() => navigateTo('map')}
          />
        ) : null;
      
      case 'summary':
        return (
          <Summary
            progress={appState.progress}
            onBack={() => navigateTo('map')}
          />
        );
      
      default:
        return <StartScreen onStart={() => navigateTo('map')} onReset={resetProgress} />;
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