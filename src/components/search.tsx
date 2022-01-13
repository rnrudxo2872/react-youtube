import { useState } from "react";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { searchVideos } from "../api";
import { ISearchVideo } from "../interfaces/search.interface";

interface ILocation {
  terms: string;
}

export default function Search() {
  const { search } = useLocation();
  const getSearchParam = (search: string) =>
    new URLSearchParams(search).get("terms");
  const [result, setResult] = useState<ISearchVideo>();
  const { isLoading, error, data } = useQuery<ISearchVideo>(
    ["search", `${getSearchParam(search)}`],
    () => searchVideos(getSearchParam(search) ?? "")
  );

  return (
    <div>
      {isLoading ? (
        "loading..."
      ) : data?.items ? (
        data?.items.map((item) => <h1>{item.snippet.title}</h1>)
      ) : (
        <h1>{"no data!"}</h1>
      )}
    </div>
  );
}
