// 表演题卡片组件
import React, { useState } from 'react';
import { ActQuestion } from '../../data/levels';

interface ActCardProps {
  question: ActQuestion;
  onAnswer: (isCorrect: boolean) => void;
}

const ActCard: React.FC<ActCardProps> = ({ question, onAnswer }) => {
  const [hasCompleted, setHasCompleted] = useState(false);

  const handleComplete = () => {
    setHasCompleted(true);
    
    // 表演题直接给分，延迟一下再调用回调
    setTimeout(() => {
      onAnswer(true);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div className="text-lg font-semibold text-gray-800 mb-4">
        {question.prompt}
      </div>
      
      <div className="bg-yellow-50 border-2 border-yellow rounded-xl p-6 text-center">
        <div className="emoji-medium">🎭</div>
        <div className="text-lg font-medium text-yellow-800 mb-2">
          表演时间到！
        </div>
        <div className="text-sm text-yellow-700 mb-4">
          请按照题目要求进行表演，完成后点击按钮
        </div>
        
        <button
          onClick={handleComplete}
          disabled={hasCompleted}
          className="btn btn-primary disabled"
        >
          {hasCompleted ? '表演完成！' : '表演完成'}
        </button>
      </div>
      
      {hasCompleted && (
        <div className="bg-success-100 text-success-dark p-3 rounded-lg text-center font-medium">
          太棒了！表演得很精彩！ +5分
        </div>
      )}
    </div>
  );
};

export default ActCard; 