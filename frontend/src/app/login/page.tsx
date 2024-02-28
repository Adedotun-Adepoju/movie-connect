import LoginForm from "@/components/onboard/LoginForm";
import OnBoardContainer from "@/components/onboard/OnBoardContainer";

const page = () => {
  return (
    <main className="">
      <OnBoardContainer>
        <div>
          <LoginForm />
        </div>
      </OnBoardContainer>
    </main>
  );
};

export default page;
