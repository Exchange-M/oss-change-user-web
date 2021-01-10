import React from 'react'
import ComplexOrder from '../components/order/complexOrder'
import NormalOrder from '../components/order/normalOrder'

export default { title: 'order'}


export const complexOrder = () => <ComplexOrder />
export const normalOrder = () => <NormalOrder />
// export const order = () => <Order />