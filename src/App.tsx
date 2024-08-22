import NavBar from "./components/layout/NavBar";
import ShareSplicer from "./components/App/ShareSplicer";
import { ThemeProvider } from "./components/utils/ThemeProvider";
import { DialogProvider } from "./components/utils/DialogContext";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <NavBar />
      <DialogProvider>
        <ShareSplicer />
      </DialogProvider>
    </ThemeProvider>
  );
}

export default App;
