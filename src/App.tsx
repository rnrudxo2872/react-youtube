import { HelmetProvider } from "react-helmet-async";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import "./App.css";
import Navbar from "./components/navbar";
import Router from "./components/router";

const queryClient = new QueryClient();

function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <RecoilRoot>
          <div className="App">
            <BrowserRouter basename={process.env.PUBLIC_URL}>
              <Navbar />
              <Router />
            </BrowserRouter>
          </div>
        </RecoilRoot>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
