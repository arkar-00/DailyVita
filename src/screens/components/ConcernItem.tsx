import React from 'react'
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native'
import { COLORS, DIMENSIONS, FONT_SIZES, FONT_WEIGHTS } from '@/src/constants'

export interface ConcernItemProps {
  name: string
  selected: boolean
  onPress: () => void
  testID?: string
  style?: ViewStyle
  textStyle?: TextStyle
}

export const ConcernItem: React.FC<ConcernItemProps> = ({
  name,
  selected,
  onPress,
  testID,
  style,
  textStyle,
}) => (
  <TouchableOpacity
    style={[
      concernStyles.concernItem,
      selected && concernStyles.concernItemSelected,
      style,
    ]}
    onPress={onPress}
    testID={testID}
  >
    <Text
      style={[
        concernStyles.concernText,
        selected && concernStyles.concernTextSelected,
        textStyle,
      ]}
    >
      {name}
    </Text>
  </TouchableOpacity>
)

const concernStyles = StyleSheet.create({
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
})

export default ConcernItem
