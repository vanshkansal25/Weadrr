import { BrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import { ThemeProvider } from "./context/ThemeProvider";
function App() {
  return (
    <BrowserRouter>
    <ThemeProvider defaultTheme="system">
    <Layout>Hello</Layout>
    </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
