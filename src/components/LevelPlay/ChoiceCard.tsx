// 选择题卡片组件
import React, { useState } from 'react';
import { ChoiceQuestion } from '../../data/levels';

interface ChoiceCardProps {
  question: ChoiceQuestion;
  onAnswer: (isCorrect: boolean) => void;
}

const ChoiceCard: React.FC<ChoiceCardProps> = ({ question, onAnswer }) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);

  const handleOptionClick = (option: string) => {
    if (hasAnswered) return;
    
    setSelectedAnswer(option);
    setHasAnswered(true);
    
    const isCorrect = option === question.answer;
    
    // 延迟一下再调用回调，让用户看到选择结果
    setTimeout(() => {
      onAnswer(isCorrect);
    }, 1000);
  };

  const getOptionStyle = (option: string) => {
    if (!hasAnswered) {
      return 'bg-white hover:bg-gray-50 border-gray-300 hover:border-primary';
    }
    
    if (option === question.answer) {
      return 'bg-success-100 border-success text-success-dark';
    }
    
    if (option === selectedAnswer && option !== question.answer) {
      return 'bg-red-100 border-red text-red-600';
    }
    
    return 'bg-gray-100 border-gray-300 text-gray-500';
  };

  return (
    <div className="space-y-4">
      <div className="text-lg font-semibold text-gray-800 mb-4">
        {question.prompt}
      </div>
      
      <div className="space-y-3">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleOptionClick(option)}
            disabled={hasAnswered}
            className={`w-full p-4 text-left rounded-xl border-2 transition-all duration-200 ${getOptionStyle(option)}`}
          >
            <span className="font-medium">{String.fromCharCode(65 + index)}. </span>
            {option}
          </button>
        ))}
      </div>
      
      {hasAnswered && (
        <div className={`mt-4 p-3 rounded-lg text-center font-medium ${
          selectedAnswer === question.answer 
            ? 'bg-success-100 text-success-dark' 
            : 'bg-red-100 text-red-600'
        }`}>
          {selectedAnswer === question.answer ? '答对了！' : `正确答案是：${question.answer}`}
        </div>
      )}
    </div>
  );
};

export default ChoiceCard; 