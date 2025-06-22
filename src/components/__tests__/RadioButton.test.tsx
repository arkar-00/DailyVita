import React from 'react'
import { render, fireEvent } from '@testing-library/react-native'
import RadioButton from '../RadioButton'

describe('RadioButton', () => {
  const label = 'Option A'
  const value = 'a'

  it('renders the radio button with the correct label', () => {
    const { getByText } = render(
      <RadioButton label={label} value={value} selected={null} onPress={() => {}} />,
    )
    expect(getByText(label)).toBeTruthy()
  })

  it('calls onPress with the correct value when pressed', () => {
    const mockOnPress = jest.fn()
    const { getByTestId } = render(
      <RadioButton label={label} value={value} selected={null} onPress={mockOnPress} />,
    )

    fireEvent.press(getByTestId(`radio-button-${value}`))
    expect(mockOnPress).toHaveBeenCalledWith(value)
  })

  it('does not show selected indicator when value is not selected', () => {
    const { getByTestId, queryByTestId } = render(
      <RadioButton label={label} value={value} selected="other" onPress={() => {}} />,
    )

    const radioButton = getByTestId(`radio-button-${value}`)
    // The selected indicator should NOT exist
    const innerCircle = radioButton.findAllByProps({
      style: expect.objectContaining({ backgroundColor: expect.any(String) }),
    })

    expect(innerCircle.length).toBe(0)
  })
})
