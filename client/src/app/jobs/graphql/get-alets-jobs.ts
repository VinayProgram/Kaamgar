// lib/mutations/useCreateAlert.ts
'use client';
import { client } from '@/lib/apolloClient';
import { gql } from '@apollo/client';

export const GET_ALERTS_JOBS_PUBLIC_QUERY = `query GetAllPublicAlerts_Jobs {
    GetAllPublicAlerts_Jobs {
        alerts {
            description
            id
            minPrice
            title
            maxPrice
        }
        categories {
            name
        }
        skills {
            name
        }
    }
}
`

export const GET_ALERTS_JOBS_PUBLIC = gql`${GET_ALERTS_JOBS_PUBLIC_QUERY}`;

export async function getAlertsJobsPublic() {
  try {
    const { data: response } = await client.query({
      query: GET_ALERTS_JOBS_PUBLIC,
    });
    return response.GetAllPublicAlerts_Jobs;
  } catch (error) {
    console.error('Error getting categories:', error);
    throw error;
  }
}

import { useQuery } from '@apollo/client';
export function useAlertsJobsPublic() {
  const { data, loading, error, refetch } = useQuery<{ alerts: GetAllPublicAlerts_Jobs[] }>(GET_ALERTS_JOBS_PUBLIC);

  return {
        alerts: data?.alerts || [],
    loading,
    error,
    refetch,
  };
}


export type GetAllPublicAlerts_Jobs = {
  description: string;
  id: string;
  title: string;
}


export type GetAllPublicAlerts_Jobs_Response = {
  data: {
    GetAllPublicAlerts_Jobs: {
      alerts: {
        id: string;
        title: string;
        description: string;
        minPrice: string;
        maxPrice: string;
      };
      categories: {
        name: string;
      };
      skills: {
        name: string;
      };
    }[];
  };
};
