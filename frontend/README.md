# Riad Seif Foundation - Frontend

React + TypeScript + Vite frontend for the Riad Seif Foundation website.

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
frontend/
├── src/
│   ├── api/              # API client for Django backend
│   │   └── client.ts
│   │
│   ├── assets/           # Static assets (images, fonts)
│   │
│   ├── components/
│   │   ├── Layout.tsx    # Main layout with header/footer
│   │   ├── pages/        # Page components
│   │   │   ├── index.ts  # Barrel export
│   │   │   ├── Home.tsx
│   │   │   ├── About.tsx
│   │   │   ├── Founder.tsx
│   │   │   ├── Center.tsx
│   │   │   ├── Forum.tsx
│   │   │   ├── Publications.tsx
│   │   │   └── Contact.tsx
│   │   └── ui/           # Reusable UI components (shadcn)
│   │
│   ├── constants/
│   │   └── theme.ts      # Brand colors, fonts, patterns
│   │
│   ├── hooks/
│   │   ├── index.ts      # Barrel export
│   │   ├── useApi.ts     # Data fetching hooks
│   │   └── useTranslation.ts
│   │
│   ├── types/
│   │   └── index.ts      # TypeScript interfaces
│   │
│   ├── utils/
│   │   └── content.ts    # Static content (fallback)
│   │
│   ├── App.tsx           # Main app with routing
│   ├── main.tsx          # Entry point
│   └── index.css         # Base styles
│
├── index.html
├── package.json
├── vite.config.ts
└── README.md
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file:

```env
VITE_API_URL=http://localhost:8000/api
```

### API Client

The API client is configured in `src/api/client.ts`. It defaults to `http://localhost:8000/api` for development.

## 🌐 Bilingual Support

The site supports English and Arabic:

- **Language Toggle**: In the top header bar
- **RTL/LTR**: Automatic layout direction switching
- **Amiri Font**: Used for Arabic text
- **Content**: All text in `src/utils/content.ts`

### Using Translation Hook

```typescript
import { useTranslation } from '../hooks';

function MyComponent({ lang }) {
  const { t, isRTL, ArrowIcon, formatDate } = useTranslation(lang);
  
  return (
    <div dir={isRTL ? 'rtl' : 'ltr'}>
      <h1>{t.nav.home}</h1>
      <ArrowIcon size={16} />
    </div>
  );
}
```

## 🎨 Theme

Brand colors are defined in `src/constants/theme.ts`:

```typescript
import { colors } from '../constants/theme';

// colors.primary    = '#1c3944'  (Dark teal)
// colors.accent     = '#f7c20e'  (Gold)
// colors.secondary  = '#2c1d5f'  (Deep purple)
```

## 📦 Dependencies

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS v4** - Styling
- **Wouter** - Routing
- **Motion** - Animations
- **Lucide React** - Icons

## 🧪 Development

```bash
# Start dev server
npm run dev

# Type checking
npx tsc --noEmit

# Build
npm run build
```

