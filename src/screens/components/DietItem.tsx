import {
  COLORS,
  DIMENSIONS,
  FONT_SIZES,
  FONT_WEIGHTS,
  shadows,
} from '@/src/constants'
import { Diet } from '@/src/types'
import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

type DietItemProps = {
  diet: Diet
  selected: boolean
  onToggle: (diet: Diet) => void
  onInfoPress: (id: number) => void
  isTooltipVisible: boolean
}

const DietItem = React.memo(
  ({
    diet,
    selected,
    onToggle,
    onInfoPress,
    isTooltipVisible,
  }: DietItemProps) => (
    <View style={styles.wrapper}>
      <View style={styles.row}>
        <TouchableOpacity
          style={[styles.item, selected && styles.itemSelected]}
          onPress={() => onToggle(diet)}
          testID={`diet-${diet.id}`}
        >
          <View style={[styles.checkbox, selected && styles.checkboxSelected]}>
            {selected && <Text style={styles.checkmark}>✓</Text>}
          </View>
          <View style={styles.content}>
            <View style={styles.header}>
              <View style={styles.nameContainer}>
                <Text
                  style={[styles.nameText, selected && styles.nameTextSelected]}
                >
                  {diet.name}
                </Text>
                <TouchableOpacity
                  style={styles.infoButton}
                  onPress={() => onInfoPress(diet.id)}
                  testID={`info-${diet.id}`}
                >
                  <Text style={styles.infoButtonText}>i</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableOpacity>
        {isTooltipVisible && (
          <View style={styles.tooltip}>
            <Text style={styles.tooltipText}>{diet.tool_tip}</Text>
          </View>
        )}
      </View>
    </View>
  ),
)

export default DietItem

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  item: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    paddingVertical: DIMENSIONS.SPACING_LG,
    paddingHorizontal: 0,
    alignItems: 'center',
    flex: 1,
  },
  itemSelected: {
    backgroundColor: 'transparent',
  },
  checkbox: {
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
  checkboxSelected: {
    backgroundColor: COLORS.SECONDARY,
    borderColor: COLORS.SECONDARY,
  },
  checkmark: {
    color: COLORS.WHITE,
    fontSize: FONT_SIZES.MEDIUM,
    fontWeight: FONT_WEIGHTS.BOLD,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  nameText: {
    fontSize: FONT_SIZES.MEDIUM,
    fontWeight: FONT_WEIGHTS.MEDIUM,
    color: COLORS.SECONDARY,
    marginRight: DIMENSIONS.SPACING_SM,
  },
  nameTextSelected: {
    color: COLORS.SECONDARY,
    fontWeight: FONT_WEIGHTS.SEMIBOLD,
  },
  infoButton: {
    width: DIMENSIONS.SPACING_XL,
    height: DIMENSIONS.SPACING_XL,
    borderRadius: DIMENSIONS.SPACING_XL / 2,
    borderColor: COLORS.SECONDARY,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoButtonText: {
    fontSize: FONT_SIZES.SMALL,
    color: COLORS.SECONDARY,
    fontWeight: FONT_WEIGHTS.BOLD,
  },
  tooltip: {
    backgroundColor: COLORS.WHITE,
    borderRadius: DIMENSIONS.BORDER_RADIUS_MEDIUM,
    padding: DIMENSIONS.SPACING_MD,
    marginLeft: DIMENSIONS.SPACING_MD,
    flex: 1,
    maxWidth: 200,
    borderWidth: 1,
    borderColor: COLORS.GRAY_LIGHT,
    ...shadows.medium,
  },
  tooltipText: {
    fontSize: FONT_SIZES.SMALL,
    color: COLORS.GRAY_DISABLED,
    lineHeight: DIMENSIONS.SPACING_LG,
  },
})
