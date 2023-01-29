import React from 'react'
import { useForm, SubmitHandler } from "react-hook-form";
import { Inter } from '@next/font/google'
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';

const inter = Inter({ subsets: ['latin'] })

type Props = {}

type Inputs = {
  phone: string,
  password: string,
};

const SignIn = (props: Props) => {
  const router = useRouter();
  const { query } = router;
  console.log(query)
  const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async data => {
    let callbackUrl = window.location.origin + "/member/dashboard"
    if (query.callbackUrl) {
      callbackUrl = query.callbackUrl as string;
    }
    await signIn("member-login", { phone: data.phone, password: data.password, callbackUrl: callbackUrl })
  };

  return (
    <div className={`d-flex w-100 vh-100 bg-danger align-items-center ${inter.className}`}>
      <div className='container'>
        <div className="row">
          <div className="col-12 col-md-4 col-lg-4 mx-auto">
            <h2 className='mb-4 text-center text-white'>Member Sign IN</h2>
            <div className="card">
              <div className="card-body">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className='mb-3'>
                    <input type="text" className="form-control" placeholder='Phone Number' defaultValue="" {...register("phone", { required: true })} />
                    {errors.phone && <span className='small text-danger'>This field is required</span>}
                  </div>
                  <div className='mb-3'>
                    <input type="password" className="form-control" placeholder='Password' {...register("password", { required: true })} />
                    {errors.password && <span className='small text-danger'>This field is required</span>}
                  </div>
                  <div className='d-grid'>
                    <button type='submit' className='btn btn-danger'>SignIn {'>'}</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignIn