import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Music2, Heart, Star } from "lucide-react";

const copy = {
  en: {
    langLabel: "中文",
    badge: "BUNNIES ONLY",
    title: "Bunnies Fortune Capsule",
    subtitle:
      "Tap the bunny button, roll a pixel capsule, and receive a tiny NewJeans-inspired luck note for your day.",
    machineTag: "8-BIT LUCK",
    capsuleTag: "RAINBOW CAPSULES",
    pressButton: "PRESS THE BUNNY BUTTON",
    emptyTitle: "Your fortune is hiding",
    emptyText:
      "One capsule, one mood, one tiny bestie-coded message. Let the bunny machine choose your luck.",
    rollingTitle: "Rolling...",
    rollingText: "The capsule is bouncing through the Bunnies universe.",
    fortuneCard: "FORTUNE CARD",
    drawAgain: "DRAW AGAIN",
    labels: ["RABBIT", "STAR", "BEAT"],
    footer:
      "Fan-made interactive concept for Bunnies. No official affiliation. Made for cute daily luck, soft Y2K moods, and pixel rabbit energy.",
    ariaDraw: "Draw a Bunnies fortune capsule",
  },
  zh: {
    langLabel: "EN",
    badge: "BUNNIES 专属",
    title: "Bunnies 运势签",
    subtitle:
      "点击兔兔按钮，抽取一颗像素扭蛋，收到一张 NewJeans 灵感的今日好运小卡。",
    machineTag: "8-BIT 好运",
    capsuleTag: "彩虹扭蛋舱",
    pressButton: "点击兔兔按钮抽签",
    emptyTitle: "你的运势还藏在扭蛋里",
    emptyText:
      "一颗扭蛋，一种心情，一句像闺蜜悄悄发来的好运提示。让兔兔机帮你选今天的幸运频率。",
    rollingTitle: "扭蛋滚动中...",
    rollingText: "扭蛋正在 Bunnies 宇宙里蹦蹦跳跳地掉落。",
    fortuneCard: "今日运势卡",
    drawAgain: "再抽一次",
    labels: ["兔兔", "星星", "节拍"],
    footer:
      "Bunnies 粉丝向互动概念页，非官方项目。用于可爱的每日好运、轻松治愈的 Y2K 心情和像素兔兔能量。",
    ariaDraw: "抽取一张 Bunnies 运势签",
  },
};

const fortunes = [
  {
    title: { en: "Super Soft Luck", zh: "超柔软好运" },
    song: { en: "Super Shy Mood", zh: "Super Shy 心动频率" },
    capsule: "#ff8cc6",
    bg: "from-pink-200 via-rose-100 to-sky-100",
    accent: "#ff5faa",
    message: {
      en:
        "Today you do not need to be the loudest bunny in the room. A tiny brave step is enough. Send the message, wear the cute thing, take the chance. Your shy era is still sparkling.",
      zh:
        "今天不用做全场最大声的兔兔。只要迈出一小步就够了。发出那条消息，穿上那件可爱的衣服，抓住那个机会。害羞也可以闪闪发光。",
    },
    tip: {
      en: "Lucky move: say yes to one small invitation.",
      zh: "好运动作：答应一个小小的邀约。",
    },
  },
  {
    title: { en: "Ditto Signal", zh: "Ditto 同频信号" },
    song: { en: "Soft Nostalgia Pull", zh: "温柔怀旧牵引" },
    capsule: "#8cc7ff",
    bg: "from-sky-200 via-blue-100 to-pink-100",
    accent: "#4a9cff",
    message: {
      en:
        "Someone is matching your energy more than you think. Stay gentle, but do not overthink every little sign. The universe is tapping back: same heart, same rhythm, same bunny frequency.",
      zh:
        "有人正在和你的能量悄悄同频。保持温柔，但别把每个小信号都想太复杂。宇宙正在回应你：同样的心情，同样的节奏，同样的兔兔频率。",
    },
    tip: {
      en: "Lucky move: reply with your real feeling, not your safest one.",
      zh: "好运动作：用真实感受回复，而不是只发最安全的那句。",
    },
  },
  {
    title: { en: "OMG Glow-Up", zh: "OMG 闪光升级" },
    song: { en: "Bestie Alarm Energy", zh: "闺蜜提醒能量" },
    capsule: "#ffd66e",
    bg: "from-yellow-100 via-pink-100 to-purple-100",
    accent: "#f3b72d",
    message: {
      en:
        "Your friends are your power bank today. Let them hype you up. The thing you thought was too much is actually your charm doing its job. Main-character brightness: loading.",
      zh:
        "今天朋友就是你的充电宝。让她们狠狠夸你。你以为有点太多的地方，其实正是你的魅力在发挥作用。主角光环正在加载中。",
    },
    tip: {
      en: "Lucky move: take the photo before you change your mind.",
      zh: "好运动作：还没犹豫前，先把照片拍下来。",
    },
  },
  {
    title: { en: "Hype Bunny Day", zh: "Hype Bunny 日" },
    song: { en: "Crush-Song Confidence", zh: "心动歌单自信" },
    capsule: "#b79cff",
    bg: "from-violet-200 via-pink-100 to-blue-100",
    accent: "#8e6bff",
    message: {
      en:
        "Your charm is not subtle today. People notice the way you move, speak, and laugh. Do not shrink it. This is a good day to ask, apply, post, or begin.",
      zh:
        "今天你的魅力不需要低调。别人会注意到你走路、说话和笑起来的样子。别把自己缩小。今天适合开口、申请、发布，也适合开始。",
    },
    tip: {
      en: "Lucky move: choose the bold version.",
      zh: "好运动作：选择更大胆的那个版本。",
    },
  },
  {
    title: { en: "ETA Clear Path", zh: "ETA 清晰路线" },
    song: { en: "Fast Text, Fast Heart", zh: "快讯息，快心跳" },
    capsule: "#7df0d4",
    bg: "from-teal-100 via-cyan-100 to-pink-100",
    accent: "#20c9ad",
    message: {
      en:
        "The answer arrives faster when you stop refreshing the same worry. Make one clear move, then let it travel. Your timing is not late; it is just becoming accurate.",
      zh:
        "当你不再反复刷新同一个担心时，答案会来得更快。先做一个明确动作，再让它慢慢抵达。你的时机不是晚了，而是在变得更准。",
    },
    tip: {
      en: "Lucky move: finish one pending task before noon.",
      zh: "好运动作：中午前完成一件拖着的小事。",
    },
  },
  {
    title: { en: "Bubble Gum Blessing", zh: "Bubble Gum 甜甜祝福" },
    song: { en: "Sweet Summer Loop", zh: "甜夏循环播放" },
    capsule: "#ffb3e6",
    bg: "from-pink-100 via-orange-100 to-sky-100",
    accent: "#ff72cb",
    message: {
      en:
        "Softness is your strategy today. Be cute, be calm, be difficult to disturb. A light mood will solve what pressure could not. Chew the stress, then blow it away.",
      zh:
        "今天柔软就是你的策略。可爱一点，冷静一点，不要轻易被打扰。轻松的心情会解决压力解决不了的事。把烦恼嚼一嚼，再吹走。",
    },
    tip: {
      en: "Lucky move: drink something sweet and reset your playlist.",
      zh: "好运动作：喝点甜的，然后重启你的歌单。",
    },
  },
  {
    title: { en: "How Sweet Reset", zh: "How Sweet 清爽重启" },
    song: { en: "Clean-Girl Bunny Era", zh: "干净感兔兔时刻" },
    capsule: "#b6f27a",
    bg: "from-lime-100 via-yellow-100 to-pink-100",
    accent: "#78c943",
    message: {
      en:
        "You are allowed to make life easier. Delete the old draft, clear the table, mute the noise. What remains will feel lighter, sweeter, and very you.",
      zh:
        "你可以把生活调简单一点。删掉旧草稿，整理桌面，静音那些噪声。留下来的东西会更轻、更甜，也更像你。",
    },
    tip: {
      en: "Lucky move: remove one thing that keeps stealing your focus.",
      zh: "好运动作：移走一个一直偷走你注意力的东西。",
    },
  },
  {
    title: { en: "Bunnies Team Buff", zh: "Bunnies 团魂加成" },
    song: { en: "Five-Star Group Soul", zh: "五星团魂能量" },
    capsule: "#ffffff",
    bg: "from-white via-pink-100 to-blue-100",
    accent: "#7aa7ff",
    message: {
      en:
        "Your solo luck is good, but your team luck is better. Ask for help, share the meme, send the tiny update. Bunny magic works best when it hops in a circle.",
      zh:
        "你的个人运势不错，但团体运更强。可以求助，可以分享表情包，也可以发一个小小近况。兔兔魔法最适合一圈人一起蹦出来。",
    },
    tip: {
      en: "Lucky move: check in on your favorite person.",
      zh: "好运动作：去问候一下你最在意的人。",
    },
  },
];

const pixels = [
  ["#ff8cc6", "#ffd66e", "#8cc7ff", "#b79cff", "#7df0d4"],
  ["#b6f27a", "#ffb3e6", "#ffffff", "#ffd66e", "#8cc7ff"],
  ["#7df0d4", "#ff8cc6", "#b79cff", "#b6f27a", "#ffb3e6"],
];

function PixelCapsule({ color, small = false, delay = 0 }) {
  return (
    <motion.div
      initial={{ y: -4, rotate: -8, opacity: 0.9 }}
      animate={{ y: [0, -5, 0], rotate: [-6, 6, -6] }}
      transition={{ duration: 2.4, repeat: Infinity, delay }}
      className={`${small ? "h-7 w-7" : "h-10 w-10"} relative rounded-full border-4 border-slate-800 shadow-[4px_4px_0_rgba(15,23,42,0.35)]`}
      style={{ background: `linear-gradient(135deg, ${color} 0 50%, #fff 50% 100%)` }}
    >
      <div className="absolute left-1/2 top-0 h-full w-1 -translate-x-1/2 bg-slate-800/70" />
      <div className="absolute left-1 top-1 h-2 w-2 bg-white/80" />
    </motion.div>
  );
}

function PixelBunny({ className = "" }) {
  return (
    <div className={`relative ${className}`}>
      <div className="absolute left-1 top-0 h-5 w-3 rounded-t-full border-2 border-slate-800 bg-white" />
      <div className="absolute right-1 top-0 h-5 w-3 rounded-t-full border-2 border-slate-800 bg-white" />
      <div className="absolute left-1 top-1 h-3 w-1 bg-pink-300" />
      <div className="absolute right-2 top-1 h-3 w-1 bg-pink-300" />
      <div className="absolute left-0 top-4 h-8 w-10 rounded-xl border-2 border-slate-800 bg-white shadow-[3px_3px_0_rgba(15,23,42,0.25)]" />
      <div className="absolute left-2 top-7 h-1.5 w-1.5 bg-slate-800" />
      <div className="absolute right-2 top-7 h-1.5 w-1.5 bg-slate-800" />
      <div className="absolute left-[18px] top-[32px] h-1 w-1 bg-pink-400" />
    </div>
  );
}

function FloatingPixel({ children, className, delay = 0 }) {
  return (
    <motion.div
      className={`absolute ${className}`}
      animate={{ y: [0, -12, 0], rotate: [-5, 5, -5] }}
      transition={{ duration: 3.2, repeat: Infinity, delay }}
    >
      {children}
    </motion.div>
  );
}

export default function BunniesFortuneCapsule() {
  const [current, setCurrent] = useState(null);
  const [isRolling, setIsRolling] = useState(false);
  const [drawCount, setDrawCount] = useState(0);
  const [lang, setLang] = useState("en");

  const t = copy[lang];
  const isZh = lang === "zh";
  const nextCapsule = useMemo(() => fortunes[drawCount % fortunes.length], [drawCount]);

  const titleClass = isZh
    ? "smooth-font font-black tracking-tight"
    : "pixel-font";

  const tinyLabelClass = isZh
    ? "smooth-font text-[11px] font-black tracking-wide"
    : "pixel-font text-[8px]";

  const drawFortune = () => {
    if (isRolling) return;
    setCurrent(null);
    setIsRolling(true);

    window.setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * fortunes.length);
      setCurrent(fortunes[randomIndex]);
      setDrawCount((v) => v + 1);
      setIsRolling(false);
    }, 1150);
  };

  const toggleLang = () => setLang((value) => (value === "en" ? "zh" : "en"));

  return (
    <main className="min-h-screen overflow-hidden bg-[#ffeef8] px-4 py-5 text-slate-900 sm:px-6">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@500;700;900&family=Press+Start+2P&family=Inter:wght@500;700;900&display=swap');
        .pixel-font { font-family: 'Press Start 2P', Inter, 'Noto Sans SC', system-ui, sans-serif; }
        .smooth-font { font-family: Inter, 'Noto Sans SC', ui-sans-serif, system-ui, sans-serif; }
        .pixelated { image-rendering: pixelated; }
        .pixel-border { box-shadow: 6px 6px 0 #0f172a, inset 0 0 0 4px rgba(255,255,255,.45); }
        .pixel-grid { background-image: linear-gradient(rgba(255,255,255,.45) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.45) 1px, transparent 1px); background-size: 18px 18px; }
      `}</style>

      <div className="pointer-events-none fixed inset-0 pixel-grid opacity-70" />
      <FloatingPixel className="left-5 top-16 text-pink-500" delay={0.2}><Music2 size={24} /></FloatingPixel>
      <FloatingPixel className="right-8 top-24 text-sky-500" delay={0.7}><Star size={28} /></FloatingPixel>
      <FloatingPixel className="bottom-32 left-8 text-violet-500" delay={1.1}><Sparkles size={28} /></FloatingPixel>
      <FloatingPixel className="bottom-20 right-10 text-rose-500" delay={1.5}><Heart size={24} /></FloatingPixel>

      <section className="relative z-10 mx-auto flex min-h-[calc(100vh-40px)] max-w-5xl flex-col items-center justify-center gap-6">
        <header className="relative w-full max-w-3xl rounded-[2rem] border-4 border-slate-900 bg-white/70 p-5 text-center shadow-[8px_8px_0_rgba(15,23,42,0.18)] backdrop-blur">
          <button
            type="button"
            onClick={toggleLang}
            className="smooth-font absolute right-4 top-4 rounded-xl border-4 border-slate-900 bg-white px-3 py-2 text-xs font-black shadow-[3px_3px_0_rgba(15,23,42,0.25)] transition hover:-translate-y-0.5 active:translate-y-0.5"
            aria-label="Switch language"
          >
            {t.langLabel}
          </button>

          <div className="mx-auto mb-3 inline-flex items-center gap-2 rounded-full border-4 border-slate-900 bg-sky-100 px-4 py-2 shadow-[4px_4px_0_rgba(15,23,42,0.25)]">
            <PixelBunny className="h-10 w-10" />
            <span className={`${isZh ? "smooth-font text-xs font-black" : "pixel-font text-[10px]"} leading-none text-slate-900`}>{t.badge}</span>
          </div>
          <h1 className={`${titleClass} text-xl leading-relaxed text-slate-950 sm:text-3xl`}>{t.title}</h1>
          <p className="smooth-font mx-auto mt-3 max-w-2xl text-sm font-bold leading-6 text-slate-700 sm:text-base">
            {t.subtitle}
          </p>
        </header>

        <div className="grid w-full max-w-5xl items-center gap-6 lg:grid-cols-[1fr_.9fr]">
          <section className="relative mx-auto w-full max-w-md rounded-[2.5rem] border-4 border-slate-900 bg-gradient-to-br from-sky-200 via-pink-100 to-blue-100 p-5 pixel-border">
            <div className="absolute -right-5 -top-5 rounded-2xl border-4 border-slate-900 bg-yellow-200 px-3 py-2 shadow-[4px_4px_0_rgba(15,23,42,0.25)]">
              <span className={tinyLabelClass}>{t.machineTag}</span>
            </div>

            <div className="mx-auto h-[520px] max-h-[70vh] min-h-[460px] rounded-[2rem] border-4 border-slate-900 bg-[#9cd5ff] p-4 shadow-[inset_0_0_0_6px_rgba(255,255,255,.35)]">
              <div className="relative h-[46%] overflow-hidden rounded-[1.7rem] border-4 border-slate-900 bg-gradient-to-br from-white/80 via-sky-100 to-pink-100 shadow-[inset_0_0_0_5px_rgba(255,255,255,.7)]">
                <div className="absolute inset-x-6 bottom-0 grid gap-2">
                  {pixels.map((row, rowIndex) => (
                    <div key={rowIndex} className="flex justify-center gap-3">
                      {row.map((color, index) => (
                        <PixelCapsule key={`${rowIndex}-${index}`} color={color} small={rowIndex === 0} delay={(rowIndex + index) * 0.18} />
                      ))}
                    </div>
                  ))}
                </div>

                <AnimatePresence>
                  {isRolling && (
                    <motion.div
                      initial={{ x: -50, y: 60, rotate: 0, scale: 0.95 }}
                      animate={{ x: [0, 90, 170, 250], y: [80, 35, 70, 125], rotate: [0, 180, 360, 540] }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.9, ease: "easeInOut" }}
                      className="absolute left-4 top-8"
                    >
                      <PixelCapsule color={nextCapsule.capsule} />
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="absolute left-4 top-4 rounded-lg border-2 border-slate-900 bg-white/80 px-2 py-1">
                  <span className={tinyLabelClass}>{t.capsuleTag}</span>
                </div>
              </div>

              <div className="relative mx-auto mt-4 h-[46%] rounded-[1.7rem] border-4 border-slate-900 bg-gradient-to-br from-[#ffc1de] to-[#d9c5ff] p-4">
                <div className="absolute left-1/2 top-4 h-20 w-20 -translate-x-1/2 rounded-full border-4 border-slate-900 bg-slate-100 shadow-[4px_4px_0_rgba(15,23,42,0.25)]">
                  <div className="absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-slate-900 bg-sky-200" />
                  <div className="absolute left-1/2 top-1/2 h-3 w-12 -translate-x-1/2 -translate-y-1/2 bg-slate-900" />
                </div>

                <button
                  type="button"
                  onClick={drawFortune}
                  disabled={isRolling}
                  className="group absolute left-1/2 top-28 z-20 flex h-24 w-24 -translate-x-1/2 cursor-pointer items-center justify-center rounded-3xl border-4 border-slate-900 bg-white shadow-[6px_6px_0_rgba(15,23,42,0.45)] transition hover:-translate-y-1 active:translate-y-1 active:shadow-[3px_3px_0_rgba(15,23,42,0.45)] disabled:cursor-not-allowed disabled:opacity-80"
                  aria-label={t.ariaDraw}
                >
                  <motion.div animate={isRolling ? { rotate: [0, 12, -12, 0] } : { rotate: 0 }} transition={{ repeat: isRolling ? Infinity : 0, duration: 0.24 }}>
                    <PixelBunny className="h-12 w-12 scale-90" />
                  </motion.div>
                </button>

                <div className="absolute bottom-6 left-1/2 h-14 w-36 -translate-x-1/2 rounded-b-3xl rounded-t-lg border-4 border-slate-900 bg-slate-100 shadow-[inset_0_-6px_0_rgba(15,23,42,.12)]">
                  <div className="mx-auto mt-3 h-4 w-24 rounded-full bg-slate-900" />
                  <AnimatePresence>
                    {isRolling && (
                      <motion.div
                        initial={{ y: -90, opacity: 0, rotate: 0 }}
                        animate={{ y: 0, opacity: 1, rotate: 360 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.65, delay: 0.55 }}
                        className="absolute left-1/2 top-5 -translate-x-1/2"
                      >
                        <PixelCapsule color={nextCapsule.capsule} small />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={drawFortune}
              disabled={isRolling}
              className="mt-5 flex w-full cursor-pointer items-center justify-between gap-3 rounded-2xl border-4 border-slate-900 bg-white px-4 py-3 text-left shadow-[4px_4px_0_rgba(15,23,42,0.25)] transition hover:-translate-y-1 active:translate-y-1 active:shadow-[2px_2px_0_rgba(15,23,42,0.25)] disabled:cursor-not-allowed disabled:opacity-80"
              aria-label={t.ariaDraw}
            >
              <p className={`${isZh ? "smooth-font text-sm font-black" : "pixel-font text-[9px]"} leading-5`}>{t.pressButton}</p>
              <div className="flex gap-1">
                <span className="h-3 w-3 border-2 border-slate-900 bg-pink-300" />
                <span className="h-3 w-3 border-2 border-slate-900 bg-sky-300" />
                <span className="h-3 w-3 border-2 border-slate-900 bg-yellow-300" />
              </div>
            </button>
          </section>

          <section className="relative min-h-[430px] rounded-[2rem] border-4 border-slate-900 bg-white/75 p-5 shadow-[8px_8px_0_rgba(15,23,42,0.18)] backdrop-blur">
            <AnimatePresence mode="wait">
              {!current && !isRolling && (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  className="flex h-full min-h-[390px] flex-col items-center justify-center text-center"
                >
                  <div className="relative mb-8 h-24 w-24">
                    <PixelBunny className="h-16 w-16 scale-150" />
                  </div>
                  <h2 className={`${titleClass} text-lg leading-8`}>{t.emptyTitle}</h2>
                  <p className="smooth-font mt-4 max-w-sm text-sm font-bold leading-6 text-slate-600">
                    {t.emptyText}
                  </p>
                </motion.div>
              )}

              {isRolling && (
                <motion.div
                  key="rolling"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  className="flex h-full min-h-[390px] flex-col items-center justify-center text-center"
                >
                  <motion.div animate={{ rotate: 360 }} transition={{ duration: 0.7, repeat: Infinity, ease: "linear" }}>
                    <PixelCapsule color={nextCapsule.capsule} />
                  </motion.div>
                  <h2 className={`${titleClass} mt-8 text-lg leading-8`}>{t.rollingTitle}</h2>
                  <p className="smooth-font mt-4 max-w-sm text-sm font-bold leading-6 text-slate-600">
                    {t.rollingText}
                  </p>
                </motion.div>
              )}

              {current && !isRolling && (
                <motion.article
                  key={`${current.title.en}-${lang}`}
                  initial={{ opacity: 0, y: 28, rotate: -1.5, scale: 0.92 }}
                  animate={{ opacity: 1, y: 0, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 180, damping: 18 }}
                  className={`relative min-h-[390px] overflow-hidden rounded-[1.6rem] border-4 border-slate-900 bg-gradient-to-br ${current.bg} p-5 shadow-[6px_6px_0_rgba(15,23,42,0.28)]`}
                >
                  <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full border-4 border-slate-900 bg-white/45" />
                  <div className="absolute -bottom-10 -left-10 h-36 w-36 rounded-full border-4 border-slate-900 bg-white/35" />
                  <div className="relative z-10">
                    <div className="mb-4 flex items-center justify-between gap-3">
                      <div className="rounded-2xl border-4 border-slate-900 bg-white px-3 py-2 shadow-[4px_4px_0_rgba(15,23,42,0.25)]">
                        <span className={tinyLabelClass}>{t.fortuneCard}</span>
                      </div>
                      <PixelCapsule color={current.capsule} small />
                    </div>

                    <div className="mb-5 flex items-center gap-3">
                      <div className="relative h-16 w-16 shrink-0">
                        <PixelBunny className="h-12 w-12 scale-125" />
                      </div>
                      <div>
                        <h2 className={`${titleClass} text-base leading-7 sm:text-lg`}>{current.title[lang]}</h2>
                        <p className="smooth-font mt-1 text-xs font-black uppercase tracking-[0.16em] text-slate-600">{current.song[lang]}</p>
                      </div>
                    </div>

                    <div className="rounded-3xl border-4 border-slate-900 bg-white/86 p-4 shadow-[inset_0_0_0_4px_rgba(255,255,255,.65)]">
                      <p className="smooth-font text-base font-black leading-7 text-slate-800">{current.message[lang]}</p>
                      <div className="my-4 border-t-4 border-dashed border-slate-900/40" />
                      <p className="smooth-font text-sm font-black leading-6" style={{ color: current.accent }}>{current.tip[lang]}</p>
                    </div>

                    <div className="mt-5 grid grid-cols-3 gap-3">
                      {t.labels.map((label, index) => (
                        <div key={label} className="rounded-2xl border-4 border-slate-900 bg-white/75 p-3 text-center shadow-[3px_3px_0_rgba(15,23,42,0.2)]">
                          <div className="mx-auto mb-2 h-4 w-4 border-2 border-slate-900" style={{ backgroundColor: index === 0 ? current.capsule : index === 1 ? "#fff176" : "#a7d8ff" }} />
                          <span className={`${isZh ? "smooth-font text-[11px] font-black" : "pixel-font text-[7px]"}`}>{label}</span>
                        </div>
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={drawFortune}
                      className="mt-5 w-full cursor-pointer rounded-2xl border-4 border-slate-900 bg-slate-950 px-4 py-4 text-white shadow-[5px_5px_0_rgba(15,23,42,0.25)] transition hover:-translate-y-1 active:translate-y-1 active:shadow-[2px_2px_0_rgba(15,23,42,0.25)]"
                    >
                      <span className={`${isZh ? "smooth-font text-sm font-black" : "pixel-font text-[10px]"}`}>{t.drawAgain}</span>
                    </button>
                  </div>
                </motion.article>
              )}
            </AnimatePresence>
          </section>
        </div>

        <footer className="smooth-font max-w-3xl rounded-2xl border-4 border-slate-900 bg-white/70 px-4 py-3 text-center text-xs font-bold leading-5 text-slate-600 shadow-[4px_4px_0_rgba(15,23,42,0.18)]">
          {t.footer}
        </footer>
      </section>
    </main>
  );
}
