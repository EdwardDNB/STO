import React, { useCallback, useState } from "react";
import { AddItemForm } from "./AddItemForm";
import { Button, CardContent, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { styled } from "@mui/system";
import { addTaskSank } from "./state/tasksSlice";
import { useAppDispatch, useAppSelector } from "./state/store";
import { Task } from "./Task";

type PropsTypes = {
    id: string;
};

export type FilterValuesTypes = "All" | "Active" | "Completed";

// === Glass стилі (узгоджені зі сторінкою About) ===
const GlassCard = styled('div')(({ theme }) => ({
    marginTop: theme.spacing(3),
    padding: theme.spacing(2),
    borderRadius: 16,
    background: "rgba(255, 255, 255, 0.10)",
    backdropFilter: "blur(12px)",
    border: "1px solid rgba(255,255,255,0.2)",
    color: "#fff",
}));

const FilterGroup = styled(ToggleButtonGroup)(({ theme }) => ({
    display: "flex",
    justifyContent: "center",
    marginTop: theme.spacing(2),
    "& .MuiToggleButton-root": {
        color: "#fff",
        borderColor: "rgba(255,255,255,0.3)",
        padding: "6px 14px",
        fontWeight: 600,
    },
    "& .Mui-selected": {
        backgroundColor: "#ff3333 !important",
        color: "#fff",
        borderColor: "#ff3333",
    },
}));

export const Todolist = ({ id }: PropsTypes) => {
    const dispatch = useAppDispatch();

    let tasks = useAppSelector((state) =>
        state.tasks.tasks.filter((t) => t.orderId === id)
    );

    const [filter, setFilter] = useState<FilterValuesTypes>("All");

    if (filter === "Completed") {
        tasks = tasks.filter((t) => t.isDone);
    } else if (filter === "Active") {
        tasks = tasks.filter((t) => !t.isDone);
    }

    const addTask = useCallback(
        (title: string) => {
            dispatch(addTaskSank(id, title));
        },
        [dispatch, id]
    );

    return (
        <GlassCard>
            <CardContent>
                {/* Додавання задачі */}
                <AddItemForm addItem={addTask} label="Add task" />

                {/* Список задач */}
                {tasks.length > 0 ? (
                    tasks.map((task) => <Task key={task.id} task={task} />)
                ) : (
                    <div style={{ opacity: 0.7, marginTop: 10 }}>No tasks yet</div>
                )}

                {/* Фільтри */}
                <FilterGroup
                    value={filter}
                    exclusive
                    onChange={(e, value) => value && setFilter(value)}
                >
                    <ToggleButton value="All">All</ToggleButton>
                    <ToggleButton value="Active">Active</ToggleButton>
                    <ToggleButton value="Completed">Completed</ToggleButton>
                </FilterGroup>
            </CardContent>
        </GlassCard>
    );
};
