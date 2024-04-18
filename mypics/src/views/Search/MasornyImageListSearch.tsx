import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Card from "@mui/material/Card";
import { useAuth } from "../../hooks/useAuth";

//source: https://bobbyhadz.com/blog/react-parameter-props-implicitly-has-an-any-type#:~:text=The%20React.,props%20object%20in%20your%20components.
interface ImageListProps {
  searchInput: any;
}

export default function MasornyImageList(props: ImageListProps) {
  const [itemData, setItemData] = useState<any[]>([]);
  const { user } = useAuth();
  var url: string;

  useEffect(() => {
    axios
      .post("http://localhost:8000/search", {
        searchInput: props.searchInput,
        user_id: user.user_id,
      })
      .then(function (response) {
        setItemData(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [props.searchInput]);

  return (
    <ImageList
      sx={{
        columnCount: {
          xs: "1 !important",
          sm: "2 !important",
          md: "3 !important",
          lg: "4 !important",
          xl: "5 !important",
        },
      }}
      variant="masonry"
      gap={12}
    >
      {itemData.map((item) => (
        <Card key={item.post_id} elevation={5} sx={{ mb: 2 }}>
          <Link
            style={{ color: "black" }}
            to="/pic/"
            state={item}
            key={item.post_id}
          >
            <ImageListItem
              sx={{ height: "100% !important", mb: 0 }}
              style={{ margin: 0 }}
            >
              <img
                src={`${item.fb_img_url}?w=1024&h=1024&fit=crop&auto=format`}
                srcSet={`${item.fb_img_url}?w=1024&h=1024&fit=crop&auto=format&dpr=2 2x`}
                alt={item.title}
                loading="lazy"
              />

              <ImageListItemBar
                title={item.title}
                subtitle={<span>by: {item.username}</span>}
                //position="below"
              />
            </ImageListItem>
          </Link>
        </Card>
      ))}
    </ImageList>
  );
}
