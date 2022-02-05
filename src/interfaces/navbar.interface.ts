import { SubmitHandler } from "react-hook-form";

export interface NavbarProps {
  onSubmit: SubmitHandler<SearchForm>;
  clickLogo: () => void;
}

export interface SearchForm {
  navSearch: string;
}
