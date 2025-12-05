import { defineConfig } from 'vite'; 
import react from '@vitejs/plugin-react-swc';
import path from 'path';

export default defineConfig(({ mode }) => {
  return {

    base: '/',
    
    plugins: [react()],
    
    resolve: {
      alias: {
        // This maps '@' to the absolute path of your './src' directory
        "@": path.resolve(__dirname, "./src"),
      },
    },
    
    // Example: You can add other configurations here (like 'base') if needed.
    // base: mode === "production" ? "/my-portfolio/" : "/",
  };
});
