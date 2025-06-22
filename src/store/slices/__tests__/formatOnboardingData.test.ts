import { formatOnboardingData } from '../onboardingSlice' // adjust import path
import { OnboardingState } from '@/src/types'

jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
}))

describe('formatOnboardingData', () => {
  const mockDate = '2023-01-01T00:00:00.000Z'

  beforeAll(() => {
    jest.useFakeTimers().setSystemTime(new Date(mockDate))
  })

  afterAll(() => {
    jest.useRealTimers()
  })

  it('should format onboarding state into FormattedOnboardingData', () => {
    const mockState: OnboardingState = {
      currentStep: 2,
      totalSteps: 4,
      healthConcerns: [],
      prioritizedConcerns: [
        { id: 1, name: 'Sleep' },
        { id: 2, name: 'Stress' },
      ],
      selectedDiets: [{ id: 1, name: 'Vegan', tool_tip: 'Healthy' }],
      isDailyExposure: true,
      isSmoke: false,
      alcohol: '5+',
      allergies: [{ id: 1, name: 'Peanuts' }],
      customAllergies: 'Dust',
      isLoading: false,
      error: null,
      isCompleted: false,
    }

    const result = formatOnboardingData(mockState)

    expect(result).toEqual({
      health_concerns: [
        { id: 1, name: 'Sleep', priority: 1 },
        { id: 2, name: 'Stress', priority: 2 },
      ],
      diets: mockState.selectedDiets,
      is_daily_exposure: true,
      is_smoke: false,
      alcohol: '5+',
      allergies: mockState.allergies,
      custom_allergies: 'Dust',
      timestamp: mockDate,
    })
  })
})
