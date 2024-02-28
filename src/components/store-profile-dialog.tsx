import { useMutation, useQuery } from "@tanstack/react-query";
import { Button } from "./ui/button";
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { getManagerRestaurant } from "@/api/get-managed-restaurant";
import { useForm } from "react-hook-form";
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod";
import { updateProfile } from "@/api/update-profile";
import { toast } from "sonner";
import { DialogClose } from "@radix-ui/react-dialog";

const storeProfileSchema = z.object({
  name: z.string(),
  description: z.string()
})

type StoreProfileData = z.infer<typeof storeProfileSchema>
export function StoreProfileDialog() {

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

  const { mutateAsync: updateProfileFn } = useMutation({
    mutationFn: updateProfile,
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
