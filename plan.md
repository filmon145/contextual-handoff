# Plan: Finalizing Bahre Hassab Kemer Ethiopian Orthodox Calendar

The goal is to complete the Bahre Hassab Kemer application by ensuring all features (calendar, holiday list, and calculations) are fully functional, polished, and accessible according to the initial user requirements.

## Scope
- Finalize the Ethiopian calendar logic (ensure all movable fasts/feasts are correctly calculated).
- Polish the UI/UX for both mobile and desktop.
- Ensure all components (CalendarView, HolidayList) are integrated and error-free.
- Add final "polish" elements like the "About" section or help information.

## Assumptions
- The core logic for `getBahireHassab` exists in `src/utils/ethiopianCalendar.ts` but might need verification against the provided PDF logic (if possible, though I can only see the previous assistant's summary of it).
- The app uses client-side calculations and does not require a persistent database (Supabase) for core functionality.

## Auth & RLS model
**Auth in scope:** no
**Model:** no_auth_public_read
**RLS strategy:** N/A (Client-side app only)
**Frontend implication:** No auth session needed.

## Migration baseline
**Local migrations in project:** none
**User confirmed proceed on connected DB:** not_applicable

## Affected Areas
- `src/utils/ethiopianCalendar.ts`: Core calculation logic.
- `src/components/CalendarView.tsx`: Interactive calendar UI.
- `src/components/HolidayList.tsx`: List of yearly events.
- `src/App.tsx`: Main layout and state management.

## Phases

### Phase 1: Logic Verification & Refinement
- Review `src/utils/ethiopianCalendar.ts`.
- Ensure `getBahireHassab` correctly calculates movable dates (Abiy Tsom, Debre Zeit, Hosanna, Siklet, Tensae, etc.).
- Owner: `frontend_engineer` (as it's UI-centric logic)

### Phase 2: UI/UX Polishing
- Improve the `CalendarView` layout for better readability of Amharic text.
- Enhance `HolidayList` with better filtering or categorization (e.g., Fasts vs. Feasts).
- Ensure mobile responsiveness is flawless.
- Owner: `frontend_engineer`

### Phase 3: Final Integration & Polish
- Update `App.tsx` with any missing sections (Settings, Info, etc.).
- Add "About" content explaining the Bahre Hassab system.
- Owner: `frontend_engineer`

## Execution Handoff

**Plan status:** ready

**Dispatch order:**
1. frontend_engineer — Implementation of logic refinements and UI polishing.

**Per-agent instructions:**
### 1. frontend_engineer
- **Phases:** 1, 2, 3
- **Scope:** Complete the Ethiopian calendar app. Verify the math in `src/utils/ethiopianCalendar.ts` for accuracy. Polish the `CalendarView.tsx` and `HolidayList.tsx` components. Add the "About" information and ensure the sidebar/navigation works correctly.
- **Files:** 
  - `src/utils/ethiopianCalendar.ts`
  - `src/components/CalendarView.tsx`
  - `src/components/HolidayList.tsx`
  - `src/App.tsx`
- **Depends on:** none
- **Acceptance criteria:**
  - The calendar correctly shows the current Ethiopian date.
  - Selecting a year updates all holidays correctly.
  - The UI is responsive and looks premium with the amber/traditional theme.
  - Amharic text is rendered correctly.
