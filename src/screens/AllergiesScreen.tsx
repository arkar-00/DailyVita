import React, { useState, useMemo, useCallback } from 'react'
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch, useSelector } from 'react-redux'
import CustomButton from '../components/CustomButton'
import ProgressBar from '../components/ProgressBar'
import {
  setAllergies,
  setCustomAllergies,
  prevStep,
  nextStep,
} from '../store/slices/onboardingSlice'
import { RootState, AppDispatch } from '../store'
import { BaseNavigationProps, Allergy } from '../types'
import {
  COLORS,
  DIMENSIONS,
  FONT_SIZES,
  FONT_WEIGHTS,
  SCREEN_NAMES,
  commonStyles,
  textStyles,
  shadows,
} from '../constants'
import allergiesData from '../data/allergies.json'

type AllergiesScreenProps = BaseNavigationProps<'Allergies'>

const AllergiesScreen: React.FC<AllergiesScreenProps> = ({ navigation }) => {
  const dispatch = useDispatch<AppDispatch>()
  const { currentStep, totalSteps, allergies, customAllergies } = useSelector(
    (state: RootState) => state.onboarding,
  )

  const [selectedAllergies, setSelectedAllergies] =
    useState<Allergy[]>(allergies)
  const [inputText, setInputText] = useState('')
  const [showSuggestions, setShowSuggestions] = useState(false)

  const customAllergyList = useMemo(
    () =>
      customAllergies
        .split(',')
        .map((item, index) => ({
          id: `custom_${index}`,
          name: item.trim(),
        }))
        .filter((item) => item.name.length > 0),
    [customAllergies],
  )

  const allAvailableAllergies = useMemo(
    () => [...allergiesData.data, ...customAllergyList],
    [customAllergyList],
  )

  const filteredSuggestions = useMemo(() => {
    const text = inputText.trim().toLowerCase()
    if (!text) return []
    return allAvailableAllergies.filter(
      (allergy) =>
        allergy.name.toLowerCase().includes(text) &&
        !selectedAllergies.some((selected) => selected.id === allergy.id),
    )
  }, [inputText, allAvailableAllergies, selectedAllergies])

  const handleAllergySelect = useCallback((allergy: Allergy) => {
    setSelectedAllergies((prev) => [...prev, allergy])
    setInputText('')
    setShowSuggestions(false)
  }, [])

  const handleAllergyRemove = useCallback((allergyId: string | number) => {
    setSelectedAllergies((prev) =>
      prev.filter((allergy) => allergy.id !== allergyId),
    )
  }, [])

  const handleInputChange = useCallback((text: string) => {
    setInputText(text)
    setShowSuggestions(text.trim().length > 0)
  }, [])

  const handleAddCustomAllergy = useCallback(() => {
    const trimmedText = inputText.trim()
    if (!trimmedText) return

    const exists = allAvailableAllergies.some(
      (allergy) => allergy.name.toLowerCase() === trimmedText.toLowerCase(),
    )
    if (!exists) {
      handleAllergySelect({
        id: `custom_${Date.now()}`,
        name: trimmedText,
      })
    }
  }, [inputText, allAvailableAllergies, handleAllergySelect])

  const handleSubmit = useCallback(() => {
    const predefinedAllergies = selectedAllergies.filter(
      (allergy) => !allergy.id.toString().startsWith('custom_'),
    )
    const customAllergyNames = selectedAllergies
      .filter((allergy) => allergy.id.toString().startsWith('custom_'))
      .map((allergy) => allergy.name)

    dispatch(setAllergies(predefinedAllergies))
    dispatch(setCustomAllergies(customAllergyNames.join(', ')))
    dispatch(nextStep())
    navigation.navigate(SCREEN_NAMES.LIFESTYLE)
  }, [selectedAllergies, dispatch])

  const handleBack = useCallback(() => {
    dispatch(prevStep())
    navigation.goBack()
  }, [dispatch, navigation])

  return (
    <SafeAreaView
      style={commonStyles.safeAreaContainer}
      edges={['top', 'left', 'right']}
    >
      <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />

      <ScrollView
        style={commonStyles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.sectionHeader}>
          <Text style={textStyles.title}>
            Write any specific allergies or sensitivity towards specific
            things.(optional)
          </Text>
        </View>

        <View style={styles.sectionAllergies}>
          {selectedAllergies.length > 0 && (
            <View style={styles.selectedAllergiesContainer}>
              {selectedAllergies.map((allergy) => (
                <TouchableOpacity
                  key={allergy.id}
                  style={styles.selectedAllergyTag}
                  onPress={() => handleAllergyRemove(allergy.id)}
                  testID={`selected-allergy-${allergy.id}`}
                  activeOpacity={0.7}
                >
                  <Text style={styles.selectedAllergyText}>{allergy.name}</Text>
                  <Text style={styles.selectedAllergyRemoveIcon}>×</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.inputField}
              placeholder="Type allergies here..."
              placeholderTextColor={COLORS.GRAY_DARK}
              value={inputText}
              onChangeText={handleInputChange}
              onSubmitEditing={handleAddCustomAllergy}
              returnKeyType="done"
              testID="allergy-input"
              autoCorrect={false}
              autoCapitalize="none"
              blurOnSubmit={false}
            />

            {showSuggestions && filteredSuggestions.length > 0 && (
              <View style={styles.suggestionDropdown}>
                <ScrollView
                  style={styles.suggestionList}
                  showsVerticalScrollIndicator={false}
                  nestedScrollEnabled
                  testID="suggestions-list"
                  keyboardShouldPersistTaps="handled"
                >
                  {filteredSuggestions.map((item) => (
                    <TouchableOpacity
                      key={item.id.toString()}
                      style={styles.suggestionItem}
                      onPress={() => handleAllergySelect(item)}
                      testID={`suggestion-${item.id}`}
                      activeOpacity={0.7}
                    >
                      <Text style={styles.suggestionText}>{item.name}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            )}
          </View>
        </View>
      </ScrollView>

      <View style={styles.sectionFooter}>
        <View style={commonStyles.buttonContainer}>
          <CustomButton
            title="Back"
            onPress={handleBack}
            variant="secondary"
            style={styles.footerBackButton}
          />
          <CustomButton
            title="Next"
            onPress={handleSubmit}
            style={styles.footerNextButton}
          />
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  sectionHeader: {
    marginTop: DIMENSIONS.SPACING_XXXL,
    marginBottom: DIMENSIONS.SPACING_XXXL,
    paddingHorizontal: DIMENSIONS.SPACING_XXL,
  },
  sectionAllergies: {
    marginBottom: DIMENSIONS.SPACING_XL,
    paddingHorizontal: DIMENSIONS.SPACING_XXL,
  },
  selectedAllergiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: DIMENSIONS.SPACING_SM,
    marginBottom: DIMENSIONS.SPACING_LG,
  },
  selectedAllergyTag: {
    backgroundColor: '#4A5D6A',
    paddingVertical: DIMENSIONS.SPACING_SM,
    paddingHorizontal: DIMENSIONS.SPACING_MD,
    borderRadius: DIMENSIONS.BORDER_RADIUS_BUTTON,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.SECONDARY,
  },
  selectedAllergyText: {
    fontSize: FONT_SIZES.MEDIUM - 2,
    fontWeight: FONT_WEIGHTS.SEMIBOLD,
    color: COLORS.WHITE,
    marginRight: DIMENSIONS.SPACING_SM,
  },
  selectedAllergyRemoveIcon: {
    fontSize: FONT_SIZES.LARGE,
    color: COLORS.WHITE,
    fontWeight: FONT_WEIGHTS.BOLD,
  },
  inputWrapper: {
    backgroundColor: COLORS.WHITE,
    borderRadius: DIMENSIONS.BORDER_RADIUS_LARGE,
    ...shadows.medium,
    position: 'relative',
  },
  inputField: {
    fontSize: FONT_SIZES.MEDIUM,
    color: COLORS.SECONDARY,
    padding: DIMENSIONS.SPACING_LG,
    minHeight: DIMENSIONS.SPACING_SECTION + 10,
    textAlignVertical: 'top',
    lineHeight: FONT_SIZES.XL,
  },
  suggestionDropdown: {
    borderTopWidth: 1,
    borderTopColor: COLORS.GRAY_LIGHT,
    maxHeight: 150,
  },
  suggestionList: {
    flexGrow: 0,
  },
  suggestionItem: {
    paddingVertical: DIMENSIONS.SPACING_MD,
    paddingHorizontal: DIMENSIONS.SPACING_LG,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.GRAY_LIGHT,
  },
  suggestionText: {
    fontSize: FONT_SIZES.MEDIUM,
    color: COLORS.SECONDARY,
    fontWeight: FONT_WEIGHTS.MEDIUM,
  },
  sectionFooter: {
    padding: DIMENSIONS.SPACING_XXL,
    backgroundColor: COLORS.SECONDARY_LIGHT,
  },
  footerBackButton: {
    flex: 1,
  },
  footerNextButton: {
    flex: 2,
  },
})

export default React.memo(AllergiesScreen)
