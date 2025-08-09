import { AppBar, Container, Box, Button } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
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
          <Box>
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
        </Box>
      </Container>
    </AppBar>
  );
};

export default Header;
