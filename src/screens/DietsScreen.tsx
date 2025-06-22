import React, { useCallback, useMemo } from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch, useSelector } from 'react-redux'
import { setSelectedDiets, nextStep, prevStep } from '../store/slices/onboardingSlice'
import { RootState, AppDispatch } from '../store'
import { BaseNavigationProps, Diet } from '../types'
import {
  COLORS,
  DIMENSIONS,
  FONT_SIZES,
  FONT_WEIGHTS,
  SCREEN_NAMES,
  commonStyles,
  textStyles,
} from '../constants'
import dietsData from '../data/diets.json'
import DietItem from './components/DietItem'
import { CustomButton, ProgressBar } from '../components'

type DietsScreenProps = BaseNavigationProps<'Diets'>

const DietsScreen: React.FC<DietsScreenProps> = ({ navigation }) => {
  const dispatch = useDispatch<AppDispatch>()
  const { currentStep, totalSteps, selectedDiets } = useSelector(
    (state: RootState) => state.onboarding,
  )
  const [localSelectedDiets, setLocalSelectedDiets] = React.useState<Diet[]>(selectedDiets)
  const [showTooltip, setShowTooltip] = React.useState<number | null>(null)

  const isNoneSelected = localSelectedDiets.length === 0

  const handleDietToggle = useCallback((diet: Diet | { name: string }) => {
    if (diet.name === 'None') {
      setLocalSelectedDiets([])
      return
    }
    const dietItem = diet as Diet
    setLocalSelectedDiets((prev) => {
      const idx = prev.findIndex((item) => item.id === dietItem.id)
      if (idx !== -1) {
        if (prev.length === 1) return []
        const newArr = prev.slice()
        newArr.splice(idx, 1)
        return newArr
      }
      return [...prev, dietItem]
    })
  }, [])

  const handleNext = useCallback(() => {
    dispatch(setSelectedDiets(localSelectedDiets))
    dispatch(nextStep())
    navigation.navigate(SCREEN_NAMES.ALLERGIES)
  }, [dispatch, localSelectedDiets, navigation])

  const handleBack = useCallback(() => {
    dispatch(prevStep())
    navigation.goBack()
  }, [dispatch, navigation])

  const handleInfoPress = useCallback((id: number) => {
    setShowTooltip((prev) => (prev === id ? null : id))
  }, [])

  const dietsList = useMemo(() => {
    return dietsData.data.map((diet: Diet) => {
      const selected = localSelectedDiets.some((item) => item.id === diet.id)
      return (
        <DietItem
          key={diet.id}
          diet={diet}
          selected={selected}
          onToggle={handleDietToggle}
          onInfoPress={handleInfoPress}
          isTooltipVisible={showTooltip === diet.id}
        />
      )
    })
  }, [localSelectedDiets, showTooltip, handleDietToggle, handleInfoPress])

  return (
    <SafeAreaView style={commonStyles.safeAreaContainer} edges={['top', 'left', 'right']}>
      <ScrollView
        style={commonStyles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.dietsHeader}>
          <Text style={textStyles.title}>
            Select the diets you follow. <Text style={textStyles.asterisk}>*</Text>
          </Text>
        </View>

        <View style={styles.dietsListContainer}>
          <TouchableOpacity
            style={[styles.dietOption, isNoneSelected && styles.dietOptionSelected]}
            onPress={() => handleDietToggle({ name: 'None' })}
            testID="diet-none"
            activeOpacity={0.7}
          >
            <View style={[styles.dietCheckbox, isNoneSelected && styles.dietCheckboxSelected]}>
              {isNoneSelected && <Text style={styles.dietCheckmark}>✓</Text>}
            </View>
            <View style={styles.dietLabelContainer}>
              <Text style={[styles.dietLabel, isNoneSelected && styles.dietLabelSelected]}>
                None
              </Text>
            </View>
          </TouchableOpacity>
          {dietsList}
        </View>
      </ScrollView>

      <View style={styles.dietsFooter}>
        <View style={commonStyles.buttonContainer}>
          <CustomButton
            title="Back"
            onPress={handleBack}
            variant="secondary"
            style={styles.dietsBackButton}
          />
          <CustomButton title="Next" onPress={handleNext} style={styles.dietsNextButton} />
        </View>
        <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  dietsHeader: {
    marginTop: DIMENSIONS.SPACING_SM,
    marginBottom: DIMENSIONS.SPACING_SM,
    paddingHorizontal: DIMENSIONS.SPACING_XXL,
  },
  dietsListContainer: {
    marginBottom: DIMENSIONS.SPACING_XL,
    paddingHorizontal: DIMENSIONS.SPACING_XXL,
  },
  dietOption: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    paddingVertical: DIMENSIONS.SPACING_LG,
    paddingHorizontal: 0,
    alignItems: 'center',
    flex: 1,
  },
  dietOptionSelected: {
    backgroundColor: 'transparent',
  },
  dietCheckbox: {
    width: DIMENSIONS.SPACING_XXL,
    height: DIMENSIONS.SPACING_XXL,
    borderRadius: DIMENSIONS.SPACING_XS,
    borderWidth: 2,
    borderColor: COLORS.GRAY_DISABLED,
    marginRight: DIMENSIONS.SPACING_LG,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  dietCheckboxSelected: {
    backgroundColor: COLORS.SECONDARY,
    borderColor: COLORS.SECONDARY,
  },
  dietCheckmark: {
    color: COLORS.WHITE,
    fontSize: FONT_SIZES.MEDIUM,
    fontWeight: FONT_WEIGHTS.BOLD,
  },
  dietLabelContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  dietLabel: {
    fontSize: FONT_SIZES.MEDIUM,
    fontWeight: FONT_WEIGHTS.MEDIUM,
    color: COLORS.SECONDARY,
    marginRight: DIMENSIONS.SPACING_SM,
  },
  dietLabelSelected: {
    color: COLORS.SECONDARY,
    fontWeight: FONT_WEIGHTS.SEMIBOLD,
  },
  dietsFooter: {
    padding: DIMENSIONS.SPACING_XXL,
    backgroundColor: COLORS.SECONDARY_LIGHT,
  },
  dietsBackButton: {
    flex: 1,
  },
  dietsNextButton: {
    flex: 1,
  },
})

export default React.memo(DietsScreen)
