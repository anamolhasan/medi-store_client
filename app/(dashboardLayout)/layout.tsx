import React from 'react'

const layout = ({
    admin,
    customer,
    seller
}:{
    admin:React.ReactNode,
    customer:React.ReactNode,
    seller:React.ReactNode,
}) => {
  return (
    <div>
      {admin}
      {customer}
      {seller}
    </div>
  )
}

export default layout