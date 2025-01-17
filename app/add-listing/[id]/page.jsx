import React from 'react'
import AddListingForm from '../AddListingForm'

const page = async ({params}) => {
  const id = (await params).id
  console.log(id)

  return (
    <div>
      <AddListingForm />
    </div>
  )
}

export default page
