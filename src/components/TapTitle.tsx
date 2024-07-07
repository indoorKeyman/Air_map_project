import { Helmet } from "react-helmet";
import { useLocation } from "react-router-dom";

function TapTitle() {
  const urlIntel = useLocation();

  return (
    <Helmet>
      <title>Air Map : : : </title>
    </Helmet>
  );
}

export default TapTitle;
