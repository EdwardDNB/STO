import React from "react";
import {
    Grid,
    Card,
    CardContent,
    Typography,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions, IconButton
} from "@mui/material";
import {styled} from "@mui/system";
import {AddNewsForm, Article} from "./AddNewsForm";
import DeleteIcon from '@mui/icons-material/Delete';

const CenteredGrid = styled(Grid)`
  display: flex;
  justify-content: center;
`;

export const News = () => {
    const [selectedArticle, setSelectedArticle] = React.useState<null | {
        title: string;
        preview: string;
        date: string;
        imageUrl: string;
        fullImageUrl: string;
        content: string;
        id: string;
    }>(null);

    const newsArticlesState: Article[] = [
        {
            title: "News Title 1",
            preview: "This is a short preview of the news article.",
            date: "2023-01-01",
            imageUrl: "./images/news1-small.jpg",
            fullImageUrl: "./images/news1-large.jpg",
            content: "This is the full content of the news article. It goes into detail about the topic.",
            id: "1"
        },
        {
            title: "News Title 2",
            preview: "This is a short preview of the second news article.",
            date: "2023-02-01",
            imageUrl: "./images/news2-small.jpg",
            fullImageUrl: "./images/news2-large.jpg",
            content: "This is the full content of the second news article. It provides in-depth information.",
            id: "2"
        },
    ];
    const [newsArticles, setNewsArticles] = React.useState<Article[]>(newsArticlesState)
    const handleArticleClick = (article: any) => {
        setSelectedArticle(article);
    };

    const handleCloseArticle = () => {
        setSelectedArticle(null);
    };
    const onSubmit = (newArticle: Article) => {
        setNewsArticles([newArticle, ...newsArticles])
    }

    const onDeleteArticle = (articleId: string) => {
        const updatedArticles = newsArticles.filter(article => article.id !== articleId);
        setNewsArticles(updatedArticles);
       // handleCloseArticle(); // закрыть диалог, если выбранная новость удалена
    };
    return (
        <div style={{padding: '10px'}}>
            <AddNewsForm onSubmit={onSubmit}/>
            {selectedArticle ? (
                <Dialog open={!!selectedArticle} onClose={handleCloseArticle}>
                    <DialogTitle>{selectedArticle.title}</DialogTitle>
                    <DialogContent dividers>

                        <img
                            src={selectedArticle.fullImageUrl}
                            alt={`Full view of ${selectedArticle.title}`}
                            style={{
                                width: "100%",
                                height: "400px",
                                objectFit: "cover",
                                borderRadius: "10px",
                            }}
                        />
                        <Typography variant="body1" gutterBottom style={{wordWrap: 'break-word'}}>
                            {selectedArticle.content}
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
                        <Grid item key={article.title} xs={12} md={6}>
                            <Card
                                onClick={() => handleArticleClick(article)}
                            >

                                <img
                                    src={article.imageUrl}
                                    alt={`Preview of ${article.title}`}
                                    style={{
                                        width: "100%",
                                        height: "200px",
                                        objectFit: "cover",
                                        borderRadius: "10px 10px 0 0",
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
                                    sx={{ float: 'right', color: 'rgba(0, 0, 0, 0.54)' }}
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        onDeleteArticle(article.id)
                                    }}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </Card>
                        </Grid>
                    ))}
                </CenteredGrid>
            )}
        </div>
    );
};