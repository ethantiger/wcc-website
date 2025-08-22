import { useLogin } from '../hooks/useLogin';

const Login: React.FC = () => {
  const { loginWithMicrosoft, error } = useLogin();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-sm">
        <h1 className="text-3xl font-bold text-center mb-6">Login</h1>

        <button
          onClick={loginWithMicrosoft}
          className="w-full mb-4 py-2 px-6 text-white bg-indigo-600 rounded-full border border-indigo-600 hover:bg-white hover:text-indigo-600 transition-all duration-300 hover:cursor-pointer"
        >
          Login with Microsoft
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