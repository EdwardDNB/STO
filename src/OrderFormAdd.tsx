import React, { useState } from 'react';
import {
    Button,
     } from '@mui/material';
import {addOrder, Order} from "./state/ordersSlice";
import {OrderFormDialog} from "./OrderFormDialog";
import {useAppDispatch} from "./state/store";

interface OrderFormProps {
  title:string
}

export const OrderFormAdd: React.FC<OrderFormProps> = ({title }) => {
    const dispatch = useAppDispatch()
    const [editOpen, setEditOpen] = useState(false);
    const handleAddOrder = (order: Order) => {
        dispatch(addOrder(order));
        setEditOpen(true);
    };
const handleOnClose=()=>{
    setEditOpen(false);
}
    return (
        <>
            <Button variant="contained" onClick={()=>setEditOpen(true)}>{title}</Button>
            {editOpen&&<OrderFormDialog onClose={handleOnClose} open={editOpen} onSubmit={handleAddOrder} title={title}/>}
        </>
    );
};
