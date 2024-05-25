// src/components/EditTaskForm.tsx
import React, { ChangeEvent } from 'react';
import {TextField, Typography} from '@mui/material';
import { Task } from './state/invoicesSlice';

interface EditTaskFormProps {
    task: Task;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const EditTaskForm: React.FC<EditTaskFormProps> = ({ task, onChange }) => {
    return (
        <div>
            <Typography variant="subtitle1">{task.title}</Typography>
            <TextField
                label="Supplies"
                name="supplies"
                value={task.supplies}
                onChange={onChange}
                fullWidth
                margin="dense"
                disabled
            />
            <TextField
                label="Supplies Cost"
                name="suppliesCost"
                type="number"
                value={task.suppliesCost}
                onChange={onChange}
                fullWidth
                margin="dense"
            />
        </div>
    );
};
