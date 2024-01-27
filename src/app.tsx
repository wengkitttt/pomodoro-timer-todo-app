import "./app.css";
import Navbar from "./components/custom/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import PomodoroTimer from "./components/custom/pomodoro-timer";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <main className="px-32">
        <Navbar />
        <section className="flex flex-col items-center mt-10">
          <PomodoroTimer />
        </section>
      </main>
    </ThemeProvider>
  );
}

export default App;
