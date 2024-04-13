import React from "react";
import { Grid, Card, CardContent, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { styled } from "@mui/system";

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
    }>(null);

    const newsArticles = [
        {
            title: "News Title 1",
            preview: "This is a short preview of the news article.",
            date: "2023-01-01",
            imageUrl: "./images/news1-small.jpg",
            fullImageUrl: "./images/news1-large.jpg",
            content: "This is the full content of the news article. It goes into detail about the topic.",
        },
        {
            title: "News Title 2",
            preview: "This is a short preview of the second news article.",
            date: "2023-02-01",
            imageUrl: "./images/news2-small.jpg",
            fullImageUrl: "./images/news2-large.jpg",
            content: "This is the full content of the second news article. It provides in-depth information.",
        },
    ];

    const handleArticleClick = (article: any) => {
        setSelectedArticle(article);
    };

    const handleCloseArticle = () => {
        setSelectedArticle(null);
    };

    return (
        <div className="font-roboto p-4">
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
                        <Typography variant="body1" gutterBottom>
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
                <CenteredGrid container spacing={4}>
                    {newsArticles.map((article) => (
                        <Grid item key={article.title} xs={12} md={6}>
                            <Card
                                className="bg-[#f5f5f5] p-4 rounded-lg shadow cursor-pointer"
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
                            </Card>
                        </Grid>
                    ))}
                </CenteredGrid>
            )}
        </div>
    );
};