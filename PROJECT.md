# Foodiet - Smart Food & Activity Tracking App

## Project Overview

**Foodiet** is a lean, AI-powered mobile app designed to help users quickly track food and activity, compare against personalized health targets, and discover smarter food swaps based on community insights and AI recommendations.

### Development Timeline
- **Target**: 4-hour development sprint
- **Goal**: Deliver a functional MVP with core features

---

## Core Features

### 1. Profile & Targets Setup
**User Onboarding**
- Age, sex, and location input
- Three preset health targets:

#### Target Options
| Target | Description | Calorie Adjustment | Protein Focus | Activity Level |
|--------|-------------|-------------------|---------------|----------------|
| **Normal** | Balanced lifestyle | Baseline calories/macros | Standard protein | Light activity |
| **Sporty** | Active lifestyle | +15% calories | Higher protein | More active minutes |
| **IronMan** | High-performance | +35% calories | Very high protein | Heavy activity |

**Daily Goals Include:**
- Calorie targets
- Sugar limits
- Protein requirements
- Activity minutes

### 2. Daily Capture System
**Multi-Modal Input Support**
- **Photo Upload**: Product images and nutrition labels
- **Voice Notes**: Natural language input (e.g., "I walked 30 minutes, ate pasta and chicken")
- **Text Input**: Quick manual notes

**AI Processing Pipeline**
- OCR for nutrition label extraction
- Speech-to-text for voice notes
- LLM orchestration for food/activity parsing
- Automatic calorie and macro calculation

### 3. Alternatives Engine
**Dual Recommendation System**

#### Community Swaps
- Based on actual user behavior
- Shows usage statistics ("chosen 85× by others")
- Real-world tested alternatives

#### AI-Recommended Swaps
- Rule-based suggestions per target type:
  - **Normal**: Lower calorie options
  - **Sporty**: Higher protein alternatives
  - **IronMan**: Maximum protein, performance-focused

**Display Features**
- Clear deltas ("−120 kcal", "+8g protein")
- Usage badges and community validation
- Target-specific optimization

### 4. Store Finder Integration
**Location-Based Shopping**
- Google Places API integration
- Interactive map display
- Store details and directions
- Real-time availability for recommended products

---

## Technical Architecture

### Frontend Stack
- **Framework**: Next.js 14+ (App Router)
- **Styling**: Tailwind CSS
- **Maps**: Google Maps JavaScript API
- **UI Components**: Responsive, mobile-first design
- **State Management**: React Context/Redux Toolkit

### Backend Services
- **AI Processing**: Python Flask API
  - OCR for nutrition label reading
  - Whisper for speech-to-text
  - LLM orchestration for food parsing
- **API Endpoints**: RESTful design
- **Image Processing**: Computer vision for food recognition

### Data & Authentication
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **File Storage**: Supabase Storage
- **Real-time**: Supabase real-time subscriptions

### Deployment
- **Frontend**: Vercel (Next.js)
- **Backend**: Vercel Serverless Functions or separate Flask deployment
- **Database**: Supabase Cloud
- **CDN**: Vercel Edge Network

---

## Project Structure

```
foodiet/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (auth)/            # Authentication routes
│   │   ├── dashboard/         # Main app interface
│   │   ├── profile/           # User profile & targets
│   │   └── api/               # API routes
│   ├── components/            # Reusable UI components
│   │   ├── ui/                # Base UI components
│   │   ├── forms/             # Form components
│   │   ├── tracking/          # Food/activity tracking
│   │   └── maps/              # Store finder components
│   ├── lib/                   # Utility functions
│   │   ├── supabase/          # Database client
│   │   ├── ai/                # AI service integration
│   │   └── utils/             # Helper functions
│   ├── types/                 # TypeScript definitions
│   └── config/                # Configuration files
├── backend/                   # Python Flask API
│   ├── app.py                 # Main Flask application
│   ├── services/              # AI processing services
│   │   ├── ocr.py             # Nutrition label OCR
│   │   ├── speech.py          # Voice processing
│   │   └── llm.py             # Food parsing logic
│   └── requirements.txt       # Python dependencies
├── docs/                      # Project documentation
└── tests/                     # Test suites
```

---

## Key User Flows

### 1. Onboarding Flow
1. User opens app
2. Enters basic profile info (age, sex, location)
3. Selects health target (Normal/Sporty/IronMan)
4. Views personalized daily goals
5. Proceeds to main dashboard

### 2. Daily Tracking Flow
1. User taps "Add Entry"
2. Chooses input method (photo/voice/text)
3. AI processes input and extracts data
4. User reviews/confirms parsed information
5. Entry added to daily log
6. Progress updated against targets

### 3. Alternatives Discovery Flow
1. User views logged food item
2. App shows community and AI alternatives
3. User compares nutritional deltas
4. Taps alternative to see store locations
5. Opens map with nearby stores
6. Gets directions to selected store

---

## Success Metrics

### Technical KPIs
- **Processing Speed**: <3 seconds for photo/voice input
- **Accuracy**: >90% correct food identification
- **Uptime**: 99.9% availability
- **Response Time**: <500ms for API calls

### User Experience KPIs
- **Onboarding Completion**: >80% complete profile setup
- **Daily Usage**: >70% daily active users
- **Alternative Adoption**: >30% try recommended swaps
- **Store Visits**: Track conversion from app to store

---

## Development Phases

### Phase 1: Core Infrastructure (1 hour)
- [ ] Next.js project setup with Tailwind
- [ ] Supabase integration
- [ ] Basic authentication flow
- [ ] Profile and targets setup

### Phase 2: Tracking System (1.5 hours)
- [ ] Multi-modal input components
- [ ] Flask API for AI processing
- [ ] OCR and speech-to-text integration
- [ ] Food/activity parsing logic

### Phase 3: Alternatives Engine (1 hour)
- [ ] Community data structure
- [ ] AI recommendation algorithms
- [ ] Delta calculation and display
- [ ] Usage statistics tracking

### Phase 4: Store Integration (30 minutes)
- [ ] Google Maps API integration
- [ ] Store finder component
- [ ] Location services
- [ ] Directions integration

---

## Risk Mitigation

### Technical Risks
- **AI Accuracy**: Implement fallback manual input options
- **API Rate Limits**: Cache responses and implement retry logic
- **Performance**: Optimize images and implement lazy loading
- **Mobile Compatibility**: Test across devices and browsers

### Business Risks
- **User Adoption**: Focus on intuitive UX and quick value delivery
- **Data Quality**: Implement validation and user feedback loops
- **Store Integration**: Start with major chains, expand gradually
- **Privacy Concerns**: Clear data usage policies and user controls

---

## Future Enhancements

### Short-term (Post-MVP)
- Social features and community challenges
- Barcode scanning for packaged foods
- Integration with fitness trackers
- Meal planning and prep suggestions

### Long-term Vision
- Personalized nutrition coaching
- Integration with grocery delivery services
- Corporate wellness programs
- Advanced analytics and insights

---

## Getting Started

### Prerequisites
- Node.js 18+
- Python 3.9+
- Supabase account
- Google Cloud Platform account (for Maps API)

### Quick Start
```bash
# Clone repository
git clone [repository-url]
cd foodiet

# Install dependencies
npm install
pip install -r backend/requirements.txt

# Set up environment variables
cp .env.example .env.local
# Configure Supabase and Google API keys

# Start development servers
npm run dev          # Next.js frontend
python backend/app.py # Flask backend
```

---

*Last Updated: [Current Date]*
*Version: 1.0.0*
*Status: Development*
