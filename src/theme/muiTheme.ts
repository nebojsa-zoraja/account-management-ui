import { createTheme } from "@mui/material/styles";

// TIAC Account Management - MUI Theme Configuration
export const muiTheme = createTheme({
  palette: {
    primary: {
      main: "#951414",
      dark: "#7a1010",
      light: "#b51a1a",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#616161",
      light: "#9e9e9e",
      dark: "#212121",
      contrastText: "#ffffff",
    },
    error: {
      main: "#c62828",
      light: "#ef5350",
    },
    warning: {
      main: "#f57c00",
      light: "#ff9800",
    },
    info: {
      main: "#0277bd",
      light: "#03a9f4",
    },
    success: {
      main: "#2e7d32",
      light: "#4caf50",
    },
    background: {
      default: "#f5f5f5",
      paper: "#ffffff",
    },
    text: {
      primary: "#212121",
      secondary: "#616161",
      disabled: "#9e9e9e",
    },
    divider: "#e0e0e0",
  },
  typography: {
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    fontSize: 14,
    button: {
      textTransform: "none",
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 6,
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            backgroundColor: "#ffffff",
            "& fieldset": {
              borderColor: "#e0e0e0",
              borderWidth: "2px",
            },
            "&:hover fieldset": {
              borderColor: "#bdbdbd",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#951414",
              borderWidth: "2px",
            },
            "&.Mui-error fieldset": {
              borderColor: "#c62828",
            },
          },
          "& .MuiInputLabel-root": {
            color: "#616161",
            fontWeight: 500,
            "&.Mui-focused": {
              color: "#951414",
            },
            "&.Mui-error": {
              color: "#c62828",
            },
          },
        },
      },
      defaultProps: {
        variant: "outlined",
        size: "medium",
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          backgroundColor: "#ffffff",
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#e0e0e0",
            borderWidth: "2px",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#bdbdbd",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#951414",
            borderWidth: "2px",
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "6px",
          padding: "10px 20px",
          fontSize: "0.9375rem",
          fontWeight: 600,
          transition: "all 200ms cubic-bezier(0.4, 0, 0.2, 1)",
          "&:active": {
            transform: "scale(0.98)",
          },
        },
        contained: {
          boxShadow: "none",
          "&:hover": {
            boxShadow:
              "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
          },
        },
        outlined: {
          borderWidth: "2px",
          "&:hover": {
            borderWidth: "2px",
          },
        },
        sizeLarge: {
          padding: "12px 24px",
          fontSize: "1rem",
        },
        sizeMedium: {
          padding: "10px 20px",
          fontSize: "0.9375rem",
        },
        sizeSmall: {
          padding: "8px 16px",
          fontSize: "0.875rem",
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: "#bdbdbd",
          "&.Mui-checked": {
            color: "#951414",
          },
          "&:hover": {
            backgroundColor: "rgba(149, 20, 20, 0.08)",
          },
        },
      },
    },
    MuiRadio: {
      styleOverrides: {
        root: {
          color: "#bdbdbd",
          "&.Mui-checked": {
            color: "#951414",
          },
          "&:hover": {
            backgroundColor: "rgba(149, 20, 20, 0.08)",
          },
        },
      },
    },
    MuiSwitch: {
      styleOverrides: {
        root: {
          "& .MuiSwitch-switchBase.Mui-checked": {
            color: "#951414",
          },
          "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
            backgroundColor: "#951414",
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: "16px",
          fontWeight: 500,
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: "12px",
          boxShadow:
            "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          background: "linear-gradient(135deg, #951414 0%, #7a1010 100%)",
          color: "#ffffff",
          padding: "20px 24px",
          fontWeight: 600,
          fontSize: "1.25rem",
        },
      },
    },
    MuiDialogContent: {
      styleOverrides: {
        root: {
          padding: "24px",
        },
      },
    },
    MuiDialogActions: {
      styleOverrides: {
        root: {
          padding: "20px 24px",
          backgroundColor: "#ffffff",
          borderTop: "1px solid #e0e0e0",
        },
      },
    },
    MuiCircularProgress: {
      styleOverrides: {
        root: {
          color: "#951414",
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(149, 20, 20, 0.1)",
          "& .MuiLinearProgress-bar": {
            backgroundColor: "#951414",
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "#616161",
          fontWeight: 500,
          "&.Mui-focused": {
            color: "#951414",
          },
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          color: "#616161",
          fontWeight: 500,
          "&.Mui-focused": {
            color: "#951414",
          },
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          fontSize: "0.75rem",
          marginTop: "4px",
        },
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            padding: "6px",
          },
        },
        option: {
          '&[aria-selected="true"]': {
            backgroundColor: "rgba(149, 20, 20, 0.08)",
          },
          "&.Mui-focused": {
            backgroundColor: "rgba(149, 20, 20, 0.12)",
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          fontWeight: 600,
          backgroundColor: "#fafafa",
          color: "#212121",
        },
      },
    },
  },
});
