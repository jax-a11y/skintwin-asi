// Theme definition for SkinTwin-ASI
// Implements the visual language defined in the UI/UX prototype

export const theme = {
  colors: {
    // Base colors
    background: {
      primary: '#1A1D21',
      secondary: '#141518',
      tertiary: '#232529'
    },
    text: {
      primary: '#E8E9EA',
      secondary: '#8D8E8F',
      tertiary: '#6A6B6C'
    },
    
    // Accent colors - representing different agents and components
    accent: {
      marduk: '#8A63D2',    // Purple for system components and Marduk-related elements
      deepTreeEcho: '#4169E1', // Blue for user input components and Deep Tree Echo-related elements
      skinTwinAnalyst: '#3CB371', // Green for AI response components and SkinTwin Analyst-related elements
      plinguaMembrane: '#20B2AA', // Teal for PLingua Membrane-related elements
      connection: '#FFD700'  // Gold for connections and relationships between components
    },
    
    // Status colors
    status: {
      success: '#4CAF50',
      warning: '#FFC107',
      error: '#F44336',
      info: '#2196F3'
    }
  },
  
  // Typography
  typography: {
    fontFamily: {
      primary: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
      monospace: "'Fira Code', 'Courier New', monospace"
    },
    fontWeight: {
      light: 300,
      regular: 400,
      medium: 500,
      bold: 700
    },
    fontSize: {
      display: '24px',
      heading: '18px',
      subheading: '16px',
      body: '14px',
      caption: '12px',
      small: '10px'
    },
    lineHeight: {
      tight: 1.2,
      normal: 1.5,
      relaxed: 1.8
    }
  },
  
  // Spacing system
  spacing: {
    base: '8px',
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    xxl: '48px'
  },
  
  // Border radius
  borderRadius: {
    sm: '4px',
    md: '8px',
    lg: '12px',
    xl: '16px',
    circle: '50%'
  },
  
  // Shadows
  shadows: {
    sm: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
    md: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
    lg: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)',
    xl: '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)'
  },
  
  // Z-index levels
  zIndex: {
    base: 0,
    above: 1,
    dropdown: 1000,
    sticky: 1100,
    fixed: 1200,
    modal: 1300,
    popover: 1400,
    tooltip: 1500
  },
  
  // Transitions
  transitions: {
    duration: {
      fast: '0.15s',
      normal: '0.25s',
      slow: '0.4s'
    },
    timing: {
      ease: 'ease',
      easeIn: 'ease-in',
      easeOut: 'ease-out',
      easeInOut: 'ease-in-out'
    }
  },
  
  // Breakpoints for responsive design
  breakpoints: {
    mobile: '320px',
    tablet: '768px',
    desktop: '1024px',
    largeDesktop: '1440px'
  }
};

// Type definition for the theme
export type Theme = typeof theme;

// Helper to access theme in styled-components
export const themeAccess = () => theme;
