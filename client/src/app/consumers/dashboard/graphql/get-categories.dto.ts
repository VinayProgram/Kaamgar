// lib/mutations/useCreateAlert.ts
'use client';
import { client } from "../../../../lib/apolloClient";
import { gql } from '@apollo/client';


export const GET_CATEGORIES = gql`query Categories {
    categories {
        id
        name
    }
}
`;

export const GET_SKILLS = gql`query Skills {
    skills {
        id
        name
    }
}
`;
export async function getCategories() {
  try {
    const { data: response } = await client.query({
      query: GET_CATEGORIES,
    });
    return response.categories;
  } catch (error) {
    console.error('Error getting categories:', error);
    throw error;
  }
}

import { useQuery } from '@apollo/client';
export function useCategories() {
  const { data, loading, error, refetch } = useQuery<{ categories: Category_Skills[] }>(GET_CATEGORIES);

  return {
    categories: data?.categories || [],
    loading,
    error,
    refetch,
  };
}


export function useSkills() {
    const { data, loading, error, refetch } = useQuery<{ skills: Category_Skills[] }>(GET_SKILLS);
  
    return {
      skills: data?.skills || [],
      loading,
      error,
      refetch,
    };
  }
type Category_Skills = {
  id: string;
  name: string;
}


