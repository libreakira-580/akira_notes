# Akira Notes v1.1 (In-App Menu, No Encryption)

This build removes encryption and adds a modern in-app toolbar (TopBar) with New/Save/Export and a dark mode toggle.

## Quick start (development)

1. Clone this repo.
2. Install root dev deps and renderer deps:
   - At project root: `npm install`
   - In renderer: `cd renderer && npm install`
3. Start renderer dev server then Electron:
   - `npm run dev`  (requires concurrently and wait-on)

## Build

- To create platform installers: `npm run build` (configured with electron-builder)

## Notes

- Notes are stored as plaintext in a local SQLite DB at `db/notes.db`.
- The in-app TopBar provides the main menu and actions; native menu is minimal.
- Export writes markdown to a file via a save dialog.
- Consider adding encryption or cloud sync if you need remote backup later.

## License
MIT


## New in v1.2
- Tabbed note management UI: open multiple notes in tabs and switch between them.
- Project licensed under MIT.
