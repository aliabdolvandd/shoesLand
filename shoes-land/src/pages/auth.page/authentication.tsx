import { useState } from "react";
import Onboarding from "../../modules/pages/onboarding";
import LoginForm from "../../components/login/login.component";
import ForgotPassForm from "../../components/forgotPassForm/forgotPassForm.component";

const Authentication = () => {
  const [page, setPage] = useState<string>("SignInForm");

  return (
    <div className="relative w-full min-h-screen flex flex-col justify-center items-center">
      {page === "Onboarding" && <Onboarding />}
      {page === "LoginPage" && <LoginForm setPage={setPage} />}
      {/* {page === "SignUpForm" && <SignUpForm setPage={setPage} />} */}
      {page === "ForgotPassForm" && <ForgotPassForm setPage={setPage} />}
    </div>
  );
};

export default Authentication;
