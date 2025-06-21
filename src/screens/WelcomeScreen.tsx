import React, { useCallback, memo } from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch } from 'react-redux'
import { setCurrentStep } from '../store/slices/onboardingSlice'
import { BaseNavigationProps } from '../types'
import { AppDispatch } from '../store'
import {
  COLORS,
  DIMENSIONS,
  commonStyles,
  textStyles,
  SCREEN_NAMES,
} from '../constants'
import { CustomButton } from '../components'
import Character from './components/Character'
import Pill from './components/Pill'

const { width } = Dimensions.get('window')

type WelcomeScreenProps = BaseNavigationProps<'Welcome'>

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ navigation }) => {
  const dispatch = useDispatch<AppDispatch>()

  const handleGetStarted = useCallback(() => {
    dispatch(setCurrentStep(1))
    navigation.navigate(SCREEN_NAMES.HEALTH_CONCERNS)
  }, [dispatch, navigation])

  return (
    <SafeAreaView
      style={commonStyles.safeAreaContainer}
      edges={['top', 'left', 'right']}
    >
      <View style={commonStyles.contentContainer}>
        <View style={commonStyles.header}>
          <Text style={textStyles.title}>Welcome to DailyVita</Text>
          <Text style={textStyles.subtitle}>
            Hello, we are here to make your life{'\n'}healthier and happier
          </Text>
        </View>

        <View style={welcomeStyles.illustrationSection}>
          <View style={welcomeStyles.illustrationBox}>
            <Pill style={welcomeStyles.pillBlue} emoji="🎗️" />
            <Pill style={welcomeStyles.pillPurple} emoji="🧬" />
            <Pill style={welcomeStyles.pillOrange} emoji="💊" />
            <Pill style={welcomeStyles.pillGreen} emoji="🧪" />
            <View style={welcomeStyles.charactersRow}>
              <Character />
            </View>
          </View>
        </View>

        <View style={commonStyles.footer}>
          <Text style={textStyles.description}>
            We will ask couple of questions to better{'\n'}understand your
            vitamin need.
          </Text>
          <CustomButton
            title="Get started"
            onPress={handleGetStarted}
            style={commonStyles.singleButtonContainer}
          />
        </View>
      </View>
    </SafeAreaView>
  )
}

const welcomeStyles = StyleSheet.create({
  illustrationSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: DIMENSIONS.SPACING_SECTION,
  },
  illustrationBox: {
    width: width * 0.8,
    height: 300,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pillBlue: {
    top: 20,
    left: 30,
    backgroundColor: COLORS.ACCENT_BLUE,
  },
  pillPurple: {
    top: 50,
    right: 20,
    backgroundColor: COLORS.ACCENT_PURPLE,
  },
  pillOrange: {
    bottom: 80,
    left: 20,
    backgroundColor: COLORS.ACCENT_ORANGE,
  },
  pillGreen: {
    bottom: 30,
    right: 40,
    backgroundColor: COLORS.SUCCESS_LIGHT,
  },

  charactersRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: DIMENSIONS.SPACING_XL,
  },
})

export default memo(WelcomeScreen)
