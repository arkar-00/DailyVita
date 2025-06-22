import { OnboardingState } from '@/src/types'
import reducer, * as actions from '../onboardingSlice'

jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
}))

const initialState: OnboardingState = {
  currentStep: 0,
  totalSteps: 4,
  healthConcerns: [],
  prioritizedConcerns: [],
  selectedDiets: [],
  isDailyExposure: null,
  isSmoke: null,
  alcohol: null,
  allergies: [],
  customAllergies: '',
  isLoading: false,
  error: null,
  isCompleted: false,
}

// Unit tests for onboardingSlice reducers
describe('onboarding reducers', () => {
  // Test: setCurrentStep should update currentStep
  it('setCurrentStep should update currentStep', () => {
    const nextState = reducer(initialState, actions.setCurrentStep(2))
    expect(nextState.currentStep).toBe(2)
  })

  // Test: nextStep should increment currentStep
  it('nextStep should increment currentStep', () => {
    const nextState = reducer(initialState, actions.nextStep())
    expect(nextState.currentStep).toBe(1)
  })

  // Test: prevStep should decrement currentStep
  it('prevStep should decrement currentStep', () => {
    const modifiedState = { ...initialState, currentStep: 2 }
    const nextState = reducer(modifiedState, actions.prevStep())
    expect(nextState.currentStep).toBe(1)
  })

  // Test: prevStep should not decrement below 0
  it('prevStep should not decrement below 0', () => {
    const nextState = reducer(initialState, actions.prevStep())
    expect(nextState.currentStep).toBe(0)
  })

  // Test: setHealthConcerns should update healthConcerns
  it('setHealthConcerns should update healthConcerns', () => {
    const concerns = [
      { id: 1, name: 'Sleep' },
      { id: 2, name: 'Immunity' },
    ]
    const nextState = reducer(initialState, actions.setHealthConcerns(concerns))
    expect(nextState.healthConcerns).toEqual(concerns)
  })

  // Test: setPrioritizedConcerns should update prioritizedConcerns
  it('setPrioritizedConcerns should update prioritizedConcerns', () => {
    const concerns = [
      { id: 1, name: 'Sleep' },
      { id: 2, name: 'Immunity' },
    ]
    const nextState = reducer(initialState, actions.setPrioritizedConcerns(concerns))
    expect(nextState.prioritizedConcerns).toEqual(concerns)
  })

  // Test: setSelectedDiets should update selectedDiets
  it('setSelectedDiets should update selectedDiets', () => {
    const diets = [
      {
        id: 3,
        name: 'Plant based',
        tool_tip: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      },
      {
        id: 4,
        name: 'Pescaterian',
        tool_tip: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      },
      {
        id: 5,
        name: 'Strict Paleo',
        tool_tip: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      },
    ]
    const nextState = reducer(initialState, actions.setSelectedDiets(diets))
    expect(nextState.selectedDiets).toEqual(diets)
  })

  // Test: setAllergies should update allergies
  it('setAllergies should update allergies', () => {
    const allergies = [
      {
        id: 3,
        name: 'Weat',
      },
      {
        id: 4,
        name: 'Nasacort',
      },
    ]
    const nextState = reducer(initialState, actions.setAllergies(allergies))
    expect(nextState.allergies).toEqual(allergies)
  })

  // Test: setCustomAllergies should update customAllergies
  it('setCustomAllergies should update customAllergies', () => {
    const nextState = reducer(initialState, actions.setCustomAllergies('Peanuts'))
    expect(nextState.customAllergies).toBe('Peanuts')
  })

  // Test: setLoading should update isLoading
  it('setLoading should update isLoading', () => {
    const nextState = reducer(initialState, actions.setLoading(true))
    expect(nextState.isLoading).toBe(true)
  })

  // Test: setDailyExposure should update isDailyExposure
  it('setDailyExposure should update isDailyExposure', () => {
    const nextState = reducer(initialState, actions.setDailyExposure(true))
    expect(nextState.isDailyExposure).toBe(true)
  })

  // Test: setSmoke should update isSmoke
  it('setSmoke should update isSmoke', () => {
    const nextState = reducer(initialState, actions.setSmoke(true))
    expect(nextState.isSmoke).toBe(true)
  })

  // Test: setAlcohol should update alcohol
  it('setAlcohol should update alcohol', () => {
    const nextState = reducer(initialState, actions.setAlcohol('5+'))
    expect(nextState.alcohol).toBe('5+')
  })

  // Test: setError should update error message
  it('setError should update error message', () => {
    const nextState = reducer(initialState, actions.setError('Something went wrong'))
    expect(nextState.error).toBe('Something went wrong')
  })

  // Test: resetOnboarding should reset state to initialState
  it('resetOnboarding should reset state', () => {
    const modifiedState = { ...initialState, currentStep: 3, isCompleted: true }
    const resetState = reducer(modifiedState, actions.resetOnboarding())
    expect(resetState).toEqual(initialState)
  })
})
