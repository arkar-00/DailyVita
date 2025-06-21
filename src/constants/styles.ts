import { ViewStyle, TextStyle } from 'react-native'
import { COLORS, DIMENSIONS, FONT_SIZES, FONT_WEIGHTS } from './base'

// Common view styles
export const commonStyles = {
  // Container styles
  safeAreaContainer: {
    flex: 1,
    backgroundColor: COLORS.SECONDARY_LIGHT,
  } as ViewStyle,

  contentContainer: {
    flex: 1,
    paddingHorizontal: DIMENSIONS.SPACING_XXL,
    justifyContent: 'space-between',
  } as ViewStyle,

  scrollContent: {
    flex: 1,
  } as ViewStyle,

  // Layout styles
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  } as ViewStyle,

  header: {
    marginTop: DIMENSIONS.SPACING_SCREEN,
    alignItems: 'center',
  } as ViewStyle,

  footer: {
    marginBottom: DIMENSIONS.SPACING_SECTION,
    alignItems: 'center',
  } as ViewStyle,

  // Button container styles
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: DIMENSIONS.SPACING_LG,
  } as ViewStyle,

  singleButtonContainer: {
    width: '100%',
  } as ViewStyle,

  // Card styles
  card: {
    backgroundColor: COLORS.WHITE,
    borderRadius: DIMENSIONS.BORDER_RADIUS_MEDIUM,
    padding: DIMENSIONS.SPACING_LG,
    marginVertical: DIMENSIONS.SPACING_SM,
    shadowColor: COLORS.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  } as ViewStyle,

  // Selection item styles
  selectionItem: {
    borderRadius: DIMENSIONS.BORDER_RADIUS_MEDIUM,
    paddingVertical: DIMENSIONS.SPACING_MD,
    paddingHorizontal: DIMENSIONS.SPACING_LG,
    marginBottom: DIMENSIONS.SPACING_SM,
    borderWidth: 1,
    borderColor: COLORS.GRAY_LIGHT,
    backgroundColor: COLORS.WHITE,
  } as ViewStyle,

  selectionItemSelected: {
    borderColor: COLORS.SECONDARY,
    backgroundColor: COLORS.SECONDARY_LIGHT,
  } as ViewStyle,

  // Grid styles
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: DIMENSIONS.SPACING_SM,
    marginVertical: DIMENSIONS.SPACING_LG,
  } as ViewStyle,
}

// Common text styles
export const textStyles = {
  // Heading styles
  title: {
    fontSize: FONT_SIZES.LARGE,
    fontWeight: FONT_WEIGHTS.BOLD,
    color: COLORS.SECONDARY,
    textAlign: 'left',
    marginBottom: DIMENSIONS.SPACING_LG,
  } as TextStyle,

  subtitle: {
    fontSize: FONT_SIZES.MEDIUM,
    color: COLORS.GRAY_TEXT,
    textAlign: 'center',
    lineHeight: FONT_SIZES.XL,
  } as TextStyle,

  sectionTitle: {
    fontSize: FONT_SIZES.LARGE,
    fontWeight: FONT_WEIGHTS.SEMIBOLD,
    color: COLORS.SECONDARY,
    marginBottom: DIMENSIONS.SPACING_MD,
  } as TextStyle,

  // Body text styles
  body: {
    fontSize: FONT_SIZES.MEDIUM,
    color: COLORS.GRAY_TEXT,
    lineHeight: FONT_SIZES.XL,
  } as TextStyle,

  description: {
    fontSize: FONT_SIZES.MEDIUM,
    color: COLORS.GRAY_TEXT,
    lineHeight: FONT_SIZES.XL,
    textAlign: 'center',
    marginBottom: DIMENSIONS.SPACING_XXXL,
  } as TextStyle,

  // Selection text styles
  selectionText: {
    fontSize: FONT_SIZES.MEDIUM,
    color: COLORS.SECONDARY,
    fontWeight: FONT_WEIGHTS.MEDIUM,
  } as TextStyle,

  selectionTextSelected: {
    color: COLORS.SECONDARY,
    fontWeight: FONT_WEIGHTS.SEMIBOLD,
  } as TextStyle,

  // Special text styles
  asterisk: {
    color: COLORS.PRIMARY,
  } as TextStyle,

  required: {
    fontSize: FONT_SIZES.SMALL,
    color: COLORS.GRAY_TEXT,
    marginTop: DIMENSIONS.SPACING_XS,
  } as TextStyle,
}

// Shadow utilities
export const shadows = {
  small: {
    shadowColor: COLORS.BLACK,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  } as ViewStyle,

  medium: {
    shadowColor: COLORS.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  } as ViewStyle,

  large: {
    shadowColor: COLORS.BLACK,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  } as ViewStyle,
}

// Animation utilities
export const animations = {
  fadeIn: {
    opacity: 1,
  } as ViewStyle,

  fadeOut: {
    opacity: 0,
  } as ViewStyle,
}

// Helper functions for dynamic styles
export const createSelectionStyle = (isSelected: boolean): ViewStyle => ({
  ...commonStyles.selectionItem,
  ...(isSelected ? commonStyles.selectionItemSelected : {}),
})

export const createSelectionTextStyle = (isSelected: boolean): TextStyle => ({
  ...textStyles.selectionText,
  ...(isSelected ? textStyles.selectionTextSelected : {}),
})
