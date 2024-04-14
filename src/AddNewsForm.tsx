import React, { useState } from "react";
import { Grid, TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import {v4 as uuid} from "uuid";

 export interface Article {
    title: string;
    preview: string;
    date: string;
    imageUrl: string;
    fullImageUrl: string;
    content: string;
    id: string;
}

interface AddNewsFormProps {
    onSubmit: (newArticle: Article) => void;
}

export const AddNewsForm: React.FC<AddNewsFormProps> = ({ onSubmit }) => {
    const [open, setOpen] = useState(false);
    const [newArticle, setNewArticle] = useState<Article>({
        title: "",
        preview: "",
        date: "",
        imageUrl: "",
        fullImageUrl: "",
        content: "",
        id: "",
    });

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewArticle({ ...newArticle, [name]: value });
    };

    const handleSubmit = () => {
        setNewArticle({ ...newArticle, id: uuid() });
        onSubmit(newArticle);
        setNewArticle({
            title: "",
            preview: "",
            date: "",
            imageUrl: "",
            fullImageUrl: "",
            content: "",
            id: "",
        });
        handleClose();
    };

    return (
        <>
            <Button variant="contained" onClick={handleOpen}>Add News</Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add New Article</DialogTitle>
                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                name="title"
                                label="Title"
                                fullWidth
                                value={newArticle.title}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                name="preview"
                                label="Preview"
                                fullWidth
                                value={newArticle.preview}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                name="date"
                                label="Date"
                                type="date"
                                fullWidth
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                value={newArticle.date}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                name="imageUrl"
                                label="Image URL"
                                fullWidth
                                value={newArticle.imageUrl}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                name="fullImageUrl"
                                label="Full Image URL"
                                fullWidth
                                value={newArticle.fullImageUrl}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                name="content"
                                label="Content"
                                multiline
                                rows={4}
                                fullWidth
                                value={newArticle.content}
                                onChange={handleChange}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleSubmit} color="primary">Submit</Button>
                    <Button onClick={handleClose} color="secondary">Cancel</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};


