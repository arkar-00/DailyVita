import { COLORS, DIMENSIONS, FONT_SIZES, shadows } from '@/src/constants'
import { memo } from 'react'
import { StyleSheet, Text, View } from 'react-native'

const Pill = memo(({ style, emoji }: { style: any; emoji: string }) => (
  <View style={[pillStyles.pillBase, style]}>
    <Text style={pillStyles.pillText}>{emoji}</Text>
  </View>
))

const pillStyles = StyleSheet.create({
  pillBase: {
    position: 'absolute',
    width: DIMENSIONS.PILL_SIZE,
    height: DIMENSIONS.PILL_SIZE,
    borderRadius: DIMENSIONS.PILL_SIZE / 2,
    backgroundColor: COLORS.PRIMARY_LIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    ...shadows.medium,
  },
  pillText: {
    fontSize: FONT_SIZES.LARGE,
  },
})

export default Pill
