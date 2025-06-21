# DailyVita – Personalized Vitamin Onboarding App

A modern React Native (TypeScript) app that guides users through a personalized vitamin recommendation onboarding process.

![React Native](https://img.shields.io/badge/React%20Native-0.79.4-blue.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)
![Expo](https://img.shields.io/badge/Expo-SDK%2053-blue.svg)

## 📱 Features

- **Multi-step Onboarding:** Guided flow with progress tracking
- **Health Concerns:** Select and prioritize up to 5 concerns (drag-and-drop)
- **Diet Preferences:** Choose dietary options with tooltips
- **Allergy Management:** Select or add allergies
- **Lifestyle Assessment:** Questionnaire for lifestyle factors
- **Data Persistence:** User preferences saved with AsyncStorage
- **Modern UI:** Smooth animations and transitions
- **Cross-Platform:** iOS & Android support

## 🛠 Tech Stack

- **Framework:** React Native + Expo
- **Language:** TypeScript
- **State:** Redux Toolkit
- **Navigation:** React Navigation 6
- **Async:** Redux Toolkit Query
- **Storage:** AsyncStorage
- **Gestures:** React Native Gesture Handler
- **Drag & Drop:** Draggable FlatList
- **Icons:** Vector Icons
- **Safe Area:** Safe Area Context

## 🚀 Getting Started

### Prerequisites

- Node.js (v16+)
- npm or yarn
- Expo CLI
- iOS Simulator / Android Studio

### Installation

```bash
git clone https://github.com/yourusername/DailyVita.git
cd DailyVita
npm install # or yarn install
```

### Running the App

```bash
npm start        # or yarn start
npm run ios      # iOS simulator
npm run android  # Android emulator
npm run web      # Web browser
```

## 🎯 Usage

### Onboarding Steps

1. **Welcome:** App introduction
2. **Health Concerns:** Select & prioritize up to 5
3. **Diet:** Choose preferences
4. **Allergies:** Select/add allergies
5. **Lifestyle:** Answer lifestyle questions
6. **Completion:** Data saved and logged

#### Output Data Format

```json
{
  "health_concerns": [
    { "id": 1, "name": "Sleep", "priority": 1 },
    { "id": 2, "name": "Immunity", "priority": 2 }
  ],
  "diets": [{ "id": 1, "name": "Vegan", "tool_tip": "Description..." }],
  "is_daily_exposure": true,
  "is_smoke": false,
  "alcohol": "0-1",
  "allergies": [{ "id": 1, "name": "Milk" }],
  "custom_allergies": "Custom allergy text",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## 🧪 Scripts

```bash
# Development
npm start          # Expo dev server
npm run ios        # iOS simulator
npm run android    # Android emulator
npm run web        # Web browser

# Code Quality
npm run lint       # ESLint
npm run lint:fix   # Fix ESLint issues
npm run format     # Prettier
npm run type-check # TypeScript check

# Build
npm run build      # Production build
```
