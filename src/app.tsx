import "./app.css";
import Navbar from "./components/custom/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import PomodoroTimer from "./components/custom/pomodoro-timer";
import Todo from "./components/custom/todo";
import { Toaster } from "@/components/ui/toaster";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <main className="px-32">
        <Navbar />
        <section className="flex flex-col items-center mt-10 gap-4">
          <PomodoroTimer />
          <Todo />
        </section>
        <Toaster />
      </main>
    </ThemeProvider>
  );
}

export default App;
