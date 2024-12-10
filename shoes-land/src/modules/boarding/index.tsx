import { useState } from "react";
import Page1 from "../../components/page1";
import Page2 from "../../components/page2";
import Page3 from "../../components/page3";

const Boarding = () => {
  const [page, setPage] = useState(0);

  return (
    <div className="relative w-full min-h-screen flex flex-col justify-center items-center">
      {page === 0 && <Page1 setPage={setPage} />}
      {page === 1 && <Page2 setPage={setPage} />}
      {page === 2 && <Page3 setPage={setPage} />}
    </div>
  );
};

export default Boarding;
