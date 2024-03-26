import React from "react";
import { useForm } from "react-hook-form";
import { FormProps, FormData } from "./types";
import { TextField, Grid, Button } from "@mui/material";

const FormComponent: React.FC<FormProps> = ({ onSubmit }) => {
  const { register, handleSubmit } = useForm<FormData>({
    defaultValues: {
      name: "",
      address: "",
      expirationDate: "",
      awardedDate: "",
      skillName: "",
      skillCriteria: "",
      skillDescription: "",
      badgeImage: "",
      evidence: "",
      didKeySeed: "",
    },
  });

  const onSubmitHandler = (data: FormData) => {
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Your Name"
            {...register("name")}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField fullWidth label="Your Address" {...register("address")} />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Date this credential expires"
            {...register("expirationDate")}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Date Awarded"
            {...register("awardedDate")}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Skill Name"
            {...register("skillName")}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Skill Criteria"
            {...register("skillCriteria")}
            multiline
            rows={4}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Skill Description"
            {...register("skillDescription")}
            multiline
            rows={4}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Badge Image URL"
            {...register("badgeImage")}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField fullWidth label="Evidence URL" {...register("evidence")} />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="DID Key Seed"
            {...register("didKeySeed")}
            required
          />
        </Grid>
      </Grid>
      <Button type="submit" variant="contained" color="primary">
        Sign Credential
      </Button>
    </form>
  );
};

export default FormComponent;
