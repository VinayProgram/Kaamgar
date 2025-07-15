
'use client';
import { client } from "../../../../../lib/apolloClient";
import { gql } from '@apollo/client';


export const GET_USER_ALERTS = gql`query GetAllAlertsByUserId {
    GetAllAlertsByUserId {
        active
        address
        alertBy
        alertUserType
        categoryId
        createdDate
        description
        id
        location
        maxPrice
        minPrice
        pincode
        selfDestroy
        title
    }
}
`;

export async function getUserAlerts() {
  try {
    const { data: response } = await client.query({
      query: GET_USER_ALERTS,
    });
    return response.GetAllAlertsByUserId;
  } catch (error) {
    console.error('Error getting user alerts:', error);
    throw error;
  }
}

import { useQuery } from '@apollo/client';
export function useUserAlerts() {
  const { data, loading, error, refetch } = useQuery<{ GetAllAlertsByUserId: Alerts_Response[] }>(GET_USER_ALERTS);

  return {
    alerts: data?.GetAllAlertsByUserId || [],
    loading,
    error,
    refetch,
  };
}




export interface Alerts_Response {
    __typename: string
    active: boolean
    address: string
    alertBy: string
    alertUserType: string
    categoryId: string
    createdDate: string
    description: string
    id: string
    location: Location
    maxPrice: number
    minPrice: number
    pincode: string
    selfDestroy: boolean
    title: string
  }
  
  export interface Location {
    longitude: number
    latitude: number
  }
  
