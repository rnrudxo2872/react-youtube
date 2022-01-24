import { HelmetProvider } from "react-helmet-async";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Navbar from "./components/navbar";
import Router from "./components/router";

const queryClient = new QueryClient();

function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <div className="App">
          <BrowserRouter basename={process.env.PUBLIC_URL}>
            <Navbar />
            <Router />
          </BrowserRouter>
        </div>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
