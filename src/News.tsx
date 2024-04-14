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
    DialogActions, IconButton, CardMedia
} from "@mui/material";
import {styled} from "@mui/system";
import {AddNewsForm, Article} from "./AddNewsForm";
import DeleteIcon from '@mui/icons-material/Delete';
import news2SmallImage from './images/news2-small.jpg';
import news1SmallImage from './images/news1-small.jpg';
import news2LargeImage from "./images/news2-large.jpg";
import news1LargeImage from "./images/news1-large.jpg";


const CenteredGrid = styled(Grid)`
  display: flex;
  justify-content: center;
`;

export const News = () => {
    const [selectedArticle, setSelectedArticle] = React.useState<null | Article>(null);

    const newsArticlesState: Article[] = [
        {
            title: "Mercedes-AMG выпустит 1000-сильный электрический внедорожник",
            preview: "Mercedes-AMG разрабатывает электрический флагманский внедорожник мощностью более 1000 л.с. Новая модель появится в 2026 году для конкуренции с BMW XM, Lotus Eletre, Aston Martin DBX и Lamborghini Urus.Mercedes-AMG разрабатывает электрический флагманский внедорожник мощностью более 1000 л.с. Новая модель появится в 2026 году для конкуренции с BMW XM, Lotus Eletre, Aston Martin DBX и Lamborghini Urus.",
            date: "2023-01-01",
            imageUrl: news1SmallImage,
            fullImageUrl: news1LargeImage,
            content: "Технические характеристики этого грядущего внедорожника впечатляют. По информации Autocar, его мощность составит более 1 000 л.с. (746 кВт), а в качестве платформы для электромобиля будет использована специализированная платформа AMG.EA. Среди ключевых особенностей - 800-вольтовая архитектура для более быстрой зарядки, тяговая батарея большой емкости и высокоэффективные электродвигатели Yasa. Автомобиль будет полноприводным, с функцией контроля вектора тяги и активной подвеской.\n" +
                "\n" +
                "Что касается размеров, то новый внедорожник будет значительно крупнее нынешнего Mercedes-AMG GLE 63. Ожидается, что его длина составит около 5 100 мм, а колесная база превысит 3 000 мм. Это обеспечит больше внутреннего пространства и, возможно, лучшие общие пропорции, подходящие для флагманской модели.\n" +
                "\n" +
                "Mercedes-AMG планирует начать производство этого амбициозного проекта на заводе в Зиндельфингене (Германия) с 2026 года. До начала производства ожидается презентация концепта, который покажет, чего потенциальные покупатели могут ожидать от этой модели.\n" +
                "\n",
            id: "1",
            source: "https://www.autocar.co.uk/car-news/new-cars/mercedes-amg-primes-1000bhp-super-suv-next-bespoke-ev",
            sourceName: "Autocar"
        },
        {
            title: "Stellantis сделает электромобиль Fiat 500 более доступным",
            preview: "Компания Stellantis объявила о том, что инвестирует 100 миллионов евро в усовершенствование модели Fiat 500e, чтобы сделать электромобиль более доступным и улучшить впечатления покупателей.",
            date: "2023-02-01",
            imageUrl: news2SmallImage,
            fullImageUrl: news2LargeImage,
            content: "Инвестиции направлены на расширение производства модели и не содержат подробностей о конкретных изменениях в ценах или технических обновлениях. \n" +
                "\n" +
                "Производство Fiat 500 Electric и Abarth 500e осуществляется на заводе Stellantis Mirafiori в Италии. Эта площадка также была выделена для выполнения дополнительных производственных задач, таких как изготовление до 600 тысяч электрифицированных трансмиссий с двойным сцеплением (eDCT) в год для новых гибридных автомобилей. Кроме этого трансмиссии eDCT выпускают на заводе Stellantis в Меце, Франция.\n" +
                "\n" +
                "Компания Stellantis выделила 240 миллионов евро на трансформацию своего завода в Мирафиори в уникальный в мировом масштабе центр дизайна, технических разработок, технологий, производства, управления цепочками поставок и утилизации. Эти усилия вписываются в концепцию \"Автомобильный парк Мирафиори 2030\", направленную на превращение Stellantis в компанию, специализирующуюся на технологиях устойчивой мобильности, и позиционируют производственный комплекс как один из трех наиболее значимых хабов компании в мире.",
            id: "2",
            source: "https://www.media.stellantis.com/em-en/corporate-communications/press/edct-production-launch-marks-another-milestone-in-240-million-transformation-of-iconic-italian-site-into-mirafiori-automotive-park-2030",
            sourceName: "Stellantis"
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
                        <Typography variant="body2" color="textSecondary">
                            Источник: <a href={selectedArticle.source}>{selectedArticle.sourceName}</a>
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
                        <Grid item key={article.title} xs={6} md={6}>
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
                                        maxWidth: "auto",
                                        height: "auto",
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