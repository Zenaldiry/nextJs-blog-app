'use client';
import { registerUser } from '../actions/users';
import { useActionState } from 'react';
const RegisterPage = () => {
  const [state, formAction] = useActionState(registerUser, {
    errors: {
      usernameError: '',
      passwordError: '',
      passwordConfirmError: '',
    },
    values: {
      name: '',
      username: '',
      password: '',
      passwordConfirm: '',
    },
  });
  return (
    <div>
      <h2>Register</h2>
      <form action={formAction}>
        <div>
          <label htmlFor='name'>Name</label>
          <input
            id='name'
            type='text'
            name='name'
            required
            defaultValue={state.values.name}
          />
        </div>

        <div>
          <label htmlFor='username'>Username</label>
          <input
            id='username'
            type='text'
            name='username'
            required
            defaultValue={state.values.username}
          />
        </div>
        {state.errors.usernameError && (
          <p data-testid='username-error' style={{ color: 'red' }}>
            {state.errors.usernameError}
          </p>
        )}
        <div>
          <label htmlFor='password'>Password</label>
          <input
            id='password'
            type='password'
            name='password'
            required
            defaultValue={state.values.password}
          />
        </div>
        {state.errors.passwordError && (
          <p style={{ color: 'red' }}>{state.errors.passwordError}</p>
        )}
        <div>
          <label htmlFor='passwordConfirm'>Confirm Password</label>
          <input
            id='passwordConfirm'
            type='password'
            name='passwordConfirm'
            required
            defaultValue={state.values.passwordConfirm}
          />
        </div>
        {state.errors.passwordConfirmError && (
          <p data-testid='passwordConfirm-error' style={{ color: 'red' }}>
            {state.errors.passwordConfirmError}
          </p>
        )}
        <button data-testid='register-button' type='submit'>
          Register
        </button>
      </form>
    </div>
  );
};
export default RegisterPage;
