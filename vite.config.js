import { defineConfig } from 'vite'; // The 'type UserConfig' part is removed
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // The function should return the configuration object directly,
  // without any type assignment.
  return {
    plugins: [react()],
    // Example: Remove 'base: mode === "production" ? "/my-portfolio/" : "/"' if not needed,
    // or keep it if it is standard configuration logic.
    // ... Add back your necessary configuration here ...
  };
});