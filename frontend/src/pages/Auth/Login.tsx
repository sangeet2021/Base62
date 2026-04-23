import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '@/services/auth';
import { useAuthStore } from '@/store/AuthStore';
import Button from '@/components/ui/Button';
import toast from 'react-hot-toast';

const loginSchema = z.object({
  email: z.string().email('Invalid email address').min(1, 'Email is required'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormData = z.infer<typeof loginSchema>;

const Login: React.FC = () => {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.login);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      console.log(data);
      const response = await authService.login(data);
      setAuth(response.token, response.user);
      toast.success('Login Success');
      navigate('/');
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.error || 'Login failed. Please try again.';
      toast.error(errorMessage);
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen overflow-hidden bg-bg p-4">
      <div className="relative z-10 w-full max-w-112.5 rounded-xl border border-border bg-surface px-8 py-12 shadow-2xl backdrop-blur-xl">
        <div className="mb-10 text-center">
          <h1 className="font-display mb-2 text-4xl font-black tracking-tight text-accent">
            Welcome <span className="text-text">Back</span>
          </h1>
          <p className="text-sm font-normal tracking-tight text-accent font-mono">
            // Sign in to your account
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="email"
              className="font-display text-sm font-medium tracking-tight text-text"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              className={`rounded-lg border bg-bg px-4 py-3.5 font-display text-sm font-normal text-text transition-all duration-200 outline-none placeholder:text-muted focus:border-accent focus:shadow-[0_0_0_3px_rgba(232,255,71,0.1)] hover:border-accent-orange disabled:cursor-not-allowed disabled:opacity-60 ${
                errors.email ? 'border-red-500' : 'border-border'
              }`}
              disabled={isSubmitting}
              {...register('email')}
            />
            {errors.email && (
              <span className="font-display text-xs font-normal text-red-300">
                {errors.email.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="password"
              className="font-display text-sm font-medium tracking-tight text-text"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              className={`rounded-lg border bg-bg px-4 py-3.5 font-display text-sm font-normal text-text transition-all duration-200 outline-none placeholder:text-muted focus:border-accent focus:shadow-[0_0_0_3px_rgba(232,255,71,0.1)] hover:border-accent-orange disabled:cursor-not-allowed disabled:opacity-60 ${
                errors.password ? 'border-red-500' : 'border-border'
              }`}
              disabled={isSubmitting}
              {...register('password')}
            />
            {errors.password && (
              <span className="font-display text-xs font-normal text-red-300">
                {errors.password.message}
              </span>
            )}
          </div>

          <div className="flex justify-end">
            <Link
              to="/forgot-password"
              className="font-display text-xs font-normal tracking-tight text-muted transition-colors duration-200 hover:text-accent"
            >
              Forgot your password?
            </Link>
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            loading={isSubmitting}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Signing in...' : 'Sign In'}
          </Button>

          <div className=" flex items-center gap-4">
            <div className="h-px flex-1 bg-border"></div>
            <span className="font-display text-xs font-medium text-muted">
              or
            </span>
            <div className="h-px flex-1 bg-border"></div>
          </div>

          <Button
            type="button"
            variant="outline"
            size="lg"
            fullWidth
            disabled={isSubmitting}
          >
            Continue with Google
          </Button>

          <div className="border-t border-border pt-6 text-center">
            <p className="font-display text-sm font-normal text-muted">
              Don't have an account?{' '}
              <Link
                to="/register"
                className="font-semibold tracking-tight text-accent transition-colors duration-200 hover:text-accent-orange"
              >
                Sign up
              </Link>
            </p>
          </div>
        </form>
      </div>

      <div className="absolute -top-25 right-25 h-125] w-125 animate-float rounded-full bg-accent opacity-8 blur-[80px]"></div>
      <div className="absolute -bottom-12.5 -left-25 h-100 w-100 animate-float-reverse rounded-full bg-accent-orange opacity-8 blur-[80px]"></div>
    </div>
  );
};

export default Login;
