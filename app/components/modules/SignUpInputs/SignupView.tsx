import {
  Box,
  TextField,
  FormControlLabel,
  Button,
  Grid,
  Checkbox,
  LinearProgress,
} from "@mui/material";
import { Dispatch, SetStateAction } from "react";

export default function SignupView({
  handleSubmit,
  pwdBarColor,
  pwdScore,
  setPassword,
}: IProps) {
  return (
    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            autoComplete="given-name"
            name="firstName"
            required
            fullWidth
            id="firstName"
            label="First Name"
            autoFocus
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            id="lastName"
            label="Last Name"
            name="lastName"
            autoComplete="family-name"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="new-password"
          />
        </Grid>
        <Grid item xs={12}>
          <LinearProgress
            variant="determinate"
            color={pwdBarColor}
            value={(pwdScore / 4) * 100}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox value="allowExtraEmails" color="primary" />}
            label="I want to receive inspiration, marketing promotions and updates via email."
          />
        </Grid>
      </Grid>
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Sign Up
      </Button>
    </Box>
  );
}

export type TPwdBarColor = "primary" | "warning" | "success" | "error";
interface IProps {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  pwdBarColor: TPwdBarColor;
  pwdScore: number;
  setPassword: Dispatch<SetStateAction<string>>;
}
