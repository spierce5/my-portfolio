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

export default function ResumePDF({ data }) {
  return (
    <div className="flex flex-col justify-center text-center items-center">
      <Paper elevation={1} className="relative px-24 scale-[.35] md:scale-100">
        <img
          src="/images/qr_spierce.jpg"
          alt="my-portfolio-spierce5.vercel.app"
          className="absolute top-0 right-0 w-12 h-12"
        />
        <Typography variant="h2" id="title" className="uppercase">
          {data.title}
        </Typography>
        <Contacts contacts={data.contacts} />
        <Education education={data.education} />
      </Paper>
    </div>
  );
}
