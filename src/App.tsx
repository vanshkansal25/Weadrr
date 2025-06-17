import { BrowserRouter ,Routes , Route} from "react-router-dom";
import Layout from "./components/Layout";
import { ThemeProvider } from "./context/ThemeProvider";
import WeatherDashboard from "./pages/WeatherDashboard";
import CityPage from "./pages/CityPage";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'


const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <ThemeProvider defaultTheme="light">
        <Layout>
          <Routes>
            <Route path='/' element={<WeatherDashboard/>}/>
            <Route path='/city/:cityName' element={<CityPage/>}/>
          </Routes>
        </Layout>
      </ThemeProvider>
    </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
