import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Helmet } from 'react-helmet-async'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {toast } from 'sonner'
import { Link, useNavigate } from 'react-router-dom'

const SignUpFormSchema = z.object({
  restaurantName: z.string(),
  managerName: z.string(),
  phone: z.string(),
  email: z.string().email()
})

type SignUpFormData = z.infer<typeof SignUpFormSchema>

export function SignUp() {

  const navigate = useNavigate();

  const { register, handleSubmit, formState:{isSubmitting} } = useForm<SignUpFormData>({
    resolver: zodResolver(SignUpFormSchema)
  })

  async function handleSignUp(data: SignUpFormData) {

    await new Promise(x => setTimeout(x, 2000))

    console.log(data)

    navigate('/sign-in')

    toast.success("Enviamos um link de autenticação para o seu e-mail.")
  }

  return (
    <>
      <Helmet title='Cadastro' />
      <div className='p-8 '>
      <Button variant="ghost" asChild className='absolute right-8 top-8 '>
          <Link to="/sign-in" className=''>
            Fazer login
          </Link>
        </Button>
        <div className='w-[350px] flex flex-col justify-center gap-6'>
          <div className='flex flex-col gap-2 text-center'>
            <h1 className='text-2xl font-semibold tracking-tight'>Criar contra grátis</h1>
            <span className='text-sm text-muted-foreground'>Seja um parceiro e comece suas vendas</span>
          </div>

          <form className='space-y-4' onSubmit={handleSubmit(handleSignUp)}>
            <div className='space-y-2'>
              <Label htmlFor='restaurantName'>Nome do estabelecimento</Label>
              <Input type="text" id="restaurantName" {...register('restaurantName')} />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='managerName'>Seu Nome</Label>
              <Input type="text" id="managerName" {...register('managerName')} />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='email'>Seu E-mail</Label>
              <Input type="email" id="email" {...register('email')} />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='phone'>Seu Celular</Label>
              <Input type="tel" id="phone" {...register('phone')} />
            </div>
            <Button disabled={isSubmitting} className='w-full' type='submit'>Finalizar cadastro</Button>

            <p className='px-6 text-center text-sm leading-relaxed text-muted-foreground'>
              Ao continuar, você concorda com nossos <a href="#" className='underline underline-offset-4'> termos de politicas de serviço e privacidade</a>
            </p>
          </form>
        </div>
      </div>
    </>
  )
}