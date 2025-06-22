import React from 'react'
import { render } from '@testing-library/react-native'
import ProgressBar from '../ProgressBar'

describe('ProgressBar', () => {
  it('renders correctly and calculates progress width as percentage', () => {
    const { getByTestId } = render(<ProgressBar currentStep={2} totalSteps={4} />)
    const progressFill = getByTestId('progress-bar-fill')
    expect(progressFill.props.style).toEqual(
      expect.arrayContaining([expect.objectContaining({ width: '50%' })]),
    )
  })

  it('caps progress at 100% when currentStep > totalSteps', () => {
    const { getByTestId } = render(<ProgressBar currentStep={10} totalSteps={5} />)
    const progressFill = getByTestId('progress-bar-fill')
    expect(progressFill.props.style).toEqual(
      expect.arrayContaining([expect.objectContaining({ width: '100%' })]),
    )
  })

  it('does not go below 0% when currentStep is negative', () => {
    const { getByTestId } = render(<ProgressBar currentStep={-3} totalSteps={5} />)
    const progressFill = getByTestId('progress-bar-fill')
    expect(progressFill.props.style).toEqual(
      expect.arrayContaining([expect.objectContaining({ width: '0%' })]),
    )
  })

  it('returns 0% if totalSteps is 0 or less', () => {
    const { getByTestId } = render(<ProgressBar currentStep={3} totalSteps={0} />)
    const progressFill = getByTestId('progress-bar-fill')
    expect(progressFill.props.style).toEqual(
      expect.arrayContaining([expect.objectContaining({ width: '0%' })]),
    )
  })
})
