import React, { useMemo } from 'react'
import { View, StyleSheet } from 'react-native'
import { ProgressBarProps } from '../types'
import { COLORS, DIMENSIONS } from '../constants'

const ProgressBar: React.FC<ProgressBarProps> = ({
  currentStep,
  totalSteps,
}) => {
  const progress = useMemo(() => {
    if (totalSteps <= 0) return '0%'
    const value = Math.min(Math.max(currentStep, 0), totalSteps)
    return `${(value / totalSteps) * 100}%`
  }, [currentStep, totalSteps])

  return (
    <View style={styles.container}>
      <View style={styles.progressBar}>
        <View
          style={[styles.progress, { width: progress } as Object]}
          testID="progress-bar-fill"
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: DIMENSIONS.SPACING_XL,
    paddingVertical: DIMENSIONS.SPACING_MD,
  },
  progressBar: {
    height: DIMENSIONS.PROGRESS_BAR_HEIGHT,
    backgroundColor: COLORS.GRAY_LIGHT,
    borderRadius: DIMENSIONS.BORDER_RADIUS_SMALL,
    overflow: 'hidden',
  },
  progress: {
    height: '100%',
    backgroundColor: COLORS.SUCCESS,
    borderRadius: DIMENSIONS.BORDER_RADIUS_SMALL,
  },
})

export default React.memo(ProgressBar)
