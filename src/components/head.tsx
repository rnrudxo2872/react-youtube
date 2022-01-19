import { Helmet } from "react-helmet-async";
import { IHeadProps } from "../interfaces/head.interface";

export default function Head(props: IHeadProps) {
  const { title, description } = props;

  return (
    <Helmet>
      <title>{title} - YouTube</title>
      {description ? (
        <meta name="description" content={description}></meta>
      ) : null}
    </Helmet>
  );
}
