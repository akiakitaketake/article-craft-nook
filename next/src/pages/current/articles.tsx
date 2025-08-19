import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import EditIcon from "@mui/icons-material/Edit";
import {
  Box,
  Container,
  Typography,
  Avatar,
  Tooltip,
  IconButton,
  Divider,
} from "@mui/material";
import camelcaseKeys from "camelcase-keys";
import type { NextPage } from "next";
import useSWR from "swr";
import Error from "@/components/Error";
import Loading from "@/components/Loading";
import { useUserState } from "@/hooks/useGlobalState";
import { useRequireSignedIn } from "@/hooks/useRequireSignedIn";
import { styles } from "@/styles";
import { fetcher } from "@/utils/index";

type ArticleProps = {
  id: number;
  title: string;
  status: string;
};

const CurrentArticles: NextPage = () => {
  useRequireSignedIn();
  const [user] = useUserState();

  const url = process.env.NEXT_PUBLIC_API_BASE_URL + "/current/articles";
  const { data, error } = useSWR(user.isSignedIn ? url : null, fetcher);

  if (error) return <Error />;
  if (!data) return <Loading />;

  const articles: ArticleProps[] = camelcaseKeys(data);

  return (
    <Box
      css={styles.pageMinHeight}
      sx={{ pb: 8, borderTop: "0.5px solid #acbcc7" }}
    >
      <Container maxWidth="md" sx={{ pt: 6, px: 4 }}>
        <Box sx={{ mb: 4 }}>
          <Typography component="h2" sx={{ fontWeight: "bold", fontSize: 32 }}>
            記事の管理
          </Typography>
        </Box>

        {articles.map((article: ArticleProps, i: number) => (
          <>
            <Box
              key={i}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                minHeight: 80,
              }}
            >
              <Box sx={{ width: "auto", pr: 3 }}>
                <Typography
                  component="h3"
                  sx={{
                    fontSize: { xs: 16, sm: 18 },
                    color: "black",
                    fontWeight: "bold",
                  }}
                >
                  {article.title}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  minWidth: 180,
                  width: 180,
                }}
              >
                <>
                  {article.status == "下書き" && (
                    <Box
                      sx={{
                        display: "inline",
                        p: "4px",
                        textAlign: "center",
                        border: " 1px solid #9FAFBA",
                        color: "#9FAFBA",
                        fontSize: 12,
                        fontWeight: "bold",
                        borderRadius: 1,
                      }}
                    >
                      {article.status}
                    </Box>
                  )}
                  {article.status == "公開中" && (
                    <Box
                      sx={{
                        display: "inline",
                        p: "4px",
                        textAlign: "center",
                        border: " 1px solid #3EA8FF",
                        color: "#3EA8FF",
                        fontSize: 12,
                        fontWeight: "bold",
                        borderRadius: 1,
                      }}
                    >
                      {article.status}
                    </Box>
                  )}
                </>

                <Box>
                  <Avatar>
                    <Tooltip title="編集する">
                      <IconButton sx={{ backgroundColor: "#F1F5Fa" }}>
                        <EditIcon sx={{ color: "#99AAB6" }} />
                      </IconButton>
                    </Tooltip>
                  </Avatar>
                </Box>
                <Box>
                  <Avatar>
                    <Tooltip title="表示を確認">
                      <IconButton sx={{ backgroundColor: "#F1F5FA" }}>
                        <ChevronRightIcon sx={{ color: "#99AAB6" }} />
                      </IconButton>
                    </Tooltip>
                  </Avatar>
                </Box>
              </Box>
            </Box>
            <Divider />
          </>
        ))}
      </Container>
    </Box>
  );
};

export default CurrentArticles;
