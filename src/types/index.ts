import { ViewStyle, TextStyle } from 'react-native'
import { StackNavigationProp } from '@react-navigation/stack'
import { AlcoholOption } from '../constants'

export interface HealthConcern {
  id: number
  name: string
}

export interface Diet {
  id: number
  name: string
  tool_tip: string
}

export interface Allergy {
  id: number | string
  name: string
}

export interface OnboardingState {
  currentStep: number
  totalSteps: number
  healthConcerns: HealthConcern[]
  prioritizedConcerns: HealthConcern[]
  selectedDiets: Diet[]
  isDailyExposure: boolean | null
  isSmoke: boolean | null
  alcohol: AlcoholOption | null
  allergies: Allergy[]
  customAllergies: string
  isLoading: boolean
  error: string | null
  isCompleted: boolean
}

export interface RootState {
  onboarding: OnboardingState
}

// Navigation types
export type RootStackParamList = {
  Welcome: undefined
  HealthConcerns: undefined
  Diets: undefined
  Lifestyle: undefined
  Allergies: undefined
}

export interface BaseNavigationProps<T extends keyof RootStackParamList> {
  navigation: StackNavigationProp<RootStackParamList, T>
}

// Component prop types
export type ButtonVariant = 'primary' | 'secondary'

export interface ButtonProps {
  title: string
  onPress: () => void
  variant?: ButtonVariant
  disabled?: boolean
  style?: ViewStyle
  textStyle?: TextStyle
}

export interface ProgressBarProps {
  currentStep: number
  totalSteps: number
}

export interface RadioButtonProps<T = string | number | boolean> {
  selected: T
  onPress: (value: T) => void
  label: string
  value: T
}

export interface ApiStateProps {
  isLoading?: boolean
  error?: string | null
  children?: React.ReactNode
}

// HOC types
export type WithApiState<P extends object> = P & ApiStateProps

// Data formatting types
export interface FormattedOnboardingData {
  health_concerns: (HealthConcern & { priority: number })[]
  diets: Diet[]
  is_daily_exposure: boolean | null
  is_smoke: boolean | null
  alcohol: AlcoholOption | null
  allergies: Allergy[]
  custom_allergies: string
  timestamp: string
}

// Saga types
export interface SagaEffect {
  type: string
  payload?: unknown
}

// Utility types
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

export type RequiredNonNull<T> = {
  [K in keyof T]-?: NonNullable<T[K]>
}
