import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { searchVideos } from "../api";
import { ISearchVideo } from "../interfaces/search.interface";

interface ILocation {
  terms: string;
}

export default function Search() {
  const { search } = useLocation();
  const terms = new URLSearchParams(search);
  const [result, setResult] = useState<ISearchVideo>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async function () {
      const result = await searchVideos(terms.get("terms") ?? "");
      setResult(result as ISearchVideo);
      setLoading(false);
    })();
  });

  return (
    <div>
      {loading
        ? "loading..."
        : result?.items.map((item) => <h1>{item.snippet.title}</h1>)}
    </div>
  );
}
