import { useState } from "react";
import Loading from "../../loading";
import Boarding from "../../boarding";
import WelcomePage from "../../wellcomePage";

const Onboarding = () => {
  const [page, setPage] = useState(0);

  return (
    <>
      {page === 0 && <Loading setPage={setPage} />}
      {page === 1 && <WelcomePage setPage={setPage} />}
      {page === 2 && <Boarding />}
    </>
  );
};

export default Onboarding;
