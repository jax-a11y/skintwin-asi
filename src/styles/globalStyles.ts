import { createGlobalStyle } from 'styled-components';
import { theme } from './theme';

export const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;700&family=Fira+Code:wght@400;700&display=swap');
  
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  
  html, body {
    height: 100%;
    width: 100%;
    font-family: ${theme.typography.fontFamily.primary};
    font-size: ${theme.typography.fontSize.body};
    line-height: ${theme.typography.lineHeight.normal};
    background-color: ${theme.colors.background.primary};
    color: ${theme.colors.text.primary};
    overflow: hidden;
  }
  
  #__next {
    height: 100%;
    width: 100%;
  }
  
  h1, h2, h3, h4, h5, h6 {
    font-weight: ${theme.typography.fontWeight.medium};
    line-height: ${theme.typography.lineHeight.tight};
  }
  
  h1 {
    font-size: ${theme.typography.fontSize.display};
  }
  
  h2 {
    font-size: ${theme.typography.fontSize.heading};
  }
  
  h3 {
    font-size: ${theme.typography.fontSize.subheading};
  }
  
  p {
    margin-bottom: ${theme.spacing.md};
  }
  
  code, pre {
    font-family: ${theme.typography.fontFamily.monospace};
  }
  
  button, input, select, textarea {
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
  }
  
  a {
    color: ${theme.colors.accent.deepTreeEcho};
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
  
  /* Custom scrollbar */
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }
  
  ::-webkit-scrollbar-track {
    background: ${theme.colors.background.secondary};
  }
  
  ::-webkit-scrollbar-thumb {
    background: ${theme.colors.text.tertiary};
    border-radius: ${theme.borderRadius.md};
  }
  
  ::-webkit-scrollbar-thumb:hover {
    background: ${theme.colors.text.secondary};
  }
`;

export default GlobalStyle;
