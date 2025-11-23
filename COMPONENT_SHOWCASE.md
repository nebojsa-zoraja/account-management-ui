# TIAC Account Management - Component Showcase

A visual reference guide for all redesigned components in the application.

---

## Color Palette

### Primary Brand Colors
- **Primary Red**: `#951414` - Main brand color, buttons, accents
- **Primary Dark**: `#7a1010` - Hover states, emphasis
- **Primary Darker**: `#5c0c0c` - Active states
- **Primary Pale**: `rgba(149, 20, 20, 0.08)` - Backgrounds, subtle highlights

### Neutral Grays
- **Gray 50**: `#fafafa` - Subtle backgrounds
- **Gray 100**: `#f5f5f5` - Page background, light surfaces
- **Gray 200**: `#eeeeee` - Borders, dividers
- **Gray 300**: `#e0e0e0` - Light borders
- **Gray 600**: `#757575` - Secondary icons
- **Gray 700**: `#616161` - Secondary text
- **Gray 900**: `#212121` - Primary text

---

## Typography

### Headings
```
H1: 1.875rem (30px), Bold, Tight line-height
H2: 1.5rem (24px), Bold, Tight line-height
H3: 1.25rem (20px), Semibold, Normal line-height
H4: 1.125rem (18px), Semibold, Normal line-height
Page Title: 1.75rem (28px), Semibold, Tight line-height
```

### Body Text
```
Base: 1rem (16px), Regular, Normal line-height
Small: 0.875rem (14px), Regular, Normal line-height
Extra Small: 0.75rem (12px), Regular, Normal line-height
```

---

## Components

### 1. Navigation Bar

**Description**: Top navigation with branding and tabs

**Structure**:
```
┌─────────────────────────────────────────────────┐
│  [TIAC Logo] TIAC                               │
│              Account Management                 │
├─────────────────────────────────────────────────┤
│  [Users] [Projects] [Roles] [Groups]           │
└─────────────────────────────────────────────────┘
```

**States**:
- Default: Gray text (#e0e0e0)
- Hover: White text with subtle background
- Active: White text with red underline border

**Styling**:
- Background: Dark gradient (#2c2c2c to #3a3a3a)
- Border: 3px solid red at bottom
- Shadow: Elevated

---

### 2. Page Title

**Description**: Page header with title and action buttons

**Structure**:
```
┌─────────────────────────────────────────────────┐
│  [←] Page Name: Optional Subtitle    [✎] [+]   │
└─────────────────────────────────────────────────┘
```

**Styling**:
- Font: 1.75rem, semibold
- Bottom border: 1px solid gray
- Padding: 24px 0 20px
- Icons: 36px buttons with rounded corners

**Usage**:
- `hasBack`: Show back arrow
- `isEditAvailable`: Show edit button
- `isAddNewAvailable`: Show add new button

---

### 3. Table Component

**Description**: Data table with header, rows, and pagination

**Structure**:
```
┌─────────────────────────────────────────────────┐
│ ╔═══════════════════════════════════════════╗ │
│ ║ COLUMN 1 │ COLUMN 2 │ COLUMN 3 │ ACTIONS ║ │
│ ╠═══════════════════════════════════════════╣ │
│ │ Value 1  │ Value 2  │ Value 3  │  [✎] [×]│ │
│ ├───────────────────────────────────────────┤ │
│ │ Value 1  │ Value 2  │ Value 3  │  [✎] [×]│ │
│ └───────────────────────────────────────────┘ │
│                                                 │
│ Showing 1-10 of 100     [←] [1] [2] [3] [→]  │
└─────────────────────────────────────────────────┘
```

**Styling**:
- Container: White background, rounded corners, shadow
- Header: Light gray gradient, uppercase text, letter-spacing
- Rows: White background, hover effect (gray 50)
- Borders: 1px solid light gray between rows
- Pagination: Bottom section with controls

**States**:
- Hover: Light gray background
- Active: Primary pale background
- Focus: Primary outline

---

### 4. Group Card

**Description**: Card component for displaying group information

**Structure**:
```
┌──────────────────────────┐
│ ╔══════════════════════╗ │
│ ║ [👥] Group Name      ║ │
│ ║      Project Badge   ║ │
│ ╠══════════════════════╣ │
│ │ Description text...  │ │
│ │ that can span        │ │
│ │ multiple lines...    │ │
│ │                      │ │
│ │ [👤 5 members]       │ │
│ ╠══════════════════════╣ │
│ │ [View Details] [🔑][×]│ │
│ └──────────────────────┘ │
└──────────────────────────┘
```

**Styling**:
- Size: 280px width, min-height 280px
- Background: White
- Border: 1px solid light gray
- Shadow: Card shadow
- Icon: 32px in pale red circle
- Badge: Gray background with border
- Buttons: Primary red for main action

**States**:
- Hover: Elevated shadow, primary pale border

**Sections**:
1. Header (with border separator)
2. Description (flex-grow)
3. Badge
4. Footer actions (with border separator)

---

### 5. Icon Wrapper

**Description**: Reusable icon button wrapper

**Sizes**:
- Small: 36px
- Medium: 44px
- Large: 52px

**Styling**:
- Border radius: 8px (rounded square)
- Default: Transparent with gray text
- Hover: Pale red background with primary text
- Active: Darker red background with scale animation

**Usage**:
```tsx
<IconWrapper size="small" onClick={handleClick}>
  <DeleteIcon />
</IconWrapper>
```

---

### 6. Manage Details Dialog

**Description**: Modal dialog for creating/editing entities

**Structure**:
```
┌─────────────────────────────────────┐
│ ╔═════════════════════════════════╗ │
│ ║ Edit/Create Entity Name         ║ │  <- Red gradient header
│ ╠═════════════════════════════════╣ │
│ │                                 │ │
│ │   [Form Content]                │ │
│ │   Input fields...               │ │
│ │   Dropdowns...                  │ │
│ │   Tables...                     │ │
│ │                                 │ │
│ ╠═════════════════════════════════╣ │
│ │                    [Cancel] [Save]│ │  <- Gray footer
│ └─────────────────────────────────┘ │
└─────────────────────────────────────┘
```

**Styling**:
- Header: Red gradient (#951414 to #7a1010)
- Content: White background, padding
- Footer: Light gray background
- Buttons: Primary red with hover effects
- Shadow: Extra large elevation

**Sizes**: xs, sm, md, lg, xl (MUI dialog sizes)

---

### 7. Login Page

**Description**: Full-screen authentication page

**Structure**:
```
┌─────────────────────────────────────────────────┐
│                                                 │
│              ┌──────────────┐                   │
│              │ ╔══════════╗ │                   │
│              │ ║ TIAC Logo║ │                   │
│              │ ║   TIAC   ║ │  <- Red gradient  │
│              │ ║  Account ║ │     header        │
│              │ ║Management║ │                   │
│              │ ╠══════════╣ │                   │
│              │ │Username  │ │                   │
│              │ │[________]│ │                   │
│              │ │Password  │ │                   │
│              │ │[________]│ │                   │
│              │ │          │ │                   │
│              │ │ [Sign In]│ │                   │
│              │ ╠══════════╣ │                   │
│              │ │ For auth │ │  <- Gray footer   │
│              │ │personnel │ │                   │
│              │ └──────────┘ │                   │
│                                                 │
└─────────────────────────────────────────────────┘
```

**Styling**:
- Background: Dark gradient with subtle red radial accents
- Card: White, centered, elevated shadow
- Header: Red gradient with white text
- Inputs: White with focus states
- Button: Red gradient with hover lift effect

**Features**:
- Logo (white filtered)
- Company branding
- Form validation
- Error messages
- Loading states
- Professional footer text

---

### 8. Buttons

**Primary Button**:
```
Background: #951414 (red)
Text: White
Hover: #7a1010 (darker)
Active: #5c0c0c (even darker)
Padding: 10px 20px
Border radius: 6px
Font: 15px, semibold
```

**Icon Button**:
```
Background: Transparent
Color: Gray
Hover: Pale red background, primary text
Active: Scale to 95%
Size: 36px / 44px / 52px
Border radius: 8px
```

**Pagination Button**:
```
Background: White
Border: 1px light gray
Hover: Gray 50 background, primary border
Active: Primary background, white text
Size: 36px min-width, 36px height
```

---

### 9. Form Inputs

**Text Input**:
```
Background: White
Border: 2px light gray
Hover: Medium gray border
Focus: Primary border with pale shadow
Padding: 12px 16px
Border radius: 6px
Font: 16px
```

**States**:
- Default: Light gray border
- Hover: Medium gray border
- Focus: Primary red border + shadow ring
- Disabled: Gray background, disabled cursor
- Error: Error red border + pale red background

**Label**:
```
Font: 14px, semibold
Color: Primary text
Margin bottom: 8px
```

---

## Layout Patterns

### Page Layout
```
Max width: 1400px
Centered: margin 0 auto
Padding: 32px 40px
Flex direction: column
Gap: 24px
```

### Grid Layout (Groups Page)
```
Display: grid
Grid template: repeat(auto-fill, minmax(280px, 1fr))
Gap: 20px
```

---

## Spacing Reference

**Component Internal Spacing**:
- Extra tight: 4px (between related items)
- Tight: 8px (form field to label)
- Normal: 16px (between form fields)
- Comfortable: 24px (between sections)
- Spacious: 32px (page padding)
- Extra spacious: 40px (large separations)

**Component External Spacing**:
- Between cards: 20px
- Page sides: 40px
- Section gaps: 24px
- Title to content: 24px

---

## Shadow Reference

**Elevation Levels**:
```
Card: 0 2px 8px rgba(0, 0, 0, 0.08)
Elevated: 0 4px 12px rgba(0, 0, 0, 0.12)
Modal: 0 20px 25px -5px rgba(0, 0, 0, 0.1)
```

**Usage**:
- Cards: Card shadow
- Hovered cards: Elevated shadow
- Dialogs: Modal shadow
- Buttons on hover: Medium shadow

---

## Transition Reference

**Durations**:
- Fast (150ms): Hover color changes, small transforms
- Base (200ms): Most transitions
- Slow (300ms): Complex animations

**Properties**:
- Colors: Fast
- Transforms: Fast
- Shadows: Base
- Layout changes: Slow

**Easing**: `cubic-bezier(0.4, 0, 0.2, 1)` (Material Design standard)

---

## Accessibility Guidelines

1. **Color Contrast**
   - Text on white: Use gray-900 or primary
   - Text on red: Always white
   - Minimum ratio: 4.5:1 for normal text

2. **Interactive Elements**
   - Minimum touch target: 44x44px
   - Focus indicators: 2px outline, 2px offset
   - Keyboard navigable: All interactive elements

3. **State Indicators**
   - Hover: Visual feedback
   - Focus: Outline
   - Active: Transform or color change
   - Disabled: Reduced opacity, disabled cursor

4. **Semantic HTML**
   - Use `<button>` for actions
   - Use `<nav>` for navigation
   - Use proper heading hierarchy
   - Label all form inputs

---

## Responsive Breakpoints

```scss
xs: 0px (mobile)
sm: 600px (tablet)
md: 960px (small desktop)
lg: 1280px (desktop)
xl: 1920px (large desktop)
```

**Current Implementation**:
- Desktop-first design
- Max-width container: 1400px
- Cards adapt with CSS Grid auto-fill

**Future Considerations**:
- Mobile navigation drawer
- Stacked cards on mobile
- Responsive table (horizontal scroll or stacked)

---

## Best Practices

### When Adding New Components

1. **Import SASS Variables**
   ```scss
   @import '../../styles/variables';
   ```

2. **Use Design Tokens**
   - Colors from `$color-*` variables
   - Spacing from `$spacing-*` variables
   - Typography from `$font-*` variables

3. **Apply Consistent Patterns**
   - Cards: Use `@include card` mixin
   - Flexbox: Use `@include flex-center` or `@include flex-between`
   - Transitions: Use `@include transition(properties...)`

4. **Maintain Accessibility**
   - Add focus states
   - Use semantic HTML
   - Include ARIA labels where needed

5. **Follow Naming Conventions**
   - BEM-like structure
   - Descriptive class names
   - Consistent file naming

---

**Version**: 2.0
**Last Updated**: 2025-01-28
