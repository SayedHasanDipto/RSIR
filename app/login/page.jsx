'use client';

import { useState, Suspense } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, ArrowRight, Chrome as Google, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { authClient } from '@/lib/auth-client';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password.trim()) {
      setError('দয়া করে আপনার ইমেইল এবং পাসওয়ার্ডটি টাইপ করুন!');
      return;
    }

    setLoading(true);

    await authClient.signIn.email({
      email,
      password,
    }, {
      onRequest: () => {
        setLoading(true);
      },
      onSuccess: () => {
        setLoading(false);
        localStorage.setItem('userLoggedIn', 'true');
        const redirectUrl = searchParams.get('redirect') || '/';
        window.location.href = redirectUrl;
      },
      onError: (ctx) => {
        setLoading(false);
        setError(ctx.error.message || 'লগইন করতে সমস্যা হয়েছে। দয়া করে আবার চেষ্টা করুন।');
      }
    });
  };

  const handleSocialLogin = async (provider) => {
    setError('');
    await authClient.signIn.social({
      provider,
      callbackURL: searchParams.get('redirect') || '/',
    }, {
      onRequest: () => {
        setLoading(true);
      },
      onError: (ctx) => {
        setLoading(false);
        setError(ctx.error.message || `${provider === 'google' ? 'Google' : 'Facebook'} লগইন করতে সমস্যা হয়েছে।`);
      }
    });
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-[#0f1a35]">
      {/* Premium Background Elements */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-gold/10 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-primary-navy-light/10 rounded-full blur-[120px]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.05)_0%,transparent_70%)]" />

      {/* Back to Home Button */}
      <div className="absolute top-8 left-8 z-20">
        <Link href="/">
          <Button variant="ghost" className="text-white/60 hover:text-white hover:bg-white/10 gap-2">
            <ArrowRight className="w-4 h-4 rotate-180" />
            Back to Home
          </Button>
        </Link>
      </div>

      {/* Animated Lines/Grid for Sophistication */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md px-4"
      >
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 group mb-4">
            <motion.div
              whileHover={{ rotate: 5, scale: 1.05 }}
              className="w-12 h-12 bg-gradient-to-br from-gold to-gold-dark rounded-xl flex items-center justify-center shadow-2xl shadow-gold/20"
            >
              <span className="text-primary-navy font-bold text-xl">RI</span>
            </motion.div>
          </Link>
          <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
          <p className="text-white/60">Unlock your potential with premium learning</p>
        </div>

        <Card className="border border-gold/15 bg-gradient-to-br from-[#0b152e] to-[#050c1e] backdrop-blur-xl shadow-[0_20px_50px_rgba(212,175,55,0.08)] overflow-hidden p-2">
          <form onSubmit={handleLogin}>
            <CardHeader className="space-y-1 pb-4">
              <CardTitle className="text-2xl text-center font-bold text-white tracking-wide">Login</CardTitle>
              <CardDescription className="text-center text-white/50 text-xs">
                Enter your credentials to access your dashboard
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-5">
              {/* Error Message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-red-500/10 border border-red-500/20 text-red-200 px-4 py-3 rounded-xl flex items-center gap-3 text-xs font-semibold"
                >
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                  <span>{error}</span>
                </motion.div>
              )}

              <div className="grid grid-cols-1 gap-3">
                <Button
                  type="button"
                  onClick={() => handleSocialLogin('google')}
                  variant="outline"
                  className="border-white/5 bg-white/[0.02] text-white/80 hover:bg-white/[0.08] hover:text-white transition-all gap-2 text-xs h-11 rounded-xl cursor-pointer"
                  disabled={loading}
                >
                  <Google className="w-4 h-4 text-white/70" />
                  Google
                </Button>
              </div>

              <div className="relative my-1">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-white/5" />
                </div>
                <div className="relative flex justify-center text-[10px] uppercase tracking-widest">
                  <span className="bg-[#0b152e] px-3 text-white/30 font-semibold">Or continue with</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="email" className="text-white/70 text-xs font-semibold tracking-wide">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-11 bg-white/[0.02] border-white/10 text-white placeholder:text-white/20 h-11 rounded-xl focus-visible:ring-gold/30 focus-visible:border-gold focus-visible:ring-[3px] transition-all duration-300"
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="password" className="text-white/70 text-xs font-semibold tracking-wide">Password</Label>
                    <Link href="#" className="text-xs text-gold hover:text-gold-light font-semibold transition-colors">
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-11 bg-white/[0.02] border-white/10 text-white placeholder:text-white/20 h-11 rounded-xl focus-visible:ring-gold/30 focus-visible:border-gold focus-visible:ring-[3px] transition-all duration-300"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4 pt-6 pb-4">
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-gold to-gold-dark hover:from-gold-light hover:to-gold text-primary-navy font-bold h-12 rounded-xl transition-all shadow-lg shadow-gold/10 group disabled:opacity-50 cursor-pointer"
              >
                {loading ? 'Logging in...' : 'Login to Account'}
                {!loading && <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />}
              </Button>
              <p className="text-center text-xs text-white/40">
                Don't have an account?{" "}
                <Link href="/signup" className="text-gold hover:text-gold-light font-semibold transition-colors">
                  Sign up
                </Link>
              </p>
            </CardFooter>
          </form>
        </Card>
      </motion.div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen w-full flex items-center justify-center bg-[#0f1a35]">
        <div className="text-white text-lg font-semibold animate-pulse">Loading login page...</div>
      </div>
    }>
      <LoginForm />
    </Suspense>
  );
}
