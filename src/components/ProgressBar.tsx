// 进度条组件
import React from 'react';

interface ProgressBarProps {
  current: number;
  total: number;
  className?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ current, total, className = '' }) => {
  const percentage = Math.min((current / total) * 100, 100);
  
  return (
    <div className={`progress-container ${className}`}>
      <div 
        className="progress-bar"
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
};

export default ProgressBar; 