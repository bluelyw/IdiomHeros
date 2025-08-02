# 成语闯关 - 小英雄的冒险 (纯CSS版本)

一个适合6岁儿童的成语学习前端小游戏，通过有趣的关卡设计帮助孩子们学习成语知识。本项目使用纯CSS实现，不依赖任何CSS框架。

## 🎮 游戏特色

- **15个精心设计的关卡**：涵盖春风谷、夏日湖、秋果山、冬雪洞四个章节
- **多种题型**：选择题、填空题、表演题，寓教于乐
- **奖励系统**：贴纸收集、奖章兑换，激发学习兴趣
- **进度保存**：本地存储，随时继续游戏
- **儿童友好界面**：明亮色彩、大字体、简单操作
- **纯CSS实现**：不依赖Tailwind、PostCSS等框架

## 🚀 快速开始

### 安装依赖

```bash
# 使用 npm
npm install

# 或使用 pnpm
pnpm install
```

### 启动开发服务器

```bash
# 使用 npm
npm run dev

# 或使用 pnpm
pnpm dev
```

打开浏览器访问 `http://localhost:5173` 即可开始游戏。

### 构建生产版本

```bash
# 使用 npm
npm run build

# 或使用 pnpm
pnpm build
```

## 🎯 游戏玩法

1. **开始冒险**：点击"开始冒险"进入关卡地图
2. **选择关卡**：点击已解锁的关卡卡片进入游戏
3. **答题闯关**：
   - 选择题：选择正确答案（+10分）
   - 填空题：输入答案，支持模糊匹配（+10分）
   - 表演题：完成表演后点击按钮（+5分）
4. **获得奖励**：通关后获得贴纸，每5张贴纸自动兑换1枚奖章
5. **解锁新关**：通关后自动解锁下一关卡

## 📱 技术栈

- **React 18** + **TypeScript**：现代化前端开发
- **Vite**：快速构建工具
- **纯CSS**：自定义样式，无框架依赖
- **LocalStorage**：本地数据持久化

## 🏗️ 项目结构

```
src/
├── components/          # 组件目录
│   ├── LevelPlay/      # 关卡游戏组件
│   │   ├── index.tsx   # 主游戏组件
│   │   ├── ChoiceCard.tsx    # 选择题组件
│   │   ├── FillCard.tsx      # 填空题组件
│   │   ├── ActCard.tsx       # 表演题组件
│   │   └── RewardModal.tsx   # 奖励弹窗
│   ├── StartScreen.tsx # 开始屏幕
│   ├── LevelMap.tsx    # 关卡地图
│   ├── Summary.tsx     # 学习总结
│   ├── ProgressBar.tsx # 进度条
│   └── Badge.tsx       # 徽章组件
├── data/
│   └── levels.ts       # 关卡数据
├── utils/
│   ├── storage.ts      # 存储工具
│   └── analytics.ts    # GA4跟踪工具
├── index.css           # 纯CSS样式文件
├── App.tsx             # 主应用组件
└── main.tsx            # 应用入口
```

## 🎨 设计特色

- **儿童友好色彩**：使用明亮、柔和的渐变色
- **圆角设计**：16-20px圆角，视觉友好
- **动画效果**：按钮悬停、点击反馈、奖励弹窗动画
- **响应式布局**：支持桌面端和移动端
- **无障碍设计**：键盘导航、高对比度文本
- **纯CSS实现**：无框架依赖，易于定制

## 🔧 开发说明

### 添加新关卡

在 `src/data/levels.ts` 中添加新的关卡数据：

```typescript
{
  id: 'L16',
  chapter: '春风谷',
  title: '新关卡',
  idiom: '新成语',
  pinyin: 'xīn chéng yǔ',
  meaning: '成语含义',
  hint: '学习提示',
  reward: '🎁 新贴纸',
  questions: [
    // 题目配置
  ]
}
```

### 自定义样式

项目使用纯CSS，所有样式都在 `src/index.css` 中定义，可以直接修改或添加新的样式类。

### CSS类名说明

项目使用语义化的CSS类名：
- `.btn` - 按钮基础样式
- `.btn-primary` - 主要按钮
- `.btn-secondary` - 次要按钮
- `.card` - 卡片容器
- `.level-card` - 关卡卡片
- `.badge` - 徽章组件
- `.progress-container` - 进度条容器
- `.modal-overlay` - 模态框遮罩

## 📊 Google Analytics 4 数据监控

本项目集成了Google Analytics 4 (GA4) 数据监控系统，用于跟踪用户行为和游戏表现。

### 🔧 GA4配置

- **数据流ID**: 11553452819
- **测量ID**: G-ERJQSXTBGE
- **跟踪代码**: 已集成到 `index.html`

### 📈 跟踪事件

#### 1. 页面浏览 (Page Views)
- **开始页面**: 用户进入游戏首页
- **关卡地图**: 用户查看关卡选择界面
- **游戏页面**: 用户进入具体关卡
- **学习总结**: 用户查看学习统计

#### 2. 用户交互 (User Engagement)
- **点击事件** (`click`): 跟踪所有按钮、链接、卡片点击
  - 元素类型: button, link, level_card, card
  - 元素名称: 按钮文本或元素标识
- **滚动事件** (`scroll`): 跟踪页面滚动深度
  - 滚动深度: 25%, 50%, 75%, 100%
  - 页面名称: 当前页面标识

### 🛠️ 技术实现

#### 跟踪工具 (`src/utils/analytics.ts`)
```typescript
// 页面浏览跟踪
trackPageView(pageName: string)

// 用户交互跟踪
trackClick(elementName: string, elementType: string, pageName?: string)
trackScroll(scrollDepth: number, pageName?: string)

// 自动跟踪初始化
initScrollTracking(pageName: string)
initClickTracking(pageName: string)
```

#### 集成方式
- **HTML集成**: GA4脚本已添加到 `index.html`
- **React集成**: 在 `App.tsx` 中集成跟踪函数
- **自动跟踪**: 页面切换、滚动、点击自动触发跟踪

### 📊 数据分析

#### 关键指标
1. **用户参与度**: 页面浏览量、停留时间
2. **用户行为**: 热门页面、点击热图
3. **技术性能**: 页面加载速度、错误率

#### 自定义维度
- `page_name`: 页面名称
- `element_type`: 交互元素类型
- `scroll_depth`: 滚动深度百分比

### 🔒 隐私保护

- **数据匿名化**: 不收集个人身份信息
- **本地存储**: 游戏进度仅存储在用户本地
- **合规性**: 符合GDPR和儿童隐私保护要求
- **透明度**: 用户可随时清除浏览器数据

### 📋 监控清单

- [x] GA4基础脚本集成
- [x] 页面浏览跟踪
- [x] 点击事件跟踪
- [x] 滚动事件跟踪
- [x] 自定义事件参数
- [x] 错误处理机制
- [x] 隐私保护措施

### 🚀 部署说明

1. **开发环境**: 跟踪代码已集成，可直接使用
2. **生产环境**: 构建后自动包含跟踪代码
3. **域名配置**: 支持自定义域名 `idiomheros.oneone.games`
4. **数据验证**: 可通过GA4实时报告验证数据收集

---

**让学习成语变得有趣！** 🎓✨ 