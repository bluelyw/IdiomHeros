// 关卡游戏主组件
import React, { useState } from 'react';
import { LEVELS } from '../../data/levels';
import ProgressBar from '../ProgressBar';
import ChoiceCard from './ChoiceCard';
import FillCard from './FillCard';
import ActCard from './ActCard';
import RewardModal from './RewardModal';

interface LevelPlayProps {
  levelId: string;
  onComplete: (levelId: string, score: number) => void;
  onBack: () => void;
}

const LevelPlay: React.FC<LevelPlayProps> = ({ levelId, onComplete, onBack }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [levelScore, setLevelScore] = useState(0);
  const [showReward, setShowReward] = useState(false);

  const level = LEVELS.find(l => l.id === levelId);
  if (!level) {
    return <div>关卡不存在</div>;
  }

  const currentQuestion = level.questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === level.questions.length - 1;

  const handleAnswer = (isCorrect: boolean, score: number) => {
    if (isCorrect) {
      setLevelScore(prev => prev + score);
    }

    if (isLastQuestion) {
      setShowReward(true);
    } else {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handleRewardClose = () => {
    onComplete(levelId, levelScore);
  };

  const renderQuestion = () => {
    switch (currentQuestion.type) {
      case 'choice':
        return (
          <ChoiceCard
            question={currentQuestion}
            onAnswer={(isCorrect) => handleAnswer(isCorrect, 10)}
          />
        );
      case 'fill':
        return (
          <FillCard
            question={currentQuestion}
            onAnswer={(isCorrect) => handleAnswer(isCorrect, 10)}
          />
        );
      case 'act':
        return (
          <ActCard
            question={currentQuestion}
            onAnswer={(isCorrect) => handleAnswer(isCorrect, 5)}
          />
        );
      default:
        return <div>未知题型</div>;
    }
  };

  return (
    <div className="space-y-6">
      {/* 顶部导航 */}
      <div className="flex items-center justify-between">
        <button onClick={onBack} className="btn btn-secondary">
          ← 返回地图
        </button>
        <div className="text-center">
          <h1 className="text-2xl font-bold text-primary-dark">{level.title}</h1>
          <p className="text-lg text-primary">{level.idiom}</p>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-600">当前分数</div>
          <div className="text-xl font-bold text-primary">{levelScore}</div>
        </div>
      </div>

      {/* 进度条 */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-gray-600">
          <span>题目进度</span>
          <span>{currentQuestionIndex + 1} / {level.questions.length}</span>
        </div>
        <ProgressBar current={currentQuestionIndex + 1} total={level.questions.length} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 左侧成语卡片 */}
        <div className="lg:col-span-1">
          <div className="card h-fit">
            <h2 className="text-xl font-bold text-primary-dark mb-3">成语卡片</h2>
            <div className="space-y-3">
              <div>
                <div className="text-2xl font-bold text-center text-primary mb-2">
                  {level.idiom}
                </div>
                <div className="text-sm text-gray-600 text-center mb-3">
                  {level.pinyin}
                </div>
              </div>
              
              <div className="bg-primary-50 rounded-lg p-3">
                <div className="text-sm font-semibold text-primary-dark mb-1">含义</div>
                <div className="text-sm text-gray-700">{level.meaning}</div>
              </div>
              
              <div className="bg-yellow-50 rounded-lg p-3">
                <div className="text-sm font-semibold text-yellow-700 mb-1">提示</div>
                <div className="text-sm text-gray-700">{level.hint}</div>
              </div>
            </div>
          </div>
        </div>

        {/* 右侧题目区域 */}
        <div className="lg:col-span-2">
          <div className="card">
            <h2 className="text-xl font-bold text-primary-dark mb-4">第 {currentQuestionIndex + 1} 题</h2>
            {renderQuestion()}
          </div>
        </div>
      </div>

      {/* 奖励弹窗 */}
      {showReward && (
        <RewardModal
          level={level}
          score={levelScore}
          onClose={handleRewardClose}
        />
      )}
    </div>
  );
};

export default LevelPlay; 