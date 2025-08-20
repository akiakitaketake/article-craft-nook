import ArrowBackSharpIcon from "@mui/icons-material/ArrowBackSharp";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Container,
  AppBar,
  Toolbar,
  IconButton,
  Switch,
  Typography,
  TextField,
  Card,
} from "@mui/material";
import axios, { AxiosError } from "axios";
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useMemo, useState, useEffect } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import useSWR from "swr";
import Error from "@/components/Error";
import Loading from "@/components/Loading";
import MarkdownText from "@/components/MarkdownText";
import { useUserState, useSnackbarState } from "@/hooks/useGlobalState";
import { useRequireSignedIn } from "@/hooks/useRequireSignedIn";
import { fetcher } from "@/utils/index";

type ArticleProps = {
  title: string;
  content: string;
  status: string;
};

type ArticleFormData = {
  title: string;
  content: string;
};

const CurrentArticlesEdit: NextPage = () => {
  useRequireSignedIn();
  const router = useRouter();
  const [user] = useUserState();
  const [, setSnackbar] = useSnackbarState();
  const [previewChecked, setPreviewChecked] = useState<boolean>(false);
  const [statusChecked, setStatusChecked] = useState<boolean>(false);
  const [isFetched, setIsFetched] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleChangePreviewChecked = () => {
    setPreviewChecked(!previewChecked);
  };

  const handleChangeStatusChecked = () => {
    setStatusChecked(!statusChecked);
  };

  const { id } = router.query;
  const url = process.env.NEXT_PUBLIC_API_BASE_URL + "/current/articles/";

  const { data, error } = useSWR(
    user.isSignedIn && id ? url + id : null,
    fetcher,
  );

  const article: ArticleProps = useMemo(() => {
    if (!data) {
      return {
        title: "",
        content: "",
        status: "",
      };
    }

    return {
      title: data.title == null ? "" : data.title,
      content: data.content == null ? "" : data.content,
      status: data.status,
    };
  }, [data]);

  const { handleSubmit, control, reset, watch } = useForm<ArticleFormData>({
    defaultValues: article,
  });

  useEffect(() => {
    if (data) {
      reset(article);
      setStatusChecked(data.status == "公開中");
      setIsFetched(true);
    }
  }, [article, data, reset]);

  const onSubmit: SubmitHandler<ArticleFormData> = (data) => {
    if (data.title == "") {
      return setSnackbar({
        message: "記事の保存にはタイトルが必要です",
        severity: "error",
        pathname: "/current/articles/edit/[id]",
      });
    }

    if (statusChecked && data.content == "") {
      return setSnackbar({
        message: "本文なしの記事は公開できません",
        severity: "error",
        pathname: "/current/articles/edit/[id]",
      });
    }

    setIsLoading(true);

    const patchURL =
      process.env.NEXT_PUBLIC_API_BASE_URL + "/current/articles/" + id;

    const headers = {
      "Content-Type": "application/json",
      "access-token": localStorage.getItem("access-token"),
      client: localStorage.getItem("client"),
      uid: localStorage.getItem("uid"),
    };

    const status = statusChecked ? "published" : "draft";

    const patchData = { ...data, status: status };

    axios({
      method: "PATCH",
      url: patchURL,
      data: patchData,
      headers: headers,
    })
      .then(() => {
        setSnackbar({
          message: "記事を保存しました",
          severity: "success",
          pathname: "/current/articles/edit/[id]",
        });
      })
      .catch((err: AxiosError<{ error: string }>) => {
        console.log(err.message);
        setSnackbar({
          message: "記事の保存に失敗しました",
          severity: "error",
          pathname: "/current/articles/edit/[id]",
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  if (error) return <Error />;
  if (!data || !isFetched) return <Loading />;

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ backgroundColor: "#EDF2F7", minHeight: "100vh" }}
    >
      <AppBar position="fixed" sx={{ backgroundColor: "#EDF2F7" }}>
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box sx={{ width: "50px" }}>
            <Link href="/current/articles">
              <IconButton>
                <ArrowBackSharpIcon />
              </IconButton>
            </Link>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: { xs: "0 16px", sm: "0 24px" },
            }}
          >
            <Box sx={{ textAlign: "center" }}>
              <Switch
                onChange={handleChangePreviewChecked}
                checked={previewChecked}
              />
              <Typography
                sx={{ fontSize: { xs: "12px", sm: "15px" }, color: "black" }}
              >
                プレビュー表示
              </Typography>
            </Box>
            <Box sx={{ textAlign: "center" }}>
              <Switch
                onChange={handleChangeStatusChecked}
                checked={statusChecked}
              />
              <Typography
                sx={{ fontSize: { xs: "12px", sm: "15px" }, color: "black" }}
              >
                下書き/公開
              </Typography>
            </Box>
            <LoadingButton
              variant="contained"
              type="submit"
              loading={isLoading}
              sx={{
                color: "white",
                fontWeight: "bold",
                fontSize: { xs: "12px", sm: "16px" },
              }}
            >
              更新する
            </LoadingButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Container
        maxWidth="lg"
        sx={{ pt: 11, pb: 3, display: "flex", justifyContent: "center" }}
      >
        {!previewChecked && (
          <Box sx={{ width: 840 }}>
            <Box sx={{ mb: 2 }}>
              <Controller
                name="title"
                control={control}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    type="text"
                    error={fieldState.invalid}
                    helperText={fieldState.error?.message}
                    placeholder="タイトルを書いてください"
                    fullWidth
                    sx={{ backgroundColor: "white" }}
                  />
                )}
              />
            </Box>
            <Box>
              <Controller
                name="content"
                control={control}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    type="textarea"
                    error={fieldState.invalid}
                    helperText={fieldState.error?.message}
                    multiline
                    fullWidth
                    rows={25}
                    placeholder="本文をMarkdown形式で書いてください"
                    sx={{ backgroundColor: "white" }}
                  />
                )}
              />
            </Box>
          </Box>
        )}
        {previewChecked && (
          <Box sx={{ width: 840 }}>
            <Typography
              component="h2"
              sx={{
                fontSize: { xs: 21, sm: 25 },
                fontWeight: "bold",
                textAlign: "center",
                pt: 2,
                pb: 4,
              }}
            >
              {watch("title")}
            </Typography>
            <Card sx={{ borderRadius: "12px", boxShadow: "none" }}>
              <Box
                sx={{
                  padding: { xs: "0 24px 24px 24px", sm: "0 40px 40px 40px" },
                  marginTop: { xs: "24px", sm: "40px" },
                }}
              >
                <MarkdownText content={watch("content")} />
              </Box>
            </Card>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default CurrentArticlesEdit;
