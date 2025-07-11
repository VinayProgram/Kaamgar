// lib/mutations/useCreateAlert.ts
'use client';
import { client } from "../../../../lib/apolloClient";
import { gql } from '@apollo/client';
import { CreateAlertDto } from "./create-alert.dto";

export const CREATE_ALERT = gql`
  mutation CreateAlert($data: CreateAlertInput!) {
    createAlert(data: $data) {
      active
    }
  }
`;


export async function createAlert(data:CreateAlertDto) {
  try {
    const { data: response } = await client.mutate({
      mutation: CREATE_ALERT,
      variables: {
        data: data,
      },
    });
    return response.createAlert;
  } catch (error) {
    console.error('Error creating alert:', error);
    throw error;
  }
}

