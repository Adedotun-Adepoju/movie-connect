import NewPasswordForm from '@/components/onboard/NewPasswordForm'
import OnBoardContainer from '@/components/onboard/OnBoardContainer'
import RecoverForm from '@/components/onboard/RecoverForm'


const page = () => {
  return (
    <main className="py-12">
      <OnBoardContainer>
          <RecoverForm />
          {/* <NewPasswordForm /> */}
      </OnBoardContainer>
    </main>
  )
}

export default page
