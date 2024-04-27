import { styled } from '@mui/system';
import {AddCar} from "./AddCar";
import {ToDoLists} from "./ToDoLists";

const RootContainer = styled('div')({
    minHeight: '100vh',
    backgroundImage: `url('http://localhost:3001/images/female-mechanic-working-shop-car.jpg')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    padding: '20px'
});
export const DailyWorks = () => {
    return <RootContainer>
        <AddCar/>
        <ToDoLists/>
    </RootContainer>
}