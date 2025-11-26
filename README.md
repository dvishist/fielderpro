# FielderPro - 3D Cricket Field Editor

An interactive 3D cricket field editor built with React, TypeScript, Three.js, and Tailwind CSS. This tool allows users to visualize and customize cricket field positions with an intuitive drag-and-drop interface.

## Features

- **3D Cricket Ground**: Realistic 3D cricket field with:

  - Pitch with batting creases
  - 30-yard circle marking
  - Boundary rope
  - Stumps at both ends
  - Pavilion structure

- **Interactive Player Positioning**:

  - 2 Batsmen
  - 1 Bowler
  - 1 Wicket Keeper
  - 9 Fielders

- **Drag-and-Drop Interface**: Click and drag players to reposition them on the field

- **Color-Coded Players**:
  - Batsmen: Gold
  - Bowler: Orange Red
  - Wicket Keeper: Dark Turquoise
  - Fielders: Lime Green

## Tech Stack

- **React 19** - UI framework
- **TypeScript** - Type-safe development
- **Three.js** - 3D graphics engine
- **React Three Fiber** - React renderer for Three.js
- **@react-three/drei** - Useful helpers for React Three Fiber
- **Tailwind CSS** - Utility-first CSS framework
- **Vite** - Fast build tool and dev server

## Getting Started

### Prerequisites

- Node.js 18.0.0 or higher
- npm 8.0.0 or higher

### Installation

1. Clone the repository or navigate to the project folder
2. Install dependencies:

```bash
npm install
```

### Running the Development Server

Start the Vite development server:

```bash
npm run dev
```

The application will be available at [http://localhost:5173](http://localhost:5173)

### Building for Production

Build the optimized production version:

```bash
npm run build
```

The build output will be in the `dist` folder.

### Preview Production Build

Preview the production build locally:

```bash
npm run preview
```

## Project Structure

```
fielderpro/
├── src/
│   ├── components/
│   │   ├── CricketFieldEditor.tsx    # Main editor component
│   │   ├── CricketGround.tsx         # 3D ground rendering
│   │   └── DraggablePlayer.tsx       # Interactive player component
│   ├── data/
│   │   └── cricketData.ts            # Initial player positions & field data
│   ├── types/
│   │   └── cricket.ts                # TypeScript interfaces
│   ├── App.tsx                       # Root component
│   ├── main.tsx                      # Entry point
│   └── index.css                     # Global styles with Tailwind
├── public/                           # Static assets
├── package.json
├── tsconfig.json
├── vite.config.ts
└── tailwind.config.js
```

## Usage

### Camera Controls

- **Orbit**: Left-click and drag to rotate the camera
- **Zoom**: Scroll to zoom in/out
- **Pan**: Right-click and drag to pan the view

### Moving Players

- Click and drag any player (cylindrical figure) to reposition them on the field
- Players can be moved anywhere within the boundary

### Customization

You can customize the field dimensions and player positions by editing:

- `src/data/cricketData.ts` - Initial player positions
- `src/components/CricketGround.tsx` - Field appearance and markings

## Development Notes

### Known Limitations

- Player names are shown as white boxes (placeholder for text labels)
- The application requires a compatible Node.js version (18.0.0+)

### Future Enhancements

- Add player name text labels
- Save/load field configurations
- Multiple field presets
- Export field diagram as image
- Real-time collaboration features

## Troubleshooting

### Rollup Native Module Issues

If you encounter issues with `@rollup/rollup-win32-x64-msvc`, run:

```bash
npm install @rollup/rollup-win32-x64-msvc@4.24.0
```

### PostCSS Configuration

The project uses `postcss.config.cjs` (CommonJS) due to the ES module configuration in package.json.

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
