import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return (
    <div className='flex justify-center mt-24 mb-12'>
      <SignIn />
    </div>
  )
}