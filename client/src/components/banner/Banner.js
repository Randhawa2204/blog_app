import { Box , Typography ,  styled} from "@mui/material";


const Image = styled(Box)`
    background : url('https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg') center/55% repeat-x;
    width : 100%;
    height : 50vh;
    display : flex;
    justify-content : center;
    flex-direction : column;
    align-items : center;
`
const Heading = styled(Typography)`
    color : #fff;
    font-size : 72px;
    line-height : 1;
`
const SubHeading = styled(Typography)`
    background : #fff;
    font-size : 20px;

`

const Banner = () => {
    return(
        <Image>
            <Heading>BLOG</Heading>
            <SubHeading>Made with ❤️</SubHeading>
        </Image>
    )
}

export default Banner;