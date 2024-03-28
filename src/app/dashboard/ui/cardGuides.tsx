import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { deleteGuides } from "../../../../api/guides.service";
import { ISGuide } from "../../../../types/guides.types";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  ></Box>
);

export default function BasicCard({
  item,
  setValue,
  setOpen,
}: {
  item: ISGuide;
  setValue:any,
  setOpen: any;
}) {
  const handleDelete = async (item:ISGuide) => {
    const id = item?._id
    const data = await deleteGuides(id);
  };

  const handleEdit = (item: ISGuide) => {
    setOpen(true);
    setValue(item);
  };
  return (
    <Card sx={{ width: 250, height: 300 }}  className="flex flex-col justify-between">
      <CardContent>
        <Typography className="text-center" variant="h5" component="div">
          {item?.title}
        </Typography>
        <Typography className="text-center" variant="body2">
          {item?.content}
        </Typography>
      </CardContent>
      <CardActions className="flex  justify-between">
        <Button
          onClick={()=>handleDelete(item)}
          sx={{ color: "text.primary", bgcolor: "error.main" }}
          size="small"
        >
          delete
        </Button>
        <Button
          onClick={() => handleEdit(item)}
          sx={{ color: "text.primary", bgcolor: "success.main" }}
          size="small"
        >
          edit
        </Button>
      </CardActions>
    </Card>
  );
}
