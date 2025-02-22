import logo from './logo.svg';
import './App.css';
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query'
import Router from '@components/Router/router';
import ThemeProviderContainer from '@components/Common/ThemeProviderContainer';
import { RecoilRoot } from 'recoil';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      useErrorBoundary: true,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <ThemeProviderContainer>
          <Router/>
        </ThemeProviderContainer>
      </RecoilRoot>
    </QueryClientProvider>
  );
}

export default App;
