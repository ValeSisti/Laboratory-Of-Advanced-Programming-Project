import * as React from "react";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { blue } from "@mui/material/colors";
import { Link } from "react-router-dom";

export interface SimpleDialogProps {
  open: boolean;
  selectedValue: any[];
  title: string;
  onClose: (value: any[]) => void;
}

export default function SimpleDialog(props: SimpleDialogProps) {
  const { onClose, selectedValue, open, title } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value: any[]) => {
    onClose(value);
  };

  return (
    <Dialog onClose={handleClose} open={open} scroll="paper">
      <DialogTitle>{title}</DialogTitle>
      <List sx={{ pt: 0, m: 3, width: 300 }}>
        {selectedValue?.map((user) => (
          <Link
            to="/user-profile/"
            state={user.user_id}
            style={{ color: "black", textDecoration: "none" }}
          >
            <ListItem
              button
              onClick={() => handleListItemClick(selectedValue)}
              key={user.user_id}
              sx={{ p: 1.5 }}
              alignItems="center"
            >
              <ListItemAvatar>
                <Avatar
                  sx={{ bgcolor: blue[100], color: blue[600] }}
                  src={user.profile_pic}
                ></Avatar>
              </ListItemAvatar>
              <ListItemText primary={user.username} />
            </ListItem>
          </Link>
        ))}
      </List>
    </Dialog>
  );
}
