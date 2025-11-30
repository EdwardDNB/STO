import React, { useEffect, useState } from "react";
import {
    Grid,
    Card,
    CardContent,
    Typography,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    IconButton,
    CardMedia,
    Box
} from "@mui/material";
import { styled } from "@mui/system";
import DeleteIcon from '@mui/icons-material/Delete';

import { AddNewsForm, Article } from "./AddNewsForm";
import { useAppDispatch, useAppSelector } from "./state/store";
import {
    fetchArticles,
    postArticle,
    removeArticleFromServer
} from "./state/newsSlice";


// -------------------- STYLES ---------------------

const PageWrapper = styled('div')({
    minHeight: "100vh",
    padding: "30px",
    backgroundImage:
        'url("https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2070")',
    backgroundSize: "cover",
    backgroundPosition: "center",
    position: "relative",
});

const Overlay = styled('div')({
    position: "absolute",
    inset: 0,
    background: "rgba(0, 0, 0, 0.55)",
    backdropFilter: "blur(3px)",
});

const GlassCard = styled(Card)({
    background: "rgba(255,255,255,0.08)",
    borderRadius: 16,
    backdropFilter: "blur(12px)",
    color: "#fff",
    border: "1px solid rgba(255,255,255,0.25)",
    cursor: "pointer",
    transition: "0.25s",
    "&:hover": {
        transform: "scale(1.02)",
        background: "rgba(255,255,255,0.12)",
    }
});

const AddButton = styled(Button)({
    background: "#d32f2f",
    fontWeight: 700,
    color: "#fff",
    "&:hover": {
        background: "#b71c1c"
    }
});

// -----------------------------------------------------

export const News = () => {
    const dispatch = useAppDispatch();

    const [selectedArticle, setSelectedArticle] = useState<null | Article>(null);

    const news = useAppSelector<Article[]>(state => state.news.articles);

    const currentUserRole = useAppSelector(state => state.auth.user?.role);

    const isManager = currentUserRole === "manager";

    useEffect(() => {
        dispatch(fetchArticles());
    }, [dispatch]);


    const onSubmit = (newArticle: Article) => {
        dispatch(postArticle(newArticle));
    };

    const onDelete = (id: string) => {
        dispatch(removeArticleFromServer(id));
    };


    return (
        <PageWrapper>
            <Overlay />

            <Box sx={{ position: "relative", zIndex: 2 }}>

                {/* Кнопка додавання новини: лише менеджеру */}
                {isManager && (
                    <Box mb={3} textAlign="center">
                        <AddButton variant="contained" onClick={() => setSelectedArticle({} as Article)}>
                            + Додати новину
                        </AddButton>
                    </Box>
                )}

                {/* Форма додавання */}
                {selectedArticle && selectedArticle.id === undefined && isManager && (
                    <Dialog open={true} onClose={() => setSelectedArticle(null)}>
                        <DialogTitle>Додати новину</DialogTitle>
                        <DialogContent dividers>
                            <AddNewsForm onSubmit={onSubmit} />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => setSelectedArticle(null)}>Закрити</Button>
                        </DialogActions>
                    </Dialog>
                )}

                {/* Детальний перегляд новини */}
                {selectedArticle && selectedArticle.id && (
                    <Dialog open={true} onClose={() => setSelectedArticle(null)} maxWidth="md" fullWidth>
                        <DialogTitle>{selectedArticle.title}</DialogTitle>
                        <DialogContent dividers>

                            <CardMedia
                                component="img"
                                image={selectedArticle.fullImageUrl}
                                alt="article"
                                style={{
                                    width: "100%",
                                    borderRadius: 12,
                                    marginBottom: 20
                                }}
                            />

                            <Typography variant="body1" mb={2}>
                                {selectedArticle.content}
                            </Typography>

                            {selectedArticle.source && (
                                <Typography variant="body2">
                                    Джерело: <a href={selectedArticle.source}>{selectedArticle.sourceName}</a>
                                </Typography>
                            )}

                            <Typography variant="caption" color="textSecondary">
                                {selectedArticle.date}
                            </Typography>
                        </DialogContent>

                        <DialogActions>
                            <Button onClick={() => setSelectedArticle(null)}>Назад</Button>
                        </DialogActions>
                    </Dialog>
                )}

                {/* Список новин */}
                <Grid container spacing={4} justifyContent="center">
                    {news.map(article => (
                        <Grid item key={article.id} xs={12} sm={6} md={4} lg={3}>
                            <GlassCard onClick={() => setSelectedArticle(article)}>
                                <CardMedia
                                    component="img"
                                    image={article.imageUrl}
                                    alt={article.title}
                                    style={{
                                        height: 180,
                                        borderRadius: "12px 12px 0 0",
                                        objectFit: "cover"
                                    }}
                                />

                                <CardContent>
                                    <Typography variant="h6" sx={{ color: "#fff", fontWeight: 700 }}>
                                        {article.title}
                                    </Typography>

                                    <Typography sx={{ opacity: 0.8 }}>
                                        {article.preview}
                                    </Typography>

                                    <Typography variant="caption" sx={{ opacity: 0.6 }}>
                                        {article.date}
                                    </Typography>
                                </CardContent>

                                {/* Видалення — тільки менеджеру */}
                                {isManager && (
                                    <IconButton
                                        sx={{ color: "#ff4444", float: "right", mb: 1 }}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onDelete(article.id);
                                        }}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                )}
                            </GlassCard>
                        </Grid>
                    ))}
                </Grid>

            </Box>
        </PageWrapper>
    );
};
