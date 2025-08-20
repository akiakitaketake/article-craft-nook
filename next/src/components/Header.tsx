import ArticleIcon from "@mui/icons-material/Article";
import Logout from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import {
  AppBar,
  Container,
  Box,
  Button,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Typography,
  Divider,
  ListItemIcon,
} from "@mui/material";
import axios, { AxiosResponse, AxiosError } from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useUserState } from "@/hooks/useGlobalState";

const Header = () => {
  const [user] = useUserState();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const router = useRouter();

  const hideHeaderPathname = ["/current/articles/edit/[id]"];
  if (hideHeaderPathname.includes(router.pathname)) return <></>;

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const addNewArticle = () => {
    const url = process.env.NEXT_PUBLIC_API_BASE_URL + "/current/articles";

    const headers = {
      "Content-Type": "application",
      "access-token": localStorage.getItem("access-token"),
      client: localStorage.getItem("client"),
      uid: localStorage.getItem("uid"),
    };

    axios({ method: "POST", url: url, headers: headers })
      .then((res: AxiosResponse) => {
        router.push("/current/articles/edit/" + res.data.id);
      })
      .catch((err: AxiosError<{ error: string }>) => {
        console.log(err.message);
      });
  };

  return (
    <AppBar
      position="static"
      sx={{
        py: "12px",
        backgroundColor: "white",
        color: "black",
        boxShadow: "none",
      }}
    >
      <Container maxWidth="lg" sx={{ px: 2 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box>
            <Link href="/">
              <Image src="/logo.png" width={133} height={40} alt="logo" />
            </Link>
          </Box>
          {user.isFetched && (
            <>
              {!user.isSignedIn && (
                <Box>
                  <Link href="/sign_in">
                    <Button
                      color="primary"
                      variant="contained"
                      sx={{
                        color: "white",
                        textTransform: "none",
                        fontSize: "16px",
                        borderRadius: "2",
                        boxShadow: "none",
                      }}
                    >
                      Sign in
                    </Button>
                  </Link>
                  <Button
                    color="primary"
                    variant="outlined"
                    sx={{
                      textTransform: "none",
                      fontSize: "16px",
                      borderRadius: "2",
                      boxShadow: "none",
                      border: "1.5 solid #3EA8FF",
                      ml: 2,
                    }}
                  >
                    Sign up
                  </Button>
                </Box>
              )}
              {user.isSignedIn && (
                <Box sx={{ display: "flex" }}>
                  <IconButton onClick={handleClick} sx={{ p: 0 }}>
                    <Avatar>
                      <PersonIcon />
                    </Avatar>
                  </IconButton>
                  <Box sx={{ ml: 2 }}>
                    <Button
                      color="primary"
                      variant="contained"
                      onClick={addNewArticle}
                      sx={{
                        color: "white",
                        textTransform: "none",
                        fontSize: 16,
                        borderRadius: 2,
                        width: 150,
                        boxShadow: "none",
                      }}
                    >
                      記事の新規作成
                    </Button>
                  </Box>
                  <Menu
                    anchorEl={anchorEl}
                    open={open}
                    id="account-menu"
                    onClose={handleClose}
                    onClick={handleClose}
                  >
                    <Box sx={{ pl: 2, py: 1 }}>
                      <Typography sx={{ fontWeight: "bold" }}>
                        {user.name}
                      </Typography>
                    </Box>
                    <Divider />
                    <Link href="/current/articles">
                      <MenuItem>
                        <ListItemIcon>
                          <ArticleIcon fontSize="small" />
                        </ListItemIcon>
                        記事の管理
                      </MenuItem>
                    </Link>
                    <Link href="/sign_out">
                      <MenuItem>
                        <ListItemIcon>
                          <Logout fontSize="small" />
                        </ListItemIcon>
                        サインアウト
                      </MenuItem>
                    </Link>
                  </Menu>
                </Box>
              )}
            </>
          )}
        </Box>
      </Container>
    </AppBar>
  );
};

export default Header;
