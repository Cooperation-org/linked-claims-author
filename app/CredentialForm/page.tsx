"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FormProps, FormData } from "./types";
import { TextField, Grid, Button } from "@mui/material";

const FormComponent: React.FC<FormProps> = () => {
  const [formData, setFormData] = useState<FormData>();
  const { register, handleSubmit, reset } = useForm<FormData>({
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

  const handleFormSubmit = handleSubmit((data: FormData) => {
    console.log(data);
    setFormData(data);
    const codeToCopy = JSON.stringify(data, null, 2);

    navigator.clipboard
      .writeText(codeToCopy)
      .then(() => {
        console.log("Form values copied to clipboard");
        reset();
      })
      .catch((err) => {
        console.error("Unable to copy form values to clipboard: ", err);
      });
  });

  return (
    <form onSubmit={handleFormSubmit}>
      <Grid container spacing={2} sx={{ m: "0 auto" }}>
        <Grid item xs={8}>
          <TextField
            fullWidth
            label="Your Name"
            {...register("name")}
            required
          />
        </Grid>
        <Grid item xs={8}>
          <TextField fullWidth label="Your Address" {...register("address")} />
        </Grid>
        <Grid item xs={8}>
          <TextField
            fullWidth
            label="Date this credential expires"
            {...register("expirationDate")}
          />
        </Grid>
        <Grid item xs={8}>
          <TextField
            fullWidth
            label="Date Awarded"
            {...register("awardedDate")}
          />
        </Grid>
        <Grid item xs={8}>
          <TextField
            fullWidth
            label="Skill Name"
            {...register("skillName")}
            required
          />
        </Grid>
        <Grid item xs={8}>
          <TextField
            fullWidth
            label="Skill Criteria"
            {...register("skillCriteria")}
            multiline
            rows={4}
          />
        </Grid>
        <Grid item xs={8}>
          <TextField
            fullWidth
            label="Skill Description"
            {...register("skillDescription")}
            multiline
            rows={4}
          />
        </Grid>
        <Grid item xs={8}>
          <TextField
            fullWidth
            label="Badge Image URL"
            {...register("badgeImage")}
          />
        </Grid>
        <Grid item xs={8}>
          <TextField fullWidth label="Evidence URL" {...register("evidence")} />
        </Grid>
        <Grid item xs={8}>
          <TextField
            fullWidth
            label="DID Key Seed"
            {...register("didKeySeed")}
            required
          />
          <pre>
            <code style={{ color: "black" }}>
              {JSON.stringify(formData, null, 2)}
            </code>
          </pre>
        </Grid>
      </Grid>
      <Button
        sx={{ mt: "10px" }}
        type="submit"
        variant="contained"
        color="primary"
      >
        Sign Credential
      </Button>
    </form>
  );
};

export default FormComponent;
