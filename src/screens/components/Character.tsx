import { memo } from 'react'
import { Dimensions, StyleSheet } from 'react-native'
import LottieView from 'lottie-react-native'

const { width: WIDTH } = Dimensions.get('window')

const Character = () => {
  return (
    <LottieView
      source={require('../../assets/lotties/welcome-logo.json')}
      style={styles.container}
      autoPlay
      loop
      hardwareAccelerationAndroid
      enableMergePathsAndroidForKitKatAndAbove
    />
  )
}

export default memo(Character)

const styles = StyleSheet.create({
  container: {
    width: WIDTH * 0.8,
    height: WIDTH * 0.8,
    alignSelf: 'center',
  },
})
