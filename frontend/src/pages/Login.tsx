import {
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent,
  type ChangeEvent,
} from 'react';

import '../styles/Login.css';

import { useNavigate } from 'react-router-dom';

import { loginRequest } from '../api/auth/login';
import { useAuth } from '../context/AuthContext';

interface LoginResponse {
  access_token: string;
  token_type: string;
}

export default function Login() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [role, setRole] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const submitBtnRef = useRef<HTMLButtonElement>(null);

  const roleOptions = [
    { label: 'HR', value: 'hr' },
    { label: 'Team Lead', value: 'team_lead' },
    { label: 'Manager', value: 'manager' },
    { label: 'Stakeholder', value: 'stakeholder' },
    { label: 'Employee', value: 'employee' },
  ];

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError('');

    if (!email.trim()) {
      emailRef.current?.focus();
      return;
    }

    if (!password) {
      passwordRef.current?.focus();
      return;
    }

    if (!role) {
      setError('Please select a role');
      return;
    }

    try {
      setLoading(true);

      const data: LoginResponse = await loginRequest({
        email,
        password,
        role,
      });

      // Store JWT through AuthContext
      if (data.access_token) {
        login(data.access_token);
      }

      // Remember me
      if (rememberMe) {
        localStorage.setItem('remember', '1');
      } else {
        localStorage.removeItem('remember');
      }

      // Temporary navigation.
      // Role-based navigation will be added later
      // using the authenticated user information.
      navigate('/', { replace: true });

    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Login failed');
      }
    } finally {
      setLoading(false);
    }
  };

  const onEmailKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      passwordRef.current?.focus();
    }
  };

  const onPasswordKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      submitBtnRef.current?.click();
    }
  };

  const handleRoleChange = (
    e: ChangeEvent<HTMLSelectElement>
  ) => {
    setRole(e.target.value);
  };

  return (
    <div className="app">
      <main className="main-content">
        <div className="login-container">

          <div className="welcome-section">
            <h1 className="welcome-title">
              Welcome back
            </h1>

            <p className="welcome-subtitle">
              Sign in to continue your conversations.
            </p>
          </div>

          {error && (
            <p
              style={{
                color: 'red',
                marginBottom: 8,
              }}
            >
              {error}
            </p>
          )}

          <form
            className="login-form"
            onSubmit={handleLogin}
          >

            {/* Email */}
            <div className="form-group">
              <input
                ref={emailRef}
                type="email"
                placeholder="Username or Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={onEmailKeyDown}
                className="form-input"
                autoComplete="username"
                autoFocus
              />
            </div>

            {/* Password */}
            <div className="form-group">
              <input
                ref={passwordRef}
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={onPasswordKeyDown}
                className="form-input"
                autoComplete="current-password"
              />
            </div>

            {/* Role */}
            <div className="form-group">
              <select
                value={role}
                onChange={handleRoleChange}
                className="form-input"
              >
                <option value="">
                  Select role
                </option>

                {roleOptions.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Remember Me */}
            <div className="form-options">
              <label className="checkbox-container">

                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) =>
                    setRememberMe(e.target.checked)
                  }
                  className="checkbox-input"
                />

                <span className="checkbox-custom"></span>

                <span className="checkbox-label">
                  Remember me
                </span>

              </label>
            </div>

            {/* Login Button */}
            <button
              ref={submitBtnRef}
              type="submit"
              className="login-button"
              disabled={loading}
            >
              {loading
                ? 'Logging in...'
                : 'Login'}
            </button>

          </form>
        </div>
      </main>
    </div>
  );
}