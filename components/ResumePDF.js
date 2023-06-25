import { forwardRef } from "react";
import { Paper, Typography, Box, Divider } from "@mui/material";

const Contacts = ({ contacts }) => {
  return (
    <div
      id="contacts"
      className="flex flex-row justify-center items-center mb-6"
    >
      {contacts.map((contact, i) => {
        return (
          <>
            {i > 0 && (
              <Box
                sx={{
                  width: "8px",
                  height: "8px",
                  maxWidth: "8px",
                  maxHeight: "8px",
                  minWidth: "8px",
                  minHeight: "8px",
                  border: "1px solid black",
                }}
                className="rotate-45"
              ></Box>
            )}
            <Typography key={contact} noWrap={true} className="text-xs mx-2">
              {contact}
            </Typography>
          </>
        );
      })}
    </div>
  );
};

const Section = (props) => {
  return (
    <div className="text-left">
      <Typography variant="subtitle2">{props.title}</Typography>
      <Divider />
      <div className="mx-6">{props.children}</div>
    </div>
  );
};

const Education = ({ education }) => {
  return (
    <Section title="Education">
      <Typography>hello</Typography>
    </Section>
  );
};

const ResumePDF = forwardRef(({ data }, ref) => {
  return (
    <div
      ref={ref}
      className="flex flex-col justify-center text-center items-center"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignContent: "center",
        textAlign: "center",
      }}
    >
      <Paper
        elevation={1}
        className="relative px-24 scale-[.35] md:scale-100"
        style={{
          position: "relative",
          paddingLeft: "6rem",
          paddingRight: "6rem",
        }}
      >
        <img
          src="/images/qr_spierce.jpg"
          alt="my-portfolio-spierce5.vercel.app"
          className="absolute top-0 right-0 w-12 h-12"
          style={{
            position: "absolute",
            top: "0px",
            right: "0px",
            width: "3rem",
            height: "3rem",
          }}
        />
        <Typography
          variant="h2"
          id="title"
          className="uppercase"
          style={{
            textTransform: "uppercase",
            fontSize: "2.125rem",
            lineHeight: "1.75rem",
            color: "black",
            background: "transparent",
          }}
        >
          {data.title}
        </Typography>
        <Contacts contacts={data.contacts} />
        <Education education={data.education} />
      </Paper>
    </div>
  );
});

export default ResumePDF;
