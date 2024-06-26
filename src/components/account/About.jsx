import { Button, Container, Grid, Paper, Typography } from "@mui/material";
import { ArrowForward } from "@mui/icons-material";
import profilePhoto from "../../public/image/rs.jpg";
const About = () => {
  const handleLinkedInClick = () => {
    window.open("https://www.linkedin.com/in/rushabhshah3", "_blank");
  };
  return (
    <>
      <Container style={{ marginTop: "5rem" }}>
        <Grid container gap={5}>
          <Grid item xs={2} lg={2}>
            <img
              src={profilePhoto}
              alt=""
              width={"100%"}
              style={{ borderRadius: "5%" }}
            />
            <Paper elevation={24}></Paper>
          </Grid>
          <Grid item xs={9} lg={9}>
            <Paper elevation={16} style={{ borderRadius: "3%" }}>
              <Typography style={{ padding: "1rem", paddingBottom: "0" }}>
                Hello,
              </Typography>
              <Typography style={{ padding: "1rem", paddingTop: "0" }}>
                I'm Rushabh Shah, a fresher Computer Engineering student with a
                passion for programming and problem-solving. My journey in the
                tech world has been largely influenced by my proficiency in{" "}
                <b>Javascript</b>, and my solid understanding of <b>C</b> and
                <b> Java</b>. Additionally, I possess skills in{" "}
                <b>HTML, CSS, Node.js, Express, React,</b> and <b>MongoDB</b>.{" "}
                <br />
                My programming background, primarily in Javascript, has allowed
                me to work on several software projects, providing me with
                hands-on experience in design, testing, and development. I have
                a strong grasp of object-oriented programming, algorithms, and
                data structures, which I've applied in my projects. I&apos;m a
                lifelong learner who constantly looks to better myself and
                broaden my knowledge. In addition, I believe that the technology
                industry is ever changing hence; I always make an attempt to
                stay ahead. As such, I want to develop my skills & knowledge
                that can be helpful to others in achieving their goals while at
                the same time obtaining valuable IT experience. Do not hesitate
                to contact me if you have any opportunities where you think that
                your skills would be useful or if you want us to collaborate.
                <br />
                <br />
                <Button
                  variant="outlined"
                  style={{ textTransform: "none" }}
                  onClick={handleLinkedInClick}
                >
                  My Linkedin &nbsp; <ArrowForward />
                </Button>
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};
export default About;
