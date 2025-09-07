# Man vs Machine - Foodiet App Repository Overview

## 🚀 Project Summary

**Foodiet** is a Progressive Web App (PWA) for smart food and activity tracking with AI-powered nutrition insights. Built as a modern, mobile-first application using Next.js 15, TypeScript, and Tailwind CSS.

### 🎯 **Current Status**
- ✅ **MVP Complete**: Fully functional onboarding and dashboard
- ✅ **PWA Ready**: Service worker, offline support, installable
- ✅ **Production Ready**: Deployed on Vercel with optimizations
- 🔧 **Active Development**: Enhanced profile features and UX improvements

---

## 🏗️ **Technical Architecture**

### **Frontend Stack**
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **PWA**: next-pwa for service worker and caching

### **Development Tools**
- **Build**: Turbopack (Next.js 15)
- **Linting**: ESLint with Next.js config
- **Package Manager**: npm
- **Deployment**: Vercel with automatic deployments

### **PWA Features**
- ✅ Service Worker with caching strategies
- ✅ Offline functionality
- ✅ App manifest with shortcuts
- ✅ Custom install prompts
- ✅ Native app-like experience

---

## 📁 **Project Structure**

```
man-vs-machine/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── layout.tsx         # Root layout with PWA metadata
│   │   ├── page.tsx           # Main app entry point
│   │   └── favicon.ico/       # Dynamic favicon
│   ├── components/
│   │   ├── FoodietApp.tsx     # Main app orchestrator
│   │   ├── PWAInstallPrompt.tsx # PWA installation UI
│   │   ├── onboarding/        # User onboarding flow
│   │   │   ├── OnboardingContainer.tsx # Flow orchestrator
│   │   │   ├── WelcomeStep.tsx         # Welcome screen
│   │   │   ├── ProfileStep.tsx         # Profile setup ⭐ ENHANCED
│   │   │   └── TargetsStep.tsx         # Health targets
│   │   └── webapp/            # Main application interface
│   │       ├── WebAppInterface.tsx     # Main UI shell
│   │       ├── AppSidebar.tsx         # Navigation sidebar
│   │       ├── DashboardContent.tsx   # Dashboard view
│   │       ├── StatsGrid.tsx          # Stats display
│   │       ├── FoodLog.tsx            # Food logging
│   │       ├── SmartSwaps.tsx         # Food alternatives
│   │       └── QuickActions.tsx       # Action buttons
│   ├── config/
│   │   ├── constants.ts       # App constants and configs
│   │   ├── errors.ts          # Error handling
│   │   ├── logger.ts          # Logging utilities
│   │   └── env.ts             # Environment variables
│   └── types/
│       ├── index.ts           # Main type definitions ⭐ ENHANCED
│       └── next-pwa.d.ts      # PWA type definitions
├── public/
│   ├── manifest.json          # PWA manifest
│   └── icons/                 # App icons (72px-512px)
├── scripts/
│   └── generate-icons.js      # Icon generation script
├── docs/                      # Project documentation
│   ├── PROJECT.md            # Original project specification
│   ├── PWA-FEATURES.md       # PWA implementation details
│   └── DEPLOYMENT.md         # Deployment instructions
├── next.config.ts            # Next.js configuration with PWA
├── tailwind.config.js        # Tailwind CSS configuration
├── tsconfig.json             # TypeScript configuration
└── vercel.json               # Vercel deployment config
```

---

## 🎭 **Application Flow**

### **1. App Initialization**
- `FoodietApp.tsx` manages global app state
- Determines view: `onboarding` or `webapp`
- Handles onboarding completion transition

### **2. Onboarding Flow** ⭐ **Recently Enhanced**
1. **Welcome Step**: Introduction and features overview
2. **Profile Step**: Enhanced user profile creation
   - ✅ First Name & Last Name fields
   - ✅ Profile picture upload (drag & drop)
   - ✅ Gender identity dropdown (California-inclusive options)
   - ✅ Age and location inputs
   - ✅ Custom focus styles (no blue outline)
3. **Targets Step**: Health goal selection (Foundation/Performance/IronMan)

### **3. Main Application**
- **Dashboard**: Stats overview, food log, smart swaps
- **Sidebar Navigation**: Multi-section app navigation
- **PWA Features**: Install prompt, offline capability

---

## 📊 **Key Components Deep Dive**

### **Enhanced Profile Step** (Latest Updates)
```typescript
// Enhanced UserProfile type
interface UserProfile {
  firstName: string;        // ✅ New
  lastName: string;         // ✅ New
  profilePicture: string;   // ✅ New (base64)
  age: string;
  sex: 'Male' | 'Female' | 'Non-binary' | 'Other' | 'Prefer not to say'; // ✅ Enhanced
  location: string;
  target: HealthTarget;
}
```

**Features:**
- Drag & drop profile picture upload
- File reading with base64 conversion
- California-inclusive gender options
- Custom focus styles for all inputs
- Responsive two-column name layout
- Form validation for all required fields

### **Health Targets System**
```typescript
type HealthTarget = 'normal' | 'sporty' | 'ironman';

// Target configurations with different calorie/activity levels
- Foundation: Balanced nutrition, moderate activity
- Performance: +15% calories, enhanced performance focus
- IronMan: +35% calories, elite training optimization
```

### **PWA Integration**
- Service worker with runtime caching
- Offline-first architecture
- Custom install prompts
- App shortcuts for quick actions
- Cross-platform compatibility

---

## 🛠️ **Development Workflow**

### **Getting Started**
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

### **Key Scripts**
- `dev`: Development with Turbopack
- `build`: Production build with Turbopack
- `start`: Production server
- `lint`: ESLint checking

### **Branch Strategy**
- `main`: Production-ready code
- `vadim/ui-1`: Current development branch with UI enhancements

---

## 🎨 **Design System**

### **Color Palette**
- **Primary**: Emerald green (`#00d4aa`)
- **Grays**: 50, 100, 200, 600, 800, 900
- **Backgrounds**: Light gray gradients
- **Accents**: Blue, red, orange for specific states

### **Typography**
- **Primary Font**: Geist Sans
- **Mono Font**: Geist Mono
- **Weights**: Regular, medium, semibold, bold

### **Component Patterns**
- Rounded corners: `rounded-2xl`, `rounded-3xl`
- Shadows: Subtle elevation with gray shadows
- Borders: 2px thickness for interactive elements
- Focus states: Dark gray borders, no blue outline
- Transitions: Smooth hover and state changes

---

## 🔧 **Configuration Files**

### **Next.js Config** (`next.config.ts`)
- PWA configuration with next-pwa
- Turbopack enabled for development and build
- Service worker generation
- Offline support

### **Tailwind Config**
- Custom color palette
- Responsive breakpoints
- Component utilities
- CSS variables for theming

### **TypeScript Config**
- Strict mode enabled
- Path aliases (`@/` for src)
- Next.js optimizations
- Module resolution for PWA types

---

## 📱 **PWA Capabilities**

### **Installation**
- Custom install prompts on supported browsers
- App shortcuts for quick access
- Standalone app experience
- Cross-platform compatibility

### **Offline Features**
- Service worker caching strategies
- Core functionality works offline
- Background sync when online
- Smart cache management

### **Performance**
- Runtime caching for static assets
- Font optimization (365-day cache)
- Image caching (24-hour cache)
- Code splitting and lazy loading

---

## 🚀 **Deployment**

### **Current Deployment**
- **Platform**: Vercel
- **Domain**: Auto-generated Vercel domain
- **Environment**: Production
- **Build**: Automatic on git push

### **Deployment Features**
- Automatic deployments from git
- Preview deployments for PRs
- Edge CDN distribution
- Analytics and monitoring

---

## 📈 **Recent Enhancements**

### **Profile Step Improvements** (Latest Session)
1. ✅ Added first name and last name fields
2. ✅ Implemented profile picture upload with preview
3. ✅ Enhanced gender options with California-inclusive choices
4. ✅ Custom focus styles removing default blue outlines
5. ✅ Updated TypeScript types for new fields
6. ✅ Enhanced form validation for required fields

### **Design Consistency**
- Maintained original visual design language
- Preserved button styles and layouts
- Consistent focus states across all inputs
- Responsive design for mobile-first experience

---

## 🎯 **Future Development Areas**

### **Immediate Opportunities**
- Backend API integration for data persistence
- User authentication system
- Real-time data synchronization
- Push notifications for goals

### **Feature Extensions**
- AI-powered food recognition
- Barcode scanning
- Social features and community
- Integration with fitness trackers

### **Technical Improvements**
- State management (Redux/Zustand)
- Testing suite implementation
- CI/CD pipeline enhancements
- Performance monitoring

---

## 📚 **Key Resources**

### **Documentation**
- `PROJECT.md`: Original project specification
- `PWA-FEATURES.md`: PWA implementation details
- `DEPLOYMENT.md`: Deployment instructions
- Component JSDoc: Inline documentation

### **External Dependencies**
- Next.js 15: React framework
- Lucide React: Icon library
- next-pwa: PWA functionality
- Tailwind CSS: Utility-first styling

---

## 🏷️ **Project Metadata**

- **Repository**: man-vs-machine
- **Type**: Progressive Web Application
- **Target**: Mobile-first nutrition tracking
- **Status**: MVP Complete, Active Development
- **Last Updated**: Current session with profile enhancements
- **Tech Stack**: Next.js 15 + TypeScript + Tailwind + PWA

---

*This overview serves as a comprehensive guide for understanding the current state of the Foodiet app and provides context for future development sessions.*
