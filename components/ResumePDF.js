import {
  Page,
  Text,
  Image,
  View,
  Document,
  StyleSheet,
} from "@react-pdf/renderer";

export default function ResumePDF({ data }) {
  const styles = StyleSheet.create({
    page: {
      display: "flex",
      flexDirection: "column",
      backgroundColor: "#E4E4E4",
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1,
    },
    qr: {
      display: "fixed",
      top: 0,
      right: 0,
    },
  });

  return (
    <div className="m-12 flex flex-col justify-center items-center">
      <Document title={data.title} author={data.author}>
        <Page size="A4" style={styles.page}>
          <View style={styles.section}>
            <Image src="/images/qr_spierce.jpg"></Image>
            <Text>{data.companies[0].name}</Text>
          </View>
          <View style={styles.section}>
            <Text>Section #2</Text>
          </View>
        </Page>
      </Document>
    </div>
  );
}
