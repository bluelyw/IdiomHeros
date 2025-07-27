// 游戏进度存储工具

export interface GameProgress {
  unlocked: string[];    // 已解锁的关卡ID
  cleared: string[];     // 已通关的关卡ID
  stickers: number;      // 贴纸数量
  medals: number;        // 奖章数量
  score: number;         // 总分
}

const STORAGE_KEY = 'idiom_game_progress_v1';

// 获取默认进度（只有第一关解锁）
export const getDefaultProgress = (): GameProgress => ({
  unlocked: ['L1'],
  cleared: [],
  stickers: 0,
  medals: 0,
  score: 0,
});

// 从localStorage读取进度
export const loadProgress = (): GameProgress => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const progress = JSON.parse(stored) as GameProgress;
      // 确保所有必要字段都存在
      return {
        unlocked: progress.unlocked || ['L1'],
        cleared: progress.cleared || [],
        stickers: progress.stickers || 0,
        medals: progress.medals || 0,
        score: progress.score || 0,
      };
    }
  } catch (error) {
    console.error('Failed to load progress:', error);
  }
  return getDefaultProgress();
};

// 保存进度到localStorage
export const saveProgress = (progress: GameProgress): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (error) {
    console.error('Failed to save progress:', error);
  }
};

// 重置进度
export const resetProgress = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Failed to reset progress:', error);
  }
};

// 更新进度（通关一关）
export const updateProgress = (
  currentProgress: GameProgress,
  levelId: string,
  levelScore: number
): GameProgress => {
  const newProgress = { ...currentProgress };
  
  // 添加到已通关列表
  if (!newProgress.cleared.includes(levelId)) {
    newProgress.cleared.push(levelId);
  }
  
  // 增加分数
  newProgress.score += levelScore;
  
  // 增加贴纸
  newProgress.stickers += 1;
  
  // 计算奖章（每5个贴纸换1个奖章）
  newProgress.medals = Math.floor(newProgress.stickers / 5);
  
  // 解锁下一关
  const levelIndex = parseInt(levelId.slice(1)) - 1;
  const nextLevelId = `L${levelIndex + 2}`;
  
  if (nextLevelId && !newProgress.unlocked.includes(nextLevelId)) {
    newProgress.unlocked.push(nextLevelId);
  }
  
  return newProgress;
}; 