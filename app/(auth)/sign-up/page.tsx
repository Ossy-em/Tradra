'use client';

import { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import InputField from "@/components/forms/InputField";
import SelectField from "@/components/forms/SelectField";
import { INVESTMENT_GOALS, PREFERRED_INDUSTRIES, RISK_TOLERANCE_OPTIONS } from "@/lib/constants";
import { CountrySelectField } from "@/components/forms/CountrySelectField";
import FooterLink from "@/components/forms/FooterLink";
import { signUpWithEmail } from "@/lib/actions/auth.actions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ArrowRight, Loader2, Sparkles, Eye, EyeOff, AlertCircle, CheckCircle2 } from 'lucide-react';

interface SignUpFormData {
    fullName: string;
    email: string;
    password: string;
    country: string;
    investmentGoals: string;
    riskTolerance: string;
    preferredIndustry: string;
}

const SignUp = () => {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState(0);

    const {
        register,
        handleSubmit,
        control,
        watch,
        formState: { errors },
    } = useForm<SignUpFormData>({
        defaultValues: {
            fullName: '',
            email: '',
            password: '',
            country: 'US',
            investmentGoals: 'Growth',
            riskTolerance: 'Medium',
            preferredIndustry: 'Technology'
        },
        mode: 'onBlur'
    });


    const password = watch('password');

    useEffect(() => {
        if (password) {
            let strength = 0;
            if (password.length >= 8) strength++;
            if (/[a-z]/.test(password)) strength++;
            if (/[A-Z]/.test(password)) strength++;
            if (/\d/.test(password)) strength++;
            if (/[^a-zA-Z\d]/.test(password)) strength++;
            setPasswordStrength(strength);
        } else {
            setPasswordStrength(0);
        }
    }, [password]);

    const getPasswordStrengthColor = () => {
        if (passwordStrength <= 2) return 'bg-red-500';
        if (passwordStrength === 3) return 'bg-yellow-500';
        if (passwordStrength === 4) return 'bg-blue-500';
        return 'bg-green-500';
    };

    const getPasswordStrengthText = () => {
        if (passwordStrength === 0) return '';
        if (passwordStrength <= 2) return 'Weak';
        if (passwordStrength === 3) return 'Fair';
        if (passwordStrength === 4) return 'Good';
        return 'Strong';
    };

    const onSubmit = async (data: SignUpFormData) => {
        // Prevent duplicate submissions
        if (isSubmitting) return;

        // Check network connectivity
        if (!navigator.onLine) {
            toast.error('No internet connection', {
                description: 'Please check your connection and try again.',
                icon: <AlertCircle className="w-4 h-4" />
            });
            return;
        }

        setIsSubmitting(true);

        try {
            // Add timeout to prevent hanging requests
            const timeoutPromise = new Promise<never>((_, reject) => 
                setTimeout(() => reject(new Error('REQUEST_TIMEOUT')), 20000)
            );
            
       const result = await Promise.race([
    signUpWithEmail(data),
    timeoutPromise
]) as Awaited<ReturnType<typeof signUpWithEmail>>;

      
            if (!result.success) {
                switch (result.error) {
                    case 'EMAIL_EXISTS':
                        toast.error('Email already in use', {
                            description: 'An account with this email already exists. Please sign in.',
                            action: {
                                label: 'Sign In',
                                onClick: () => router.push('/sign-in')
                            }
                        });
                        break;
                    case 'WEAK_PASSWORD':
                        toast.error('Password too weak', {
                            description: 'Please choose a stronger password with uppercase, lowercase, and numbers.'
                        });
                        break;
                    case 'INVALID_EMAIL':
                        toast.error('Invalid email', {
                            description: 'Please enter a valid email address.'
                        });
                        break;
                    case 'RATE_LIMITED':
                        toast.error('Too many attempts', {
                            description: 'Please wait a few minutes before trying again.'
                        });
                        break;
                    case 'INVALID_COUNTRY':
                        toast.error('Invalid country', {
                            description: 'Service is not available in your selected country.'
                        });
                        break;
                 default:
    toast.error('Sign up failed', {
        description: result.error || 'An unexpected error occurred.'
    });

                }
                return;
            }
            
            // Success case
            if (result.success) {
                toast.success('Account created!', {
                    description: 'Welcome to StockAI. Setting up your dashboard...',
                    icon: <CheckCircle2 className="w-4 h-4" />
                });
            
                setTimeout(() => {
                    router.push('/dashboard');
                }, 800);
            }
       } catch (e: unknown) {
    console.error('Sign up error:', e);

    if (e instanceof Error && e.message === 'REQUEST_TIMEOUT') {
        toast.error('Connection timeout', {
            description: 'The request took too long. Please try again.',
            icon: <AlertCircle className="w-4 h-4" />
        });
    } else if (e instanceof Error && e.name === 'NetworkError' || !navigator.onLine) {
        toast.error('Network error', {
            description: 'Unable to connect. Please check your internet connection.',
            icon: <AlertCircle className="w-4 h-4" />
        });
    } else {
        toast.error('Sign up failed', {
            description: e instanceof Error ? e.message : 'Failed to create an account. Please try again.',
            icon: <AlertCircle className="w-4 h-4" />
        });
    }

        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="w-full max-w-md">
            {/* Header */}
            <div className="mb-8">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full mb-4">
                    <Sparkles className="w-3.5 h-3.5 text-teal-400" />
                    <span className="text-xs text-gray-400 font-medium">Free forever</span>
                </div>
                
                <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">
                    Create your account
                </h1>
                <p className="text-gray-400">
                    Join thousands of smart investors
                </p>
            </div>

            <div className="space-y-5">
                <fieldset disabled={isSubmitting} className="space-y-5">
                    {/* Personal Information Section */}
                    <div className="space-y-5">
                        <div className="flex items-center gap-2 pb-2">
                            <div className="w-6 h-px bg-white/10" />
                            <span className="text-xs text-gray-500 font-medium uppercase tracking-wider">
                                Personal Info
                            </span>
                            <div className="flex-1 h-px bg-white/10" />
                        </div>

                        <InputField
                            name="fullName"
                            label="Full Name"
                            placeholder="John Doe"
                            autoFocus
                            autoComplete="name"
                            register={register}
                            error={errors.fullName}
                            validation={{ 
                                required: 'Full name is required', 
                                minLength: {
                                    value: 2,
                                    message: 'Name must be at least 2 characters'
                                },
                                pattern: {
                                    value: /^[a-zA-Z\s'-]+$/,
                                    message: 'Please enter a valid name'
                                }
                            }}
                        />

                        <InputField
                            name="email"
                            label="Email"
                            placeholder="your@email.com"
                            autoComplete="email"
                            register={register}
                            error={errors.email}
                            validation={{ 
                                required: 'Email is required', 
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: 'Please enter a valid email address'
                                }
                            }}
                        />

                        <div className="space-y-2">
                            <div className="relative">
                                <InputField
                                    name="password"
                                    label="Password"
                                    placeholder="Create a strong password"
                                    type={showPassword ? "text" : "password"}
                                    autoComplete="new-password"
                                    register={register}
                                    error={errors.password}
                                    validation={{ 
                                        required: 'Password is required', 
                                        minLength: {
                                            value: 8,
                                            message: 'Password must be at least 8 characters'
                                        },
                                        pattern: {
                                            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                                            message: 'Password must include uppercase, lowercase, and number'
                                        }
                                    }}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    disabled={isSubmitting}
                                    className="absolute right-3 top-[38px] text-gray-400 hover:text-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                    tabIndex={isSubmitting ? -1 : 0}
                                >
                                    {showPassword ? (
                                        <EyeOff className="w-4 h-4" />
                                    ) : (
                                        <Eye className="w-4 h-4" />
                                    )}
                                </button>
                            </div>
                            
                            {/* Password Strength Indicator */}
                            {password && (
                                <div className="space-y-1.5">
                                    <div className="flex gap-1">
                                        {[1, 2, 3, 4, 5].map((level) => (
                                            <div
                                                key={level}
                                                className={`h-1 flex-1 rounded-full transition-colors ${
                                                    level <= passwordStrength
                                                        ? getPasswordStrengthColor()
                                                        : 'bg-gray-700'
                                                }`}
                                            />
                                        ))}
                                    </div>
                                    {passwordStrength > 0 && (
                                        <p className="text-xs text-gray-400">
                                            Password strength: <span className={passwordStrength >= 4 ? 'text-green-400' : passwordStrength === 3 ? 'text-yellow-400' : 'text-red-400'}>
                                                {getPasswordStrengthText()}
                                            </span>
                                        </p>
                                    )}
                                </div>
                            )}
                        </div>

                        <CountrySelectField
                            name="country"
                            label="Country"
                            control={control}
                            error={errors.country}
                            required
                        />
                    </div>

                    <div className="space-y-5 pt-4">
                        <div className="flex items-center gap-2 pb-2">
                            <div className="w-6 h-px bg-white/10" />
                            <span className="text-xs text-gray-500 font-medium uppercase tracking-wider">
                                Investment Profile
                            </span>
                            <div className="flex-1 h-px bg-white/10" />
                        </div>

                        <SelectField
                            name="investmentGoals"
                            label="Investment Goals"
                            placeholder="Select your goal"
                            options={INVESTMENT_GOALS}
                            control={control}
                            error={errors.investmentGoals}
                            required
                        />

                        <SelectField
                            name="riskTolerance"
                            label="Risk Tolerance"
                            placeholder="Select your risk level"
                            options={RISK_TOLERANCE_OPTIONS}
                            control={control}
                            error={errors.riskTolerance}
                            required
                        />

                        <SelectField
                            name="preferredIndustry"
                            label="Preferred Industry"
                            placeholder="Select an industry"
                            options={PREFERRED_INDUSTRIES}
                            control={control}
                            error={errors.preferredIndustry}
                            required
                        />
                    </div>
                </fieldset>

                <Button 
                    type="submit"
                    onClick={handleSubmit(onSubmit)}
                    disabled={isSubmitting}
                    aria-busy={isSubmitting}
                    aria-label={isSubmitting ? "Creating account, please wait" : "Create your account"}
                    className="w-full h-12 bg-white text-black font-medium rounded-lg hover:bg-gray-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-8"
                >
                    {isSubmitting ? (
                        <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Creating Account...
                        </>
                    ) : (
                        <>
                            Start Investing
                            <ArrowRight className="w-4 h-4" />
                        </>
                    )}
                </Button>

                <FooterLink 
                    text="Already have an account?" 
                    linkText="Sign in" 
                    href="/sign-in" 
                />
            </div>
        </div>
    );
};

export default SignUp;