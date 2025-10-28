"use client"

import FooterLink from '@/components/forms/FooterLink'
import InputField from '@/components/forms/InputField'
import React from 'react'
import {useRouter} from "next/navigation";
import {useForm} from "react-hook-form";

const page = () => {
     const router = useRouter()
      const {
          register,
          handleSubmit,
          control,
          formState: { errors, isSubmitting },
      } = useForm<SignInFormData>({
          defaultValues: {
            
              email: '',
              password: '',

          },
          mode: 'onBlur'
      }, );
  
      const onSubmit = async (data: SignInFormData) => {}
  return (
    <div>
       <h1 className="form-title">Log In Your Account</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
           <InputField
                    name="email"
                    label="Email"
                    placeholder="contact@jsmastery.com"
                    register={register}
                    error={errors.email}
                    validation={{ required: 'Email name is required', pattern: /^\w+@\w+\.\w+$/, message: 'Email address is required' }}
                />

                <InputField
                    name="password"
                    label="Password"
                    placeholder="Enter a strong password"
                    type="password"
                    register={register}
                    error={errors.password}
                    validation={{ required: 'Password is required', minLength: 8 }}
                />
        </form>
 
  <FooterLink text="Create an account" linkText="Sign up" href="/sign-up" />
     </div>
  )
}

export default page
