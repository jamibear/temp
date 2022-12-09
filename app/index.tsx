import Login from "screens/onboarding/Login";
import SignUp from "screens/onboarding/SignUp";
import SignUpProfile from "screens/onboarding/SignUpProfile";
import SignUpAddress from "screens/onboarding/SignUpAddress";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

export default function Page() {
  return (

    <QueryClientProvider client={queryClient}>
<SignUp />
</QueryClientProvider>
  )
}
