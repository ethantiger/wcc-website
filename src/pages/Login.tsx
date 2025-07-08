import { useLogin } from '../hooks/useLogin';
import { useLogout } from '../hooks/useLogout';

const Login: React.FC = () => {
  const { loginWithMicrosoft, error } = useLogin();
  const { logout } = useLogout();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-sm">
        <h1 className="text-3xl font-bold text-center mb-6">Login</h1>

        <button
          onClick={loginWithMicrosoft}
          className="w-full mb-4 py-2 px-6 text-white bg-black rounded-full border border-black hover:bg-white hover:text-black transition-all duration-300"
        >
          Login with Microsoft
        </button>

        <button
          onClick={logout}
          className="w-full py-2 px-6 text-white bg-red-600 rounded-full border border-red-600 hover:bg-white hover:text-red-600 transition-all duration-300"
        >
          Logout
        </button>

        {error && (
          <p className="text-red-500 text-sm text-center mt-4">
            {error}
          </p>
        )}
      </div>
    </div>
  );
};

export default Login;