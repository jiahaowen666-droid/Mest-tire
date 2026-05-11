# Mest Tire — UI/UX Design Audit Report

**审计日期：** 2026-04-23
**审计网址：** https://mest-tire-78jrr9sbj-jiahaowen666-2219s-projects.vercel.app/
**审计范围：** 全站代码（Navbar、HeroSection、StatsSection、ApplicationSection、ProductOrbit、HomeContent、HomeCTA、FAQSection、ProductsContent、ContactContent、Footer）

---

## 总体评分

| 维度 | 得分 | 说明 |
|------|------|------|
| 视觉层级 | 6/10 | 基本结构清晰，但缺乏层级差异化 |
| 色彩系统 | 5/10 | 品牌色鲜明，但 WCAG 多处失败 |
| 排版 | 7/10 | 字体搭配专业，中文 fallback 是短板 |
| 布局与空间 | 6.5/10 | 整体规整，但间距规范有断层 |
| 交互与动效 | 5.5/10 | Framer Motion 运用到位，但 pause bug 和缺乏物理反馈 |
| 设计一致性 | 6/10 | Emoji 是最大隐患，卡片规格不统一 |

**综合评分：6.0 / 10**

> 整体来说这是一个**完成度较高的 B2B 官网骨架**——结构合理、动效有质感、字体搭配专业。主要短板集中在无障碍合规、品牌一致性和交互反馈三个方向。

---

## 最优先需要解决的 3 个问题

### 🔴 #1 — 橙色背景白色文字的对比度（WCAG 失败）

影响：全站所有橙色 section（Stats、Products header、Contact header、CTA）的文字可读性，涉及潜在法律合规风险。

**行动：** 将橙色背景改为 `#b45309`（amber-700，对比度 4.8:1）或将说明性文字改为深棕色（`text-amber-950`）。

### 🔴 #2 — 将 Emoji 替换为 SVG 图标

影响：直接损害 B2B 专业形象。一个跨国轮胎制造商的产品目录页出现🏎️⛳🚛，会让目标采购商（高尔夫度假村、机场 GSE 采购部门）产生"这是正经公司吗"的怀疑。

**行动：** 参考 `ApplicationSection.tsx` 中已有的精细 SVG 图标风格，为 ProductOrbit 和 ProductsContent 各写对应 SVG。

### 🔴 #3 — 修复 ProductOrbit 旋转暂停 bug

影响：轨道外圈在用户悬停时仍在旋转，而连接线却是静止的——这个视觉矛盾直接损害网站的"精密感"品牌印象，与品牌定语"Precision in Every Turn"形成讽刺。

**行动：** 在 `motion.svg` 的 `animate` prop 中响应 `isPaused` 状态，或使用 `useAnimationControls()`。

---

## 1. 视觉层级 (Visual Hierarchy)

### 问题 1.1 — 所有 section h2 字号完全相同

**优先级：高**
**位置：** `ApplicationSection.tsx:80`, `HomeContent.tsx:17`, `ProductOrbit.tsx:37`, `FAQSection.tsx:16`

全站所有次级标题一律使用 `text-4xl font-black`，无论是主功能模块还是辅助信息模块，字号完全相同。用户无法通过标题大小判断信息的重要程度，视线流动缺乏节奏感。

**改进方案：**

```tsx
// 主要模块 h2（如 ApplicationSection、ProductOrbit）
<h2 className="text-4xl sm:text-5xl font-black text-white">

// 次要模块 h2（如 FAQ、Why Us）
<h2 className="text-3xl sm:text-4xl font-black text-gray-900">
```

---

### 问题 1.2 — section 标签文字（tag）全站完全一致，造成视觉麻木

**优先级：低**
**位置：** 所有 section 组件

```tsx
// 全站统一是这个模式，7 个 section 全部相同：
<p className="text-[#f97316] text-xs font-semibold uppercase tracking-widest mb-2">
```

视线扫过 3 个 section 后，橙色小标签已完全失去引导注意力的作用。建议至少在视觉上区分"主要"和"支撑"section 的 tag 样式。

---

### 问题 1.3 — Hero 底部徽章文字对比度过低，层级断裂

**优先级：中**
**位置：** `HeroSection.tsx:122`

```tsx
// 当前：text-white/50，在黑色半透明背景上对比度约 3.5:1
<div className="flex items-center gap-2 text-white/50 text-xs">
```

这些徽章（"30+ Years Experience"等）本是强化信任的关键信息，却用了最低对比度的颜色，与重要程度不匹配。改为 `text-white/70` 以维持层级。

---

## 2. 色彩系统 (Color System)

### 问题 2.1 — 白色文字叠加橙色背景，全站性 WCAG 失败

**优先级：高**
**位置：** `StatsSection.tsx:60`, `ProductsContent.tsx:23`, `ContactContent.tsx:19`, `HomeCTA.tsx:14`

`#f97316`（orange-500）背景上叠加白色文字的理论对比度约为 **2.82:1**，远低于 WCAG AA 标准（普通文字需 4.5:1，大文字需 3:1）。使用半透明白色（`text-white/80`、`text-white/70`）情况更差。

```
#f97316 背景 + #ffffff 文字       → 对比度 2.82:1  ❌（需 4.5:1）
#f97316 背景 + rgba(255,255,255,0.8) → 对比度 ~2.3:1  ❌
```

**改进方案（两选一）：**

```tsx
// 方案 A：换深色底——将 orange 区块背景改为 #b45309（amber-700）
// 对比度提升至约 4.7:1 ✓

// 方案 B：保留橙色，正文改深色
<p className="text-orange-950/80 text-lg">  // 深棕色，约 7:1 ✓
```

---

### 问题 2.2 — 页面背景色交替过于频繁，产生视觉疲劳

**优先级：高**

首页按顺序共有 **7 次背景切换**：

```
white(hero) → orange(stats) → gray-950(applications) → gray-50(orbit)
→ white(why us) → gray-50(story) → orange(CTA)
```

每个 section 都在争夺注意力，整体阅读体验碎片化，没有给用户喘息的节奏。

**改进方案：** 合并相邻的 gray-50 和 white section（orbit + why us + story），保留 orange 只用于真正需要强调的 CTA 节点，将交替次数减少到 4 次以内。

---

### 问题 2.3 — `text-gray-400` 大量用于正文，无法通过 WCAG AA

**优先级：中**
**位置：** `Footer.tsx:37,48,53`, `ContactForm.tsx:107`

gray-400（#9ca3af）在白色背景上对比度约 **3.1:1**，不达标。联系表单中 message label 还用了 `text-gray-400`（`ContactForm.tsx:107`），表单标签比其它标签更暗淡，直接影响填写效率。应统一改为 `text-gray-600`（对比度 ~5.9:1）。

---

## 3. 排版 (Typography)

### 问题 3.1 — `text-[10px]` 是非标准魔法数字，违反 Tailwind 设计系统

**优先级：中**
**位置：** `ApplicationSection.tsx:99`, `ProductOrbit.tsx:124`

```tsx
// 当前：text-[10px] — 不在 Tailwind 默认 scale 内
<span className="text-[10px] font-bold uppercase tracking-widest text-white/40">

// 改为 text-xs (12px)，仍然够小但符合设计系统
<span className="text-xs font-bold uppercase tracking-widest text-white/40">
```

`ProductOrbit` 中心圆的 "PRODUCT LINES" 在 `text-[10px]` + `tracking-widest` 下，实际渲染宽度极窄，在非 Retina 屏上基本不可读。

---

### 问题 3.2 — 全站所有 h2 使用 `font-black`，过度粗重

**优先级：低**

`font-black`（weight 900）应仅用于最高层级的英雄标题。将 FAQ、"Why Choose Us"、Brand Story 等支撑型 section 的标题降为 `font-extrabold`（800），视觉上更有呼吸感，同时大标题（Hero h1、Products h1）的冲击力反而更突出。

---

### 问题 3.3 — 中文版本缺少 CJK 字体声明

**优先级：中**
**位置：** `layout.tsx:8-18`, `globals.css:9`

网站支持中文（LanguageContext），但 `globals.css` 中字体栈只有：

```css
--font-sans: var(--font-inter);  /* Inter 不含中文字形 */
```

当语言切换为中文时，中文字符会 fallback 到系统字体（可能是宋体/黑体），与 Inter/DM Sans 的现代感产生明显断层。

**改进方案：**

```css
/* globals.css */
body {
  font-family: var(--font-sans), "Noto Sans SC", "PingFang SC",
               "Microsoft YaHei", system-ui, sans-serif;
}
```

---

## 4. 布局与空间 (Layout & Spacing)

### 问题 4.1 — ProductOrbit SVG 尺寸硬编码 520px，lg 断点下会溢出

**优先级：高**
**位置：** `ProductOrbit.tsx:11-12, 46-51`

```tsx
const SIZE = 520   // 硬编码像素值

<div style={{ width: SIZE, height: SIZE }}>
```

在 `lg` 断点（1024px）启用桌面视图时，1024–1100px 之间 orbit（520px）+ gap（48px）+ 文字面板（300px）极为局促，文字面板会被严重压缩。

**改进方案：** 响应式调整 SIZE，`lg` 时使用 420px，`xl` 及以上使用 520px：

```tsx
// 使用 CSS variable + Tailwind 响应式
const SIZE = 420  // lg 默认值
// xl: SIZE = 520，通过 window.innerWidth 或 useMediaQuery 动态切换
```

---

### 问题 4.2 — ApplicationSection 卡片网格用 `gap-3`，与全站 `gap-6` 不一致

**优先级：低**
**位置：** `ApplicationSection.tsx:83`

```tsx
// ApplicationSection 用 gap-3 (12px)
<div className="grid grid-cols-2 lg:grid-cols-3 gap-3">

// 其余所有网格用 gap-6 (24px) 或 gap-4
// HomeContent.tsx:19 → gap-6
// ProductsContent.tsx:56 → gap-4
```

没有充分理由使用更紧密间距，建议统一为 `gap-4`。

---

### 问题 4.3 — 按钮尺寸没有统一规格，全站至少有 5 种不同 padding 组合

**优先级：中**

全站 CTA 按钮 padding 值一览：

| 位置 | Padding |
|------|---------|
| HeroSection CTA, HomeCTA | `px-8 py-3.5` |
| ProductsContent featured | `px-5 py-2.5` |
| HomeContent story btn | `px-6 py-3` |
| ContactContent WhatsApp | `px-5 py-3` |
| Navbar "Get Quote" | `px-5 py-2` |

**改进方案：** 在 `globals.css` 中用 `@layer components` 定义两个通用按钮规格：

```css
@layer components {
  .btn-lg { @apply px-8 py-3.5 text-sm font-semibold transition-all duration-150; }
  .btn-sm { @apply px-5 py-2.5 text-xs font-semibold transition-all duration-150; }
}
```

---

## 5. 交互与动效 (Interaction & Motion)

### 问题 5.1 — ProductOrbit 的暂停功能（pause）静默失效

**优先级：高**
**位置：** `ProductOrbit.tsx:59, 98`

```tsx
// 设置了 data-paused 属性
<motion.svg data-paused={isPaused} animate={{ rotate: 360 }} ...>

// 但 Framer Motion 不会自动响应 data-paused 属性
// 鼠标悬停在轨道节点时，外圈 SVG 继续旋转
// 结果：悬停态下，连接线静止而外圈动，产生明显的视觉冲突
```

**修复方案：**

```tsx
<motion.svg
  animate={isPaused ? { rotate: undefined } : { rotate: 360 }}
  transition={isPaused ? { duration: 0 } : { duration: 36, repeat: Infinity, ease: 'linear' }}
  ...
>
```

---

### 问题 5.2 — 所有按钮仅有 `transition-colors`，缺乏立体感反馈

**优先级：中**
**位置：** 全站所有 `<Link>` 和 `<button>` CTA

工业/精密制造品牌使用零圆角按钮是合理的，但完全没有 hover 的物理感，用户点击时没有任何形变或阴影反馈。

**改进方案：**

```tsx
className="bg-[#f97316] hover:bg-[#ea580c] active:scale-[0.98]
           text-white font-semibold px-8 py-3.5 text-sm transition-all duration-150"
```

---

### 问题 5.3 — FAQSection 展开动画用 `max-height` CSS 过渡，体验不流畅

**优先级：低**
**位置：** `FAQSection.tsx:44`

```tsx
// max-h-96 = 384px，若有长答案会被截断
// CSS max-height 过渡在折叠时感觉"犹豫"
className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96' : 'max-h-0'}`}
```

**改进方案：** 替换为 Framer Motion `AnimatePresence`（全项目已引入）：

```tsx
<AnimatePresence>
  {isOpen && (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: 'auto', opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="overflow-hidden"
    >
      <p className="pb-5 text-gray-500 text-sm leading-relaxed">{faq.a}</p>
    </motion.div>
  )}
</AnimatePresence>
```

---

### 问题 5.4 — ProductOrbit 节点按钮用 `focus:outline-none` 无替代方案

**优先级：中**
**位置：** `ProductOrbit.tsx:96`

```tsx
// 当前：移除了默认 focus ring 但没有提供替代
<button className="absolute focus:outline-none group" ...>
```

键盘用户完全无法感知当前焦点位置，违反 WCAG 2.4.7（Focus Visible）。

**修复方案：**

```tsx
<button className="absolute focus:outline-none focus-visible:ring-2
                   focus-visible:ring-[#f97316] focus-visible:ring-offset-2 group" ...>
```

---

## 6. 整体风格一致性 (Design Consistency)

### 问题 6.1 — Emoji 图标打断工业品牌语言

**优先级：高**
**位置：** `ProductOrbit.tsx:8`, `ProductsContent.tsx:6`

```tsx
const ICONS = ['🏎', '⛳', '✈', '🏭', '🏍', '⚙']           // ProductOrbit
const ICONS = ['🏎', '⛳', '✈', '🏭', '⚙', '🏍', '⚡', '🚲', '🛴', '🌿', '🚛']  // Products
```

网站整体视觉语言是：无圆角、精密线条、工业橙、严肃无衬线排版——这是一个"精密制造商"的品牌。Emoji 图标在不同系统/浏览器上渲染结果完全不可控，风格偏消费级，与 B2B 专业形象严重不符。

`ApplicationSection.tsx` 中已经使用了精心绘制的 SVG 图标（strokeWidth 0.75 的精细线条），这才是正确方向。**将 ProductOrbit 和 ProductsContent 中的 emoji 替换为与之风格一致的 Heroicons 或自定义 SVG。**

---

### 问题 6.2 — "Why Choose Us" 卡片与其他 section 卡片风格不统一

**优先级：低**
**位置：** `HomeContent.tsx:21`

全站共有四种不同的卡片视觉规格：

| 组件 | 卡片样式 |
|------|---------|
| Why Us | `bg-orange-50 border-orange-100 p-8` + 绝对定位大数字 |
| Brand Story timeline | `bg-white border-l-4 border-[#f97316] p-4 shadow-sm` |
| Products featured | `bg-white border-2 border-[#f97316] p-8 shadow-sm` |
| Products rest | `bg-white border border-gray-200 hover:border-[#f97316] p-6` |

建议将 `bg-white + border + hover:border-brand` 作为默认卡片规格，`border-l-4 border-brand` 作为强调型卡片规格，统一全站卡片语言。

---

### 问题 6.3 — 部分 section 居中对齐，部分左对齐，无明确规律

**优先级：低**

| 对齐方式 | Section |
|---------|---------|
| 左对齐 | ApplicationSection、ProductOrbit、Brand Story、ContactContent header |
| 居中对齐 | FAQSection、Why Choose Us、HomeCTA |

页面滚动时视线锚点不断左右漂移。建议设定规则：**全幅背景的 section（橙色/深色）用居中**，**内容型 section 一律左对齐**，保持阅读轴稳定。

---

*审计完成。如需对以上任何一项进行代码修改，可逐项实施。*
