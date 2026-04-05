export interface ScreenOption {
  label: string;
  emoji?: string;
  sublabel?: string;
}

export interface Screen {
  id: number;
  type: 'single-choice' | 'multi-select' | 'likert' | 'text-input' | 'interstitial' | 'results' | 'paywall' | 'email-capture' | 'loading';
  // Question screens
  question?: string;
  subtitle?: string;
  options?: ScreenOption[];
  // Interstitials
  headline?: string;
  body?: string;
  stat?: string;
  statLabel?: string;
  quote?: string;
  ctaLabel?: string;
  // Results
  resultTitle?: string;
  resultScore?: number;
  resultMetrics?: Array<{ label: string; value: string; color?: string }>;
  testimonials?: Array<{ text: string; author: string; stars: number }>;
  // Paywall
  paywallType?: string;
  // Loading
  loadingLines?: string[];
  // Special flags
  autoAdvance?: boolean;
  autoAdvanceDelay?: number;
  progressPercent?: number;
}

export interface Funnel {
  id: string;
  name: string;
  theme: string;
  archetype: string;
  paywallType: string;
  screenCount: number;
  description: string;
  accentColor?: string;
  screens: Screen[];
}

// ============================================================
// FUNNEL A — "What's Your Hidden Outfit Score?" (SmartyMe)
// ============================================================
const funnelA: Funnel = {
  id: 'A',
  name: "What's Your Hidden Outfit Score?",
  theme: 'Hidden Outfit Score',
  archetype: 'The Closet Paralytic',
  paywallType: 'SmartyMe — Countdown Timer + Trial Hybrid',
  screenCount: 27,
  description: 'Quantifies the closet paralysis problem as a "score", then offers a quiz-specific discount with countdown timer.',
  screens: [
    {
      id: 1, type: 'single-choice',
      question: 'Which of these sounds most like you right now?',
      subtitle: 'Get your personalized Hidden Outfit Score in 4 minutes.',
      headline: 'FIND OUT HOW MANY OUTFITS ARE HIDING IN YOUR CLOSET',
      body: 'Built for women who have a full closet and nothing to wear.',
      stat: '147,000+',
      statLabel: 'women have taken this quiz',
      options: [
        { label: 'Full closet, nothing to wear', emoji: '👗' },
        { label: 'Same 5 outfits on rotation', emoji: '🔄' },
        { label: 'Clothes I\'ve never worn', emoji: '🏷️' },
        { label: 'I used to know how to dress', emoji: '🤔' },
      ],
      progressPercent: 0,
    },
    {
      id: 2, type: 'single-choice',
      question: 'How old are you?',
      subtitle: 'Outfit formulas work differently depending on your life stage — we personalize your score based on this.',
      options: [
        { label: 'Under 30' }, { label: '30–39' }, { label: '40–49' }, { label: '50–59' }, { label: '60+' },
      ],
      progressPercent: 8,
    },
    {
      id: 3, type: 'interstitial',
      headline: "You're in good company.",
      body: "73% of women say they have nothing to wear — even with a full closet.\n\nMost assume it's a style problem.\n\nIt isn't.\n\nIt's a visibility problem. And it's fixable.",
      stat: '147,000+',
      statLabel: 'women have taken this quiz and found outfits they didn\'t know they had.',
      ctaLabel: 'Continue →',
      progressPercent: 12,
    },
    {
      id: 4, type: 'single-choice',
      question: 'What does a typical week look like for you?',
      subtitle: 'This helps us understand the kinds of outfits your closet actually needs to produce.',
      options: [
        { label: 'Mostly working from home' },
        { label: 'Mix of office and home' },
        { label: 'In an office or workplace most days' },
        { label: 'Lots of social events and going out' },
        { label: 'Mostly home / retired / not working right now' },
        { label: 'All of the above — my week is chaos' },
      ],
      progressPercent: 17,
    },
    {
      id: 5, type: 'single-choice',
      question: 'When you open your closet in the morning, what usually happens?',
      options: [
        { label: 'I try on 3–5 things and go back to the same ones' },
        { label: 'I know immediately there\'s nothing to wear' },
        { label: 'I stare at it for a while, then give up' },
        { label: 'I have a few things I always reach for and ignore the rest' },
        { label: 'I actually feel pretty good about my options' },
      ],
      progressPercent: 21,
    },
    {
      id: 6, type: 'single-choice',
      question: 'Roughly how much of your wardrobe do you wear regularly?',
      subtitle: '"Regularly" = at least once a month',
      options: [
        { label: 'Almost all of it' },
        { label: 'About half' },
        { label: 'Maybe a third' },
        { label: 'About 20% or less — there\'s a lot I never touch' },
        { label: 'I genuinely don\'t know' },
      ],
      progressPercent: 25,
    },
    {
      id: 7, type: 'interstitial',
      headline: 'Sound familiar?',
      quote: '"I\'d try on 5 things, hate all of them, and end up in the same jeans and a black top. Every. Single. Morning."',
      body: "Here's what's actually happening:\n\nYou're not running out of clothes.\n\nYou're running out of outfits you can see.\n\nThe rest of your closet is invisible — not because the clothes are bad, but because you have no system for putting them together.",
      ctaLabel: 'That\'s exactly it — keep going →',
      progressPercent: 29,
    },
    {
      id: 8, type: 'single-choice',
      question: 'How often do you wear the same outfit combinations?',
      options: [
        { label: 'I rotate the exact same 5–6 combos' },
        { label: 'I have maybe 10–12 combos I cycle through' },
        { label: 'I mix it up — but nothing feels quite right' },
        { label: 'I just grab things and hope for the best' },
        { label: 'I have a solid range — genuinely happy with my variety' },
      ],
      progressPercent: 33,
    },
    {
      id: 9, type: 'single-choice',
      question: 'Do you have clothes in your closet with the tags still on?',
      subtitle: 'Things you bought but never actually wore',
      options: [
        { label: 'Yes — several items' },
        { label: 'Yes — one or two things' },
        { label: 'I\'ve worn everything at least once' },
        { label: 'I have things I bought with good intentions and never touched' },
      ],
      progressPercent: 37,
    },
    {
      id: 10, type: 'likert',
      question: '"I have things in my closet I bought hoping I\'d figure out how to wear them someday."',
      progressPercent: 40,
    },
    {
      id: 11, type: 'likert',
      question: '"Getting dressed in the morning sometimes ruins my mood before my day has even started."',
      progressPercent: 43,
    },
    {
      id: 12, type: 'likert',
      question: '"There are events or occasions I\'ve felt anxious about — partly because I didn\'t know what to wear."',
      progressPercent: 46,
    },
    {
      id: 13, type: 'likert',
      question: '"I\'ve bought new clothes to solve the \'nothing to wear\' feeling — and it didn\'t actually fix it."',
      progressPercent: 50,
    },
    {
      id: 14, type: 'single-choice',
      question: 'In an average week, how much time do you spend dealing with the "nothing to wear" problem?',
      subtitle: 'Include time trying things on, standing at your closet, shopping, or just feeling stuck',
      options: [
        { label: 'Less than 15 minutes' },
        { label: '15–30 minutes' },
        { label: '30 minutes to an hour' },
        { label: 'Over an hour' },
        { label: 'I try not to think about it' },
      ],
      progressPercent: 54,
    },
    {
      id: 15, type: 'single-choice',
      question: 'Have you ever bought something new because you felt like you had nothing to wear — and then barely worn it?',
      options: [
        { label: 'Yes — this happens pretty often' },
        { label: 'Yes — it\'s happened a few times' },
        { label: 'Once or twice, but I\'m aware of it now' },
        { label: 'No — I\'m pretty disciplined about shopping' },
        { label: 'I avoid shopping altogether because of this' },
      ],
      progressPercent: 58,
    },
    {
      id: 16, type: 'multi-select',
      question: 'Which of these frustrations do you recognize?',
      subtitle: 'Select all that apply',
      options: [
        { label: 'Walking out in my "whatever, fine" outfit and feeling bad all day' },
        { label: 'Having a closet full of clothes and still buying the same boring basics' },
        { label: 'Seeing an outfit I love on someone else and knowing it won\'t look the same on me' },
        { label: 'Buying something specifically for one event and never wearing it again' },
        { label: 'Feeling frumpy even when I\'ve made an effort' },
        { label: 'Not knowing how to make what I already own work together' },
        { label: 'Getting compliments on an outfit and having no idea how to recreate it' },
        { label: 'Dreading getting dressed for anything that isn\'t jeans' },
      ],
      progressPercent: 62,
    },
    {
      id: 17, type: 'interstitial',
      headline: "Here's what this adds up to.",
      body: "The average woman spends 120+ hours a year standing at a full closet feeling stuck.\n\nThat's 5 full days.\n\nShe has $2,000 worth of clothes she doesn't wear — not because they're bad, but because she can't see how to put them together.\n\nAnd she still doesn't feel put-together most days.",
      stat: 'This is not a taste problem. This is not a budget problem. This is a visibility problem.',
      ctaLabel: 'I want to fix this →',
      progressPercent: 65,
    },
    {
      id: 18, type: 'interstitial',
      headline: 'Your closet already has the outfits. You just can\'t see them yet.',
      body: "Women who took this quiz with a similar closet profile discovered an average of 47 outfit combinations they didn't know they had.\n\nNot new purchases.\n\nCombinations from what they already own.\n\nThe system that reveals them takes about 10 minutes to set up. After that, it works every day.",
      stat: '47',
      statLabel: 'outfit combinations on average — already in your closet',
      ctaLabel: 'See my score →',
      progressPercent: 69,
    },
    {
      id: 19, type: 'single-choice',
      question: 'What do you miss most about getting dressed?',
      subtitle: 'Pick the one that hits hardest.',
      options: [
        { label: 'Feeling like myself when I walk out the door' },
        { label: 'Getting dressed quickly and feeling confident' },
        { label: 'Actually enjoying the process — it used to be fun' },
        { label: 'Getting compliments and knowing exactly what I was wearing' },
        { label: 'Having a "thing" — a style that felt like me' },
      ],
      progressPercent: 73,
    },
    {
      id: 20, type: 'multi-select',
      question: "Have you tried solving this before?",
      subtitle: 'Select everything you\'ve tried',
      options: [
        { label: 'Pinterest / Instagram for outfit ideas' },
        { label: 'Buying new things hoping they\'d fix it' },
        { label: 'A big closet clean-out' },
        { label: 'Following a "capsule wardrobe" approach (usually works for about 2 weeks)' },
        { label: 'Asking a friend or partner for help' },
        { label: 'Nothing — I\'ve mostly just lived with it' },
        { label: 'A wardrobe app that required me to catalogue everything (abandoned it)' },
      ],
      progressPercent: 77,
    },
    {
      id: 21, type: 'text-input',
      question: "What's your first name?",
      subtitle: 'We use this to personalize your Hidden Outfit Score.',
      ctaLabel: 'Calculate My Score →',
      progressPercent: 81,
    },
    {
      id: 22, type: 'loading',
      headline: "Calculating your Hidden Outfit Score...",
      loadingLines: [
        '✓ Analyzing your closet habits...',
        '✓ Mapping your wardrobe patterns...',
        '✓ Counting your hidden outfit combinations...',
        '✓ Calculating your personalization profile...',
      ],
      autoAdvance: true,
      autoAdvanceDelay: 5000,
      progressPercent: 85,
    },
    {
      id: 23, type: 'results',
      resultTitle: 'Your Hidden Outfit Score',
      resultScore: 47,
      resultMetrics: [
        { label: 'Hidden Outfits', value: '47 combinations', color: '#FF2A6D' },
        { label: 'Wardrobe Used', value: '~23%', color: '#6B6B6B' },
        { label: 'Time Lost Weekly', value: '45 min+', color: '#6B6B6B' },
        { label: 'Potential Savings', value: '$1,200/yr', color: '#FF2A6D' },
      ],
      progressPercent: 100,
    },
    {
      id: 24, type: 'interstitial',
      headline: 'Women just like you. Before and after.',
      testimonials: [
        { text: 'I had a closet stuffed with clothes and got dressed in the same black jeans every single day. I thought I just had bad taste. Turns out I had 60 outfits I\'d never tried. Now I actually look forward to opening my closet.', author: 'Sarah M., 42, Marketing Director', stars: 5 },
        { text: 'I spent years feeling frumpy even when I made an effort. What changed wasn\'t buying new things — it was finally understanding which pieces I already owned actually worked together. I feel like myself again for the first time in years.', author: 'Jen K., 38, mom of two', stars: 5 },
        { text: 'I was about to do a massive haul because I was convinced I just didn\'t have the right clothes. The quiz showed me I had a full wardrobe I wasn\'t using. I haven\'t bought anything new in three months and I\'ve gotten more compliments than ever.', author: 'Diane R., 51, teacher', stars: 5 },
      ],
      ctaLabel: 'Unlock my outfits →',
      progressPercent: 100,
    },
    {
      id: 25, type: 'email-capture',
      headline: 'YOUR OUTFIT FORMULA PLAN IS BEING PREPARED',
      question: 'Where should we send your outfit formula guide?',
      body: "We'll also send you a summary of your Hidden Outfit Score and the 3 fastest outfit formulas to try this week — from what you already own.",
      ctaLabel: 'Send my guide →',
      progressPercent: 100,
    },
    {
      id: 26, type: 'paywall',
      paywallType: 'SmartyMe',
      progressPercent: 100,
    },
  ],
};

// ============================================================
// FUNNEL B — "Complete Style Assessment" (Unimeal)
// ============================================================
const funnelB: Funnel = {
  id: 'B',
  name: 'Complete Style Assessment',
  theme: 'Body-Forward Style Assessment',
  archetype: 'The Weight Waiter',
  paywallType: 'Unimeal — Email Gate → Savings Graph → Sunk Cost',
  screenCount: 37,
  description: 'No visible paywall in quiz. Email capture then separate "your plan is ready" page with savings projection graph.',
  screens: [
    {
      id: 1, type: 'single-choice',
      headline: 'COMPLETE YOUR STYLE ASSESSMENT',
      question: "What's going on with your style right now?",
      subtitle: 'Be honest — this is just between us.',
      options: [
        { label: 'I\'m waiting to lose weight before I deal with my wardrobe', emoji: '⏳' },
        { label: 'My body changed and my clothes don\'t fit the same way', emoji: '👚' },
        { label: 'I gave up on style somewhere along the way', emoji: '🤷' },
        { label: 'I look fine but never feel like myself', emoji: '😐' },
      ],
      progressPercent: 0,
    },
    {
      id: 2, type: 'single-choice',
      question: 'How old are you?',
      options: [
        { label: 'Under 30' }, { label: '30–39' }, { label: '40–49' }, { label: '50–59' }, { label: '60+' },
      ],
      progressPercent: 8,
    },
    {
      id: 3, type: 'single-choice',
      question: 'Has your body changed significantly in the last 2–3 years?',
      options: [
        { label: 'Yes — gained weight' },
        { label: 'Yes — lost weight' },
        { label: 'Yes — pregnancy / postpartum' },
        { label: 'Yes — menopause / hormonal changes' },
        { label: 'Not dramatically — but it feels different' },
        { label: 'No — about the same' },
      ],
      progressPercent: 11,
    },
    {
      id: 4, type: 'interstitial',
      headline: "You're not alone.",
      body: "71% of women say their relationship with getting dressed changed after a significant body or life change.\n\nNot because they lost their style.\n\nBecause they lost permission to care about it.",
      stat: '71%',
      statLabel: 'of women say their style confidence dropped after a life change',
      ctaLabel: 'That\'s me → Continue',
      progressPercent: 15,
    },
    {
      id: 5, type: 'single-choice',
      question: 'What does your current wardrobe look like?',
      options: [
        { label: 'Mostly things that fit from before the change' },
        { label: 'A mix — some fit, some don\'t' },
        { label: 'I bought things for this body but nothing feels right' },
        { label: 'Mostly basics and things that hide everything' },
        { label: 'I avoid clothes shopping entirely right now' },
      ],
      progressPercent: 19,
    },
    {
      id: 6, type: 'single-choice',
      question: 'What section does your closet have the most of?',
      options: [
        { label: 'Stretchy, comfortable basics' },
        { label: 'Things I wore before that I can\'t bring myself to donate' },
        { label: 'Clothes I bought "hoping" they\'d become my new style' },
        { label: 'A range of sizes I cycle through' },
        { label: 'Honestly, I don\'t know — it\'s chaos' },
      ],
      progressPercent: 22,
    },
    {
      id: 7, type: 'single-choice',
      question: 'Do you have a "hope section" in your closet — clothes you keep for when you lose the weight?',
      options: [
        { label: 'Yes — quite a few items' },
        { label: 'Yes — a few things' },
        { label: 'I used to. I finally got rid of it.' },
        { label: 'No — I try to dress for my body now' },
      ],
      progressPercent: 26,
    },
    {
      id: 8, type: 'single-choice',
      question: 'How would you describe your current shopping habits?',
      options: [
        { label: 'I buy the same comfortable things over and over' },
        { label: 'I buy things that look good on the hanger and don\'t wear them' },
        { label: 'I avoid shopping because it\'s too demoralizing' },
        { label: 'I buy things online and return most of them' },
        { label: 'I\'m pretty mindful — I just can\'t seem to make things work' },
      ],
      progressPercent: 30,
    },
    {
      id: 9, type: 'single-choice',
      question: 'When was the last time you felt genuinely good getting dressed?',
      options: [
        { label: 'Within the last month' },
        { label: 'A few months ago' },
        { label: 'More than a year ago' },
        { label: 'Honestly... I can\'t remember' },
        { label: 'I have occasional good moments, but they\'re rare' },
      ],
      progressPercent: 33,
    },
    {
      id: 10, type: 'interstitial',
      headline: 'We see this pattern all the time.',
      quote: '"I keep telling myself I\'ll sort out my wardrobe once I lose the weight. But the weight isn\'t going anywhere and I\'m running out of mornings where I feel okay."',
      body: "The waiting loop is real. And incredibly common.\n\nThe problem isn't your body. The problem is that nobody ever showed you how to dress the body you're in, right now, in a way that actually feels good.",
      ctaLabel: 'Keep going →',
      progressPercent: 37,
    },
    {
      id: 11, type: 'single-choice',
      question: 'Have you been waiting to "deal with" your style until something changes?',
      options: [
        { label: 'Yes — until I lose the weight' },
        { label: 'Yes — until my body feels more "normal"' },
        { label: 'Yes — until I have more money for new clothes' },
        { label: 'Yes — in a general "I\'ll figure it out eventually" way' },
        { label: 'Not exactly — I just don\'t know where to start' },
      ],
      progressPercent: 41,
    },
    {
      id: 12, type: 'single-choice',
      question: 'How long have you been in this "waiting" mode?',
      options: [
        { label: 'A few months' },
        { label: 'About a year' },
        { label: '2–3 years' },
        { label: 'More than 3 years' },
        { label: 'I\'m not sure — it crept up on me' },
      ],
      progressPercent: 44,
    },
    {
      id: 13, type: 'likert',
      question: '"My weight right now makes me feel like I don\'t deserve to invest in my wardrobe."',
      progressPercent: 48,
    },
    {
      id: 14, type: 'likert',
      question: '"The time and money I\'ve spent on trying to fix this makes me feel guilty."',
      progressPercent: 52,
    },
    {
      id: 15, type: 'likert',
      question: '"I feel frumpy most days, even when I\'ve made an effort."',
      progressPercent: 55,
    },
    {
      id: 16, type: 'likert',
      question: '"I feel invisible in social situations — like I\'ve stopped being seen."',
      progressPercent: 59,
    },
    {
      id: 17, type: 'interstitial',
      headline: 'Here\'s what the waiting is actually costing you.',
      body: "Every morning in the wrong clothes is a morning where your confidence takes a hit before you've even had coffee.\n\nEvery event you dreaded because you didn't know what to wear. Every photo you avoided. Every compliment you deflected.\n\nIt adds up. And you deserve better than this.",
      ctaLabel: 'I\'m ready to change this →',
      progressPercent: 63,
    },
    {
      id: 18, type: 'multi-select',
      question: 'What has the "nothing to wear" feeling cost you?',
      subtitle: 'Select everything that applies',
      options: [
        { label: 'Confidence in professional situations' },
        { label: 'Enjoying social events' },
        { label: 'Taking photos or being photographed' },
        { label: 'Dating or feeling attractive to a partner' },
        { label: 'My mood for entire days' },
        { label: 'Money spent on clothes that didn\'t work' },
        { label: 'Time I\'ll never get back' },
      ],
      progressPercent: 67,
    },
    {
      id: 19, type: 'single-choice',
      question: 'What would change if you woke up tomorrow and knew exactly what to wear?',
      options: [
        { label: 'I\'d feel more like myself' },
        { label: 'I\'d be more confident at work' },
        { label: 'I\'d stop dreading mornings' },
        { label: 'I\'d feel better in social situations' },
        { label: 'I\'d stop spending money on things that don\'t work' },
      ],
      progressPercent: 71,
    },
    {
      id: 20, type: 'single-choice',
      question: 'What kind of outfits does your life actually require right now?',
      options: [
        { label: 'Casual everyday — errands, school runs, working from home' },
        { label: 'Smart casual — office, meetings, lunches out' },
        { label: 'A mix of both' },
        { label: 'I need to look put-together for my job' },
        { label: 'Honestly — just something that doesn\'t make me feel bad' },
      ],
      progressPercent: 74,
    },
    {
      id: 21, type: 'multi-select',
      question: 'What colors do you currently reach for most?',
      subtitle: 'Select all that apply',
      options: [
        { label: 'Black — always black' },
        { label: 'Neutrals (grey, white, cream, beige)' },
        { label: 'Darker colors that feel "safer"' },
        { label: 'Navy, olive, burgundy — classic but not black' },
        { label: 'I used to wear more color but stopped' },
        { label: 'Whatever doesn\'t need ironing' },
      ],
      progressPercent: 78,
    },
    {
      id: 22, type: 'single-choice',
      question: 'Roughly how many items are in your wardrobe right now?',
      options: [
        { label: 'Under 30 items' },
        { label: '30–60 items' },
        { label: '60–100 items' },
        { label: '100+ items' },
        { label: 'More than I\'d like to admit' },
      ],
      progressPercent: 81,
    },
    {
      id: 23, type: 'multi-select',
      question: "What have you already tried?",
      subtitle: 'Select all that apply',
      options: [
        { label: 'Buying new things and hoping they\'d feel right' },
        { label: 'Following a capsule wardrobe guide online' },
        { label: 'A big sort-out (and it went back to chaos in a week)' },
        { label: 'Asking for help from friends or family' },
        { label: 'A personal stylist (expensive, didn\'t stick)' },
        { label: 'Nothing — I haven\'t known where to start' },
      ],
      progressPercent: 84,
    },
    {
      id: 24, type: 'single-choice',
      question: 'How do you want to feel when you get dressed?',
      options: [
        { label: 'Like myself — confident, recognizable, me' },
        { label: 'Put-together — professional, clean, intentional' },
        { label: 'Comfortable and still like I made an effort' },
        { label: 'Attractive — to myself and to others' },
        { label: 'Free — I want getting dressed to stop being a problem' },
      ],
      progressPercent: 88,
    },
    {
      id: 25, type: 'single-choice',
      question: "If you had your perfect wardrobe today — right now, in this body — what would be different?",
      options: [
        { label: 'I\'d stop hiding' },
        { label: 'I\'d say yes to things I\'ve been avoiding' },
        { label: 'I\'d stop wasting money on things that don\'t work' },
        { label: 'I\'d feel like the person I actually am inside' },
        { label: 'All of the above — honestly' },
      ],
      progressPercent: 91,
    },
    {
      id: 26, type: 'text-input',
      question: "What's your first name?",
      subtitle: 'We personalize your Style Assessment Plan based on your answers.',
      ctaLabel: 'Complete My Assessment →',
      progressPercent: 94,
    },
    {
      id: 27, type: 'loading',
      headline: "Building your Style Assessment Plan...",
      loadingLines: [
        '✓ Analyzing your current wardrobe situation...',
        '✓ Building your personalized outfit formulas...',
        '✓ Calculating your style timeline...',
        '✓ Preparing your transformation plan...',
      ],
      autoAdvance: true,
      autoAdvanceDelay: 5000,
      progressPercent: 97,
    },
    {
      id: 28, type: 'results',
      resultTitle: 'Your Style Assessment is Ready',
      resultMetrics: [
        { label: 'Your Style Type', value: 'The Body-Forward Dresser', color: '#FF2A6D' },
        { label: 'Outfit Potential', value: '60+ combinations', color: '#FF2A6D' },
        { label: 'Wardrobe Utilization', value: '~18%', color: '#6B6B6B' },
        { label: 'Time to Transform', value: '2 weeks', color: '#6B6B6B' },
      ],
      progressPercent: 100,
    },
    {
      id: 29, type: 'email-capture',
      headline: 'YOUR STYLE PLAN IS READY',
      question: 'Where should we send your personalized style assessment?',
      body: "Your plan includes the exact outfit formulas for your body, your wardrobe, and your life right now — no waiting required.",
      ctaLabel: 'Send my plan →',
      progressPercent: 100,
    },
    {
      id: 30, type: 'paywall',
      paywallType: 'Unimeal',
      progressPercent: 100,
    },
  ],
};

// ============================================================
// FUNNEL C — "Discover Your Style Identity" (Parenting Leader)
// ============================================================
const funnelC: Funnel = {
  id: 'C',
  name: 'Discover Your Style Identity',
  theme: 'Style Identity Discovery',
  archetype: 'The Mom Ghost',
  paywallType: 'Parenting Leader — Trust Badges + Email Gate + "Surprise Gift"',
  screenCount: 22,
  description: 'Trust badges dominate. Email gate with "surprise gift" free guide. Institutional authority builds confidence.',
  screens: [
    {
      id: 1, type: 'single-choice',
      headline: 'DISCOVER YOUR STYLE IDENTITY',
      question: 'Which moment do you recognize most?',
      subtitle: '22,000+ women have rediscovered their style with this quiz.',
      options: [
        { label: 'I used to have a style. I don\'t know where she went.', emoji: '👻' },
        { label: 'I get dressed for everyone else. Never for me.', emoji: '🤱' },
        { label: 'I look in the mirror and don\'t recognize myself.', emoji: '🪞' },
        { label: 'I want to care about how I look, but I feel guilty about it.', emoji: '💭' },
      ],
      progressPercent: 0,
    },
    {
      id: 2, type: 'single-choice',
      question: 'How old are you?',
      options: [
        { label: 'Under 30' }, { label: '30–39' }, { label: '40–49' }, { label: '50–59' }, { label: '60+' },
      ],
      progressPercent: 9,
    },
    {
      id: 3, type: 'single-choice',
      question: 'What best describes your life stage right now?',
      options: [
        { label: 'Young children at home (under 10)' },
        { label: 'Older children / teens' },
        { label: 'Kids have left — adjusting to new chapter' },
        { label: 'No children — just lost myself somewhere else' },
        { label: 'Career transition or major life change' },
      ],
      progressPercent: 14,
    },
    {
      id: 4, type: 'interstitial',
      headline: "You didn't lose your style.",
      body: "You prioritized everyone else for so long that you forgot permission was still yours.\n\nThe woman who used to love getting dressed? She's still there. She just hasn't been given space lately.",
      stat: '83%',
      statLabel: 'of moms say they\'ve lost their sense of personal style in the last 3 years',
      ctaLabel: 'That\'s me →',
      progressPercent: 18,
    },
    {
      id: 5, type: 'single-choice',
      question: 'Before this chapter of your life, how would you have described your style?',
      options: [
        { label: 'Put-together and intentional' },
        { label: 'Fun and experimental' },
        { label: 'Classic and reliable' },
        { label: 'Effortless — I just knew what to grab' },
        { label: 'Still figuring it out, but I enjoyed the process' },
      ],
      progressPercent: 23,
    },
    {
      id: 6, type: 'single-choice',
      question: 'What does your current daily wardrobe look like?',
      options: [
        { label: 'Whatever is clean and doesn\'t need ironing' },
        { label: 'The same rotation of comfortable standbys' },
        { label: 'Half for "school run / home", half that sit unworn' },
        { label: 'Professional things I keep separate from "real life"' },
        { label: 'I buy for the children. I buy nothing for me.' },
      ],
      progressPercent: 27,
    },
    {
      id: 7, type: 'likert',
      question: '"Wanting to look good feels selfish when there are more important things to worry about."',
      progressPercent: 32,
    },
    {
      id: 8, type: 'likert',
      question: '"I feel invisible in social situations — like I\'ve faded from the room."',
      progressPercent: 36,
    },
    {
      id: 9, type: 'interstitial',
      headline: 'Wanting this isn\'t shallow.',
      body: "Feeling good in your clothes isn't vanity.\n\nIt's one of the most direct connections between your outside world and how you feel about yourself inside.\n\nYou've given permission to everyone else. This quiz is about giving it back to you.",
      ctaLabel: 'I needed to hear that →',
      progressPercent: 41,
    },
    {
      id: 10, type: 'single-choice',
      question: 'What do you actually need from your wardrobe day-to-day?',
      options: [
        { label: 'School runs + working from home' },
        { label: 'Mostly practical — errands, pick-ups, appointments' },
        { label: 'A mix of casual and work/social occasions' },
        { label: 'Professional / office — plus a life outside it' },
        { label: 'I genuinely don\'t know anymore' },
      ],
      progressPercent: 45,
    },
    {
      id: 11, type: 'multi-select',
      question: 'What stops you from dressing more like yourself?',
      subtitle: 'Select all that apply',
      options: [
        { label: 'I don\'t have time to think about it' },
        { label: 'I\'ve lost the confidence to try' },
        { label: 'Nothing feels right on my post-baby/changed body' },
        { label: 'I don\'t even know what "my style" is anymore' },
        { label: 'I feel guilty spending money on myself' },
        { label: 'I don\'t want to stand out — I just blend in' },
        { label: 'I don\'t know where to start' },
      ],
      progressPercent: 50,
    },
    {
      id: 12, type: 'single-choice',
      question: 'When you imagine feeling great in your clothes again, what does that feel like?',
      options: [
        { label: 'Confident — like a version of me I recognise' },
        { label: 'Free — like I\'m not hiding anymore' },
        { label: 'Present — actually there in the room instead of wishing I was thinner' },
        { label: 'Like myself — not "mum" or "wife" or "colleague" — me' },
        { label: 'Honestly? I\'d forgotten what that felt like. But I want it back.' },
      ],
      progressPercent: 55,
    },
    {
      id: 13, type: 'single-choice',
      question: 'What would make the biggest difference to your mornings?',
      options: [
        { label: 'Knowing what works before I open the closet' },
        { label: 'Not trying on 5 things and hating them all' },
        { label: 'A wardrobe that actually fits my real daily life' },
        { label: 'Feeling like the clothes are for me, not just functional' },
        { label: 'All of the above, honestly' },
      ],
      progressPercent: 59,
    },
    {
      id: 14, type: 'multi-select',
      question: "What's your style identity right now?",
      subtitle: 'Pick all that feel true',
      options: [
        { label: 'I\'m dressing for the body I used to have' },
        { label: 'I\'m dressing for safety — nothing too noticed' },
        { label: 'I dress for function — zero thought about how it looks' },
        { label: 'I sometimes try, but give up when nothing works' },
        { label: 'I have a few pieces I love but can\'t build outfits around them' },
      ],
      progressPercent: 64,
    },
    {
      id: 15, type: 'text-input',
      question: "What's your first name?",
      subtitle: 'We use this to personalize your Style Identity Profile.',
      ctaLabel: 'Reveal My Style Identity →',
      progressPercent: 73,
    },
    {
      id: 16, type: 'loading',
      headline: "Building your Style Identity Profile...",
      loadingLines: [
        '✓ Identifying your core style archetype...',
        '✓ Mapping your lifestyle and wardrobe needs...',
        '✓ Building your personalized outfit formulas...',
        '✓ Preparing your Style Identity Report...',
      ],
      autoAdvance: true,
      autoAdvanceDelay: 5000,
      progressPercent: 82,
    },
    {
      id: 17, type: 'results',
      resultTitle: 'Your Style Identity',
      resultScore: 78,
      resultMetrics: [
        { label: 'Your Archetype', value: 'The Reclaimer', color: '#FF2A6D' },
        { label: 'Outfit Potential', value: '54 combinations', color: '#FF2A6D' },
        { label: 'Confidence Unlock', value: 'High potential', color: '#6B6B6B' },
        { label: 'Plan Duration', value: '14 days', color: '#6B6B6B' },
      ],
      progressPercent: 100,
    },
    {
      id: 18, type: 'email-capture',
      headline: '🎁 YOUR FREE STYLE IDENTITY GUIDE IS WAITING',
      question: 'Where should we send your personalized Style Identity Guide?',
      body: "Includes your full archetype profile, 5 outfit formulas built for your life right now, and a quick-start morning routine.",
      ctaLabel: 'Claim my free guide →',
      progressPercent: 100,
    },
    {
      id: 19, type: 'paywall',
      paywallType: 'ParentingLeader',
      progressPercent: 100,
    },
  ],
};

// ============================================================
// FUNNEL D — "Your Style Results Are Ready" (Nerva)
// ============================================================
const funnelD: Funnel = {
  id: 'D',
  name: 'Your Style Results Are Ready',
  theme: 'Clinical Authority & Expert Panel',
  archetype: 'The Mom Ghost (Authority Trust)',
  paywallType: 'Nerva — Expert Panel + Results Date + Free 7-Day Trial',
  screenCount: 26,
  description: 'Clinical authority feel. Expert panel with photos. "Results Date" prominently displayed. Free 7-day trial.',
  screens: [
    {
      id: 1, type: 'single-choice',
      headline: 'STYLE ASSESSMENT',
      question: 'What best describes your current relationship with getting dressed?',
      subtitle: 'Created by professional stylists. Trusted by 85,000+ women.',
      options: [
        { label: 'I avoid thinking about it', emoji: '🙈' },
        { label: 'I manage but rarely feel great', emoji: '😐' },
        { label: 'I used to be good at this, now I\'m not', emoji: '📉' },
        { label: 'I want to feel like myself again', emoji: '✨' },
      ],
      progressPercent: 0,
    },
    {
      id: 2, type: 'single-choice',
      question: 'Your age range?',
      options: [
        { label: 'Under 30' }, { label: '30–39' }, { label: '40–49' }, { label: '50–59' }, { label: '60+' },
      ],
      progressPercent: 8,
    },
    {
      id: 3, type: 'single-choice',
      question: 'What changed your relationship with style?',
      options: [
        { label: 'Having children' },
        { label: 'Body changes (weight, menopause, aging)' },
        { label: 'A relationship change (divorce, bereavement, breakup)' },
        { label: 'Career change or life transition' },
        { label: 'It crept up slowly — no single event' },
      ],
      progressPercent: 12,
    },
    {
      id: 4, type: 'interstitial',
      headline: 'This is backed by research.',
      body: "A 2023 study found that women who feel good in their clothes report 34% higher confidence in professional settings and 28% higher satisfaction in social situations.\n\nThis isn't trivial. The way you dress directly affects how you show up — in every area of your life.",
      stat: '34%',
      statLabel: 'higher confidence reported in professional settings',
      ctaLabel: 'I understand — continue →',
      progressPercent: 16,
    },
    {
      id: 5, type: 'single-choice',
      question: 'How would you rate your current level of style confidence?',
      options: [
        { label: '1 — I actively avoid thinking about how I look' },
        { label: '2 — I manage but rarely feel put-together' },
        { label: '3 — Some good days, some not' },
        { label: '4 — Usually okay, but missing something' },
        { label: '5 — Generally confident but want to improve' },
      ],
      progressPercent: 20,
    },
    {
      id: 6, type: 'single-choice',
      question: 'What is your primary style challenge?',
      options: [
        { label: 'I don\'t know what suits my current body' },
        { label: 'I have clothes but can\'t put outfits together' },
        { label: 'My lifestyle changed and my wardrobe didn\'t' },
        { label: 'I dress for function only — I\'ve given up on style' },
        { label: 'I overthink every choice and end up with nothing' },
      ],
      progressPercent: 24,
    },
    {
      id: 7, type: 'likert',
      question: '"I know what I like when I see it on others, but can\'t recreate it for myself."',
      progressPercent: 28,
    },
    {
      id: 8, type: 'likert',
      question: '"I feel more confident and capable when I\'m dressed well."',
      progressPercent: 32,
    },
    {
      id: 9, type: 'likert',
      question: '"Getting dressed in the morning takes more mental energy than it should."',
      progressPercent: 36,
    },
    {
      id: 10, type: 'single-choice',
      question: 'What is your typical morning getting-dressed time?',
      options: [
        { label: 'Under 5 minutes (grab and go)' },
        { label: '5–10 minutes' },
        { label: '10–20 minutes' },
        { label: '20+ minutes (significant effort)' },
        { label: 'It varies — some mornings are chaos' },
      ],
      progressPercent: 40,
    },
    {
      id: 11, type: 'multi-select',
      question: 'Which of these have you experienced in the last month?',
      subtitle: 'Select all that apply',
      options: [
        { label: 'Arrived at an event feeling underdressed or overdressed' },
        { label: 'Avoided a social situation partly due to wardrobe anxiety' },
        { label: 'Bought something that didn\'t work with anything I own' },
        { label: 'Worn something that made me feel invisible' },
        { label: 'Spent over 15 minutes getting dressed and still felt wrong' },
      ],
      progressPercent: 44,
    },
    {
      id: 12, type: 'interstitial',
      headline: 'Our clinical approach.',
      body: "Outfit Formulas was built with a team of professional stylists, behavioral psychologists, and wardrobe strategists.\n\nOur method isn't about trends or shopping. It's about understanding your existing wardrobe and building a formula that works every day.\n\nThe approach has been validated with 85,000+ women across 47 countries.",
      stat: '85,000+',
      statLabel: 'women have completed the program',
      ctaLabel: 'I\'m interested — continue',
      progressPercent: 48,
    },
    {
      id: 13, type: 'single-choice',
      question: 'What would success look like for you?',
      options: [
        { label: 'Getting dressed in under 10 minutes and feeling great' },
        { label: 'Not thinking about what to wear — just knowing' },
        { label: 'Feeling confident in photos and at events' },
        { label: 'Wearing all of my wardrobe, not just 20% of it' },
        { label: 'Feeling like the person I actually am inside' },
      ],
      progressPercent: 52,
    },
    {
      id: 14, type: 'multi-select',
      question: 'What is your lifestyle?',
      subtitle: 'Select all relevant contexts',
      options: [
        { label: 'Work from home primarily' },
        { label: 'Office environment (3+ days/week)' },
        { label: 'Active parent (school runs, activities)' },
        { label: 'Regular social events / evenings out' },
        { label: 'Fitness / active lifestyle' },
        { label: 'Business travel' },
      ],
      progressPercent: 56,
    },
    {
      id: 15, type: 'single-choice',
      question: 'How many items are in your current wardrobe?',
      options: [
        { label: 'Minimal — under 40 items' },
        { label: 'Medium — 40–80 items' },
        { label: 'Large — 80–150 items' },
        { label: 'Very large — 150+ items' },
        { label: 'I honestly don\'t know' },
      ],
      progressPercent: 60,
    },
    {
      id: 16, type: 'text-input',
      question: "What's your first name?",
      subtitle: 'Your results will be personalized based on your answers.',
      ctaLabel: 'Generate My Style Results →',
      progressPercent: 72,
    },
    {
      id: 17, type: 'loading',
      headline: "Generating your Style Results...",
      loadingLines: [
        '✓ Cross-referencing your style profile...',
        '✓ Matching your archetype data...',
        '✓ Building your personalized formula set...',
        '✓ Calculating your results date...',
      ],
      autoAdvance: true,
      autoAdvanceDelay: 5000,
      progressPercent: 82,
    },
    {
      id: 18, type: 'results',
      resultTitle: 'Your Style Results',
      resultMetrics: [
        { label: 'Style Archetype', value: 'The Authority Dresser', color: '#FF2A6D' },
        { label: 'Outfit Potential', value: '52+ combinations', color: '#FF2A6D' },
        { label: 'Results Date', value: '21 days from today', color: '#6B6B6B' },
        { label: 'Confidence Projection', value: '+34% in 3 weeks', color: '#6B6B6B' },
      ],
      progressPercent: 100,
    },
    {
      id: 19, type: 'paywall',
      paywallType: 'Nerva',
      progressPercent: 100,
    },
  ],
};

// ============================================================
// FUNNEL E — "Find Your Formula" (Hypnozio)
// ============================================================
const funnelE: Funnel = {
  id: 'E',
  name: 'Find Your Formula',
  theme: 'Style Formula Discovery',
  archetype: 'The Style Relic',
  paywallType: 'Hypnozio — NO Free Trial, 3 Duration Plans, Conditional Guarantee',
  screenCount: 28,
  description: 'No free trial. 3 duration plans with struck prices. Pre-selected "Most Popular" 6-month plan. Conditional guarantee.',
  screens: [
    {
      id: 1, type: 'single-choice',
      headline: 'FIND YOUR FORMULA',
      question: 'Which of these sounds most like your story?',
      options: [
        { label: 'I used to have great style. I lost it somewhere.', emoji: '⏮️' },
        { label: 'I gave up after a big life change', emoji: '🔄' },
        { label: 'I keep trying to recreate who I was', emoji: '🔁' },
        { label: 'I want to come back — I just don\'t know where to start', emoji: '🚪' },
      ],
      progressPercent: 0,
    },
    {
      id: 2, type: 'single-choice',
      question: 'When did you feel most like yourself, style-wise?',
      options: [
        { label: 'In my 20s — before everything got complicated' },
        { label: 'Before kids / a major relationship change' },
        { label: 'Before a career shift swallowed everything' },
        { label: 'Honestly, it\'s been so long I can barely remember' },
        { label: 'There was a version of me I really loved. She\'s gone.' },
      ],
      progressPercent: 7,
    },
    {
      id: 3, type: 'interstitial',
      headline: 'She\'s not gone. She\'s just been waiting.',
      body: "The version of you who got dressed with intention and felt it — she didn\'t disappear. She got buried under years of \'good enough\' and \'I\'ll deal with it later\'.\n\nThis quiz is about finding her again. Not by going back — but by coming forward.",
      ctaLabel: 'I\'m ready →',
      progressPercent: 11,
    },
    {
      id: 4, type: 'single-choice',
      question: 'What happened to your style?',
      options: [
        { label: 'Life got busy and it fell off the priority list' },
        { label: 'My body changed and nothing fit the same way' },
        { label: 'I stopped knowing what was "me"' },
        { label: 'I started dressing for function only' },
        { label: 'I lost confidence after a relationship ended' },
      ],
      progressPercent: 14,
    },
    {
      id: 5, type: 'single-choice',
      question: 'What\'s still in your wardrobe from "before"?',
      options: [
        { label: 'Things I loved that no longer feel right' },
        { label: 'Things I keep hoping I\'ll fit back into' },
        { label: 'Things I don\'t know how to wear anymore' },
        { label: 'Almost nothing — I started over (but it\'s not working)' },
        { label: 'A mixture of old and new, none of it cohesive' },
      ],
      progressPercent: 18,
    },
    {
      id: 6, type: 'likert',
      question: '"I feel like I\'m wearing the wrong woman\'s clothes."',
      progressPercent: 21,
    },
    {
      id: 7, type: 'likert',
      question: '"I\'ve stopped experimenting with style because I\'ve been burned too many times."',
      progressPercent: 25,
    },
    {
      id: 8, type: 'likert',
      question: '"I miss the version of me who knew how to put an outfit together."',
      progressPercent: 29,
    },
    {
      id: 9, type: 'interstitial',
      headline: 'Grief is the right word.',
      body: "Losing your style isn\'t trivial. When you had it — that feeling of walking out the door and knowing you looked like yourself — it was a real, daily source of confidence.\n\nThe loss of that is real.\n\nAnd it\'s fixable. Not by going back. By building something new with what you know now.",
      ctaLabel: 'Show me how →',
      progressPercent: 32,
    },
    {
      id: 10, type: 'single-choice',
      question: 'What do you still remember about your old style?',
      options: [
        { label: 'I had a signature look people recognised' },
        { label: 'I knew what worked for my body' },
        { label: 'Getting dressed was enjoyable, not stressful' },
        { label: 'I wore color and took risks' },
        { label: 'I just felt put-together, even in simple things' },
      ],
      progressPercent: 36,
    },
    {
      id: 11, type: 'multi-select',
      question: 'What describes your current wardrobe?',
      subtitle: 'Select all that apply',
      options: [
        { label: 'Lots of black and neutral — playing it safe' },
        { label: 'A "before" section I still can\'t bring myself to clear out' },
        { label: 'Things that are fine but not really me' },
        { label: 'A graveyard of failed purchases' },
        { label: 'A few pieces I love surrounded by things I never wear' },
      ],
      progressPercent: 39,
    },
    {
      id: 12, type: 'single-choice',
      question: 'What does your life actually need from your wardrobe now?',
      options: [
        { label: 'Casual everyday — comfortable but intentional' },
        { label: 'Smart casual for work and social' },
        { label: 'Mostly professional with occasional casual' },
        { label: 'A mix of everything — my life has changed' },
        { label: 'I need to rebuild from scratch, honestly' },
      ],
      progressPercent: 43,
    },
    {
      id: 13, type: 'single-choice',
      question: 'What colors do you reach for now vs. what you used to wear?',
      options: [
        { label: 'I play it safe now — all black, grey, navy' },
        { label: 'I used to wear color. I stopped after a bad experience.' },
        { label: 'I dress in things that don\'t draw attention' },
        { label: 'I still try color sometimes but don\'t know what works' },
        { label: 'My palette hasn\'t changed — I just don\'t know how to build outfits' },
      ],
      progressPercent: 46,
    },
    {
      id: 14, type: 'multi-select',
      question: 'What have you tried to get your style back?',
      subtitle: 'Select all that apply',
      options: [
        { label: 'Shopping sprees (usually regret them)' },
        { label: 'Capsule wardrobe guides (never stuck)' },
        { label: 'Following fashion influencers (doesn\'t translate)' },
        { label: 'A personal shopper or stylist (expensive)' },
        { label: 'Just accepting this is who I am now' },
        { label: 'Nothing — I haven\'t known where to start' },
      ],
      progressPercent: 50,
    },
    {
      id: 15, type: 'interstitial',
      headline: 'Here\'s why those approaches failed.',
      body: "Capsule wardrobes require starting from scratch. Personal stylists know their aesthetic, not yours.\n\nTrend-following works if you want to look like someone else. Outfit Formulas works because it\'s built entirely around what you already own and who you actually are.\n\nThe formula isn\'t borrowed from anyone else. It\'s extracted from your own wardrobe.",
      ctaLabel: 'That makes sense →',
      progressPercent: 54,
    },
    {
      id: 16, type: 'single-choice',
      question: 'How do you want to feel when you\'re dressed?',
      options: [
        { label: 'Recognisable — like the real version of me' },
        { label: 'Confident without needing compliments' },
        { label: 'Intentional — like I got dressed on purpose' },
        { label: 'Comfortable AND stylish — not one or the other' },
        { label: 'Like someone who has it together' },
      ],
      progressPercent: 57,
    },
    {
      id: 17, type: 'single-choice',
      question: 'What would feel different first?',
      options: [
        { label: 'My mornings — I\'d stop dreading them' },
        { label: 'My confidence in the mirror' },
        { label: 'How I show up in photos' },
        { label: 'How I feel at work / in professional situations' },
        { label: 'My sense of identity — I\'d feel like myself again' },
      ],
      progressPercent: 61,
    },
    {
      id: 18, type: 'text-input',
      question: "What's your first name?",
      subtitle: 'We personalize your Style Formula based on your answers.',
      ctaLabel: 'Find My Formula →',
      progressPercent: 71,
    },
    {
      id: 19, type: 'loading',
      headline: "Finding your Style Formula...",
      loadingLines: [
        '✓ Analyzing your style history and preferences...',
        '✓ Mapping your current wardrobe potential...',
        '✓ Building your personalized Formula...',
        '✓ Preparing your comeback plan...',
      ],
      autoAdvance: true,
      autoAdvanceDelay: 5000,
      progressPercent: 79,
    },
    {
      id: 20, type: 'results',
      resultTitle: 'Your Style Formula',
      resultMetrics: [
        { label: 'Your Formula Type', value: 'The Comeback Dresser', color: '#FF2A6D' },
        { label: 'Hidden Outfits', value: '43 combinations', color: '#FF2A6D' },
        { label: 'Formula', value: 'Core 3 + Anchors', color: '#6B6B6B' },
        { label: 'Timeline', value: '3 weeks to results', color: '#6B6B6B' },
      ],
      progressPercent: 100,
    },
    {
      id: 21, type: 'paywall',
      paywallType: 'Hypnozio',
      progressPercent: 100,
    },
  ],
};

// ============================================================
// FUNNEL F — "Your Style Transformation Plan" (Sofa Yoga)
// ============================================================
const funnelF: Funnel = {
  id: 'F',
  name: 'Your Style Transformation Plan',
  theme: 'Urgent Transformation + Bonus Stack',
  archetype: 'The Scroll Comparer',
  paywallType: 'Sofa Yoga — TRIPLE Urgency + Promo Code + Bonus Stack + Security Badges',
  screenCount: 24,
  description: 'Triple urgency: sticky header countdown + promo code block + sticky footer. Bonus stack totaling $56.96 in free value.',
  screens: [
    {
      id: 1, type: 'single-choice',
      headline: 'YOUR STYLE TRANSFORMATION PLAN',
      question: 'What\'s your biggest style frustration right now?',
      stat: '⭐ Rated #1 Style App by InStyle Magazine',
      options: [
        { label: 'I love outfits on others but can\'t replicate them', emoji: '😩' },
        { label: 'I overshop and still have nothing to wear', emoji: '🛍️' },
        { label: 'I know the pieces are there — I just can\'t see the outfits', emoji: '🔍' },
        { label: 'I\'ve stopped trusting my own judgment', emoji: '🤷' },
      ],
      progressPercent: 0,
    },
    {
      id: 2, type: 'single-choice',
      question: 'How would you describe your current relationship with style advice?',
      options: [
        { label: 'I follow a lot of accounts but nothing translates to my life' },
        { label: 'I save a lot of content but never use it' },
        { label: 'I get overwhelmed — too much contradictory advice' },
        { label: 'I\'ve given up on social media style advice entirely' },
      ],
      progressPercent: 8,
    },
    {
      id: 3, type: 'interstitial',
      headline: 'You\'re not confused. You\'ve been getting the wrong advice.',
      body: "Style advice designed for 5\'10\" 24-year-olds doesn\'t work for you. Not because you\'re wrong. Because the advice was never meant for real women with real wardrobes.\n\nOutfit Formulas works from the inside out — from YOUR wardrobe, YOUR body, YOUR life.",
      ctaLabel: 'That explains a lot →',
      progressPercent: 12,
    },
    {
      id: 4, type: 'single-choice',
      question: 'How much time do you spend on style content per week?',
      options: [
        { label: 'Under 30 minutes — I\'ve mostly given up' },
        { label: '30 minutes to an hour' },
        { label: '1–2 hours' },
        { label: '2+ hours — and I still feel stuck' },
      ],
      progressPercent: 16,
    },
    {
      id: 5, type: 'single-choice',
      question: 'What usually happens when you try an outfit you saw online?',
      options: [
        { label: 'It looks completely different on me' },
        { label: 'I don\'t have the right pieces to recreate it' },
        { label: 'It works, but only for that one occasion' },
        { label: 'It never looks like the photo — I\'ve stopped trying' },
      ],
      progressPercent: 20,
    },
    {
      id: 6, type: 'likert',
      question: '"I\'ve spent a lot of money following style trends that didn\'t work for me."',
      progressPercent: 25,
    },
    {
      id: 7, type: 'likert',
      question: '"I feel like style works for everyone except me."',
      progressPercent: 29,
    },
    {
      id: 8, type: 'multi-select',
      question: 'What have you bought in the last year that didn\'t work?',
      subtitle: 'Select all that apply',
      options: [
        { label: 'A statement piece with nothing to wear it with' },
        { label: 'Trend items I convinced myself I\'d wear' },
        { label: 'Things that worked on the hanger but not on me' },
        { label: 'Basics I thought would solve everything (they didn\'t)' },
        { label: 'Things that looked great in the store and never at home' },
      ],
      progressPercent: 33,
    },
    {
      id: 9, type: 'interstitial',
      headline: 'The problem isn\'t your spending. It\'s your system.',
      body: "Every time you buy something without a formula, you\'re gambling. Sometimes you win. Mostly you don\'t.\n\nOutfit Formulas gives you the formula FIRST. Then every purchase — if you choose to make any — fits into a system that already works.",
      ctaLabel: 'Show me the system →',
      progressPercent: 37,
    },
    {
      id: 10, type: 'single-choice',
      question: 'What does your current wardrobe actually look like?',
      options: [
        { label: 'Overstuffed but somehow empty of outfits' },
        { label: 'Minimal but nothing works together' },
        { label: 'Mostly fine pieces that somehow don\'t combine into outfits' },
        { label: 'A chaotic mix I don\'t know how to edit' },
      ],
      progressPercent: 41,
    },
    {
      id: 11, type: 'single-choice',
      question: 'What kind of outfits does your actual life require?',
      options: [
        { label: 'Casual but elevated — WFH + errands + social' },
        { label: 'Professional most days, casual the rest' },
        { label: 'Smart casual across the board' },
        { label: 'Active / athleisure-adjacent lifestyle' },
        { label: 'I don\'t even know — this is part of the problem' },
      ],
      progressPercent: 45,
    },
    {
      id: 12, type: 'single-choice',
      question: 'How would you like to feel in your clothes?',
      options: [
        { label: 'Effortlessly put-together without trying too hard' },
        { label: 'Like I have a signature — something that\'s mine' },
        { label: 'Confident in any situation, without overthinking' },
        { label: 'Like I actually got dressed on purpose today' },
      ],
      progressPercent: 50,
    },
    {
      id: 13, type: 'text-input',
      question: "What's your first name?",
      subtitle: 'We use this to personalize your Style Transformation Plan.',
      ctaLabel: 'Build My Plan →',
      progressPercent: 67,
    },
    {
      id: 14, type: 'loading',
      headline: "Building your Style Transformation Plan...",
      loadingLines: [
        '✓ Analyzing your style profile and frustrations...',
        '✓ Identifying your formula type...',
        '✓ Building your personalized outfit system...',
        '✓ Preparing your transformation roadmap...',
      ],
      autoAdvance: true,
      autoAdvanceDelay: 5000,
      progressPercent: 79,
    },
    {
      id: 15, type: 'results',
      resultTitle: 'Your Style Transformation Plan',
      resultMetrics: [
        { label: 'Formula Type', value: 'The System Builder', color: '#FF2A6D' },
        { label: 'Outfit Potential', value: '58 combinations', color: '#FF2A6D' },
        { label: 'Time Saved', value: '2+ hrs/week', color: '#6B6B6B' },
        { label: 'Transformation', value: '21 days', color: '#6B6B6B' },
      ],
      progressPercent: 100,
    },
    {
      id: 16, type: 'paywall',
      paywallType: 'SofaYoga',
      progressPercent: 100,
    },
  ],
};

// ============================================================
// FUNNEL G — "The Science of Your Style" (Effecto)
// ============================================================
const funnelG: Funnel = {
  id: 'G',
  name: 'The Science of Your Style',
  theme: 'Data-Backed Style Science',
  archetype: 'The Scroll Comparer',
  paywallType: 'Effecto — Science-Minimal, Clean, No Urgency',
  screenCount: 33,
  description: 'Science framing throughout. Minimal paywall — the quiz sold them through credibility. Backed by research.',
  screens: [
    {
      id: 1, type: 'single-choice',
      headline: 'THE SCIENCE OF YOUR STYLE',
      question: 'Why do you think style has been difficult for you?',
      subtitle: 'This assessment uses behavioral research and data from 127,000 participants.',
      options: [
        { label: 'I\'ve followed advice that didn\'t account for my specific situation', emoji: '📊' },
        { label: 'I know what I like but can\'t translate it to my wardrobe', emoji: '🔬' },
        { label: 'I don\'t trust my own judgment anymore', emoji: '🧠' },
        { label: 'The information online contradicts itself constantly', emoji: '❓' },
      ],
      progressPercent: 0,
    },
    {
      id: 2, type: 'interstitial',
      headline: 'Why we ask each question.',
      body: "Every question in this assessment is connected to a specific behavioral or physiological factor that affects how women relate to their wardrobes.\n\nWe\'re not profiling your taste. We\'re measuring the gap between what your wardrobe contains and what your system allows you to see.",
      stat: '92%',
      statLabel: 'of participants report measurable improvement in 3 weeks',
      ctaLabel: 'I understand — let\'s go →',
      progressPercent: 6,
    },
    {
      id: 3, type: 'single-choice',
      question: 'Your age range?',
      options: [
        { label: 'Under 30' }, { label: '30–39' }, { label: '40–49' }, { label: '50–59' }, { label: '60+' },
      ],
      progressPercent: 9,
    },
    {
      id: 4, type: 'single-choice',
      question: 'Research question: How do you process visual information about outfits?',
      subtitle: 'There\'s no wrong answer — this tells us which formula type to build for you.',
      options: [
        { label: 'I take mental snapshots of outfits I love and store them' },
        { label: 'I categorize by color or pattern' },
        { label: 'I think in terms of occasions (work / casual / event)' },
        { label: 'I don\'t have a system — I just react to what\'s in front of me' },
      ],
      progressPercent: 12,
    },
    {
      id: 5, type: 'single-choice',
      question: 'Data collection: What percentage of your wardrobe do you actually wear?',
      subtitle: 'Industry average: 18–22%',
      options: [
        { label: 'Less than 20%' },
        { label: '20–40%' },
        { label: '40–60%' },
        { label: 'More than 60%' },
        { label: 'I don\'t know — I\'ve never tracked it' },
      ],
      progressPercent: 15,
    },
    {
      id: 6, type: 'likert',
      question: '"When I follow style advice, the results are usually disappointing."',
      progressPercent: 18,
    },
    {
      id: 7, type: 'likert',
      question: '"I\'ve developed a skepticism about style content that I didn\'t used to have."',
      progressPercent: 21,
    },
    {
      id: 8, type: 'interstitial',
      headline: 'This is a documented psychological pattern.',
      body: "Research calls this \'style credibility collapse\' — when repeated failed advice creates a defensive skepticism that prevents women from acting on accurate information.\n\nThe solution isn\'t more advice. It\'s a system built on your specific data, not generalized principles.",
      stat: '67%',
      statLabel: 'of style-skeptical women show measurable improvement when given personalized (not generic) formulas',
      ctaLabel: 'This makes sense — continue',
      progressPercent: 24,
    },
    {
      id: 9, type: 'single-choice',
      question: 'Assessment: How do you currently make outfit decisions?',
      options: [
        { label: 'Default to the same reliable combinations' },
        { label: 'React to whatever is clean and accessible' },
        { label: 'Try multiple combinations and settle' },
        { label: 'Have a rough mental model but it doesn\'t always work' },
      ],
      progressPercent: 27,
    },
    {
      id: 10, type: 'multi-select',
      question: 'Which decision-making patterns do you recognize?',
      subtitle: 'Select all that apply',
      options: [
        { label: 'Choice overload — too many options leads to paralysis' },
        { label: 'Anchoring bias — I always go back to the same pieces' },
        { label: 'Scarcity thinking — I feel I don\'t have enough' },
        { label: 'Recency bias — I wear what I most recently bought' },
        { label: 'Availability heuristic — I wear what I see first' },
      ],
      progressPercent: 30,
    },
    {
      id: 11, type: 'single-choice',
      question: 'Quantitative: How many distinct outfit combinations do you regularly use?',
      options: [
        { label: 'Under 5' },
        { label: '5–10' },
        { label: '10–20' },
        { label: '20+' },
        { label: 'I haven\'t thought about it in terms of numbers' },
      ],
      progressPercent: 33,
    },
    {
      id: 12, type: 'single-choice',
      question: 'Color analysis: Which best describes your current color strategy?',
      options: [
        { label: 'Monochromatic / near-monochromatic (mostly one tone)' },
        { label: 'Neutral base with occasional color' },
        { label: 'Mixed — no clear strategy' },
        { label: 'I avoid color because I don\'t trust my judgment' },
        { label: 'I still wear color intentionally' },
      ],
      progressPercent: 36,
    },
    {
      id: 13, type: 'interstitial',
      headline: 'Data from 127,000 participants.',
      body: "Women who moved from reactive to formula-based dressing reported:\n• 73% reduction in morning decision time\n• 61% increase in wardrobe utilization\n• 84% increase in dressing confidence within 3 weeks\n\nNone of these women bought significantly more clothes. They changed how they used what they had.",
      ctaLabel: 'See my data →',
      progressPercent: 39,
    },
    {
      id: 14, type: 'single-choice',
      question: 'Lifestyle matrix: What does your week require?',
      options: [
        { label: 'Primarily home-based with occasional social occasions' },
        { label: 'Mixed work and home environments' },
        { label: 'Predominantly professional settings' },
        { label: 'High variety — business, social, casual in same week' },
      ],
      progressPercent: 42,
    },
    {
      id: 15, type: 'multi-select',
      question: 'Physical wardrobe audit: What does your closet contain most of?',
      subtitle: 'Select all that apply',
      options: [
        { label: 'Tops I reach for repeatedly' },
        { label: 'Bottoms in a narrow range (mostly jeans/black pants)' },
        { label: 'Statement pieces I bought but rarely wear' },
        { label: 'Basics that all look the same' },
        { label: 'Things from a past life that no longer apply' },
        { label: 'Items with tags still on' },
      ],
      progressPercent: 45,
    },
    {
      id: 16, type: 'text-input',
      question: "What's your first name?",
      subtitle: 'Final step before we process your assessment data.',
      ctaLabel: 'Process My Assessment →',
      progressPercent: 61,
    },
    {
      id: 17, type: 'loading',
      headline: "Processing your assessment data...",
      loadingLines: [
        '✓ Running behavioral pattern analysis...',
        '✓ Cross-referencing with 127,000 participant dataset...',
        '✓ Generating your personalized formula matrix...',
        '✓ Calculating wardrobe utilization potential...',
      ],
      autoAdvance: true,
      autoAdvanceDelay: 5500,
      progressPercent: 76,
    },
    {
      id: 18, type: 'results',
      resultTitle: 'Your Style Science Report',
      resultMetrics: [
        { label: 'Pattern Type', value: 'Data-Responsive Dresser', color: '#FF2A6D' },
        { label: 'Outfit Potential', value: '61 combinations', color: '#FF2A6D' },
        { label: 'Predicted Utilization', value: '+43% in 3 wks', color: '#6B6B6B' },
        { label: 'Formula Match', value: '97% accuracy', color: '#6B6B6B' },
      ],
      progressPercent: 100,
    },
    {
      id: 19, type: 'paywall',
      paywallType: 'Effecto',
      progressPercent: 100,
    },
  ],
};

// ============================================================
// FUNNEL H — "Your Premium Style Profile" (BetterMe)
// ============================================================
const funnelH: Funnel = {
  id: 'H',
  name: 'Your Premium Style Profile',
  theme: 'Premium Brand Experience',
  archetype: 'The Aspirational Investor',
  paywallType: 'BetterMe — Premium Brand, Dark/Luxury, 50% First-Period Discount',
  screenCount: 26,
  description: 'Premium brand feel. Dark/luxury aesthetic. "Join 2M+ Women" social proof. First-period 50% discount.',
  screens: [
    {
      id: 1, type: 'single-choice',
      headline: 'YOUR PREMIUM STYLE PROFILE',
      question: 'What would you invest in, if you knew it would work?',
      stat: 'Join 2,000,000+ women who\'ve transformed their wardrobe',
      options: [
        { label: 'A wardrobe that works every morning without effort', emoji: '✨' },
        { label: 'Knowing exactly what flatters my body', emoji: '💫' },
        { label: 'A system I can maintain without thinking', emoji: '🎯' },
        { label: 'The confidence to try new things', emoji: '🦋' },
      ],
      progressPercent: 0,
    },
    {
      id: 2, type: 'single-choice',
      question: 'How do you approach getting dressed on an important day?',
      options: [
        { label: 'I plan ahead — but it still stresses me out' },
        { label: 'I go through multiple options and often regret my final choice' },
        { label: 'I rely on the same 2–3 "safe" options' },
        { label: 'I enjoy the challenge — I\'m good at it' },
        { label: 'I avoid \'important\' occasions because of wardrobe anxiety' },
      ],
      progressPercent: 8,
    },
    {
      id: 3, type: 'single-choice',
      question: 'What\'s your relationship with investing in clothes?',
      options: [
        { label: 'I buy quality pieces but can\'t make them work together' },
        { label: 'I overspend on impulse and underuse what I buy' },
        { label: 'I underspend because nothing seems worth it' },
        { label: 'I\'m strategic — I just need a better system' },
        { label: 'I\'ve stopped buying entirely out of frustration' },
      ],
      progressPercent: 12,
    },
    {
      id: 4, type: 'interstitial',
      headline: 'Premium doesn\'t mean expensive.',
      body: "The most stylish women in any room aren\'t wearing the most expensive clothes.\n\nThey\'re wearing a formula. A system that makes everything they put on look intentional.\n\nThat formula is learnable. And it starts with understanding your wardrobe at a deeper level than anyone else.",
      stat: '2,000,000+',
      statLabel: 'women have joined Outfit Formulas',
      ctaLabel: 'I want that system →',
      progressPercent: 16,
    },
    {
      id: 5, type: 'single-choice',
      question: 'How would you describe your current style identity?',
      options: [
        { label: 'Classic — clean lines, neutral palette, understated' },
        { label: 'Transitional — working out what my style is now' },
        { label: 'Aspirational — I know what I\'d love, can\'t make it work' },
        { label: 'Minimal — basics because I can\'t decide on anything else' },
        { label: 'Inconsistent — no clear identity right now' },
      ],
      progressPercent: 20,
    },
    {
      id: 6, type: 'single-choice',
      question: 'What types of occasions do you dress for most?',
      options: [
        { label: 'Corporate or professional daily' },
        { label: 'Creative or relaxed professional' },
        { label: 'Social events and going out' },
        { label: 'Mixed — I need a wardrobe that does everything' },
        { label: 'Casual — but I want to look intentional, not sloppy' },
      ],
      progressPercent: 24,
    },
    {
      id: 7, type: 'likert',
      question: '"I know what looks good on other women. I struggle to apply it to myself."',
      progressPercent: 28,
    },
    {
      id: 8, type: 'likert',
      question: '"I would dress differently if I trusted my own judgment more."',
      progressPercent: 32,
    },
    {
      id: 9, type: 'multi-select',
      question: 'What does your ideal wardrobe do?',
      subtitle: 'Select all that matter to you',
      options: [
        { label: 'Makes getting dressed effortless on any morning' },
        { label: 'Works across multiple occasions without separate "wardrobes"' },
        { label: 'Feels expensive even when it isn\'t' },
        { label: 'Is minimal but contains everything I need' },
        { label: 'Represents who I am, not who I used to be' },
        { label: 'Makes me feel powerful and put-together' },
      ],
      progressPercent: 36,
    },
    {
      id: 10, type: 'single-choice',
      question: 'What\'s your style budget preference?',
      options: [
        { label: 'High street / accessible brands' },
        { label: 'Mix of high street and occasional investment pieces' },
        { label: 'Predominantly investment pieces' },
        { label: 'Secondhand / vintage with occasional new' },
        { label: 'I\'d rather spend less and make it work better' },
      ],
      progressPercent: 40,
    },
    {
      id: 11, type: 'single-choice',
      question: 'What has never worked for you?',
      options: [
        { label: 'Trend-based advice that ignored my actual wardrobe' },
        { label: 'Generic capsule wardrobes that felt like a costume' },
        { label: 'A personal stylist who imposed their taste on me' },
        { label: 'Pinterest boards I saved but never used' },
        { label: 'Apps that required cataloguing everything (abandoned)' },
      ],
      progressPercent: 44,
    },
    {
      id: 12, type: 'text-input',
      question: "What's your first name?",
      subtitle: 'Your Premium Style Profile is personalized to your exact answers.',
      ctaLabel: 'Build My Profile →',
      progressPercent: 60,
    },
    {
      id: 13, type: 'loading',
      headline: "Building your Premium Style Profile...",
      loadingLines: [
        '✓ Analyzing your style investment profile...',
        '✓ Matching your aesthetic identity...',
        '✓ Building your premium formula set...',
        '✓ Preparing your personalized style system...',
      ],
      autoAdvance: true,
      autoAdvanceDelay: 5000,
      progressPercent: 76,
    },
    {
      id: 14, type: 'results',
      resultTitle: 'Your Premium Style Profile',
      resultMetrics: [
        { label: 'Profile Type', value: 'The Investment Dresser', color: '#FF2A6D' },
        { label: 'Outfit Potential', value: '68+ combinations', color: '#FF2A6D' },
        { label: 'Style Investment ROI', value: '14× return', color: '#6B6B6B' },
        { label: 'Premium Tier', value: 'Advanced', color: '#6B6B6B' },
      ],
      progressPercent: 100,
    },
    {
      id: 15, type: 'paywall',
      paywallType: 'BetterMe',
      progressPercent: 100,
    },
  ],
};

// ============================================================
// FUNNEL I — "See Your Style Transformation" (TodayIsTheDay)
// ============================================================
const funnelI: Funnel = {
  id: 'I',
  name: 'See Your Style Transformation',
  theme: 'Emotional Before/After Transformation',
  archetype: 'Weight Waiter + Meno-Morpher',
  paywallType: 'TodayIsTheDay — Before/After Emotional Cards + Intro Pricing',
  screenCount: 28,
  description: 'Emotional before/after cards at top. 3 plans with intro pricing. "Recommended for your profile" on middle plan.',
  screens: [
    {
      id: 1, type: 'single-choice',
      headline: 'SEE YOUR STYLE TRANSFORMATION',
      question: 'What\'s changed?',
      subtitle: 'Your body. Your life. Your confidence. Something shifted — and your wardrobe didn\'t catch up.',
      options: [
        { label: 'My body changed and nothing fits right anymore', emoji: '🔄' },
        { label: 'I\'m waiting to lose weight before I deal with this', emoji: '⏳' },
        { label: 'Menopause / hormonal changes shifted everything', emoji: '🌙' },
        { label: 'I don\'t recognize myself in the mirror anymore', emoji: '🪞' },
      ],
      progressPercent: 0,
    },
    {
      id: 2, type: 'single-choice',
      question: 'How long have you been living with this?',
      options: [
        { label: 'A few months — it\'s getting worse' },
        { label: 'About a year' },
        { label: '2–3 years' },
        { label: 'Longer than I want to admit' },
        { label: 'It\'s been gradual — I\'m not sure when it started' },
      ],
      progressPercent: 7,
    },
    {
      id: 3, type: 'interstitial',
      headline: 'Today doesn\'t have to look like yesterday.',
      body: "Here\'s what\'s true: the body you\'re in right now is capable of looking and feeling incredible.\n\nNot the body you had ten years ago. Not the body you\'re planning to have. The one you\'re in. Today.\n\nThe formula for it already exists. We\'re about to find it.",
      ctaLabel: 'Show me →',
      progressPercent: 11,
    },
    {
      id: 4, type: 'single-choice',
      question: 'How have your body changes affected your wardrobe?',
      options: [
        { label: 'I still have things from before that don\'t fit' },
        { label: 'I\'ve bought new things but nothing feels right' },
        { label: 'I\'m wearing the same stretch basics on rotation' },
        { label: 'I avoid mirrors and photos whenever possible' },
        { label: 'I dress to hide rather than to show' },
      ],
      progressPercent: 14,
    },
    {
      id: 5, type: 'single-choice',
      question: 'What does "dressing for your body now" feel like?',
      options: [
        { label: 'I don\'t know how to do it — this body is unfamiliar' },
        { label: 'Like giving up on how I used to look' },
        { label: 'Like accepting something I haven\'t accepted yet' },
        { label: 'Something I want to do — I just don\'t know where to start' },
        { label: 'I\'ve started but it hasn\'t worked yet' },
      ],
      progressPercent: 18,
    },
    {
      id: 6, type: 'likert',
      question: '"I\'ve stopped letting myself be photographed because I don\'t like how I look."',
      progressPercent: 21,
    },
    {
      id: 7, type: 'likert',
      question: '"I get dressed for function rather than because I want to feel good."',
      progressPercent: 25,
    },
    {
      id: 8, type: 'interstitial',
      headline: 'There\'s a name for this.',
      body: "Body-transition dressing paralysis. It affects 78% of women after a significant body change.\n\nYou\'re not struggling because you have bad taste or the wrong body. You\'re struggling because nobody showed you the formulas that work for the body you\'re in now.\n\nThose formulas exist. They\'re specific, teachable, and they work.",
      stat: '78%',
      statLabel: 'of women experience this after body changes',
      ctaLabel: 'I want those formulas →',
      progressPercent: 29,
    },
    {
      id: 9, type: 'single-choice',
      question: 'What kind of transformation do you want?',
      options: [
        { label: 'I want to feel like myself again in this body' },
        { label: 'I want to stop dreading getting dressed' },
        { label: 'I want outfits that actually flatter me now' },
        { label: 'I want to stop hiding and start being present' },
        { label: 'I want to look in the mirror and feel okay' },
      ],
      progressPercent: 32,
    },
    {
      id: 10, type: 'single-choice',
      question: 'What would change tomorrow if you had a formula that worked?',
      options: [
        { label: 'I\'d get dressed without dreading it' },
        { label: 'I\'d stop avoiding social situations' },
        { label: 'I\'d stop feeling invisible' },
        { label: 'I\'d feel like the person I actually am inside' },
        { label: 'I\'d stop wasting money on things that don\'t work' },
      ],
      progressPercent: 36,
    },
    {
      id: 11, type: 'multi-select',
      question: 'What specifically needs to change for you?',
      subtitle: 'Select all that apply',
      options: [
        { label: 'I need outfits that work for my current body shape' },
        { label: 'I need to know what to wear for my actual daily life' },
        { label: 'I need to stop buying things that don\'t work' },
        { label: 'I need a morning routine I can rely on' },
        { label: 'I need to feel confident in photos again' },
        { label: 'I need to stop hiding' },
      ],
      progressPercent: 40,
    },
    {
      id: 12, type: 'single-choice',
      question: 'Your age range?',
      options: [
        { label: 'Under 30' }, { label: '30–39' }, { label: '40–49' }, { label: '50–59' }, { label: '60+' },
      ],
      progressPercent: 43,
    },
    {
      id: 13, type: 'single-choice',
      question: 'What do you currently wear most?',
      options: [
        { label: 'Loose, comfortable, hides everything' },
        { label: 'The same reliable items on repeat' },
        { label: 'Mostly professional — my personal style is on hold' },
        { label: 'Whatever fits right now — sizes are inconsistent' },
        { label: 'I honestly just grab whatever' },
      ],
      progressPercent: 47,
    },
    {
      id: 14, type: 'text-input',
      question: "What's your first name?",
      subtitle: 'We build your transformation plan based on your exact answers.',
      ctaLabel: 'Build My Transformation Plan →',
      progressPercent: 61,
    },
    {
      id: 15, type: 'loading',
      headline: "Building your Style Transformation Plan...",
      loadingLines: [
        '✓ Analyzing your current and goal body profile...',
        '✓ Building body-forward outfit formulas...',
        '✓ Mapping your transformation timeline...',
        '✓ Preparing your before/after plan...',
      ],
      autoAdvance: true,
      autoAdvanceDelay: 5000,
      progressPercent: 75,
    },
    {
      id: 16, type: 'results',
      resultTitle: 'Your Style Transformation',
      resultMetrics: [
        { label: 'Transformation Type', value: 'Body-Forward Reset', color: '#FF2A6D' },
        { label: 'Outfit Potential', value: '55 new combinations', color: '#FF2A6D' },
        { label: 'Timeline', value: '28 days', color: '#6B6B6B' },
        { label: 'Confidence Gain', value: 'High projection', color: '#6B6B6B' },
      ],
      progressPercent: 100,
    },
    {
      id: 17, type: 'paywall',
      paywallType: 'TodayIsTheDay',
      progressPercent: 100,
    },
  ],
};

// ============================================================
// FUNNEL J — "Your Expert Style Analysis" (The Coach)
// ============================================================
const funnelJ: Funnel = {
  id: 'J',
  name: 'Your Expert Style Analysis',
  theme: 'Expert Endorsement + Massive Savings',
  archetype: 'The Style Skeptic',
  paywallType: 'The Coach — Giant SAVE 78%/71% Badges + Expert Cards + Countdown',
  screenCount: 26,
  description: 'Giant SAVE% badges. Expert endorsement cards with photos. Countdown timer. 4-week results promise.',
  screens: [
    {
      id: 1, type: 'single-choice',
      headline: 'EXPERT STYLE ANALYSIS',
      question: 'What\'s your biggest skepticism about style apps?',
      stat: 'Endorsed by 3 professional stylists with 45,000+ clients',
      options: [
        { label: 'They give generic advice that doesn\'t apply to me', emoji: '🤔' },
        { label: 'They want me to buy more clothes', emoji: '💸' },
        { label: 'They never account for my actual body', emoji: '👤' },
        { label: 'I\'ve tried them before and they didn\'t work', emoji: '❌' },
      ],
      progressPercent: 0,
    },
    {
      id: 2, type: 'single-choice',
      question: 'How many style solutions have you already tried?',
      options: [
        { label: 'This is my first' },
        { label: '1–2 things that didn\'t work' },
        { label: '3–5 things — getting frustrated' },
        { label: '5+ things — I\'m skeptical anything will help' },
      ],
      progressPercent: 8,
    },
    {
      id: 3, type: 'interstitial',
      headline: 'We\'re different. Here\'s specifically why.',
      body: "Most style apps tell you what to buy.\n\nOutfit Formulas analyzes what you already own and tells you what you\'ve been missing.\n\nOur expert panel — three professional stylists who between them have worked with 45,000+ clients — designed a system that works on any wardrobe, any body, any budget.\n\nIt doesn\'t require buying anything.",
      ctaLabel: 'Interesting — tell me more →',
      progressPercent: 12,
    },
    {
      id: 4, type: 'single-choice',
      question: 'If an expert looked at your wardrobe right now, what would they find?',
      options: [
        { label: 'Lots of good individual pieces with no coherent system' },
        { label: 'Reliable basics and nothing interesting' },
        { label: 'A wardrobe built for someone I used to be' },
        { label: 'Mostly things that \'work\' but never make me feel great' },
        { label: 'Total chaos — they\'d earn their fee' },
      ],
      progressPercent: 16,
    },
    {
      id: 5, type: 'likert',
      question: '"I\'d change how I dress if I knew what specifically to change."',
      progressPercent: 20,
    },
    {
      id: 6, type: 'likert',
      question: '"I would trust expert guidance more than general style advice."',
      progressPercent: 24,
    },
    {
      id: 7, type: 'single-choice',
      question: 'What kind of style result do you want?',
      options: [
        { label: 'A signature — something recognisably mine' },
        { label: 'A system — I know what to wear in any situation' },
        { label: 'Confidence — I want to stop second-guessing myself' },
        { label: 'Efficiency — I want getting dressed to take 5 minutes' },
      ],
      progressPercent: 28,
    },
    {
      id: 8, type: 'multi-select',
      question: 'What do you need expert guidance on?',
      subtitle: 'Select all that apply',
      options: [
        { label: 'Which pieces in my wardrobe to keep vs. donate' },
        { label: 'What colors actually work together for my skin tone' },
        { label: 'How to build outfits rather than just wearing pieces' },
        { label: 'What to wear for specific occasions' },
        { label: 'How to identify my actual body type and dress for it' },
        { label: 'Building a formula I can repeat without thinking' },
      ],
      progressPercent: 33,
    },
    {
      id: 9, type: 'interstitial',
      headline: 'Our expert team analyzed 45,000+ wardrobes.',
      body: "The patterns they found were consistent across body types, budgets, and ages:\n\n1. 80% of style problems are solved by understanding 5–8 core outfit formulas.\n2. Most wardrobes already contain everything needed — they\'re just not organized to show it.\n3. The fastest results come from building a system, not buying more pieces.\n\nThese aren\'t opinions. They\'re derived from real wardrobe data.",
      ctaLabel: 'I want those formulas →',
      progressPercent: 37,
    },
    {
      id: 10, type: 'single-choice',
      question: 'What\'s your lifestyle context?',
      options: [
        { label: 'Primarily professional / work-focused' },
        { label: 'Mixed — work and personal in equal measure' },
        { label: 'Primarily personal / casual' },
        { label: 'Active lifestyle with social occasions' },
        { label: 'I work from home — need to look good without trying hard' },
      ],
      progressPercent: 41,
    },
    {
      id: 11, type: 'text-input',
      question: "What's your first name?",
      subtitle: 'Your Expert Style Analysis will be personalized to your specific answers.',
      ctaLabel: 'Generate My Analysis →',
      progressPercent: 56,
    },
    {
      id: 12, type: 'loading',
      headline: "Running your Expert Style Analysis...",
      loadingLines: [
        '✓ Processing with expert panel methodology...',
        '✓ Analyzing your style challenges and history...',
        '✓ Building your personalized formula set...',
        '✓ Preparing your expert recommendations...',
      ],
      autoAdvance: true,
      autoAdvanceDelay: 5500,
      progressPercent: 72,
    },
    {
      id: 13, type: 'results',
      resultTitle: 'Your Expert Style Analysis',
      resultMetrics: [
        { label: 'Expert Assessment', value: 'High-Potential Profile', color: '#FF2A6D' },
        { label: 'Outfit Potential', value: '49+ combinations', color: '#FF2A6D' },
        { label: 'Time to Results', value: '4 weeks', color: '#6B6B6B' },
        { label: 'Confidence Rating', value: 'Expert: Very High', color: '#6B6B6B' },
      ],
      progressPercent: 100,
    },
    {
      id: 14, type: 'paywall',
      paywallType: 'TheCoach',
      progressPercent: 100,
    },
  ],
};

// ============================================================
// FUNNEL K — "Build Your Style Blueprint" (Slowdive)
// ============================================================
const funnelK: Funnel = {
  id: 'K',
  name: 'Build Your Style Blueprint',
  theme: 'Style Blueprint Builder',
  archetype: 'Closet Paralytic + Style Relic Blend',
  paywallType: 'Slowdive — Live Buyer Counter + Per-Day Pricing + Sticky Footer',
  screenCount: 28,
  description: 'Live buyer counter with pulsing dot. Per-day pricing on all plans. "LIMITED TIME OFFER" banner. Sticky footer.',
  screens: [
    {
      id: 1, type: 'single-choice',
      headline: 'BUILD YOUR STYLE BLUEPRINT',
      question: 'What if you already own everything you need?',
      subtitle: 'Build a blueprint from your existing wardrobe — no shopping required.',
      options: [
        { label: 'I have the clothes. I can\'t see the outfits.', emoji: '👁️' },
        { label: 'I used to be able to do this. Now I can\'t.', emoji: '⏮️' },
        { label: 'My wardrobe has no system and it shows.', emoji: '🗂️' },
        { label: 'Every morning is starting from zero.', emoji: '🔄' },
      ],
      progressPercent: 0,
    },
    {
      id: 2, type: 'single-choice',
      question: 'Which of these is your "wardrobe morning"?',
      options: [
        { label: 'Open closet, stare, close it, open it again' },
        { label: 'Try 4 things, hate them all, go with option #1 anyway' },
        { label: 'Reach for the same 3 things on autopilot' },
        { label: 'Spend 20 minutes and still leave feeling wrong' },
        { label: 'Skip deciding and wear the same thing again' },
      ],
      progressPercent: 7,
    },
    {
      id: 3, type: 'interstitial',
      headline: 'The blueprint changes everything.',
      body: "Women with a style blueprint get dressed in 5 minutes or less on 87% of mornings.\n\nNot because they have better taste. Not because they have more clothes.\n\nBecause they have a system that tells them what goes with what. Every morning. Without thinking.\n\nThat system is buildable. Today. From what you already own.",
      stat: '87%',
      statLabel: 'of blueprint users dress in under 5 minutes',
      ctaLabel: 'Build my blueprint →',
      progressPercent: 11,
    },
    {
      id: 4, type: 'single-choice',
      question: 'What does your wardrobe contain most of?',
      options: [
        { label: 'Tops I love but can\'t style into full outfits' },
        { label: 'Bottoms that\'s a narrow range (jeans + one "good" pair)' },
        { label: 'Statement pieces that have no "supporting cast"' },
        { label: 'Basics that all look the same' },
        { label: 'Things I own but haven\'t worn in months or years' },
      ],
      progressPercent: 14,
    },
    {
      id: 5, type: 'likert',
      question: '"I get paralyzed by choice even when I have a lot of options."',
      progressPercent: 18,
    },
    {
      id: 6, type: 'likert',
      question: '"I know what I like. I just can\'t translate it to my actual wardrobe."',
      progressPercent: 21,
    },
    {
      id: 7, type: 'single-choice',
      question: 'When you DO nail an outfit, what usually makes it work?',
      options: [
        { label: 'I wore it before and remember it worked' },
        { label: 'Something just clicked and I\'m not sure why' },
        { label: 'I broke my usual rules and it paid off' },
        { label: 'I had enough time to try multiple things' },
        { label: 'Someone else helped me pick it' },
      ],
      progressPercent: 25,
    },
    {
      id: 8, type: 'single-choice',
      question: 'What does your lifestyle require most?',
      options: [
        { label: 'Practical everyday outfits (errands, home, school run)' },
        { label: 'Smart casual that can move between contexts' },
        { label: 'Professional outfits that still feel like me' },
        { label: 'Active + social — I need range' },
        { label: 'I honestly need a wardrobe that works for everything' },
      ],
      progressPercent: 29,
    },
    {
      id: 9, type: 'multi-select',
      question: 'What would your style blueprint actually solve?',
      subtitle: 'Select all that apply',
      options: [
        { label: 'Knowing in advance what works — no trial and error' },
        { label: 'A system I can use on bad days and busy mornings' },
        { label: 'Bringing back pieces I forgot I owned' },
        { label: 'Stopping the \'nothing to wear\' spiral' },
        { label: 'Knowing exactly what to buy (and what not to)' },
        { label: 'Rebuilding confidence in my own taste' },
      ],
      progressPercent: 36,
    },
    {
      id: 10, type: 'interstitial',
      headline: 'The blueprint method.',
      body: "Step 1: Identify your 8–12 core outfit formulas (the structures that work for your body and life).\n\nStep 2: Map each formula onto what you already own.\n\nStep 3: Get a daily outfit suggestion that fits the formula.\n\nThat\'s it. No shopping. No overhaul. No capsule wardrobe. Just a map of what you already have.",
      ctaLabel: 'I want this →',
      progressPercent: 43,
    },
    {
      id: 11, type: 'text-input',
      question: "What's your first name?",
      subtitle: 'We personalize your Style Blueprint based on your answers.',
      ctaLabel: 'Build My Blueprint →',
      progressPercent: 61,
    },
    {
      id: 12, type: 'loading',
      headline: "Building your Style Blueprint...",
      loadingLines: [
        '✓ Mapping your wardrobe structure...',
        '✓ Identifying your core formula candidates...',
        '✓ Building your personalized blueprint...',
        '✓ Preparing your daily outfit system...',
      ],
      autoAdvance: true,
      autoAdvanceDelay: 5000,
      progressPercent: 75,
    },
    {
      id: 13, type: 'results',
      resultTitle: 'Your Style Blueprint',
      resultMetrics: [
        { label: 'Blueprint Type', value: 'The Formula Builder', color: '#FF2A6D' },
        { label: 'Outfit Potential', value: '53 combinations', color: '#FF2A6D' },
        { label: 'Core Formulas', value: '9 formulas', color: '#6B6B6B' },
        { label: 'Time to Build', value: '10 minutes', color: '#6B6B6B' },
      ],
      progressPercent: 100,
    },
    {
      id: 14, type: 'paywall',
      paywallType: 'Slowdive',
      progressPercent: 100,
    },
  ],
};

// ============================================================
// FUNNEL L — "Your Personal Style Report" (Nebula)
// ============================================================
const funnelL: Funnel = {
  id: 'L',
  name: 'Your Personal Style Report',
  theme: 'One-Time Report Purchase',
  archetype: 'The Research-First Buyer',
  paywallType: 'Nebula — $19.99 One-Time Report, Circular Countdown, NOT Subscription',
  screenCount: 24,
  description: 'ONE-TIME $19.99 report purchase. Circular countdown timer. Report TOC with blurred sections. "NOT a subscription" callout.',
  screens: [
    {
      id: 1, type: 'single-choice',
      headline: 'YOUR PERSONAL STYLE REPORT',
      question: 'Which describes your preference?',
      subtitle: 'A comprehensive one-time report — not a subscription.',
      options: [
        { label: 'I want a complete analysis I can reference forever', emoji: '📋' },
        { label: 'I want something I own, not a monthly fee', emoji: '📄' },
        { label: 'I want deep insight, not surface-level advice', emoji: '🔍' },
        { label: 'I want to understand my wardrobe at a fundamental level', emoji: '🧬' },
      ],
      progressPercent: 0,
    },
    {
      id: 2, type: 'single-choice',
      question: 'Your age range?',
      options: [
        { label: 'Under 30' }, { label: '30–39' }, { label: '40–49' }, { label: '50–59' }, { label: '60+' },
      ],
      progressPercent: 8,
    },
    {
      id: 3, type: 'single-choice',
      question: 'What do you know about yourself that most style advice ignores?',
      options: [
        { label: 'What specific body proportions I need to dress for' },
        { label: 'What colors actually work vs. what I think should work' },
        { label: 'Which pieces in my wardrobe are actually building blocks vs. clutter' },
        { label: 'What formula my \'best\' outfits share' },
      ],
      progressPercent: 13,
    },
    {
      id: 4, type: 'single-choice',
      question: 'What types of clothing make up most of your wardrobe?',
      options: [
        { label: 'Tops — I have loads but no bottoms to match' },
        { label: 'Black and neutral basics that all look the same' },
        { label: 'A mix of things that somehow don\'t create outfits' },
        { label: 'Pieces I love that I don\'t know how to wear' },
        { label: 'A generally balanced wardrobe that still doesn\'t perform' },
      ],
      progressPercent: 17,
    },
    {
      id: 5, type: 'likert',
      question: '"I would benefit more from understanding the principles than following rules."',
      progressPercent: 21,
    },
    {
      id: 6, type: 'likert',
      question: '"I feel frustrated when advice doesn\'t apply to my specific situation."',
      progressPercent: 25,
    },
    {
      id: 7, type: 'single-choice',
      question: 'What does your style problem feel like at its core?',
      options: [
        { label: 'An information problem — I don\'t know enough' },
        { label: 'A confidence problem — I don\'t trust my taste' },
        { label: 'A system problem — I don\'t have a method' },
        { label: 'A visibility problem — I can\'t see what I already have' },
        { label: 'All of the above, honestly' },
      ],
      progressPercent: 29,
    },
    {
      id: 8, type: 'single-choice',
      question: 'How do you prefer to process information?',
      options: [
        { label: 'Give me the overview first, then the detail' },
        { label: 'I want it organized so I can reference specific sections' },
        { label: 'I like visual formats — show, don\'t just tell' },
        { label: 'I want actionable steps, not just analysis' },
        { label: 'I want to understand the WHY, not just the WHAT' },
      ],
      progressPercent: 33,
    },
    {
      id: 9, type: 'multi-select',
      question: 'What sections of a style report would be most valuable to you?',
      subtitle: 'Select all that apply',
      options: [
        { label: 'My specific body type and what works for it' },
        { label: 'My color analysis' },
        { label: 'An audit of my existing wardrobe (what works, what doesn\'t)' },
        { label: 'My outfit formula system' },
        { label: 'A shopping guide (what to add, what to remove)' },
        { label: 'Specific outfit combinations built from my wardrobe' },
      ],
      progressPercent: 38,
    },
    {
      id: 10, type: 'text-input',
      question: "What's your first name?",
      subtitle: 'Your personal style report is compiled based on your exact quiz responses.',
      ctaLabel: 'Compile My Report →',
      progressPercent: 54,
    },
    {
      id: 11, type: 'loading',
      headline: "Compiling your Personal Style Report...",
      loadingLines: [
        '✓ Compiling your body type and color analysis...',
        '✓ Building your wardrobe audit...',
        '✓ Creating your outfit formula system...',
        '✓ Finalizing your personal style report...',
      ],
      autoAdvance: true,
      autoAdvanceDelay: 5000,
      progressPercent: 67,
    },
    {
      id: 12, type: 'results',
      resultTitle: 'Your Style Report is Ready',
      resultMetrics: [
        { label: 'Report Sections', value: '7 sections', color: '#FF2A6D' },
        { label: 'Pages', value: '24-page report', color: '#FF2A6D' },
        { label: 'Outfit Formulas', value: '11 formulas', color: '#6B6B6B' },
        { label: 'Price', value: '$19.99 one-time', color: '#6B6B6B' },
      ],
      progressPercent: 100,
    },
    {
      id: 13, type: 'paywall',
      paywallType: 'Nebula',
      progressPercent: 100,
    },
  ],
};

// ============================================================
// FUNNEL M — "The 28-Day Style Reset Challenge" (Keto Cycle)
// ============================================================
const funnelM: Funnel = {
  id: 'M',
  name: 'The 28-Day Style Reset Challenge',
  theme: 'Challenge + Conditional Refund',
  archetype: 'Weight Waiter + Mom Ghost Blend',
  paywallType: 'Keto Cycle — Conditional Refund + Content Preview Cards',
  screenCount: 28,
  description: 'Conditional refund hero: "Follow for 28 days → full refund!" Content preview cards showing actual outfit formulas.',
  screens: [
    {
      id: 1, type: 'single-choice',
      headline: 'THE 28-DAY STYLE RESET CHALLENGE',
      question: 'What\'s your biggest fear about investing in your style?',
      subtitle: '"Follow for 28 days — if it doesn\'t work, get every penny back."',
      options: [
        { label: 'I\'ve wasted money on this before and it didn\'t work', emoji: '💸' },
        { label: 'I\'m not sure my body is \'fixable\' style-wise right now', emoji: '🤔' },
        { label: 'I don\'t trust myself to follow through', emoji: '😔' },
        { label: 'I want results before I invest', emoji: '📊' },
      ],
      progressPercent: 0,
    },
    {
      id: 2, type: 'single-choice',
      question: 'What previous style attempts do you have emotional baggage around?',
      options: [
        { label: 'Money spent on clothes I never wore' },
        { label: 'Capsule wardrobes that worked for 2 weeks' },
        { label: 'Personal shoppers who didn\'t understand me' },
        { label: 'Apps that I abandoned after a week' },
        { label: 'My own failed attempts to "sort my wardrobe"' },
      ],
      progressPercent: 7,
    },
    {
      id: 3, type: 'interstitial',
      headline: 'What if the risk was on us?',
      body: "Here\'s the deal: follow your personalized outfit formulas for 28 days. Do it.\n\nIf after 28 days you haven\'t found outfits in your closet you actually want to wear — outfits that make you feel like yourself — we\'ll refund every penny.\n\nNot a traditional guarantee. A conditional one. Because we know the formula works if you use it.",
      ctaLabel: 'That\'s fair — continue →',
      progressPercent: 11,
    },
    {
      id: 4, type: 'single-choice',
      question: 'What\'s been the biggest obstacle to sticking with style systems before?',
      options: [
        { label: 'They required too much effort upfront' },
        { label: 'They didn\'t match my real daily life' },
        { label: 'Results were too slow to feel motivated' },
        { label: 'They required shopping I didn\'t want to do' },
        { label: 'I got bored or overwhelmed and gave up' },
      ],
      progressPercent: 14,
    },
    {
      id: 5, type: 'likert',
      question: '"I\'ve made style investments that felt embarrassing in retrospect."',
      progressPercent: 18,
    },
    {
      id: 6, type: 'likert',
      question: '"I\'d commit to a 28-day challenge if I knew it was specifically designed for my situation."',
      progressPercent: 21,
    },
    {
      id: 7, type: 'single-choice',
      question: 'What would \'working\' look like after 28 days?',
      options: [
        { label: 'I\'m getting dressed without it being stressful' },
        { label: 'I\'ve found outfit combinations I actually love' },
        { label: 'I feel like myself when I look in the mirror' },
        { label: 'I\'ve stopped buying things that don\'t work' },
        { label: 'All of the above — I want the full transformation' },
      ],
      progressPercent: 25,
    },
    {
      id: 8, type: 'single-choice',
      question: 'How committed are you to making this work?',
      options: [
        { label: 'Very — I\'m done making excuses' },
        { label: 'Fairly — if it fits my life I\'ll do it' },
        { label: 'Cautiously — I\'ve been disappointed before' },
        { label: 'I\'ll try — but I need it to be genuinely easy' },
      ],
      progressPercent: 29,
    },
    {
      id: 9, type: 'multi-select',
      question: 'What does your wardrobe actually need?',
      subtitle: 'Select all that apply',
      options: [
        { label: 'A system for what goes with what' },
        { label: 'Clearer formula for my body type' },
        { label: 'A daily outfit suggestion I can trust' },
        { label: 'Guidance on what to keep vs. remove' },
        { label: 'Outfit ideas that work for my actual life' },
        { label: 'A way to use what I already own more fully' },
      ],
      progressPercent: 32,
    },
    {
      id: 10, type: 'single-choice',
      question: 'Your lifestyle right now?',
      options: [
        { label: 'Primary caregiver (children / family)' },
        { label: 'Working from home primarily' },
        { label: 'Mixed work + home' },
        { label: 'Primarily professional / office-based' },
        { label: 'Going through a life transition' },
      ],
      progressPercent: 36,
    },
    {
      id: 11, type: 'text-input',
      question: "What's your first name?",
      subtitle: 'We build your 28-day challenge plan based on your exact answers.',
      ctaLabel: 'Build My Challenge Plan →',
      progressPercent: 57,
    },
    {
      id: 12, type: 'loading',
      headline: "Building your 28-Day Style Reset Plan...",
      loadingLines: [
        '✓ Analyzing your wardrobe and lifestyle...',
        '✓ Building your 28-day formula sequence...',
        '✓ Preparing outfit preview content...',
        '✓ Confirming your conditional refund eligibility...',
      ],
      autoAdvance: true,
      autoAdvanceDelay: 5000,
      progressPercent: 71,
    },
    {
      id: 13, type: 'results',
      resultTitle: 'Your 28-Day Style Reset Plan',
      resultMetrics: [
        { label: 'Challenge Type', value: 'The Reset Program', color: '#FF2A6D' },
        { label: 'Week 1 Focus', value: 'Foundation formulas', color: '#FF2A6D' },
        { label: 'Outfit Reveals', value: '28 new looks', color: '#6B6B6B' },
        { label: 'Guarantee', value: '28-day conditional refund', color: '#6B6B6B' },
      ],
      progressPercent: 100,
    },
    {
      id: 14, type: 'paywall',
      paywallType: 'KetoCycle',
      progressPercent: 100,
    },
  ],
};

// ============================================================
// FUNNEL N — "Your Style Freedom Plan" (Helpido)
// ============================================================
const funnelN: Funnel = {
  id: 'N',
  name: 'Your Style Freedom Plan',
  theme: 'Emotional Freedom + Aggressive Discount',
  archetype: 'The Instant Transformer',
  paywallType: 'Helpido — 77% Discount Banner + Before/After + $3.49/2wks + Sticky Footer',
  screenCount: 20,
  description: 'Shortest funnel. 77% DISCOUNT sticky banner. Full-width emotional before/after. Aggressive pricing. Sticky countdown.',
  screens: [
    {
      id: 1, type: 'single-choice',
      headline: 'YOUR STYLE FREEDOM PLAN',
      question: 'How does getting dressed make you feel right now?',
      stat: '🔥 LIMITED: 77% OFF TODAY ONLY',
      options: [
        { label: 'Like a failure before my day has even started', emoji: '😔' },
        { label: 'Like I\'ve lost something I used to have', emoji: '💔' },
        { label: 'Invisible — like I\'ve stopped mattering', emoji: '👻' },
        { label: 'Like everyone else has figured this out except me', emoji: '😩' },
      ],
      progressPercent: 0,
    },
    {
      id: 2, type: 'single-choice',
      question: 'If you could change one thing about mornings, what would it be?',
      options: [
        { label: 'Knowing what to wear before I even open the closet' },
        { label: 'Feeling good about how I look without effort' },
        { label: 'Not letting it affect my mood for the whole day' },
        { label: 'Looking like the woman I feel like on the inside' },
      ],
      progressPercent: 10,
    },
    {
      id: 3, type: 'interstitial',
      headline: 'You deserve mornings that feel good.',
      body: "Not one day. Not when you\'ve lost the weight. Not when you\'ve figured out your style.\n\nNow. This week. In this body.\n\nOutfit Formulas gives you the formula for looking and feeling like yourself — in 10 minutes, from what you already own.",
      ctaLabel: 'I want that →',
      progressPercent: 20,
    },
    {
      id: 4, type: 'likert',
      question: '"Getting dressed is one of the hardest parts of my day."',
      progressPercent: 30,
    },
    {
      id: 5, type: 'single-choice',
      question: 'What are you most ready to leave behind?',
      options: [
        { label: 'The "whatever, fine" morning outfit routine' },
        { label: 'Feeling invisible and underdressed' },
        { label: 'Spending money on things that don\'t work' },
        { label: 'Avoiding events because I don\'t know what to wear' },
        { label: 'All of it — I\'m done' },
      ],
      progressPercent: 40,
    },
    {
      id: 6, type: 'text-input',
      question: "What's your first name?",
      subtitle: 'Your Style Freedom Plan is personalized to your answers.',
      ctaLabel: 'Build My Freedom Plan →',
      progressPercent: 55,
    },
    {
      id: 7, type: 'loading',
      headline: "Building your Style Freedom Plan...",
      loadingLines: [
        '✓ Analyzing your style barriers...',
        '✓ Building your freedom formula...',
        '✓ Preparing your plan...',
        '✓ Applying your 77% discount...',
      ],
      autoAdvance: true,
      autoAdvanceDelay: 4000,
      progressPercent: 72,
    },
    {
      id: 8, type: 'results',
      resultTitle: 'Your Style Freedom Plan',
      resultMetrics: [
        { label: 'Plan Type', value: 'The Freedom Reset', color: '#FF2A6D' },
        { label: 'Your Discount', value: '77% OFF', color: '#FF2A6D' },
        { label: 'Time to Change', value: 'This week', color: '#6B6B6B' },
        { label: 'First Outfit', value: 'Today', color: '#6B6B6B' },
      ],
      progressPercent: 100,
    },
    {
      id: 9, type: 'paywall',
      paywallType: 'Helpido',
      progressPercent: 100,
    },
  ],
};

export const funnels: Funnel[] = [
  funnelA, funnelB, funnelC, funnelD,
  funnelE, funnelF, funnelG, funnelH,
  funnelI, funnelJ, funnelK, funnelL,
  funnelM, funnelN,
];

export const getFunnelById = (id: string): Funnel | undefined =>
  funnels.find(f => f.id === id);
