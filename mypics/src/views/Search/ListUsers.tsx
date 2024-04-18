import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { useEffect, useState } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { ListItemButton } from "@mui/material";

interface UserListProps {
  searchInput: string;
}

export default function ListUsers(props: UserListProps) {
  const [itemData, setItemData] = useState<any[]>([]);
  const { user } = useAuth();

  console.log(props.searchInput);

  useEffect(() => {
    axios
      .post("http://localhost:8000/searched_users", {
        search_input: props.searchInput,
      })
      .then(function (response) {
        setItemData(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [props.searchInput]);

  return (
    <Box
      display="flex"
      justifyContent="center"
      sx={{ height: "85vh", overflow: "auto" }}
    >
      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        {itemData.map((item) => (
          <Link
            to="/user-profile/"
            state={item.user_id}
            style={{ color: "black", textDecoration: "none" }}
            key={item.user_id}
          >
            <ListItem alignItems="center" divider>
              <ListItemButton>
                <ListItemAvatar>
                  <Avatar alt={item.username} src={item.profile_pic} />
                </ListItemAvatar>
                <ListItemText primary={item.username} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
    </Box>
  );
}
