import React, { useMemo } from 'react'
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native'
import { ButtonProps, ButtonVariant } from '../types'
import {
  COLORS,
  DIMENSIONS,
  FONT_SIZES,
  FONT_WEIGHTS,
  ANIMATION,
} from '../constants'

const getButtonStyle = (
  variant: ButtonVariant,
  disabled: boolean,
): ViewStyle => {
  if (disabled) {
    return {
      backgroundColor: COLORS.GRAY_MEDIUM,
      borderColor: COLORS.GRAY_MEDIUM,
    }
  }
  return {
    backgroundColor: variant === 'primary' ? COLORS.PRIMARY : 'transparent',
    borderColor: variant === 'secondary' ? COLORS.PRIMARY : 'transparent',
  }
}

const getTextStyle = (variant: ButtonVariant, disabled: boolean): TextStyle => {
  if (disabled) {
    return {
      color: COLORS.GRAY_DARK,
    }
  }
  return {
    color: variant === 'primary' ? COLORS.WHITE : COLORS.PRIMARY,
  }
}

const CustomButton: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
  style,
  textStyle,
}) => {
  const buttonStyle = useMemo(
    () => getButtonStyle(variant, disabled),
    [variant, disabled],
  )
  const labelStyle = useMemo(
    () => getTextStyle(variant, disabled),
    [variant, disabled],
  )

  return (
    <TouchableOpacity
      style={[styles.button, buttonStyle, style]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={ANIMATION.ACTIVE_OPACITY}
      testID={`button-${variant}-${disabled ? 'disabled' : 'enabled'}`}
    >
      <Text style={[styles.buttonText, labelStyle, textStyle]}>{title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    borderRadius: DIMENSIONS.BORDER_RADIUS_BUTTON,
    paddingVertical: DIMENSIONS.BUTTON_PADDING_VERTICAL,
    paddingHorizontal: DIMENSIONS.BUTTON_PADDING_HORIZONTAL,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: DIMENSIONS.BUTTON_MIN_HEIGHT,
  },
  buttonText: {
    fontSize: FONT_SIZES.MEDIUM,
    fontWeight: FONT_WEIGHTS.SEMIBOLD,
  },
})

export default React.memo(CustomButton)
