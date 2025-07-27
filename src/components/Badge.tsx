// 徽章组件 - 用于显示贴纸和奖章
import React from 'react';

interface BadgeProps {
  icon: string;
  count: number;
  label: string;
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({ icon, count, label, className = '' }) => {
  return (
    <div className={`badge ${className}`}>
      <span className="badge-icon">{icon}</span>
      <div className="badge-content">
        <span className="badge-count">{count}</span>
        <span className="badge-label">{label}</span>
      </div>
    </div>
  );
};

export default Badge; 