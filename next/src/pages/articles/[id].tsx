import ArticleIcon from "@mui/icons-material/Article";
import PersonIcon from "@mui/icons-material/Person";
import {
  Box,
  Container,
  Typography,
  Card,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import camelcaseKeys from "camelcase-keys";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import useSWR from "swr";
import Error from "@/components/Error";
import Loading from "@/components/Loading";
import MarkdownText from "@/components/MarkdownText";
import { fetcher } from "@/utils";

type ArticleProps = {
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  user: {
    name: string;
  };
};

const ArticleDetail: NextPage = () => {
  const router = useRouter();
  const url = process.env.NEXT_PUBLIC_API_BASE_URL + "/articles/";
  const { id } = router.query;

  const { data, error } = useSWR(id ? url + id : null, fetcher);

  if (error) return <Error />;
  if (!data) return <Loading />;

  const article: ArticleProps = camelcaseKeys(data);

  return (
    <Box
      sx={{
        backgroundColor: "#EDF2F7",
        pb: 6,
        minHeight: "clac(100vh - 57px)",
      }}
    >
      <Box
        sx={{
          display: { xs: "flex", lg: "none" },
          alignItems: "center",
          backgroundColor: "white",
          borderTop: "0.5px solid #acbcc7",
          height: 56,
          pl: 4,
          color: "#6e7b85",
        }}
      >
        <Container
          maxWidth="sm"
          sx={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            height: "100%",
          }}
        >
          <Box sx={{ display: "flex", gap: "0 8px" }}>
            <PersonIcon />
            <Typography
              component="p"
              sx={{ mr: 1, fontSize: { xs: 14, sm: 16 } }}
            >
              著者: {article.user.name}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", gap: "0 8px" }}>
            <ArticleIcon />
            <Typography
              component="p"
              sx={{ mr: 1, fontSize: { xs: 14, sm: 16 } }}
            >
              公開: {article.createdAt}
            </Typography>
          </Box>
        </Container>
      </Box>
      <Container maxWidth="lg">
        <Box sx={{ pt: 6, pb: 3 }}>
          <Box sx={{ maxWidth: 840, m: "auto", textAlign: "center" }}>
            <Typography
              component="h3"
              sx={{
                fontSize: { xs: 21, sm: 25 },
                fontWeight: "bold",
              }}
            >
              {article.title}
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: "flex", gap: "0 24px" }}>
          <Box sx={{ width: "100%" }}>
            <Card
              sx={{
                boxShadow: "none",
                borderRadius: "12px",
                maxWidth: 840,
                m: "0 auto",
              }}
            >
              <Box
                sx={{
                  padding: { xs: "0 24px 24px 24px", sm: "0 40px 40px 40px" },
                  marginTop: { xs: "24px", sm: "40px" },
                }}
              >
                <MarkdownText content={article.content} />
              </Box>
            </Card>
          </Box>
          <Box
            sx={{
              display: { xs: "none", lg: "block" },
              width: 300,
              minWidth: 300,
            }}
          >
            <Card sx={{ borderRadius: "12px", boxShadow: "none" }}>
              <List sx={{ color: "#6e7b85" }}>
                <ListItem divider>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      width: "100%",
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Box sx={{ pr: 1 }}>
                        <PersonIcon />
                      </Box>
                      <ListItemText primary="著者" />
                    </Box>
                    <Box>
                      <ListItemText primary={article.user.name} />
                    </Box>
                  </Box>
                </ListItem>
                <ListItem>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      width: "100%",
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Box sx={{ pr: 1 }}>
                        <ArticleIcon />
                      </Box>
                      <ListItemText primary="公開" />
                    </Box>
                    <Box>
                      <ListItemText primary={article.createdAt} />
                    </Box>
                  </Box>
                </ListItem>
              </List>
            </Card>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default ArticleDetail;
