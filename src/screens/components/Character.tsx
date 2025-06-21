import { COLORS, DIMENSIONS, FONT_SIZES, shadows } from '@/src/constants'
import { memo } from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native'

const Character = memo(() => (
  <>
    <View style={characterStyles.characterWrapper}>
      <Text style={characterStyles.characterEmoji}>{'👩‍⚕️'}</Text>
      <View style={characterStyles.speechBubble}>
        <Text style={characterStyles.speechText}>💬</Text>
      </View>
    </View>
    <View style={characterStyles.characterWrapper}>
      <Text style={characterStyles.characterEmoji}>{'👨‍⚕️'}</Text>
      <View style={characterStyles.speechBubble}>
        <Text style={characterStyles.speechText}>💬</Text>
      </View>
    </View>
  </>
))

const characterStyles = StyleSheet.create({
  characterWrapper: {
    alignItems: 'center',
    position: 'relative',
  },
  characterEmoji: {
    fontSize: DIMENSIONS.CHARACTER_EMOJI_SIZE,
  },
  speechBubble: {
    position: 'absolute',
    top: -10,
    right: -10,
    backgroundColor: COLORS.WHITE,
    borderRadius: DIMENSIONS.BORDER_RADIUS_LARGE,
    padding: DIMENSIONS.SPACING_SM,
    ...shadows.small,
  },
  speechText: {
    fontSize: FONT_SIZES.SMALL,
  },
})

export default Character
