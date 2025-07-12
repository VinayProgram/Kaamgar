import api from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export const getSessionConsumer = () => useQuery({
      queryKey: ['CONSUMER_SESSION'],
      queryFn: () =>
        api.post('/consumers/login-module/check-auth')
    })
  

