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

export default function UserCard({
  item,
  
}: {
  item:any;
 
}) {
  const handleDelete = async (item:ISGuide) => {
    const id = item?._id
    const data = await deleteGuides(id);
    // console.log(id, "item");
  };

  const handleEdit = (item: ISGuide) => {
    console.log(item, "item1");
  
  };
  return (
    <Card  className="flex flex-col justify-between">
      <CardContent>
        <Typography className="text-center" variant="h5" component="div">
          {item?.guide_id}
        </Typography>
        <Typography className="text-center" variant="body2">
          {item?.user_id}
        </Typography>
      </CardContent>
      <CardActions className="flex  justify-between">
      
      </CardActions>
    </Card>
  );
}
