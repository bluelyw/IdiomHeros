// 填空题卡片组件
import React, { useState } from 'react';
import { FillQuestion } from '../../data/levels';

interface FillCardProps {
  question: FillQuestion;
  onAnswer: (isCorrect: boolean) => void;
}

const FillCard: React.FC<FillCardProps> = ({ question, onAnswer }) => {
  const [userAnswer, setUserAnswer] = useState('');
  const [hasAnswered, setHasAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const checkAnswer = (input: string) => {
    // 去除空格、转小写进行比较
    const normalizedInput = input.trim().toLowerCase();
    const normalizedAnswer = question.answer.trim().toLowerCase();
    
    // 对于Boss关的特殊处理：包含判断
    if (question.answer.includes('帮助')) {
      return normalizedInput.includes('帮助');
    }
    
    return normalizedInput === normalizedAnswer;
  };

  const handleSubmit = () => {
    if (!userAnswer.trim()) return;
    
    const correct = checkAnswer(userAnswer);
    setIsCorrect(correct);
    setHasAnswered(true);
    
    // 延迟一下再调用回调
    setTimeout(() => {
      onAnswer(correct);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="space-y-4">
      <div className="text-lg font-semibold text-gray-800 mb-4">
        {question.prompt}
      </div>
      
      <div className="space-y-3">
        <input
          type="text"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={hasAnswered}
          placeholder="请输入答案..."
          className="input"
        />
        
        {question.hint && (
          <div className="text-sm text-yellow-600 bg-yellow-50 p-3 rounded-lg">
            💡 提示：{question.hint}
          </div>
        )}
        
        <button
          onClick={handleSubmit}
          disabled={hasAnswered || !userAnswer.trim()}
          className="btn btn-primary btn-full disabled"
        >
          提交答案
        </button>
      </div>
      
      {hasAnswered && (
        <div className={`mt-4 p-3 rounded-lg text-center font-medium ${
          isCorrect 
            ? 'bg-success-100 text-success-dark' 
            : 'bg-red-100 text-red-600'
        }`}>
          {isCorrect ? '答对了！' : `正确答案是：${question.answer}`}
        </div>
      )}
    </div>
  );
};

export default FillCard; 