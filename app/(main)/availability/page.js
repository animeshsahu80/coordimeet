import { getUserAvailability } from '@/app/actions/availability'
import React from 'react'
import { defaultAvailability } from './data';
import AvailabilityForm from './_components/availability-form';

const AvailabilityPage =async () => {
  const availability=await getUserAvailability();
  return (
    <AvailabilityForm initialData={availability || defaultAvailability}></AvailabilityForm>
  )
}

export default AvailabilityPage