// 关卡地图组件
import React from 'react';
import { LEVELS, Level } from '../data/levels';
import { GameProgress } from '../utils/storage';
import Badge from './Badge';

interface LevelMapProps {
  progress: GameProgress;
  onLevelSelect: (levelId: string) => void;
  onViewSummary: () => void;
}

const LevelMap: React.FC<LevelMapProps> = ({ progress, onLevelSelect, onViewSummary }) => {
  // 按章节分组关卡
  const chapters = {
    '春风谷': LEVELS.filter(level => level.chapter === '春风谷'),
    '夏日湖': LEVELS.filter(level => level.chapter === '夏日湖'),
    '秋果山': LEVELS.filter(level => level.chapter === '秋果山'),
    '冬雪洞': LEVELS.filter(level => level.chapter === '冬雪洞'),
  };

  const isLevelUnlocked = (levelId: string) => {
    return progress.unlocked.includes(levelId);
  };

  const isLevelCompleted = (levelId: string) => {
    return progress.cleared.includes(levelId);
  };

  const renderLevelCard = (level: Level) => {
    const unlocked = isLevelUnlocked(level.id);
    const completed = isLevelCompleted(level.id);
    
    return (
      <div
        key={level.id}
        className={`level-card ${!unlocked ? 'locked' : ''} ${completed ? 'completed' : ''}`}
        onClick={() => unlocked && onLevelSelect(level.id)}
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-lg font-bold text-primary">{level.id}</span>
          {completed && <span className="text-2xl text-success">✔</span>}
        </div>
        
        <h3 className="font-semibold text-gray-800 mb-1">{level.title}</h3>
        <p className="text-xl font-bold text-primary-dark mb-2">{level.idiom}</p>
        <p className="text-sm text-gray-600">{level.meaning}</p>
        
        {!unlocked && (
          <div className="mt-2 text-xs text-gray-500">
            需要先完成前面的关卡
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* 顶部统计 */}
      <div className="flex flex-wrap justify-center gap-4 mb-6">
        <Badge icon="⭐" count={progress.score} label="总分" />
        <Badge icon="🎯" count={progress.stickers} label="贴纸" />
        <Badge icon="🏆" count={progress.medals} label="奖章" />
      </div>

      {/* 关卡地图 */}
      <div className="space-y-8">
        {Object.entries(chapters).map(([chapterName, levels]) => (
          <div key={chapterName} className="card">
            <h2 className="text-2xl font-bold text-primary-dark mb-4 text-center">
              {chapterName}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {levels.map(renderLevelCard)}
            </div>
          </div>
        ))}
      </div>

      {/* 底部按钮 */}
      <div className="flex justify-center mt-8">
        <button
          onClick={onViewSummary}
          className="btn btn-secondary"
        >
          查看学习总结
        </button>
      </div>
    </div>
  );
};

export default LevelMap; 