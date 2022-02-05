import { HelmetProvider } from "react-helmet-async";
import { SubmitHandler } from "react-hook-form";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { useNavigate } from "react-router-dom";
import { RecoilRoot } from "recoil";
import "./App.css";
import Navbar from "./components/navbar";
import Router from "./components/router";
import { SearchForm } from "./interfaces/navbar.interface";

const queryClient = new QueryClient();

function App() {
  const pageNavigate = useNavigate();
  const onSubmit: SubmitHandler<SearchForm> = (data) => {
    const { navSearch } = data;

    pageNavigate(`/search?terms=${navSearch}`);
  };
  const clickLogo = () => {
    pageNavigate("/");
  };

  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <RecoilRoot>
          <div className="App">
            <Navbar onSubmit={onSubmit} clickLogo={clickLogo} />
            <Router />
          </div>
        </RecoilRoot>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
