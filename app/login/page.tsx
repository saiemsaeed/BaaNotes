import { verifyAndCreateCookie } from '../actions';
import GoogleLogin from '@/components/google-login';
const LoginPage = async () => {
  return (
    <div className="flex flex-col">
      <GoogleLogin verifyUser={verifyAndCreateCookie} />
    </div>
  );
};

export default LoginPage;
