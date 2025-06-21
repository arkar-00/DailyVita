import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { RadioButtonProps } from '../types'
import { COLORS, DIMENSIONS, FONT_SIZES, FONT_WEIGHTS } from '../constants'

const RadioButton = <T = string | number | boolean,>({
  selected,
  onPress,
  label,
  value,
}: RadioButtonProps<T>): React.ReactElement => (
  <TouchableOpacity
    style={styles.radioContainer}
    onPress={() => onPress(value)}
    testID={`radio-button-${String(value)}`}
  >
    <View style={styles.radioCircle}>
      {selected === value && <View style={styles.radioSelected} />}
    </View>
    <Text style={styles.radioLabel}>{label}</Text>
  </TouchableOpacity>
)

export default RadioButton

const styles = StyleSheet.create({
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: DIMENSIONS.SPACING_XS,
  },
  radioCircle: {
    height: DIMENSIONS.RADIO_SIZE,
    width: DIMENSIONS.RADIO_SIZE,
    borderRadius: DIMENSIONS.RADIO_SIZE / 2,
    borderWidth: DIMENSIONS.RADIO_BORDER_WIDTH,
    borderColor: COLORS.SECONDARY,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: DIMENSIONS.SPACING_MD,
  },
  radioSelected: {
    height: DIMENSIONS.RADIO_INNER_SIZE,
    width: DIMENSIONS.RADIO_INNER_SIZE,
    borderRadius: DIMENSIONS.RADIO_INNER_SIZE / 2,
    backgroundColor: COLORS.SECONDARY,
  },
  radioLabel: {
    fontSize: FONT_SIZES.MEDIUM,
    color: COLORS.SECONDARY,
    fontWeight: FONT_WEIGHTS.MEDIUM,
  },
})
