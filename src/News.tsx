import React, {useEffect} from "react";
import {
    Grid,
    Card,
    CardContent,
    Typography,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions, IconButton, CardMedia
} from "@mui/material";
import {styled} from "@mui/system";
import {AddNewsForm, Article} from "./AddNewsForm";
import DeleteIcon from '@mui/icons-material/Delete';
import {useAppDispatch, useAppSelector} from "./state/store";
import {fetchArticles, postArticle, removeArticleFromServer} from "./state/newsSlice";



const CenteredGrid = styled(Grid)`
  display: flex;
  justify-content: center;
`;

export const News = () => {
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(fetchArticles());
    }, [dispatch]);
    const [selectedArticle, setSelectedArticle] = React.useState<null | Article>(null);
    const newsArticles = useAppSelector<Article[]>(state => state.news.articles)


    const handleArticleClick = (article: any) => {
        setSelectedArticle(article);
    };

    const handleCloseArticle = () => {
        setSelectedArticle(null);
    };
    const onSubmit = (newArticle: Article) => {
        dispatch(postArticle(newArticle))
    }

    const onDeleteArticle = (articleId: string) => {
        dispatch(removeArticleFromServer(articleId))
    };
    return (
        <div style={{padding: '10px'}}>
            <AddNewsForm onSubmit={onSubmit}/>
            {selectedArticle ? (
                <Dialog open={!!selectedArticle} onClose={handleCloseArticle}>
                    <DialogTitle>{selectedArticle.title}</DialogTitle>
                    <DialogContent dividers>
                        <CardMedia
                            component="img"
                            image={selectedArticle.fullImageUrl}
                            alt={`Full view of ${selectedArticle.title}`}
                            style={{
                                maxWidth: "100%",
                                height: "auto",
                                borderRadius: "10px",
                            }}
                        />
                        <Typography variant="body1" gutterBottom style={{wordWrap: 'break-word'}}>
                            {selectedArticle.content}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">{selectedArticle.source &&
                            <Typography>Источник:
                             <a href={selectedArticle.source}>{selectedArticle.sourceName}</a>
                            </Typography>}

                        </Typography>
                        <Typography variant="caption" color="textSecondary">
                            {selectedArticle.date}
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseArticle} color="primary">
                            Back to list
                        </Button>
                    </DialogActions>
                </Dialog>
            ) : (
                <CenteredGrid sx={{padding: '10px'}} container spacing={4}>
                    {newsArticles.map((article) => (
                        <Grid item key={article.id} xs={6} md={6}>
                            <Card
                                onClick={() => handleArticleClick(article)}
                            >

                                <CardMedia
                                    component="img"
                                    height="auto"
                                    image={article.imageUrl}
                                    alt={`Preview of ${article.title}`}
                                    style={{
                                        borderRadius: "10px 10px 0 0",
                                        objectFit: "cover",
                                        maxWidth: "670px", // Максимальная ширина изображения
                                        maxHeight: "470px", // Максимальная высота изображения
                                        minWidth: "370px", // Минимальная ширина изображения
                                        minHeight: "270px", // Минимальная высота изображения
                                    }}
                                />
                                <CardContent>
                                    <Typography variant="h5" component="h2">
                                        {article.title}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        {article.preview}
                                    </Typography>
                                    <Typography variant="caption" color="textSecondary">
                                        {article.date}
                                    </Typography>
                                </CardContent>
                                <IconButton
                                    sx={{float: 'right', color: 'rgba(0, 0, 0, 0.54)'}}
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        onDeleteArticle(article.id)
                                    }}
                                >
                                    <DeleteIcon/>
                                </IconButton>
                            </Card>
                        </Grid>
                    ))}
                </CenteredGrid>
            )}
        </div>
    );
};