import { BrowserRouter } from "react-router-dom";
import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { toast } from "react-toastify";

import { AuthProvider } from "@/context/AuthContext/AuthProvider";
import { ModalProvider } from "@/context/ModalContext/ModalProvider.tsx";
import { ThemeProvider } from "@/context/ThemeContext/ThemeProvider.tsx";

import AppRoutes from "@router/AppRoutes";

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => {
      toast.error(`Something went wrong: ${error.message}`);
    },
  }),
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },

  mutationCache: new MutationCache({
    onError: (error) => {
      toast.error(`Something went wrong: ${error.message}`);
    },
  }),
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ThemeProvider>
          <ModalProvider>
            <AuthProvider>
              <AppRoutes />
            </AuthProvider>
          </ModalProvider>
        </ThemeProvider>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
  );
};

export default App;
