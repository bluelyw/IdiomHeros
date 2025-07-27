// 奖励弹窗组件
import React from 'react';
import { Level } from '../../data/levels';

interface RewardModalProps {
  level: Level;
  score: number;
  onClose: () => void;
}

const RewardModal: React.FC<RewardModalProps> = ({ level, score, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="emoji-large">🎉</div>
        
        <h2 className="text-2xl font-bold text-primary-dark mb-2">
          恭喜通关！
        </h2>
        
        <div className="text-lg text-gray-600 mb-6">
          你完成了 {level.title}
        </div>
        
        <div className="space-y-4 mb-6">
          <div className="bg-primary-50 rounded-xl p-4">
            <div className="text-sm text-primary-dark mb-1">获得贴纸</div>
            <div className="text-2xl font-bold text-primary-dark">
              {level.reward}
            </div>
          </div>
          
          <div className="bg-yellow-50 rounded-xl p-4">
            <div className="text-sm text-yellow-700 mb-1">本关得分</div>
            <div className="text-2xl font-bold text-yellow-700">
              {score} 分
            </div>
          </div>
        </div>
        
        <button
          onClick={onClose}
          className="btn btn-primary btn-full text-lg"
        >
          返回地图
        </button>
      </div>
    </div>
  );
};

export default RewardModal; 