// 学习总结组件
import React from 'react';
import { GameProgress } from '../utils/storage';
import ProgressBar from './ProgressBar';
import Badge from './Badge';

interface SummaryProps {
  progress: GameProgress;
  onBack: () => void;
}

const Summary: React.FC<SummaryProps> = ({ progress, onBack }) => {
  const totalLevels = 15;
  const completionRate = (progress.cleared.length / totalLevels) * 100;

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-primary-dark mb-2">
          学习总结
        </h1>
        <p className="text-lg text-gray-600">
          看看你的学习成果吧！
        </p>
      </div>

      <div className="card">
        {/* 统计徽章 */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <Badge icon="⭐" count={progress.score} label="总分" />
          <Badge icon="🎯" count={progress.stickers} label="贴纸" />
          <Badge icon="🏆" count={progress.medals} label="奖章" />
          <Badge icon="✅" count={progress.cleared.length} label="通关" />
        </div>

        {/* 完成度进度条 */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold text-gray-800">完成度</span>
            <span className="text-lg font-bold text-primary">
              {progress.cleared.length} / {totalLevels}
            </span>
          </div>
          <ProgressBar current={progress.cleared.length} total={totalLevels} />
          <div className="text-center text-sm text-gray-600">
            {completionRate.toFixed(1)}% 完成
          </div>
        </div>
      </div>

      {/* 成就展示 */}
      <div className="card">
        <h2 className="text-xl font-bold text-primary-dark mb-4 text-center">
          成就展示
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gradient-blue rounded-xl p-4 text-center">
            <div className="emoji-medium">🎓</div>
            <div className="font-semibold text-gray-800">学习达人</div>
            <div className="text-sm text-gray-600">
              完成了 {progress.cleared.length} 个成语关卡
            </div>
          </div>
          
          <div className="bg-gradient-orange rounded-xl p-4 text-center">
            <div className="emoji-medium">💎</div>
            <div className="font-semibold text-gray-800">收藏家</div>
            <div className="text-sm text-gray-600">
              收集了 {progress.stickers} 张贴纸
            </div>
          </div>
          
          <div className="bg-gradient-purple rounded-xl p-4 text-center">
            <div className="emoji-medium">🌟</div>
            <div className="font-semibold text-gray-800">高分玩家</div>
            <div className="text-sm text-gray-600">
              获得了 {progress.score} 分
            </div>
          </div>
          
          <div className="bg-gradient-red rounded-xl p-4 text-center">
            <div className="emoji-medium">👑</div>
            <div className="font-semibold text-gray-800">奖章收集者</div>
            <div className="text-sm text-gray-600">
              获得了 {progress.medals} 枚奖章
            </div>
          </div>
        </div>
      </div>

      {/* 鼓励信息 */}
      {completionRate < 100 ? (
        <div className="card bg-gradient-blue">
          <div className="text-center">
            <div className="emoji-large">🚀</div>
            <h3 className="text-lg font-semibold text-primary-dark mb-2">
              继续加油！
            </h3>
            <p className="text-gray-600">
              还有 {totalLevels - progress.cleared.length} 个关卡等着你挑战
            </p>
          </div>
        </div>
      ) : (
        <div className="card bg-gradient-orange">
          <div className="text-center">
            <div className="emoji-large">🎊</div>
            <h3 className="text-lg font-semibold text-primary-dark mb-2">
              恭喜通关！
            </h3>
            <p className="text-gray-600">
              你已经完成了所有关卡，是真正的成语小英雄！
            </p>
          </div>
        </div>
      )}

      {/* 返回按钮 */}
      <div className="flex justify-center">
        <button onClick={onBack} className="btn btn-primary">
          返回地图
        </button>
      </div>
    </div>
  );
};

export default Summary; 