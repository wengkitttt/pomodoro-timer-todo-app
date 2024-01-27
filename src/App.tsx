import "./app.css";
import { Button } from "@/components/ui/button";
import Navbar from "./components/custom/navbar";
import { ThemeProvider } from "@/components/theme-provider";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="px-32">
        <Navbar />
        <div>
          <Button>Click me</Button>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
