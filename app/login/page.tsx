'use client';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useNotification } from '../components/NotificationProvider';
const Login = () => {
  const router = useRouter();
  const [error, setError] = useState('');
  const { showNotification } = useNotification();
  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formDate = new FormData(e.currentTarget);

    const result = await signIn('credentials', {
      username: formDate.get('username'),
      password: formDate.get('password'),
      redirect: false,
    });

    if (result?.error) {
      setError('invalid username or password');
    } else {
      showNotification(`${formDate.get('username')} logged in`, 'success');
      router.push('/');
      router.refresh();
    }
  };
  return (
    <div>
      <h2>Login</h2>
      {error && (
        <p data-testid='error-message' style={{ color: 'red' }}>
          {error}
        </p>
      )}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='username'>Username</label>
          <input id='username' type='text' name='username' required />
        </div>
        <div>
          <label htmlFor='password'>Password</label>
          <input id='password' type='password' name='password' required />
        </div>
        <button data-testid='login-button' type='submit'>
          Login
        </button>
      </form>
    </div>
  );
};
export default Login;
