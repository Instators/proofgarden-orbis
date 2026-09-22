# ProofGarden repair notes

- Rebuilt `components/orbis-controls.tsx`; the uploaded file contained duplicated/mismatched JSX and a corrupted template literal.
- `OrbisPlayer` now mounts `ReactorView` as soon as the Reactor session is ready, before generation starts, so the receiving WebRTC view is present when media begins publishing.
- Added an idle overlay while connected but before a run starts.
- Closing the World Engine now disconnects the Reactor session before unmounting it, avoiding stale sessions conflicting with the token's `max_sessions: 1` constraint when the studio is reopened.
- Tightened the initial prompt effect dependency so it does not depend on the entire session object.
- Removed the stale TypeScript incremental build artifact.

Validation note: dependency installation timed out in the repair container, so run `npm install`, `npm run typecheck`, and `npm run build` locally before pushing.
