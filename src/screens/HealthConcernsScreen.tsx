import React, { useCallback, useMemo } from 'react'
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import DraggableFlatList, {
  RenderItemParams,
} from 'react-native-draggable-flatlist'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import {
  setHealthConcerns,
  setPrioritizedConcerns,
  nextStep,
  prevStep,
} from '../store/slices/onboardingSlice'
import { BaseNavigationProps, HealthConcern } from '../types'
import { RootState, AppDispatch } from '../store'
import {
  COLORS,
  DIMENSIONS,
  SCREEN_NAMES,
  ANIMATION,
  LIMITS,
  MESSAGES,
} from '../constants'
import { commonStyles, textStyles } from '../constants'
import healthConcernsData from '../data/healthconcerns.json'
import { CustomButton, ProgressBar } from '../components'
import ConcernItem from './components/ConcernItem'
import { PriorityItem } from './components/PriorityItem'

type HealthConcernsScreenProps = BaseNavigationProps<'HealthConcerns'>

const HealthConcernsScreen: React.FC<HealthConcernsScreenProps> = ({
  navigation,
}) => {
  const dispatch = useDispatch<AppDispatch>()
  const { currentStep, totalSteps, healthConcerns } = useSelector(
    (state: RootState) => ({
      currentStep: state.onboarding.currentStep,
      totalSteps: state.onboarding.totalSteps,
      healthConcerns: state.onboarding.healthConcerns,
    }),
    shallowEqual,
  )

  const [selectedConcerns, setSelectedConcerns] =
    React.useState<HealthConcern[]>(healthConcerns)
  const [prioritizedData, setPrioritizedData] =
    React.useState<HealthConcern[]>(healthConcerns)

  React.useEffect(() => {
    setPrioritizedData(selectedConcerns)
  }, [selectedConcerns])

  const handleConcernToggle = useCallback((concern: HealthConcern) => {
    setSelectedConcerns((prev) => {
      const isSelected = prev.some((item) => item.id === concern.id)
      if (isSelected) {
        return prev.filter((item) => item.id !== concern.id)
      }
      if (prev.length >= LIMITS.MAX_HEALTH_CONCERNS) {
        Alert.alert(
          MESSAGES.MAX_SELECTION,
          MESSAGES.MAX_HEALTH_CONCERNS_MESSAGE,
        )
        return prev
      }
      return [...prev, concern]
    })
  }, [])

  const renderPriorityItem = useCallback(
    ({ item, drag, isActive }: RenderItemParams<HealthConcern>) => (
      <PriorityItem isActive={isActive} name={item.name} onLongPress={drag} />
    ),
    [],
  )

  const handleNext = useCallback(() => {
    if (selectedConcerns.length === 0) {
      Alert.alert(
        MESSAGES.SELECTION_REQUIRED,
        MESSAGES.MIN_HEALTH_CONCERNS_MESSAGE,
      )
      return
    }
    dispatch(setHealthConcerns(selectedConcerns))
    dispatch(setPrioritizedConcerns(prioritizedData))
    dispatch(nextStep())
    navigation.navigate(SCREEN_NAMES.DIETS)
  }, [dispatch, selectedConcerns, prioritizedData])

  const handleBack = useCallback(() => {
    dispatch(prevStep())
    navigation.goBack()
  }, [dispatch, navigation])

  const concernsGrid = useMemo(
    () =>
      healthConcernsData.data.map((concern: HealthConcern) => {
        const isSelected = selectedConcerns.some(
          (item) => item.id === concern.id,
        )
        return (
          <ConcernItem
            key={concern.id}
            name={concern.name}
            selected={isSelected}
            onPress={() => handleConcernToggle(concern)}
            testID={`concern-${concern.id}`}
          />
        )
      }),
    [selectedConcerns, handleConcernToggle],
  )

  return (
    <SafeAreaView
      style={commonStyles.safeAreaContainer}
      edges={['top', 'left', 'right']}
    >
      <ScrollView
        style={commonStyles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Health Concerns Selection Section */}
        <View style={styles.sectionHeader}>
          <Text style={textStyles.title}>
            Select the top health concerns.{' '}
            <Text style={textStyles.asterisk}>*</Text>
          </Text>
          <Text style={textStyles.title}>
            (up to {LIMITS.MAX_HEALTH_CONCERNS})
          </Text>
        </View>

        <View style={styles.concernsGridContainer}>{concernsGrid}</View>

        {/* Prioritize Section */}
        {selectedConcerns.length > 0 && (
          <View style={styles.prioritizeSectionContainer}>
            <Text
              style={{
                ...textStyles.sectionTitle,
                marginHorizontal: DIMENSIONS.SPACING_XXL,
              }}
            >
              Prioritize
            </Text>
            <GestureHandlerRootView style={styles.priorityListContainer}>
              <DraggableFlatList
                data={prioritizedData}
                onDragEnd={({ data: newData }) => setPrioritizedData(newData)}
                keyExtractor={(item: HealthConcern) => item.id.toString()}
                renderItem={renderPriorityItem}
                scrollEnabled={false}
                activationDistance={ANIMATION.ACTIVATION_DISTANCE}
                dragItemOverflow
              />
            </GestureHandlerRootView>
          </View>
        )}

        <View style={styles.footerContainer}>
          <View style={commonStyles.buttonContainer}>
            <CustomButton
              title="Back"
              onPress={handleBack}
              variant="secondary"
              style={styles.backButton}
            />
            <CustomButton
              title="Next"
              onPress={handleNext}
              style={styles.nextButton}
            />
          </View>
        </View>
        <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  sectionHeader: {
    marginTop: DIMENSIONS.SPACING_XXXL,
    marginBottom: DIMENSIONS.SPACING_XXXL,
    paddingHorizontal: DIMENSIONS.SPACING_XXL,
  },
  concernsGridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: DIMENSIONS.SPACING_SM,
    paddingHorizontal: DIMENSIONS.SPACING_XXL,
    marginBottom: DIMENSIONS.SPACING_XXXL,
  },
  prioritizeSectionContainer: {
    marginBottom: DIMENSIONS.SPACING_MD,
  },
  priorityListContainer: {
    minHeight: 200,
  },
  footerContainer: {
    padding: DIMENSIONS.SPACING_XXL,
    backgroundColor: COLORS.SECONDARY_LIGHT,
  },
  backButton: {
    flex: 1,
  },
  nextButton: {
    flex: 1,
  },
})

export default React.memo(HealthConcernsScreen)
