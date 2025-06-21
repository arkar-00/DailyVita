import React, { useCallback, useMemo } from 'react'
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native'
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
  FONT_SIZES,
  FONT_WEIGHTS,
  SCREEN_NAMES,
  ANIMATION,
  LIMITS,
  MESSAGES,
} from '../constants'
import { commonStyles, textStyles, shadows } from '../constants'
import healthConcernsData from '../data/healthconcerns.json'
import { CustomButton, ProgressBar } from '../components'

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

  // Keep prioritizedData in sync with selectedConcerns
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
      <TouchableOpacity
        style={[styles.priorityItem, isActive && styles.priorityItemActive]}
        onLongPress={drag}
        delayLongPress={ANIMATION.LONG_PRESS_DELAY}
        activeOpacity={ANIMATION.ACTIVE_OPACITY}
      >
        <View style={styles.priorityContent}>
          <View style={styles.priorityContainer}>
            <Text style={styles.priorityText}>{item.name}</Text>
          </View>
          <View style={styles.dragHandle}>
            <View style={styles.dragLine} />
            <View style={styles.dragLine} />
            <View style={styles.dragLine} />
          </View>
        </View>
      </TouchableOpacity>
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

  // Memoize health concerns grid for performance
  const concernsGrid = useMemo(
    () =>
      healthConcernsData.data.map((concern: HealthConcern) => {
        const isSelected = selectedConcerns.some(
          (item) => item.id === concern.id,
        )
        return (
          <TouchableOpacity
            key={concern.id}
            style={[
              styles.concernItem,
              isSelected && styles.concernItemSelected,
            ]}
            onPress={() => handleConcernToggle(concern)}
            testID={`concern-${concern.id}`}
          >
            <Text
              style={[
                styles.concernText,
                isSelected && styles.concernTextSelected,
              ]}
            >
              {concern.name}
            </Text>
          </TouchableOpacity>
        )
      }),
    [selectedConcerns, handleConcernToggle],
  )

  return (
    <SafeAreaView
      style={commonStyles.safeAreaContainer}
      edges={['top', 'left', 'right']}
    >
      <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />

      <ScrollView
        style={commonStyles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Health Concerns Selection Section */}
        <View style={styles.header}>
          <Text style={textStyles.title}>
            Select the top health concerns.{' '}
            <Text style={textStyles.asterisk}>*</Text>
          </Text>
          <Text style={textStyles.title}>
            (up to {LIMITS.MAX_HEALTH_CONCERNS})
          </Text>
        </View>

        <View style={styles.concernsGrid}>{concernsGrid}</View>

        {/* Prioritize Section */}
        {selectedConcerns.length > 0 && (
          <View style={styles.prioritizeSection}>
            <Text
              style={{
                ...textStyles.sectionTitle,
                marginHorizontal: DIMENSIONS.SPACING_XXL,
              }}
            >
              Prioritize
            </Text>
            <GestureHandlerRootView style={styles.priorityList}>
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

        <View style={styles.footer}>
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
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  header: {
    marginTop: DIMENSIONS.SPACING_XXXL,
    marginBottom: DIMENSIONS.SPACING_XXXL,
    paddingHorizontal: DIMENSIONS.SPACING_XXL,
  },
  concernsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: DIMENSIONS.SPACING_SM,
    paddingHorizontal: DIMENSIONS.SPACING_XXL,
    marginBottom: DIMENSIONS.SPACING_XXXL,
  },
  concernItem: {
    paddingVertical: DIMENSIONS.SPACING_MD,
    paddingHorizontal: DIMENSIONS.SPACING_LG,
    borderRadius: DIMENSIONS.BORDER_RADIUS_LARGE,
    marginBottom: DIMENSIONS.SPACING_SM,
    borderWidth: 2,
    borderColor: COLORS.SELECTED_COLOR,
    alignItems: 'center',
    minHeight: DIMENSIONS.SPACING_SECTION,
    justifyContent: 'center',
  },
  concernItemSelected: {
    backgroundColor: COLORS.SELECTED_COLOR,
    borderColor: COLORS.SECONDARY,
  },
  concernText: {
    fontSize: FONT_SIZES.SMALL + 1,
    fontWeight: FONT_WEIGHTS.SEMIBOLD,
    color: COLORS.SECONDARY,
    textAlign: 'center',
  },
  concernTextSelected: {
    color: COLORS.WHITE,
  },
  prioritizeSection: {
    marginBottom: DIMENSIONS.SPACING_MD,
  },
  priorityList: {
    minHeight: 200,
  },
  priorityItem: {
    backgroundColor: COLORS.WHITE,
    borderRadius: DIMENSIONS.BORDER_RADIUS_MEDIUM,
    marginBottom: DIMENSIONS.SPACING_SM,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.SELECTED_COLOR,
    marginHorizontal: DIMENSIONS.SPACING_XXL,
    ...shadows.small,
  },
  priorityItemActive: {
    backgroundColor: COLORS.BACKGROUND_LIGHT,
    transform: [{ scale: 1.02 }],
    borderColor: COLORS.SECONDARY,
  },
  priorityContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: DIMENSIONS.SPACING_MD,
    paddingHorizontal: DIMENSIONS.SPACING_MD,
    justifyContent: 'space-between',
  },
  priorityContainer: {
    backgroundColor: COLORS.SELECTED_COLOR,
    borderColor: 'transparent',
    paddingVertical: DIMENSIONS.SPACING_XS + 1,
    paddingHorizontal: DIMENSIONS.SPACING_MD,
    borderRadius: DIMENSIONS.BORDER_RADIUS_LARGE,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  priorityText: {
    flex: 1,
    fontSize: FONT_SIZES.MEDIUM - 1,
    fontWeight: FONT_WEIGHTS.MEDIUM,
    color: COLORS.WHITE,
  },
  dragHandle: {
    marginLeft: DIMENSIONS.SPACING_MD,
    paddingVertical: DIMENSIONS.SPACING_XS,
  },
  dragLine: {
    width: DIMENSIONS.SPACING_LG,
    height: 2,
    backgroundColor: COLORS.GRAY_DARK,
    marginBottom: DIMENSIONS.SPACING_XS,
  },
  footer: {
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
