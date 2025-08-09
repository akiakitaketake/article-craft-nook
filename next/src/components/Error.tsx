import { Card, CardContent, Container } from "@mui/material";
import { styles } from "@/styles";

const Error = () => {
  return (
    <Container
      maxWidth="sm"
      css={styles.pageMinHeight}
      sx={{ display: "flex", alignItems: "center" }}
    >
      <Card sx={{ p: 3, backgroundColor: "#EEEEEE" }}>
        <CardContent sx={{ lineHeight: 2 }}>
          現在、システム的な問題が発生しています。ご不便をおかけして申し訳ありませんが、復旧までしばらくお待ちください。
        </CardContent>
      </Card>
    </Container>
  );
};

export default Error;
