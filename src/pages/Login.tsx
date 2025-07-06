import { useLogin } from '../hooks/useLogin';
import { useLogout } from '../hooks/useLogout';

const Login: React.FC = () => {
  const { loginWithMicrosoft, error } = useLogin();
  const { logout } = useLogout();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px' }}>
      <h1>Login</h1>
      <button onClick={loginWithMicrosoft} style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}>
        Login with Microsoft
      </button>
      <button onClick={logout} style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}>
        Logout
      </button>
      {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
    </div>
  );
};

export default Login;