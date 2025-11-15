
'use client';

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
import { ArrowRight, Loader2, Sparkles } from 'lucide-react';

const SignUp = () => {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isSubmitting },
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

    const onSubmit = async (data: SignUpFormData) => {
        try {
            const result = await signUpWithEmail(data);
            if(result.success) router.push('/dashboard');
        } catch (e) {
            console.error(e);
            toast.error('Sign up failed', {
                description: e instanceof Error ? e.message : 'Failed to create an account.'
            });
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

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
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
                        register={register}
                        error={errors.fullName}
                        validation={{ 
                            required: 'Full name is required', 
                            minLength: {
                                value: 2,
                                message: 'Name must be at least 2 characters'
                            }
                        }}
                    />

                    <InputField
                        name="email"
                        label="Email"
                        placeholder="your@email.com"
                        register={register}
                        error={errors.email}
                        validation={{ 
                            required: 'Email is required', 
                            pattern: {
                                value: /^\w+@\w+\.\w+$/,
                                message: 'Invalid email address'
                            }
                        }}
                    />

                    <InputField
                        name="password"
                        label="Password"
                        placeholder="Create a strong password"
                        type="password"
                        register={register}
                        error={errors.password}
                        validation={{ 
                            required: 'Password is required', 
                            minLength: {
                                value: 8,
                                message: 'Password must be at least 8 characters'
                            }
                        }}
                    />

                    <CountrySelectField
                        name="country"
                        label="Country"
                        control={control}
                        error={errors.country}
                        required
                    />
                </div>

                {/* Investment Preferences Section */}
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

                <Button 
                    type="submit" 
                    disabled={isSubmitting}
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
            </form>
        </div>
    );
};

export default SignUp;
