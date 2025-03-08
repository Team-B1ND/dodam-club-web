import './App.css';
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query'
import Router from '@components/Router/router';
import ThemeProviderContainer from '@components/Common/ThemeProviderContainer';
import { RecoilRoot } from 'recoil';
import { B1ndToastContainer } from '@b1nd/b1nd-toastify';

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
          <B1ndToastContainer autoClose={1000} limit={1} />
          <Router />
        </ThemeProviderContainer>
      </RecoilRoot>
    </QueryClientProvider>
  );
}

export default App;