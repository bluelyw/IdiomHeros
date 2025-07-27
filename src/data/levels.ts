// 成语闯关游戏关卡数据
export type ChoiceQuestion = {
  type: 'choice';
  prompt: string;
  options: string[];
  answer: string;
};

export type FillQuestion = {
  type: 'fill';
  prompt: string;
  answer: string;   // 判分时去空格、忽略大小写
  hint?: string;    // 可选提示
};

export type ActQuestion = {
  type: 'act';
  prompt: string;
};

export type Question = ChoiceQuestion | FillQuestion | ActQuestion;

export type Level = {
  id: string;                        // 'L1'
  chapter: '春风谷' | '夏日湖' | '秋果山' | '冬雪洞';
  title: string;                     // 关卡名
  idiom: string;                     // 成语
  pinyin: string;                    // 拼音
  meaning: string;                   // 10~16 字简易解释
  hint: string;                      // 情景提示（文字）
  reward: string;                    // 贴纸名，例如 '☀️ 阳光贴'
  questions: Question[];             // 2~3 题
};

export const LEVELS: Level[] = [
  // 春风谷
  {
    id: 'L1',
    chapter: '春风谷',
    title: '春天的美好',
    idiom: '风和日丽',
    pinyin: 'fēng hé rì lì',
    meaning: '微风和煦，阳光明媚',
    hint: '想象一个温暖的春日，微风轻轻吹过，太阳暖暖地照着大地',
    reward: '🌸 春风贴',
    questions: [
      {
        type: 'choice',
        prompt: '风和日丽形容的是什么天气？',
        options: ['下雨天', '晴天', '阴天', '雪天'],
        answer: '晴天'
      },
      {
        type: 'fill',
        prompt: '今天天气很好，我们可以说今天是____日丽',
        answer: '风和',
        hint: '想想微风的"风"字'
      }
    ]
  },
  {
    id: 'L2',
    chapter: '春风谷',
    title: '花香鸟语',
    idiom: '鸟语花香',
    pinyin: 'niǎo yǔ huā xiāng',
    meaning: '鸟儿歌唱，花儿飘香',
    hint: '春天来了，小鸟在枝头唱歌，各种花朵散发出香味',
    reward: '🐦 小鸟贴',
    questions: [
      {
        type: 'choice',
        prompt: '鸟语花香主要形容哪个季节？',
        options: ['春天', '夏天', '秋天', '冬天'],
        answer: '春天'
      },
      {
        type: 'act',
        prompt: '请你学小鸟唱歌，然后学花朵散发香味的样子'
      }
    ]
  },
  {
    id: 'L3',
    chapter: '春风谷',
    title: '热闹非凡',
    idiom: '人山人海',
    pinyin: 'rén shān rén hǎi',
    meaning: '人像山一样多，像海一样广',
    hint: '想象一个非常热闹的地方，到处都是人',
    reward: '👥 人群贴',
    questions: [
      {
        type: 'choice',
        prompt: '人山人海形容什么？',
        options: ['人很少', '人很多', '没有山', '没有海'],
        answer: '人很多'
      },
      {
        type: 'fill',
        prompt: '游乐园里____山____海，非常热闹',
        answer: '人山人海'
      }
    ]
  },
  {
    id: 'L4',
    chapter: '春风谷',
    title: '快乐舞蹈',
    idiom: '手舞足蹈',
    pinyin: 'shǒu wǔ zú dǎo',
    meaning: '手和脚都在舞动',
    hint: '当你非常开心的时候，会不由自主地手舞足蹈',
    reward: '💃 舞蹈贴',
    questions: [
      {
        type: 'act',
        prompt: '请你表演手舞足蹈，表示非常开心的样子'
      },
      {
        type: 'choice',
        prompt: '手舞足蹈通常表示什么心情？',
        options: ['伤心', '开心', '生气', '害怕'],
        answer: '开心'
      }
    ]
  },
  {
    id: 'L5',
    chapter: '春风谷',
    title: '欢乐时光',
    idiom: '欢天喜地',
    pinyin: 'huān tiān xǐ dì',
    meaning: '天和地都充满欢乐',
    hint: '形容非常高兴，连天地都跟着一起开心',
    reward: '😊 笑脸贴',
    questions: [
      {
        type: 'choice',
        prompt: '欢天喜地形容什么？',
        options: ['非常高兴', '非常伤心', '非常生气', '非常害怕'],
        answer: '非常高兴'
      },
      {
        type: 'fill',
        prompt: '听到好消息，大家都____天____地',
        answer: '欢天喜地'
      }
    ]
  },
  // 夏日湖
  {
    id: 'L6',
    chapter: '夏日湖',
    title: '专心致志',
    idiom: '一心一意',
    pinyin: 'yī xīn yī yì',
    meaning: '心思和意念都集中在一件事上',
    hint: '做事情时非常专注，不想其他事情',
    reward: '🎯 专注贴',
    questions: [
      {
        type: 'choice',
        prompt: '一心一意形容什么？',
        options: ['三心二意', '专心致志', '心不在焉', '胡思乱想'],
        answer: '专心致志'
      },
      {
        type: 'act',
        prompt: '请你表演一心一意看书的样子'
      }
    ]
  },
  {
    id: 'L7',
    chapter: '夏日湖',
    title: '狼吞虎咽',
    idiom: '狼吞虎咽',
    pinyin: 'láng tūn hǔ yàn',
    meaning: '像狼和虎一样大口吞食',
    hint: '形容吃东西很快很急的样子',
    reward: '🐺 狼贴',
    questions: [
      {
        type: 'choice',
        prompt: '狼吞虎咽形容什么？',
        options: ['吃得慢', '吃得快', '吃得少', '不吃'],
        answer: '吃得快'
      },
      {
        type: 'fill',
        prompt: '他饿极了，____吞____咽地吃着饭',
        answer: '狼吞虎咽'
      }
    ]
  },
  {
    id: 'L8',
    chapter: '夏日湖',
    title: '清清楚楚',
    idiom: '一清二楚',
    pinyin: 'yī qīng èr chǔ',
    meaning: '非常清楚明白',
    hint: '形容事情非常清楚，没有一点模糊',
    reward: '👁️ 眼睛贴',
    questions: [
      {
        type: 'choice',
        prompt: '一清二楚形容什么？',
        options: ['很模糊', '很清楚', '很混乱', '很复杂'],
        answer: '很清楚'
      },
      {
        type: 'fill',
        prompt: '老师讲得很清楚，我们都听得____清____楚',
        answer: '一清二楚'
      }
    ]
  },
  {
    id: 'L9',
    chapter: '夏日湖',
    title: '雪中送炭',
    idiom: '雪中送炭',
    pinyin: 'xuě zhōng sòng tàn',
    meaning: '在雪天给人送炭取暖',
    hint: '比喻在别人困难时给予帮助',
    reward: '❄️ 雪花贴',
    questions: [
      {
        type: 'choice',
        prompt: '雪中送炭比喻什么？',
        options: ['在困难时帮助别人', '在雪天送炭', '在夏天送冰', '在春天送花'],
        answer: '在困难时帮助别人'
      },
      {
        type: 'fill',
        prompt: '他____中送____，帮助了困难的朋友',
        answer: '雪中送炭'
      }
    ]
  },
  // 秋果山
  {
    id: 'L10',
    chapter: '秋果山',
    title: '画蛇添足',
    idiom: '画蛇添足',
    pinyin: 'huà shé tiān zú',
    meaning: '画蛇时多画了脚',
    hint: '比喻做了多余的事情，反而把事情搞糟',
    reward: '🐍 蛇贴',
    questions: [
      {
        type: 'choice',
        prompt: '画蛇添足比喻什么？',
        options: ['做多余的事', '画得很好', '蛇有脚', '蛇没有脚'],
        answer: '做多余的事'
      },
      {
        type: 'act',
        prompt: '请你表演画蛇添足的样子'
      }
    ]
  },
  {
    id: 'L11',
    chapter: '秋果山',
    title: '井底之蛙',
    idiom: '井底之蛙',
    pinyin: 'jǐng dǐ zhī wā',
    meaning: '井底的青蛙',
    hint: '比喻见识短浅的人，就像井底的青蛙只能看到井口那么大的天',
    reward: '🐸 青蛙贴',
    questions: [
      {
        type: 'choice',
        prompt: '井底之蛙比喻什么？',
        options: ['见识广', '见识短', '会游泳', '会跳高'],
        answer: '见识短'
      },
      {
        type: 'fill',
        prompt: '____底之____，比喻见识短浅',
        answer: '井底之蛙'
      }
    ]
  },
  {
    id: 'L12',
    chapter: '秋果山',
    title: '掩耳盗铃',
    idiom: '掩耳盗铃',
    pinyin: 'yǎn ěr dào líng',
    meaning: '捂住耳朵偷铃铛',
    hint: '比喻自己欺骗自己，以为别人不知道',
    reward: '🔔 铃铛贴',
    questions: [
      {
        type: 'act',
        prompt: '请你表演掩耳盗铃的动作'
      },
      {
        type: 'choice',
        prompt: '掩耳盗铃比喻什么？',
        options: ['自己欺骗自己', '偷东西', '听不见', '看不见'],
        answer: '自己欺骗自己'
      }
    ]
  },
  {
    id: 'L13',
    chapter: '秋果山',
    title: '对牛弹琴',
    idiom: '对牛弹琴',
    pinyin: 'duì niú tán qín',
    meaning: '对着牛弹琴',
    hint: '比喻对不懂的人讲深奥的道理，白费力气',
    reward: '🐮 牛贴',
    questions: [
      {
        type: 'choice',
        prompt: '对牛弹琴比喻什么？',
        options: ['牛会听音乐', '白费力气', '琴声好听', '牛很聪明'],
        answer: '白费力气'
      },
      {
        type: 'fill',
        prompt: '____牛____琴，比喻白费力气',
        answer: '对牛弹琴'
      }
    ]
  },
  {
    id: 'L14',
    chapter: '秋果山',
    title: '亡羊补牢',
    idiom: '亡羊补牢',
    pinyin: 'wáng yáng bǔ láo',
    meaning: '羊跑了才修补羊圈',
    hint: '比喻出了问题后及时补救，还不算晚',
    reward: '🐑 羊贴',
    questions: [
      {
        type: 'choice',
        prompt: '亡羊补牢比喻什么？',
        options: ['及时补救', '羊跑了', '修羊圈', '养羊'],
        answer: '及时补救'
      },
      {
        type: 'fill',
        prompt: '____羊____牢，为时不晚',
        answer: '亡羊补牢'
      }
    ]
  },
  // 冬雪洞（Boss关）
  {
    id: 'L15',
    chapter: '冬雪洞',
    title: '雪中送炭（Boss关）',
    idiom: '雪中送炭',
    pinyin: 'xuě zhōng sòng tàn',
    meaning: '在雪天给人送炭取暖',
    hint: '这是一个关于帮助别人的成语，想想在别人最需要帮助的时候伸出援手',
    reward: '🏆 英雄奖章',
    questions: [
      {
        type: 'choice',
        prompt: '雪中送炭的核心含义是什么？',
        options: ['在雪天送炭', '帮助别人', '取暖', '送礼物'],
        answer: '帮助别人'
      },
      {
        type: 'fill',
        prompt: '这个成语告诉我们，要在别人困难时____他',
        answer: '帮助',
        hint: '想想"帮助别人"这个词'
      },
      {
        type: 'act',
        prompt: '请你表演雪中送炭的场景，帮助一个在雪地里冷得发抖的人'
      }
    ]
  }
]; 