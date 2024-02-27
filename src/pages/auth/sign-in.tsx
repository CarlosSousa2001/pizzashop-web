import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Helmet } from 'react-helmet-async'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {toast } from 'sonner'

const SigninFormSchema = z.object({
  email: z.string().email()
})

type SigninFormData = z.infer<typeof SigninFormSchema>

export function SignIn() {

  const { register, handleSubmit, formState:{isSubmitting} } = useForm<SigninFormData>({
    resolver: zodResolver(SigninFormSchema)
  })

  async function handleSignIn(data: SigninFormData) {

    await new Promise(x => setTimeout(x, 2000))

    console.log(data)

    toast.success("Enviamos um link de autenticação para o seu e-mail.")
  }

  return (
    <>
      <Helmet title='Login' />
      <div className='p-8 '>
        <div className='w-[350px] flex flex-col justify-center gap-6'>
          <div className='flex flex-col gap-2 text-center'>
            <h1 className='text-2xl font-semibold tracking-tight'>Acessar Painel</h1>
            <span className='text-sm text-muted-foreground'>Acompanhe suas vendas pelo painel do parceiro!</span>
          </div>

          <form className='space-y-4' onSubmit={handleSubmit(handleSignIn)}>
            <div className='space-y-2'>
              <Label htmlFor='email'>Seu E-mail</Label>
              <Input type="email" id="email" {...register('email')} />
            </div>
            <Button disabled={isSubmitting} className='w-full' type='submit'>Acessar painel</Button>
          </form>
        </div>
      </div>
    </>
  )
}