'use client';

import { motion } from 'framer-motion';
import { Mail, Lock, ArrowRight, Chrome as Google, Facebook, User, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

export default function SignupPage() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-[#0f1a35] py-12">
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
          <h1 className="text-3xl font-bold text-white mb-2">Create Account</h1>
          <p className="text-white/60">Join our community of elite learners</p>
        </div>

        <Card className="border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl overflow-hidden">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center text-white">Sign Up</CardTitle>
            <CardDescription className="text-center text-white/40">
              Start your journey with Robiul Islam today
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" className="border-white/10 bg-white/5 text-white hover:bg-white/10 transition-all gap-2">
                <Google className="w-4 h-4" />
                Google
              </Button>
              <Button variant="outline" className="border-white/10 bg-white/5 text-white hover:bg-white/10 transition-all gap-2">
                <Facebook className="w-4 h-4" />
                Facebook
              </Button>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-white/10" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-[#1a2f5a] px-2 text-white/40">Or register with</span>
              </div>
            </div>

            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name" className="text-white/80 font-medium">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                  <Input 
                    id="name" 
                    placeholder="John Doe" 
                    className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/20 focus:ring-gold/50 focus:border-gold transition-all"
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email" className="text-white/80 font-medium">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="name@example.com" 
                    className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/20 focus:ring-gold/50 focus:border-gold transition-all"
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password" className="text-white/80 font-medium">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                  <Input 
                    id="password" 
                    type="password" 
                    className="pl-10 bg-white/5 border-white/10 text-white focus:ring-gold/50 focus:border-gold transition-all"
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="confirm-password" className="text-white/80 font-medium">Confirm Password</Label>
                <div className="relative">
                  <ShieldCheck className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                  <Input 
                    id="confirm-password" 
                    type="password" 
                    className="pl-10 bg-white/5 border-white/10 text-white focus:ring-gold/50 focus:border-gold transition-all"
                  />
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button className="w-full bg-gold hover:bg-gold-light text-primary-navy font-bold py-6 rounded-xl transition-all shadow-xl shadow-gold/10 group">
              Create Account
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <p className="text-center text-sm text-white/40">
              Already have an account?{" "}
              <Link href="/login" className="text-gold hover:text-gold-light font-medium transition-colors">
                Login
              </Link>
            </p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
