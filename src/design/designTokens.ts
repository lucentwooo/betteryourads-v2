/**
 * BetterYourAds design tokens.
 *
 * These tokens translate the warm, minimal product direction into reusable values
 * for a SaaS/startup workspace focused on Meta static ad concepts and creative
 * preview cards. They intentionally avoid behavior, components, and broad
 * marketing-platform assumptions.
 */

export const colors = {
  bg: '#ffffff',
  surface: '#f6f5f4',
  surfaceRaised: '#ffffff',
  surfaceHover: '#f0efed',
  text: 'rgba(0, 0, 0, 0.95)',
  textMuted: '#615d59',
  textSubtle: '#8a8580',
  border: 'rgba(0, 0, 0, 0.10)',
  borderStrong: 'rgba(0, 0, 0, 0.18)',
  primary: '#0075de',
  primaryHover: '#0068c7',
  primarySoft: 'rgba(0, 117, 222, 0.10)',
  danger: '#c83f31',
  dangerSoft: 'rgba(200, 63, 49, 0.10)',
  success: '#257a4f',
  warning: '#9a6518',
  white: '#ffffff',
} as const;

export const spacing = {
  0: '0',
  1: '4px',
  2: '8px',
  3: '12px',
  4: '16px',
  5: '20px',
  6: '24px',
  8: '32px',
  10: '40px',
} as const;

export const radii = {
  control: '4px',
  card: '12px',
  panel: '16px',
  full: '999px',
} as const;

export const shadows = {
  none: 'none',
  subtle: '0 1px 2px rgba(0, 0, 0, 0.06)',
  card: '0 8px 24px rgba(0, 0, 0, 0.06)',
  focus: '0 0 0 3px rgba(0, 117, 222, 0.16)',
} as const;

export const typeScale = {
  fontFamily:
    'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  xs: {
    fontSize: '12px',
    lineHeight: '16px',
    fontWeight: 400,
  },
  sm: {
    fontSize: '13px',
    lineHeight: '18px',
    fontWeight: 400,
  },
  base: {
    fontSize: '14px',
    lineHeight: '20px',
    fontWeight: 400,
  },
  md: {
    fontSize: '16px',
    lineHeight: '24px',
    fontWeight: 400,
  },
  lg: {
    fontSize: '18px',
    lineHeight: '26px',
    fontWeight: 500,
  },
  xl: {
    fontSize: '22px',
    lineHeight: '30px',
    fontWeight: 600,
  },
  '2xl': {
    fontSize: '28px',
    lineHeight: '36px',
    fontWeight: 650,
  },
} as const;

export const layout = {
  breakpoints: {
    mobile: '0px',
    tablet: '768px',
    desktop: '1024px',
    wide: '1280px',
  },
  gutters: {
    mobile: spacing[4],
    desktop: spacing[6],
  },
  page: {
    maxWidth: '1200px',
    sectionGap: spacing[8],
    topLevelGap: spacing[10],
  },
  panel: {
    paddingMobile: '14px',
    paddingDesktop: spacing[4],
    gap: spacing[4],
  },
  form: {
    groupGap: spacing[6],
    fieldGap: spacing[4],
    labelGap: spacing[2],
    strategicTextareaMinHeight: '120px',
    longContextTextareaMinHeight: '180px',
  },
  controls: {
    minHeight: '36px',
    comfortableHeight: '40px',
    touchTarget: '44px',
  },
  creativePreview: {
    stagePaddingMobile: spacing[4],
    stagePaddingDesktop: spacing[6],
    canvasRadius: radii.card,
    stageRadius: radii.panel,
    cardMinWidth: '280px',
    feedSquare: '1 / 1',
    feedPortrait: '4 / 5',
    story: '9 / 16',
  },
  motion: {
    hoverFocusDuration: '150ms',
    panelDuration: '220ms',
    ease: 'ease',
  },
} as const;
