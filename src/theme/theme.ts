/**
 * TIAC Account Management - Design System Theme
 * Professional design tokens and theme configuration
 */

export const designTokens = {
  // Brand Colors
  colors: {
    // Primary Brand Red
    primary: {
      main: "#951414",
      dark: "#7a1010",
      darker: "#5c0c0c",
      light: "#b51a1a",
      lighter: "#d42020",
      pale: "rgba(149, 20, 20, 0.08)",
      hover: "rgba(149, 20, 20, 0.12)",
    },

    // Neutral Palette
    neutral: {
      white: "#ffffff",
      gray50: "#fafafa",
      gray100: "#f5f5f5",
      gray200: "#eeeeee",
      gray300: "#e0e0e0",
      gray400: "#bdbdbd",
      gray500: "#9e9e9e",
      gray600: "#757575",
      gray700: "#616161",
      gray800: "#424242",
      gray900: "#212121",
      black: "#000000",
    },

    // Semantic Colors
    success: {
      main: "#2e7d32",
      light: "#4caf50",
      pale: "#e8f5e9",
    },
    warning: {
      main: "#f57c00",
      light: "#ff9800",
      pale: "#fff3e0",
    },
    error: {
      main: "#c62828",
      light: "#ef5350",
      pale: "#ffebee",
    },
    info: {
      main: "#0277bd",
      light: "#03a9f4",
      pale: "#e1f5fe",
    },

    // Background Colors
    background: {
      default: "#f5f5f5",
      paper: "#ffffff",
      elevated: "#ffffff",
      subtle: "#fafafa",
    },

    // Text Colors
    text: {
      primary: "#212121",
      secondary: "#616161",
      disabled: "#9e9e9e",
      hint: "#bdbdbd",
    },

    // Border Colors
    border: {
      light: "#e0e0e0",
      main: "#bdbdbd",
      dark: "#9e9e9e",
    },
  },

  // Typography Scale
  typography: {
    fontFamily: {
      primary:
        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      monospace:
        '"SF Mono", Monaco, "Cascadia Code", "Roboto Mono", Consolas, "Courier New", monospace',
    },
    fontSize: {
      xs: "0.75rem", // 12px
      sm: "0.875rem", // 14px
      base: "1rem", // 16px
      lg: "1.125rem", // 18px
      xl: "1.25rem", // 20px
      "2xl": "1.5rem", // 24px
      "3xl": "1.875rem", // 30px
      "4xl": "2.25rem", // 36px
    },
    fontWeight: {
      light: 300,
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    lineHeight: {
      tight: 1.2,
      normal: 1.5,
      relaxed: 1.75,
    },
  },

  // Spacing Scale (8px base)
  spacing: {
    0: "0",
    0.5: "0.125rem", // 2px
    1: "0.25rem", // 4px
    1.5: "0.375rem", // 6px
    2: "0.5rem", // 8px
    2.5: "0.625rem", // 10px
    3: "0.75rem", // 12px
    4: "1rem", // 16px
    5: "1.25rem", // 20px
    6: "1.5rem", // 24px
    7: "1.75rem", // 28px
    8: "2rem", // 32px
    10: "2.5rem", // 40px
    12: "3rem", // 48px
    16: "4rem", // 64px
    20: "5rem", // 80px
  },

  // Border Radius
  borderRadius: {
    none: "0",
    sm: "0.25rem", // 4px
    base: "0.375rem", // 6px
    md: "0.5rem", // 8px
    lg: "0.75rem", // 12px
    xl: "1rem", // 16px
    "2xl": "1.5rem", // 24px
    full: "9999px",
  },

  // Shadows
  shadows: {
    none: "none",
    sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    base: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
    md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    inner: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)",
    card: "0 2px 8px rgba(0, 0, 0, 0.08)",
    elevated: "0 4px 12px rgba(0, 0, 0, 0.12)",
  },

  // Transitions
  transitions: {
    fast: "150ms cubic-bezier(0.4, 0, 0.2, 1)",
    base: "200ms cubic-bezier(0.4, 0, 0.2, 1)",
    slow: "300ms cubic-bezier(0.4, 0, 0.2, 1)",
  },

  // Z-Index Scale
  zIndex: {
    base: 0,
    dropdown: 1000,
    sticky: 1100,
    fixed: 1200,
    overlay: 1300,
    modal: 1400,
    popover: 1500,
    tooltip: 1600,
  },

  // Breakpoints
  breakpoints: {
    xs: "0px",
    sm: "600px",
    md: "960px",
    lg: "1280px",
    xl: "1920px",
  },
};

// MUI Theme Configuration
export const muiThemeConfig = {
  palette: {
    primary: {
      main: designTokens.colors.primary.main,
      dark: designTokens.colors.primary.dark,
      light: designTokens.colors.primary.light,
      contrastText: "#fff",
    },
    secondary: {
      main: designTokens.colors.neutral.gray700,
      light: designTokens.colors.neutral.gray500,
      dark: designTokens.colors.neutral.gray900,
      contrastText: "#fff",
    },
    error: {
      main: designTokens.colors.error.main,
      light: designTokens.colors.error.light,
    },
    warning: {
      main: designTokens.colors.warning.main,
      light: designTokens.colors.warning.light,
    },
    info: {
      main: designTokens.colors.info.main,
      light: designTokens.colors.info.light,
    },
    success: {
      main: designTokens.colors.success.main,
      light: designTokens.colors.success.light,
    },
    background: {
      default: designTokens.colors.background.default,
      paper: designTokens.colors.background.paper,
    },
    text: {
      primary: designTokens.colors.text.primary,
      secondary: designTokens.colors.text.secondary,
      disabled: designTokens.colors.text.disabled,
    },
    divider: designTokens.colors.border.light,
  },
  typography: {
    fontFamily: designTokens.typography.fontFamily.primary,
    fontSize: 14,
    h1: {
      fontSize: designTokens.typography.fontSize["3xl"],
      fontWeight: designTokens.typography.fontWeight.bold,
      lineHeight: designTokens.typography.lineHeight.tight,
    },
    h2: {
      fontSize: designTokens.typography.fontSize["2xl"],
      fontWeight: designTokens.typography.fontWeight.bold,
      lineHeight: designTokens.typography.lineHeight.tight,
    },
    h3: {
      fontSize: designTokens.typography.fontSize.xl,
      fontWeight: designTokens.typography.fontWeight.semibold,
      lineHeight: designTokens.typography.lineHeight.tight,
    },
    h4: {
      fontSize: designTokens.typography.fontSize.lg,
      fontWeight: designTokens.typography.fontWeight.semibold,
      lineHeight: designTokens.typography.lineHeight.normal,
    },
    h5: {
      fontSize: designTokens.typography.fontSize.base,
      fontWeight: designTokens.typography.fontWeight.semibold,
      lineHeight: designTokens.typography.lineHeight.normal,
    },
    h6: {
      fontSize: designTokens.typography.fontSize.sm,
      fontWeight: designTokens.typography.fontWeight.semibold,
      lineHeight: designTokens.typography.lineHeight.normal,
    },
    body1: {
      fontSize: designTokens.typography.fontSize.base,
      lineHeight: designTokens.typography.lineHeight.normal,
    },
    body2: {
      fontSize: designTokens.typography.fontSize.sm,
      lineHeight: designTokens.typography.lineHeight.normal,
    },
    button: {
      fontSize: designTokens.typography.fontSize.sm,
      fontWeight: designTokens.typography.fontWeight.medium,
      textTransform: "none",
    },
  },
  shape: {
    borderRadius: 8,
  },
  shadows: [
    "none",
    designTokens.shadows.sm,
    designTokens.shadows.base,
    designTokens.shadows.md,
    designTokens.shadows.md,
    designTokens.shadows.lg,
    designTokens.shadows.lg,
    designTokens.shadows.xl,
    designTokens.shadows.xl,
    designTokens.shadows.xl,
    designTokens.shadows.xl,
    designTokens.shadows.xl,
    designTokens.shadows.xl,
    designTokens.shadows.xl,
    designTokens.shadows.xl,
    designTokens.shadows.xl,
    designTokens.shadows.xl,
    designTokens.shadows.xl,
    designTokens.shadows.xl,
    designTokens.shadows.xl,
    designTokens.shadows.xl,
    designTokens.shadows.xl,
    designTokens.shadows.xl,
    designTokens.shadows.xl,
    designTokens.shadows.xl,
  ],
};

export default designTokens;
