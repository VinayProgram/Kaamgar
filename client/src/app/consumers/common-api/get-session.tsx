import api from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export const useGetSessionConsumer = () => useQuery({
      queryKey: ['CONSUMER_SESSION'],
      queryFn: async () =>
        await api.post<SessionConsumer>('/consumers/login-module/check-auth').then((res) => res.data)
    })
  

export type SessionConsumer ={
  status: boolean
  data: {
  email: string
exp: number
    fullName: string
  iat: number
  phoneNumber: string
  type: string
  userId: string
}
message: string
} 