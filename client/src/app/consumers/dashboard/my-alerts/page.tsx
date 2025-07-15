'use client'
import React from 'react'
import { useUserAlerts } from './graphql/get-user-alerts.dto';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const MyAlertsPage = () => {
    const { alerts } = useUserAlerts();
    console.log(alerts)
  return (
    <div>
        <div className='flex flex-col gap-4 p-4'>
            {alerts.map((alert) => (
                <Card key={alert.id}>
                    <CardHeader>
                        <CardTitle>{alert.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>{alert.description}</p>
                    </CardContent>
                    <CardFooter>
                        <p>{alert.createdDate.toString()}</p>
                    </CardFooter>
                </Card>
            ))}
        </div>
    </div>
  )
}

export default MyAlertsPage
