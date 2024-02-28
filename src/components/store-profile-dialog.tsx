import { useQuery } from "@tanstack/react-query";
import { Button } from "./ui/button";
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { getManagerRestaurant } from "@/api/get-managed-restaurant";
import { useForm } from "react-hook-form";
import {z} from 'zod'
import { zodResolver } from "@hookform/resolvers/zod";

const storeProfileSchema = z.object({
    name: z.string(),
    description: z.string()
})

type StoreProfileData = z.infer<typeof storeProfileSchema>
export function StoreProfileDialog() {

  // devido o uso da chave  queryKey agora o reactQuery sabe que essa requisição ja foi feita antes
  // entao ele nao precisa fazer outra requisição, ele usa os dados da ultima requisição feita
  const { data: managedRestaurant,} = useQuery({
    queryKey: ['managed-restaurant'],
    queryFn: getManagerRestaurant,
  })

  const {register, handleSubmit} = useForm<StoreProfileData>({
    resolver: zodResolver(storeProfileSchema),
    // aqui precisamos usar o value, pois o default value usa os valores antes dos dados existirem
    values:{
      name: managedRestaurant?.name ?? '',
      description: managedRestaurant?.description ?? ''
    }
  })



  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Perfil da Loja</DialogTitle>
        <DialogDescription>Atualize as informações do seu estabelecimento</DialogDescription>
      </DialogHeader>
      <form >
        <div className="space-y-4 gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right" htmlFor="name">Nome</Label>
              <Input id="name" className="col-span-3" {...register('name')}/>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right" htmlFor="description">descrição</Label>
              <Textarea id="description" className="col-span-3 resize-none" {...register('description')}/>
            </div>
        </div>
        <DialogFooter>
          <Button variant="ghost" type="button">Cancelar</Button>
          <Button type="submit" variant="success" >Salvar</Button>
        </DialogFooter>
      </form>
    </DialogContent>
  )
}
