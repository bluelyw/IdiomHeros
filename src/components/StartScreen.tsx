// 开始屏幕组件
import React from 'react';

interface StartScreenProps {
  onStart: () => void;
  onReset: () => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStart, onReset }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-80 text-center">
      <div className="card" style={{ maxWidth: '28rem', width: '100%' }}>
        <h1 className="text-4xl font-bold text-primary mb-4">
          🎮 成语闯关
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          小英雄的冒险之旅
        </p>
        
        <div className="space-y-4">
          <button 
            onClick={onStart}
            className="btn btn-primary btn-full text-xl"
          >
            开始冒险
          </button>
          
          <button 
            onClick={onReset}
            className="btn btn-secondary btn-full text-lg"
          >
            重置进度
          </button>
        </div>
        
        <div className="mt-8 text-sm text-gray-500">
          <p>适合6岁儿童的成语学习游戏</p>
          <p>通过有趣的关卡学习成语知识</p>
        </div>
      </div>
    </div>
  );
};

export default StartScreen; 