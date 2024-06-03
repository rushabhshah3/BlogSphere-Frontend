import { Box, Typography, styled } from "@mui/material";
const Image = styled(Box)`
  width: 100%;
  height: 50vh;
  background: url("https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg")
    center/100% repeat-x #000;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;
`;
const Heading = styled(Typography)`
  font-size: 70px;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.8);
  line-height: 1;
`;
const Subheading = styled(Typography)`
  font-size: 20px;
  background-color: #fff;
`;
const Banner = () => {
  return (
    <Image>
      <Heading>BLOG</Heading>
      <Subheading>Share the Unshared: Your Thoughts Matters too !</Subheading>
    </Image>
  );
};
export default Banner;
