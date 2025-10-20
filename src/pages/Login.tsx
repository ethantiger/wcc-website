import { useLogin } from '@/hooks/useLogin';
import { IconBrandWindowsFilled } from '@tabler/icons-react';

const Login: React.FC = () => {
  const { loginWithMicrosoft, error } = useLogin();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
      <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-8 w-full max-w-sm">
        <h1 className="text-3xl font-bold text-center mb-6 dark:text-white">Login</h1>

        <button
          onClick={loginWithMicrosoft}
          className="w-full mb-4 py-2 px-6 text-white bg-indigo-600 rounded-full border border-indigo-600 hover:bg-white dark:hover:bg-black hover:text-indigo-600 transition-all duration-300 hover:cursor-pointer"
        >
          Login with UWO {<IconBrandWindowsFilled className="inline-block ml-2" size={20} />}
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