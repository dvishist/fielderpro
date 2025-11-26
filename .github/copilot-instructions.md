<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

- [x] Verify that the copilot-instructions.md file in the .github directory is created.

- [x] Clarify Project Requirements

- [x] Scaffold the Project

- [x] Customize the Project

- [x] Install Required Extensions

- [x] Compile the Project

- [x] Create and Run Task

- [x] Launch the Project

- [x] Ensure Documentation is Complete

## Project Summary

FielderPro is a 3D cricket field editor built with React, TypeScript, Three.js (via React Three Fiber), and Tailwind CSS. Users can interactively position 13 players (2 batsmen, 1 bowler, 1 wicket keeper, and 9 fielders) on a realistic 3D cricket ground by clicking and dragging.

## Development Commands

- `npm run dev` - Start development server (http://localhost:5173)
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

- `src/components/` - React components (CricketFieldEditor, CricketGround, DraggablePlayer)
- `src/types/` - TypeScript interfaces
- `src/data/` - Initial player positions and field configuration
- `src/three-types.d.ts` - Three.js type declarations for JSX

## Technical Notes

- Uses Vite 5.4.x for compatibility with Node.js 20.18.3
- PostCSS config uses `.cjs` extension due to ES module configuration
- Rollup native module manually installed for Windows x64
