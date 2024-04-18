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
  list_type: string;
}

export default function MasornyImageList(props: ImageListProps) {
  const [itemData, setItemData] = useState<any[]>([]);
  const {user} = useAuth()
  var url: string;

  if (props.list_type == "popular") {
    url = "http://localhost:8000/popularposts/" + user.user_id;
  } else if (props.list_type == "followed") {
    url = "http://localhost:8000/followedposts/" + user.user_id;
  }

  useEffect(() => {
    axios.get(url).then((response) => {
      setItemData(response.data);
      console.log(response.data);
    });
  }, [props.list_type]);

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

/*const itemData = [
  {
    img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
    title: "Breakfast",
    author: "@bkristastucchio",
  },
  {
    img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
    title: "Burger",
    author: "@rollelflex_graphy726",
  },
  {
    img: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
    title: "Camera",
    author: "@helloimnik",
  },
  {
    img: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c",
    title: "Coffee",
    author: "@nolanissac",
  },
  {
    img: "https://images.unsplash.com/photo-1533827432537-70133748f5c8",
    title: "Hats",
    author: "@hjrc33",
  },
  {
    img: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62",
    title: "Honey",
    author: "@arwinneil",
  },
  {
    img: "https://images.unsplash.com/photo-1516802273409-68526ee1bdd6",
    title: "Basketball",
    author: "@tjdragotta",
  },
  {
    img: "https://images.unsplash.com/photo-1518756131217-31eb79b20e8f",
    title: "Fern",
    author: "@katie_wasserman",
  },
  {
    img: "https://images.unsplash.com/photo-1597645587822-e99fa5d45d25",
    title: "Mushrooms",
    author: "@silverdalex",
  },
  {
    img: "https://images.unsplash.com/photo-1567306301408-9b74779a11af",
    title: "Tomato basil",
    author: "@shelleypauls",
  },
  {
    img: "https://images.unsplash.com/photo-1471357674240-e1a485acb3e1",
    title: "Sea star",
    author: "@peterlaster",
  },
  {
    img: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
    title: "Bike",
    author: "@southside_customs",
  },
];
*/
