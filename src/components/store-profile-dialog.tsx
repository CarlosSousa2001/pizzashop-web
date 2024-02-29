import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "./ui/button";
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { GetManagerRestaurantResposne, getManagerRestaurant } from "@/api/get-managed-restaurant";
import { useForm } from "react-hook-form";
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod";
import { updateProfile } from "@/api/update-profile";
import { toast } from "sonner";
import { DialogClose } from "@radix-ui/react-dialog";

const storeProfileSchema = z.object({
  name: z.string(),
  description: z.string().nullable()
})

type StoreProfileData = z.infer<typeof storeProfileSchema>
export function StoreProfileDialog() {

  const queryClient = useQueryClient() //

  // devido o uso da chave  queryKey agora o reactQuery sabe que essa requisição ja foi feita antes
  // entao ele nao precisa fazer outra requisição, ele usa os dados da ultima requisição feita
  const { data: managedRestaurant, } = useQuery({
    queryKey: ['managed-restaurant'],
    queryFn: getManagerRestaurant,
    staleTime: Infinity
  })

  const { register, handleSubmit, formState: { isSubmitted } } = useForm<StoreProfileData>({
    resolver: zodResolver(storeProfileSchema),
    // aqui precisamos usar o value, pois o default value usa os valores antes dos dados existirem
    values: {
      name: managedRestaurant?.name ?? '',
      description: managedRestaurant?.description ?? ''
    }
  })

  // const { mutateAsync: updateProfileFn } = useMutation({
  //   mutationFn: updateProfile,
  //   // agora nos vamos atualizar os dados que estao em cache, ja que a ultima requisição ja contem tudo que eu preciso pra atulizar os dados
  //   // quando eu mudar ao as alterações serao refleitas nos componentes que usam essa query
  //   onSuccess(_, {name, description}){
  //       const cached = queryClient.getQueryData<GetManagerRestaurantResposne>(['managed-restaurant'])

  //       if(cached){
  //           queryClient.setQueryData(['managed-restaurant'], {
  //             ...cached,
  //             name,
  //             description
  //           })
  //       }
  //   }
  // })

  function updateManagedRestaurntCache({name, description}: StoreProfileData){
    const cached = queryClient.getQueryData<GetManagerRestaurantResposne>(['managed-restaurant'])

    if(cached){
        queryClient.setQueryData(['managed-restaurant'], {
          ...cached,
          name,
          description
        })
    }
    // Estou retornando os dados desse cache antes desse restaunt ser atualizado -> preciso desses dados pra trabalhar com o 
    // eles no onError no useMutation
    return {cached}
  }
  // const { mutateAsync: updateProfileFn } = useMutation({
  //   mutationFn: updateProfile,
  //     // ao usar o onMutate no lugar do onSuccess, essa função dispara assim quando eu clico no botao de salvar, nao so no sucesso
  //     // ou seja dispara antes de requisição ser realmente concluída
  //     // Casos de uso -> requsições com baixo risco de falha -- poucos campos
  //   onMutate({name, description}){
  //     updateManagedRestaurntCache({name, description})
  //   },
  // })

  const { mutateAsync: updateProfileFn } = useMutation({
    mutationFn: updateProfile,
      // Quando der error ao usar onMutate
      // Vamos utilizar o context pela função onError() -> 
      // ao usamos os context com os dados recebido pelo return na função updateManagedRestaurntCache
      // podemos ter esse dados antes da requisição ser feita, e caso der erro ele volta com o item anterior
    onMutate({name, description}){
     const {cached} = updateManagedRestaurntCache({name, description})

     return {previousProfile: cached}
    },
    onError(_, __, context){
      if(context?.previousProfile){
        updateManagedRestaurntCache(context.previousProfile)
      }
    }
  })

  async function handleDateProfile(data: StoreProfileData) {
    try {
      await updateProfileFn({
        name: data.name,
        description: data.description
      })
      toast.success('Perfil atualizado com sucessso')
    } catch (error) {
      toast.error('Falha ao atualizar o perfil')
    }
  }



  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Perfil da Loja</DialogTitle>
        <DialogDescription>Atualize as informações do seu estabelecimento</DialogDescription>
      </DialogHeader>
      <form onSubmit={handleSubmit(handleDateProfile)} >
        <div className="space-y-4 gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right" htmlFor="name">Nome</Label>
            <Input id="name" className="col-span-3" {...register('name')} />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right" htmlFor="description">descrição</Label>
            <Textarea id="description" className="col-span-3 resize-none" {...register('description')} />
          </div>
        </div>
        <DialogFooter>
          <DialogClose>
            <Button variant="ghost" type="button">Cancelar</Button>
          </DialogClose>
          <Button type="submit" variant="success" disabled={isSubmitted} >Salvar</Button>
        </DialogFooter>
      </form>
    </DialogContent>
  )
}
