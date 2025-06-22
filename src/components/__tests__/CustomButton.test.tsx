import React from 'react'
import { render, fireEvent } from '@testing-library/react-native'
import CustomButton from '../CustomButton'

describe('CustomButton', () => {
  it('renders the button with the correct title', () => {
    const { getByText } = render(<CustomButton title="Click Me" onPress={() => {}} />)
    expect(getByText('Click Me')).toBeTruthy()
  })

  it('calls onPress when the button is pressed', () => {
    const mockPress = jest.fn()
    const { getByTestId } = render(<CustomButton title="Submit" onPress={mockPress} />)
    fireEvent.press(getByTestId('button-primary-enabled'))
    expect(mockPress).toHaveBeenCalled()
  })

  it('does not call onPress when the button is disabled', () => {
    const mockPress = jest.fn()
    const { getByTestId } = render(<CustomButton title="Disabled" onPress={mockPress} disabled />)
    fireEvent.press(getByTestId('button-primary-disabled'))
    expect(mockPress).not.toHaveBeenCalled()
  })

  it('applies secondary variant styles and correct testID', () => {
    const { getByTestId } = render(
      <CustomButton title="Secondary" onPress={() => {}} variant="secondary" />,
    )
    const button = getByTestId('button-secondary-enabled')
    expect(button).toBeTruthy()
  })

  it('supports custom style and textStyle', () => {
    const customStyle = { backgroundColor: 'red' }
    const customTextStyle = { fontSize: 22 }
    const { getByText } = render(
      <CustomButton
        title="Styled"
        onPress={() => {}}
        style={customStyle}
        textStyle={customTextStyle}
      />,
    )
    const text = getByText('Styled')
    expect(text.props.style).toEqual(
      expect.arrayContaining([expect.objectContaining({ fontSize: 22 })]),
    )
  })
})
