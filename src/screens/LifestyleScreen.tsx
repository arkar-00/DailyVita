import React, { useCallback } from 'react'
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch, useSelector } from 'react-redux'
import CustomButton from '../components/CustomButton'
import ProgressBar from '../components/ProgressBar'
import {
  setDailyExposure,
  setSmoke,
  setAlcohol,
  saveOnboardingData,
} from '../store/slices/onboardingSlice'
import { BaseNavigationProps } from '../types'
import { RootState, AppDispatch } from '../store'
import RadioButton from '../components/RadioButton'
import {
  COLORS,
  DIMENSIONS,
  FONT_SIZES,
  FONT_WEIGHTS,
  ALCOHOL_OPTIONS,
  commonStyles,
  textStyles,
} from '../constants'

type LifestyleScreenProps = BaseNavigationProps<'Lifestyle'>

const questions = [
  {
    key: 'sunExposure',
    title: (
      <>
        Is your daily exposure to sun limited?{' '}
        <Text style={textStyles.asterisk}>*</Text>
      </>
    ),
    options: [
      { label: 'Yes', value: true },
      { label: 'No', value: false },
    ],
  },
  {
    key: 'smoking',
    title: (
      <>
        Do you currently smoke (tobacco or marijuana)?{' '}
        <Text style={textStyles.asterisk}>*</Text>
      </>
    ),
    options: [
      { label: 'Yes', value: true },
      { label: 'No', value: false },
    ],
  },
  {
    key: 'alcoholConsumption',
    title: (
      <>
        On average, how many alcoholic beverages do you have in a week?{' '}
        <Text style={textStyles.asterisk}>*</Text>
      </>
    ),
    options: [
      { label: '0 - 1', value: ALCOHOL_OPTIONS.LOW },
      { label: '2 - 5', value: ALCOHOL_OPTIONS.MEDIUM },
      { label: '5+', value: ALCOHOL_OPTIONS.HIGH },
    ],
  },
]

const LifestyleScreen: React.FC<LifestyleScreenProps> = ({ navigation }) => {
  const dispatch = useDispatch<AppDispatch>()
  const { currentStep, totalSteps, isDailyExposure, isSmoke, alcohol } =
    useSelector((state: RootState) => state.onboarding)

  const [state, setState] = React.useState({
    sunExposure: isDailyExposure,
    smoking: isSmoke,
    alcoholConsumption: alcohol,
  })

  const setField = useCallback((key: keyof typeof state, value: any) => {
    setState((prev) => ({ ...prev, [key]: value }))
  }, [])

  const handleNext = useCallback(() => {
    const { sunExposure, smoking, alcoholConsumption } = state
    if (
      sunExposure === null ||
      smoking === null ||
      alcoholConsumption === null
    ) {
      Alert.alert(
        'Complete Required Fields',
        'Please answer all questions before proceeding.',
      )
      return
    }
    dispatch(setDailyExposure(sunExposure))
    dispatch(setSmoke(smoking))
    dispatch(setAlcohol(alcoholConsumption))
    dispatch(saveOnboardingData())
  }, [dispatch, state])

  return (
    <SafeAreaView
      style={commonStyles.safeAreaContainer}
      edges={['top', 'left', 'right']}
    >
      <ScrollView style={styles.content} keyboardShouldPersistTaps="handled">
        {questions.map((q) => (
          <View style={styles.questionContainer} key={q.key}>
            <Text style={styles.questionTitle}>{q.title}</Text>
            <View style={styles.optionsContainer}>
              {q.options.map((opt) => (
                <RadioButton
                  key={String(opt.value)}
                  selected={state[q.key as keyof typeof state]}
                  onPress={() =>
                    setField(q.key as keyof typeof state, opt.value)
                  }
                  label={opt.label}
                  value={opt.value}
                />
              ))}
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.buttonContainer}>
          <CustomButton
            title="Get my personalized vitamin"
            onPress={handleNext}
            style={commonStyles.singleButtonContainer}
          />
        </View>
        <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingHorizontal: DIMENSIONS.SPACING_XXL,
    paddingTop: DIMENSIONS.SPACING_XXXL,
  },
  questionContainer: {
    marginBottom: DIMENSIONS.SPACING_XL,
  },
  questionTitle: {
    fontSize: FONT_SIZES.MEDIUM,
    fontWeight: FONT_WEIGHTS.SEMIBOLD,
    color: COLORS.SECONDARY,
    lineHeight: FONT_SIZES.XL,
    marginBottom: DIMENSIONS.SPACING_XS,
  },
  optionsContainer: {
    gap: DIMENSIONS.SPACING_XS,
  },
  footer: {
    padding: DIMENSIONS.SPACING_XXL,
    backgroundColor: COLORS.SECONDARY_LIGHT,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: DIMENSIONS.SPACING_LG,
  },
})

export default React.memo(LifestyleScreen)
