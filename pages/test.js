import ResumePDF from "../components/ResumePDF";
import { getLocalData } from "../lib/localdata";

export async function getStaticProps() {
  let resumeData = await getLocalData();
  // resumeData = resumeData.resume;
  console.log(resumeData);
  return {
    props: { resumeData },
  };
}

export default function Test({ resumeData }) {
  return (
    <div className="m-12 flex flex-col justify-center items-center">
      <ResumePDF data={resumeData.resume} />
    </div>
  );
}
