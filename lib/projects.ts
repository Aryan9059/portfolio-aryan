export type Project = {
  id: string;
  title: string;
  year: string;
  index: string;
  tag: string;
  category: 'android' | 'web' | 'fullstack' | 'tool';
  link: string;
  github?: string;
  tools: string[];
  desc: string;
  logo: string;
  bgColor: string;
  bgGlow: string;
  accent: string;
  featured: boolean;
  stats?: { label: string; value: string }[];
  readme: string;
};

export const projects: Project[] = [
  {
    id: 'phi-launcher',
    title: 'Phi Launcher',
    year: '2025',
    index: '01',
    tag: 'Android Launcher',
    category: 'android',
    link: 'https://play.google.com/store/apps/details?id=com.launcher.hype',
    github: 'https://github.com/Aryan9059/phi-launcher',
    tools: ['Kotlin', 'Jetpack Compose', 'Room DB', 'DataStore', 'GraphQL', 'MVVM'],
    desc: '27,000+ downloads. 4.4★ rating. ₹1.5L+ gross revenue on Play Store.',
    logo: '/philauncher.png',
    bgColor: '#0a1628',
    bgGlow: '#00D4FF',
    accent: '#1E90FF',
    featured: true,
    stats: [
      { label: 'Downloads', value: '27,000+' },
      { label: 'Rating', value: '4.4 ★' },
      { label: 'Revenue', value: '₹1.5L+' },
      { label: 'Platform', value: 'Android' },
    ],
    readme: `## Overview

Phi Launcher is a feature-rich Android home screen replacement built entirely with Jetpack Compose. It ships with a suite of productivity and aesthetic features that have driven **27,000+ organic downloads** and ₹1.5 lakh in gross revenue since launch.

## Features

- **Focus Mode** — Locks the launcher into a distraction-free state, hiding social apps and blocking notifications for a configurable duration.
- **App Launch Delay** — Adds a mandatory pause before opening addictive apps, nudging intentional usage.
- **Custom Theming** — Full per-app icon theming, color palette editor, and dynamic wallpaper tinting via Monet API.
- **Gesture Navigation** — Swipe-based launcher navigation with haptic feedback.
- **Widget Engine** — Custom Compose-based widget system supporting at-a-glance cards.
- **App Analytics** — Usage stats per app with streak tracking and daily goals.

## Architecture

The app follows **Clean Architecture** with a strict MVVM presentation layer.

\`\`\`
app/
├── data/
│   ├── local/          # Room DB entities & DAOs
│   └── repository/     # Repository implementations
├── domain/
│   ├── model/          # Business models
│   └── usecase/        # Single-responsibility use cases
├── presentation/
│   ├── home/           # Home screen Composables
│   ├── settings/       # Settings screens
│   └── viewmodel/      # StateFlow-based ViewModels
└── di/                 # Hilt modules
\`\`\`

## Tech Deep-Dive

**Jetpack Compose** drives the entire UI layer — including custom animations, gesture detectors, and the home screen canvas. No XML layouts exist in the project.

**Room DB** stores app metadata, usage statistics, and focus session logs with type-safe queries via Kotlin coroutines.

**DataStore (Proto)** handles all user preferences — zero SharedPreferences used.

**GraphQL** powers the theming marketplace, allowing users to browse and download community themes.

## Monetization

Phi Launcher uses a **freemium model** — core features are free, with a one-time Pro unlock for advanced theming and analytics. In-app purchases are handled via Google Play Billing Library v6.

## Lessons Learned

> Building a launcher taught me that Android's window management, accessibility services, and Wallpaper Manager APIs are simultaneously powerful and poorly documented. Composables inside RemoteViews are not supported — a painful lesson that required a full widget architecture rewrite.`,
  },

  {
    id: 'pixelfi',
    title: 'PixelFi',
    year: '2024',
    index: '02',
    tag: 'Full-stack · FinTech',
    category: 'fullstack',
    link: '#',
    github: 'https://github.com/Aryan9059/pixelfi',
    tools: ['Next.js', 'FastAPI', 'Apache Kafka', 'Docker', 'Python', 'Clerk', 'ML', 'PostgreSQL'],
    desc: 'Financial portfolio tracker with ML-powered market predictions and a microservices backend.',
    logo: '/pixelfi.webp',
    bgColor: '#1a0a14',
    bgGlow: '#FF1493',
    accent: '#9932CC',
    featured: true,
    stats: [
      { label: 'Services', value: '5 Micro' },
      { label: 'ML Model', value: 'LSTM' },
      { label: 'Latency', value: '<120ms' },
      { label: 'Stack', value: 'Full' },
    ],
    readme: `## Overview

PixelFi is a real-time financial portfolio platform that aggregates stock data, runs ML predictions, and delivers live updates via a Kafka-driven microservices architecture — all wrapped in a polished Next.js dashboard.

## System Architecture

\`\`\`
┌──────────────┐     ┌────────────────┐     ┌──────────────┐
│  Next.js UI  │────▶│  FastAPI Gate  │────▶│  Kafka Bus   │
└──────────────┘     └────────────────┘     └──────┬───────┘
                                                   │
              ┌──────────────┬──────────────────────┤
              ▼              ▼                      ▼
      ┌──────────────┐ ┌──────────┐        ┌──────────────┐
      │ ML Service   │ │ Portfolio│        │ Notif Service│
      │ (LSTM model) │ │ Service  │        │  (webhooks)  │
      └──────────────┘ └──────────┘        └──────────────┘
\`\`\`

## Features

- **Portfolio Dashboard** — Real-time P&L, allocation charts, sector exposure heatmap.
- **ML Predictions** — LSTM neural network trained on 5-year historical OHLCV data, served via FastAPI.
- **Event Streaming** — Apache Kafka pipelines market tick data to the frontend with < 120ms end-to-end latency.
- **Auth** — Clerk handles auth with multi-tenancy support for different portfolio namespaces.
- **Containerized** — All 5 microservices are Dockerized and orchestrated via Docker Compose.

## ML Model

The prediction engine uses a stacked **LSTM (Long Short-Term Memory)** model:

\`\`\`python
model = Sequential([
    LSTM(128, return_sequences=True, input_shape=(60, features)),
    Dropout(0.2),
    LSTM(64, return_sequences=False),
    Dropout(0.2),
    Dense(25),
    Dense(1)
])
\`\`\`

- Training window: 60 days of OHLCV + technical indicators (RSI, MACD, Bollinger Bands)
- Evaluation metric: RMSE on held-out test set

## Kafka Topic Design

| Topic | Producers | Consumers |
|-------|-----------|-----------|
| \`market.ticks\` | Data ingestion service | ML service, Portfolio service |
| \`predictions.out\` | ML service | Frontend WebSocket gateway |
| \`alerts.trigger\` | Portfolio service | Notification service |

## Why Kafka?

REST polling at tick-level frequency (sub-second) creates unacceptable load. Kafka's log-based architecture lets multiple services consume the same market feed independently without coupling them — and scales horizontally with partitions if the user base grows.`,
  },

  {
    id: 'gradloop',
    title: 'GradLoop',
    year: '2024',
    index: '03',
    tag: 'Full-stack · AI',
    category: 'fullstack',
    link: '#',
    github: 'https://github.com/Aryan9059/gradloop',
    tools: ['Next.js', 'TypeScript', 'Prisma', 'Supabase', 'WebSockets', 'Mistral AI', 'Webhooks'],
    desc: 'Alumni networking platform with real-time chat, AI resume generation, and profile analysis.',
    logo: '/gradloop.webp',
    bgColor: '#021a10',
    bgGlow: '#FF4500',
    accent: '#0066FF',
    featured: true,
    stats: [
      { label: 'Real-time', value: 'WebSockets' },
      { label: 'AI Model', value: 'Mistral 7B' },
      { label: 'DB', value: 'Supabase' },
      { label: 'Type', value: 'Full-stack' },
    ],
    readme: `## Overview

GradLoop bridges the gap between students and alumni by providing a professional networking space with real-time messaging, AI-powered resume tools, and smart profile matching — all built for IIIT Allahabad's community.

## Core Features

### Real-time Chat
WebSocket connections managed via Supabase Realtime. Messages are persisted to PostgreSQL and delivered with < 50ms latency on LAN.

### AI Resume Generator
Integrates **Mistral 7B** (via API) to generate personalized resumes from structured profile data. The model is prompted with a JSON representation of the user's skills, experience, and achievements.

\`\`\`typescript
const prompt = buildResumePrompt({
  profile: user.profile,
  targetRole: form.role,
  tone: form.tone, // 'professional' | 'creative' | 'technical'
});
const resume = await mistral.chat({ model: 'mistral-7b-instruct', messages: [{ role: 'user', content: prompt }] });
\`\`\`

### Profile Analysis
A compatibility score between student and alumni profiles is computed using weighted cosine similarity over skill vectors.

### Webhooks
Supabase Database Webhooks trigger background jobs for:
- Email notifications on new connection requests
- Slack alerts for admin moderation events
- Profile view analytics aggregation

## Database Schema (simplified)

\`\`\`sql
users         (id, email, role, created_at)
profiles      (user_id, bio, skills[], github, linkedin)
connections   (requester_id, receiver_id, status, created_at)
messages      (id, room_id, sender_id, content, created_at)
rooms         (id, type, participants[])
\`\`\`

## Tech Choices

| Decision | Reason |
|----------|--------|
| Supabase over Firebase | Row-level security, SQL power, open-source |
| Prisma ORM | Type-safe queries, migration system |
| Mistral over GPT-4 | Cost-efficient for resume generation at scale |
| Next.js App Router | RSC for profile pages, client components for chat |

## Challenges

Handling **optimistic UI** for chat messages while guaranteeing delivery was the hardest part. Messages are inserted optimistically in local state, then reconciled against the WebSocket confirmation event — with a retry queue for failed sends.`,
  },

  {
    id: 'hypeui',
    title: 'HypeUI',
    year: '2024',
    index: '04',
    tag: 'Android Library',
    category: 'android',
    link: '#',
    github: 'https://github.com/Aryan9059/hypeui',
    tools: ['Kotlin', 'Jetpack Compose', 'Maven Central', 'KDoc'],
    desc: 'Open-source Jetpack Compose component library with 30+ battle-tested UI components.',
    logo: '',
    bgColor: '#100820',
    bgGlow: '#7F52FF',
    accent: '#7F52FF',
    featured: false,
    stats: [
      { label: 'Components', value: '30+' },
      { label: 'Language', value: 'Kotlin' },
      { label: 'Platform', value: 'Android' },
      { label: 'Published', value: 'Maven' },
    ],
    readme: `## Overview

HypeUI is a Jetpack Compose component library born from Phi Launcher's internal design system. After building the same animated buttons and bottom sheets repeatedly, I extracted, polished, and published them as an open-source library.

## Components

### Interactive
- \`HypeButton\` — Animated press feedback, loading states, icon slots
- \`HypeChip\` — Filterable, closeable, multi-select
- \`HypeBottomSheet\` — Gesture-driven, snap points, backdrop blur
- \`HypeTooltip\` — Smart positioning, arrow pointer, dismiss on tap

### Layout
- \`HypeCard\` — Elevation, border, gradient variants
- \`HypeScaffold\` — Extended Scaffold with collapsing header support
- \`HypeGrid\` — Lazy grid with staggered support

### Data Display
- \`HypeProgress\` — Linear, circular, segmented variants
- \`HypeBadge\` — Dot, count, status
- \`HypeTimeline\` — Vertical event timeline with custom node rendering

## Installation

\`\`\`kotlin
// build.gradle.kts
dependencies {
    implementation("io.github.aryan9059:hypeui:1.2.0")
}
\`\`\`

## Usage Example

\`\`\`kotlin
@Composable
fun MyScreen() {
    HypeButton(
        text = "Launch",
        variant = ButtonVariant.Primary,
        isLoading = viewModel.isLoading,
        onClick = { viewModel.onLaunch() }
    )
}
\`\`\`

## Design Tokens

All components reference a central \`HypeTheme\` object that wraps MaterialTheme, allowing full custom color schemes, typography scales, and shape systems in one place.`,
  },

  {
    id: 'notifiq',
    title: 'NotifiQ',
    year: '2023',
    index: '05',
    tag: 'Android · Productivity',
    category: 'android',
    link: '#',
    github: 'https://github.com/Aryan9059/notifiq',
    tools: ['Kotlin', 'NotificationListenerService', 'Room DB', 'WorkManager', 'Coroutines'],
    desc: 'Smart notification manager with AI-based priority sorting, snooze, and digest summaries.',
    logo: '',
    bgColor: '#0a1800',
    bgGlow: '#39FF14',
    accent: '#39FF14',
    featured: false,
    stats: [
      { label: 'API', value: 'NLS' },
      { label: 'Language', value: 'Kotlin' },
      { label: 'Background', value: 'WorkManager' },
      { label: 'Storage', value: 'Room' },
    ],
    readme: `## Overview

NotifiQ intercepts Android notifications via \`NotificationListenerService\`, scores them by urgency using a rule-based classifier, and surfaces a clean daily digest — so you check your phone intentionally instead of reactively.

## How It Works

1. \`NotificationListenerService\` receives every posted/removed notification.
2. Each notification is scored (0–100) using a rule engine: sender whitelist, keyword matching, app category.
3. High-priority notifications are surfaced immediately. Low-priority ones are batched.
4. \`WorkManager\` triggers a digest at 9 AM and 6 PM with a grouped summary notification.

## Priority Scoring

\`\`\`kotlin
fun score(notification: StatusBarNotification): Int {
    var score = 0
    if (notification.packageName in whitelistedApps) score += 40
    if (containsUrgentKeyword(notification.extras)) score += 30
    if (notification.category == CATEGORY_CALL) score += 50
    return score.coerceIn(0, 100)
}
\`\`\`

## Storage

All notifications are persisted in Room for 7 days, enabling:
- Full notification history browser
- Per-app analytics (count, peak hours)
- Snooze queue (reminder at a user-defined time via \`AlarmManager\`)

## Challenges

Android's battery optimization kills background services aggressively. The solution was a persistent foreground notification (user-visible) combined with a Doze-aware \`WorkManager\` job to re-bind the listener service after device restarts.`,
  },

  {
    id: 'coderunner',
    title: 'CodeRunner',
    year: '2023',
    index: '06',
    tag: 'Web Tool',
    category: 'web',
    link: '#',
    github: 'https://github.com/Aryan9059/coderunner',
    tools: ['Next.js', 'TypeScript', 'Judge0 API', 'Monaco Editor', 'Tailwind CSS'],
    desc: 'Browser-based competitive programming IDE with 40+ language support and test case runner.',
    logo: '',
    bgColor: '#0a0a14',
    bgGlow: '#F7DF1E',
    accent: '#F7DF1E',
    featured: false,
    stats: [
      { label: 'Languages', value: '40+' },
      { label: 'Editor', value: 'Monaco' },
      { label: 'Judge', value: 'Judge0' },
      { label: 'Type', value: 'Web App' },
    ],
    readme: `## Overview

CodeRunner is a competitive programming IDE that runs in the browser. It uses Monaco Editor (the engine behind VS Code) for editing and Judge0 for remote code execution — supporting 40+ languages with zero setup.

## Features

- **Monaco Editor** — Full VS Code keybindings, IntelliSense stubs, multi-cursor
- **Judge0 Integration** — Submits code to Judge0 CE, polls for result, displays stdout/stderr/verdict
- **Test Cases** — Add custom test cases, run all at once, diff expected vs actual output
- **Templates** — One-click starter templates for common CP patterns (segment tree, Dijkstra, etc.)
- **Timer** — Countdown timer with auto-submit for practice contests

## Architecture

\`\`\`
components/
├── Editor/          # Monaco wrapper with language config
├── TestRunner/      # Test case list + results
├── Toolbar/         # Language selector, run button, timer
└── Output/          # Stdout, stderr, verdict display

lib/
├── judge0.ts        # Submission + polling logic
└── templates.ts     # Per-language starter code
\`\`\`

## Judge0 Flow

\`\`\`typescript
// 1. Submit
const { token } = await judge0.submit({ source_code, language_id, stdin });

// 2. Poll until done
while (true) {
  const result = await judge0.getSubmission(token);
  if (result.status.id > 2) return result; // 1=In Queue, 2=Processing
  await sleep(500);
}
\`\`\`

## Why Not a Server?

Judge0 Community Edition can be self-hosted on any VPS. For this project, the public Judge0 API is used with rate limiting on the client — keeping the app fully static (no backend required).`,
  },

  {
    id: 'trackit',
    title: 'TrackIt',
    year: '2023',
    index: '07',
    tag: 'Android · Health',
    category: 'android',
    link: '#',
    github: 'https://github.com/Aryan9059/trackit',
    tools: ['Kotlin', 'Jetpack Compose', 'Health Connect', 'Room DB', 'MPAndroidChart'],
    desc: 'Minimalist habit and health tracker integrating with Android Health Connect API.',
    logo: '',
    bgColor: '#0d1a0a',
    bgGlow: '#3ECF8E',
    accent: '#3ECF8E',
    featured: false,
    stats: [
      { label: 'API', value: 'Health Connect' },
      { label: 'Charts', value: 'MPAndroidChart' },
      { label: 'Design', value: 'Material 3' },
      { label: 'Language', value: 'Kotlin' },
    ],
    readme: `## Overview

TrackIt is a minimalist habit tracker that reads from Android's Health Connect API to auto-fill health-related habits (steps, sleep, workouts) — so you don't need to log what your phone already knows.

## Features

- **Habit Streaks** — Daily, weekly, and custom frequency habits with streak tracking and freeze credits.
- **Health Connect** — Reads steps, sleep duration, and active energy from the Health Connect data store. If today's step count exceeds your goal, the "10k steps" habit auto-completes.
- **Charts** — MPAndroidChart renders 30-day completion heatmaps and weekly trend bars.
- **Reminders** — Notification reminders via \`AlarmManager\` at user-defined times.
- **Widgets** — Glanceable home screen widget showing today's habit completion status.

## Health Connect Integration

\`\`\`kotlin
val client = HealthConnectClient.getOrCreate(context)

suspend fun getTodaySteps(): Long {
    val response = client.readRecords(
        ReadRecordsRequest(
            recordType = StepsRecord::class,
            timeRangeFilter = TimeRangeFilter.between(startOfDay, now)
        )
    )
    return response.records.sumOf { it.count }
}
\`\`\`

## Data Model

Each habit stores:
- \`frequency\`: DAILY | WEEKLY | CUSTOM
- \`completions[]\`: timestamps of each completion
- \`source\`: MANUAL | HEALTH_CONNECT (auto-completed)
- \`freezes\`: number of unused streak-freeze credits

## Design

Follows Material 3 dynamic color — the app's theme adapts to the user's wallpaper on Android 12+.`,
  },

  {
    id: 'devboard',
    title: 'DevBoard',
    year: '2023',
    index: '08',
    tag: 'Web · Dashboard',
    category: 'web',
    link: '#',
    github: 'https://github.com/Aryan9059/devboard',
    tools: ['Next.js', 'TypeScript', 'GitHub API', 'LeetCode API', 'Codeforces API', 'Recharts'],
    desc: 'Developer stats dashboard aggregating GitHub, LeetCode, and Codeforces data in one view.',
    logo: '',
    bgColor: '#0a0e1a',
    bgGlow: '#FF6B35',
    accent: '#FF6B35',
    featured: false,
    stats: [
      { label: 'APIs', value: '3 Sources' },
      { label: 'Charts', value: 'Recharts' },
      { label: 'Cache', value: 'SWR' },
      { label: 'Type', value: 'Dashboard' },
    ],
    readme: `## Overview

DevBoard is a unified developer stats page that pulls data from GitHub, LeetCode, and Codeforces — giving a single-pane view of contributions, problem-solving progress, and contest ratings.

## Data Sources

| Platform | Data |
|----------|------|
| GitHub API v3 | Contribution graph, repo stats, language breakdown |
| LeetCode GraphQL | Solved count by difficulty, submission calendar, contest rating |
| Codeforces API | Rating history, recent submissions, problem tags solved |

## Architecture

All API calls are made in **Next.js Route Handlers** (not client-side) to:
1. Hide API keys
2. Aggregate and normalize responses into a common schema
3. Cache responses with \`revalidate: 3600\` (ISR)

\`\`\`typescript
// app/api/stats/github/route.ts
export async function GET() {
  const data = await fetch('https://api.github.com/users/Aryan9059', {
    headers: { Authorization: \`Bearer \${process.env.GITHUB_TOKEN}\` },
    next: { revalidate: 3600 },
  });
  return NextResponse.json(await data.json());
}
\`\`\`

## Charts

- **Contribution Heatmap** — Custom SVG grid matching GitHub's style
- **Rating History** — Recharts LineChart with gradient fill, hover tooltips
- **Language Pie** — Recharts PieChart with animated entrance

## Why Build This?

Recruiter screens often involve copying profile links from 3 different tabs. DevBoard makes sharing a single URL that tells the complete story.`,
  },
];

export const featuredProjects = projects.filter(p => p.featured);

export const getProjectById = (id: string) => projects.find(p => p.id === id);
