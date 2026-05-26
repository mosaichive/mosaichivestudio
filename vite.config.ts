import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

const fallbackSupabaseUrl = "https://rswjbyyonbxobbdbickp.supabase.co";
const fallbackSupabasePublishableKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJIc3dqcnl5b25ieG9iYmRiaWNrcCIsInJlZiI6InJzd2pieXlvbmJ4b2JiZGJpY2twIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUwODM5ODIsImV4cCI6MjA5MDY1OTk4Mn0.VzJRs0kZmhUsG24N159jUI8Aij3perYXS-J_Pf4Zdyk";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  define: {
    "import.meta.env.VITE_SUPABASE_URL": JSON.stringify(
      process.env.VITE_SUPABASE_URL || fallbackSupabaseUrl
    ),
    "import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY": JSON.stringify(
      process.env.VITE_SUPABASE_PUBLISHABLE_KEY || fallbackSupabasePublishableKey
    ),
  },
}));
