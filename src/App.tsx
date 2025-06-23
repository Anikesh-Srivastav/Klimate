import { BrowserRouter, Route, Routes} from 'react-router-dom';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {ReactQueryDevtools} from '@tanstack/react-query-devtools';
import AppLayout from './components/AppLayout';
import { ThemeProvider } from './context/theme-provider';
import WeatherDashboard from './components/Pages/WeatherDashboard';
import CityPage from './components/Pages/CityPage';

 const App = () => {

  const queryClient = new QueryClient({
   defaultOptions: {
      queries: {
         staleTime: 5 * 60 * 1000,
         gcTime: 10 * 60 * 1000,
         retry: false,
         refetchOnWindowFocus: false,
      }
   }
  });
   return (
    <QueryClientProvider client={queryClient}>
        <BrowserRouter>
           <ThemeProvider defaultTheme='system' storageKey='vite-ui-theme'>
              <AppLayout>
                 <Routes>
                   <Route path='/' element={<WeatherDashboard />} />
                   <Route path='/city/:cityName' element={<CityPage />} />              
                 </Routes>
              </AppLayout>
           </ThemeProvider>  
        </BrowserRouter>
        <ReactQueryDevtools initialIsOpen={false} />
     </QueryClientProvider>
   )
 }
 
 export default App