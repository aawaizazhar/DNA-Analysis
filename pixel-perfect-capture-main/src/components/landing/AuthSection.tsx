import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Send, ArrowRight, Mail, Lock, User } from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;

const AuthSection = () => {
  const [signUpData, setSignUpData] = useState({ name: "", email: "", role: "Student", password: "", confirmPassword: "" });
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [signUpErrors, setSignUpErrors] = useState<Record<string, string>>({});
  const [loginErrors, setLoginErrors] = useState<Record<string, string>>({});

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};
    if (!signUpData.name) errors.name = "Name is required";
    if (!signUpData.email || !/\S+@\S+\.\S+/.test(signUpData.email)) errors.email = "Valid email is required";
    if (signUpData.password.length < 8) errors.password = "Password must be at least 8 characters";
    if (signUpData.password !== signUpData.confirmPassword) errors.confirmPassword = "Passwords do not match";
    setSignUpErrors(errors);
    if (Object.keys(errors).length === 0) toast.success("Account created! Redirecting to dashboard...");
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};
    if (!loginData.email || !/\S+@\S+\.\S+/.test(loginData.email)) errors.email = "Valid email is required";
    if (!loginData.password) errors.password = "Password is required";
    setLoginErrors(errors);
    if (Object.keys(errors).length === 0) toast.success("Signed in successfully.");
  };

  const inputClass = "h-12 rounded-xl bg-secondary/80 border-border/60 text-foreground placeholder:text-muted-foreground/40 focus:border-primary focus:ring-2 focus:ring-primary/15 transition-all duration-300 pl-11 input-glow";

  return (
    <section id="sign-up" className="py-32 relative z-10">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 48 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease }}
          className="text-center mb-20"
        >
          <span className="badge-pill mb-5 inline-flex">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            Get Started
          </span>
          <h2 className="text-section text-foreground mb-5">
            Start analyzing <span className="gradient-text-emerald">in minutes</span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto" style={{ fontSize: "var(--font-body-lg)" }}>
            Create your free account and begin exploring genomic data today.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-5 gap-5 max-w-5xl mx-auto">
          {/* Sign Up — larger card */}
          <motion.div
            initial={{ opacity: 0, y: 56 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease }}
            className="md:col-span-3 bento-card p-8 lg:p-10"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Send className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-display text-xl font-bold text-foreground tracking-tight">Create Your Free Account</h3>
            </div>

            <form onSubmit={handleSignUp} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <Label className="text-sm font-medium text-muted-foreground mb-2 block">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/40" />
                    <Input className={inputClass} value={signUpData.name} onChange={e => setSignUpData({ ...signUpData, name: e.target.value })} placeholder="John Doe" />
                  </div>
                  {signUpErrors.name && <p className="text-xs text-destructive mt-1.5">{signUpErrors.name}</p>}
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground mb-2 block">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/40" />
                    <Input type="email" className={inputClass} value={signUpData.email} onChange={e => setSignUpData({ ...signUpData, email: e.target.value })} placeholder="john@university.edu" />
                  </div>
                  {signUpErrors.email && <p className="text-xs text-destructive mt-1.5">{signUpErrors.email}</p>}
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium text-muted-foreground mb-2 block">Role</Label>
                <select
                  className="w-full h-12 px-4 rounded-xl text-foreground text-sm bg-secondary/80 border border-border/60 focus:border-primary focus:ring-2 focus:ring-primary/15 transition-all duration-300"
                  value={signUpData.role}
                  onChange={e => setSignUpData({ ...signUpData, role: e.target.value })}
                >
                  <option>Student</option>
                  <option>Researcher</option>
                  <option>Educator</option>
                  <option>Other</option>
                </select>
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <Label className="text-sm font-medium text-muted-foreground mb-2 block">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/40" />
                    <Input type="password" className={inputClass} value={signUpData.password} onChange={e => setSignUpData({ ...signUpData, password: e.target.value })} placeholder="Min 8 characters" />
                  </div>
                  {signUpErrors.password && <p className="text-xs text-destructive mt-1.5">{signUpErrors.password}</p>}
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground mb-2 block">Confirm Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/40" />
                    <Input type="password" className={inputClass} value={signUpData.confirmPassword} onChange={e => setSignUpData({ ...signUpData, confirmPassword: e.target.value })} placeholder="Re-enter password" />
                  </div>
                  {signUpErrors.confirmPassword && <p className="text-xs text-destructive mt-1.5">{signUpErrors.confirmPassword}</p>}
                </div>
              </div>

              <Button variant="hero" className="w-full h-12 btn-shimmer text-base" type="submit">
                Create Free Account <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </motion.div>

          {/* Log In — smaller card */}
          <motion.div
            initial={{ opacity: 0, y: 56 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease, delay: 0.1 }}
            className="md:col-span-2 bento-card p-8 lg:p-10 flex flex-col"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                <Lock className="h-5 w-5 text-accent" />
              </div>
              <h3 className="font-display text-xl font-bold text-foreground tracking-tight">Welcome Back</h3>
            </div>

            <form onSubmit={handleLogin} className="space-y-5 flex-1 flex flex-col">
              <div>
                <Label className="text-sm font-medium text-muted-foreground mb-2 block">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/40" />
                  <Input type="email" className={inputClass} value={loginData.email} onChange={e => setLoginData({ ...loginData, email: e.target.value })} placeholder="john@university.edu" />
                </div>
                {loginErrors.email && <p className="text-xs text-destructive mt-1.5">{loginErrors.email}</p>}
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <Label className="text-sm font-medium text-muted-foreground">Password</Label>
                  <button type="button" className="text-xs text-primary hover:underline font-medium">Forgot?</button>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/40" />
                  <Input type="password" className={inputClass} value={loginData.password} onChange={e => setLoginData({ ...loginData, password: e.target.value })} placeholder="Enter password" />
                </div>
                {loginErrors.password && <p className="text-xs text-destructive mt-1.5">{loginErrors.password}</p>}
              </div>

              <div className="flex-1" />

              <Button variant="hero" className="w-full h-12 btn-shimmer" type="submit">Sign In</Button>

              <div className="flex items-center gap-3">
                <div className="flex-1 h-px bg-border/50" />
                <span className="text-xs text-muted-foreground/60 font-medium">or</span>
                <div className="flex-1 h-px bg-border/50" />
              </div>

              <Button
                variant="outline"
                className="w-full h-12 rounded-xl border-border/60 hover:bg-secondary/60"
                type="button"
                onClick={() => toast.info("Google OAuth integration coming soon.")}
              >
                <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                Continue with Google
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AuthSection;
