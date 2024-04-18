import styled from "@emotion/styled";
import { useDropzone } from "react-dropzone";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import Box from "@mui/material/Box";

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-width: 2px;
  border-radius: 2px;
  border-color: #ff3366;
  border-style: dashed;
  background-color: #fafafa;
  color: #bdbdbd;
  outline: none;
  transition: border 0.24s ease-in-out;
`;

const thumbInner = {
  //display: "flex",
  minWidth: 0,
  overflow: "hidden",
};

const img = {
  display: "block",
  width: "25vw",
  height: "auto",
};

interface StyledDropzoneProps {
  onDrop: any;
  selectedImages: any;
}

export function StyledDropzone(props: StyledDropzoneProps) {
  const onDrop = props.onDrop;

  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
    useDropzone({ onDrop, accept: { "image/*": [] }, multiple: false });

  const selected_pic = props.selectedImages.map((file: any) => (
    <div key={file.name}>
      <div style={thumbInner}>
        <img
          src={file.preview}
          style={img}
          onLoad={() => {
            URL.revokeObjectURL(file.preview);
          }}
        />
      </div>
    </div>
  ));

  
  return (
    <div className="container">
      <Container {...getRootProps({ isFocused, isDragAccept, isDragReject })}>
        <input {...getInputProps()} />
        <Box sx={{ pt: 7, pb: 3 }}></Box>
        <FileUploadIcon sx={{ fontSize: 50 }} color="secondary" />
        <h3>Drag and drop your pic here</h3>
        <p>(Only *.jpg or *.png image)</p>
        <Box sx={{ pt: 7, pb: 3 }}>{selected_pic}</Box>
      </Container>      
    </div>
  );
}

//https://blog.openreplay.com/create-a-drag-and-drop-zone-in-react-with-react-dropzone
//https://react-dropzone.org/#!/Styling%20Dropzone
