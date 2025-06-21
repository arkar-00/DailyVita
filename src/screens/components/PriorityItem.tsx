import React from 'react'
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  GestureResponderEvent,
  ViewStyle,
} from 'react-native'
import {
  COLORS,
  DIMENSIONS,
  FONT_SIZES,
  FONT_WEIGHTS,
  shadows,
  ANIMATION,
} from '@/src/constants'

type PriorityItemProps = {
  name: string
  isActive?: boolean
  onLongPress?: (event: GestureResponderEvent) => void
  style?: ViewStyle
  testID?: string
}

export const PriorityItem: React.FC<PriorityItemProps> = ({
  name,
  isActive = false,
  onLongPress,
  style,
  testID,
}) => (
  <TouchableOpacity
    style={[
      priorityStyles.priorityItem,
      isActive && priorityStyles.priorityItemActive,
      style,
    ]}
    onLongPress={onLongPress}
    delayLongPress={ANIMATION.LONG_PRESS_DELAY}
    activeOpacity={ANIMATION.ACTIVE_OPACITY}
    testID={testID}
  >
    <View style={priorityStyles.priorityContent}>
      <View style={priorityStyles.priorityContainer}>
        <Text style={priorityStyles.priorityText}>{name}</Text>
      </View>
      <View style={priorityStyles.dragHandle}>
        <View style={priorityStyles.dragLine} />
        <View style={priorityStyles.dragLine} />
        <View style={priorityStyles.dragLine} />
      </View>
    </View>
  </TouchableOpacity>
)

const priorityStyles = StyleSheet.create({
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
})
