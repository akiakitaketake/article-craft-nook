import { LoadingButton } from "@mui/lab";
import { Box, Container, Typography, Stack, TextField } from "@mui/material";
import axios, { isAxiosError, AxiosResponse } from "axios";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { useSnackbarState } from "@/hooks/useGlobalState";
import { styles } from "@/styles";

type SignUpFromProps = {
  email: string;
  password: string;
  name: string;
};

const SignUp: NextPage = () => {
  const router = useRouter();
  const [, setSnackbar] = useSnackbarState();
  const [isLoading, setIsLoading] = useState(false);

  const { control, handleSubmit } = useForm<SignUpFromProps>({
    defaultValues: { email: "", password: "", name: "" },
  });

  const validationRules = {
    email: {
      required: "メールアドレスを入力してください",
      pattern: {
        value:
          /^[a-zA-Z0-9_+-]+(.[a-zA-Z0-9_+-]+)*@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/,
        message: "正しい形式のメールアドレスを入力してください",
      },
    },
    password: {
      required: "パスワードを入力してください",
    },
    name: {
      required: "ユーザー名を入力してください",
    },
  };

  const onSubmit: SubmitHandler<SignUpFromProps> = (data) => {
    const SignUp = async (data: SignUpFromProps) => {
      setIsLoading(true);
      const url = process.env.NEXT_PUBLIC_API_BASE_URL + "/auth";
      const confirmSuccessUrl =
        process.env.NEXT_PUBLIC_FRONT_BASE_URL + "/sign_in";

      try {
        const res: AxiosResponse = await axios.post(
          url,
          { ...data, confirm_success_url: confirmSuccessUrl },
          { headers: { "Content-Type": "application/json" } },
        );

        localStorage.setItem("access-token", res.headers["access-token"] || "");
        localStorage.setItem("client", res.headers["client"] || "");
        localStorage.setItem("uid", res.headers["uid"] || "");

        setSnackbar({
          message: "認証メールをご確認ください",
          severity: "success",
          pathname: "/",
        });
        router.push("/");
      } catch (e: unknown) {
        if (isAxiosError(e)) {
          console.log(e.message);
        }
        setSnackbar({
          message: "不正なユーザー情報です",
          severity: "error",
          pathname: "/sign_up",
        });
      } finally {
        setIsLoading(false);
      }
    };
    SignUp(data);
  };

  return (
    <Box css={styles.pageMinHeight} sx={{ backgroundColor: "#EDF2F7" }}>
      <Container maxWidth="sm">
        <Box sx={{ pb: 4, pt: 10 }}>
          <Typography
            component="h2"
            sx={{ fontSize: 32, fontWeight: "bold", color: "black" }}
          >
            新規登録
          </Typography>
        </Box>

        <Stack
          component="form"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          spacing={4}
        >
          <Controller
            control={control}
            name="email"
            rules={validationRules.email}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                type="text"
                label="メールアドレス"
                error={fieldState.invalid}
                helperText={fieldState.error?.message}
                sx={{ backgroundColor: "white" }}
              />
            )}
          />
          <Controller
            control={control}
            name="password"
            rules={validationRules.password}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                type="password"
                label="パスワード"
                error={fieldState.invalid}
                helperText={fieldState.error?.message}
                sx={{ backgroundColor: "white" }}
              />
            )}
          />
          <Controller
            control={control}
            name="name"
            rules={validationRules.name}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                type="text"
                label="ユーザー名"
                error={fieldState.invalid}
                helperText={fieldState.error?.message}
                sx={{ backgroundColor: "white" }}
              />
            )}
          />
          <LoadingButton variant="contained" type="submit" loading={isLoading}>
            送信する
          </LoadingButton>
        </Stack>
      </Container>
    </Box>
  );
};

export default SignUp;
