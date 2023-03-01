import dynamic from "next/dynamic";

const QuillNoSSRWrapper = dynamic(import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});

export default function RichTextEditor(props) {
  return (
    <QuillNoSSRWrapper
      theme="snow"
      className="h-80"
      value={props.value}
      onChange={props.onChange}
    />
  );
}
