import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Root from './root/Root'
import { QueryClient, QueryClientProvider } from 'react-query'
import { BrowserRouter } from 'react-router-dom'
import { WeatherProvider } from './components/context/WeatherContext'
const queryclinet = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryclinet}>
      <BrowserRouter>
        <WeatherProvider>
          <Root />
        </WeatherProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>
)
