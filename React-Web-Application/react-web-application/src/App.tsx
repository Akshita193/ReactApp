import React, { useState, useEffect } from "react";
import { Grid, TextField, Button, Box, Typography, Card, CardContent } from "@mui/material";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import Quill styles

const App: React.FC = () => {
  const [counter, setCounter] = useState(0);
  const [editorContent, setEditorContent] = useState("");
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmailID] = useState("");

  useEffect(() => {
    const savedEditorContent = localStorage.getItem("editorContent");
    if (savedEditorContent) setEditorContent(savedEditorContent);

    const savedFormData = localStorage.getItem("formData");
    if (savedFormData) {
      const parsedData = JSON.parse(savedFormData);
      setName(parsedData.name);
      setContact(parsedData.contact);
      setAddress(parsedData.address);
      setEmailID(parsedData.email);
    }
  }, []);

  const handleEditorChange = (content: string) => {
    setEditorContent(content);
    localStorage.setItem("editorContent", content);
  };

  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === "name") setName(value);
    if(contact === "contact") setContact(value);
    if(address === "address") setAddress(value);
    if (name === "email") setEmailID(value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    localStorage.setItem("formData", JSON.stringify({ name, email }));
  };

  return (
    <Box sx={{ padding: "20px" }}>
      <Grid container spacing={2}>
        {/* Counter */}
        <Grid item xs={12} md={6}>
          <Card sx={{ height: "45vh" }}>
            <CardContent sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
              <Typography variant="h5">Counter</Typography>
              <Typography variant="h6" sx={{ marginBottom: "10px" }}>
                Counter: {counter}
              </Typography>
              <Box sx={{ display: "flex", justifyContent: "center", gap: "10px" }}>
                <Button onClick={() => setCounter(counter - 1)} variant="outlined">
                  ➖
                </Button>
                <Button onClick={() => setCounter(0)} variant="outlined">
                  Reset
                </Button>
                <Button onClick={() => setCounter(counter + 1)} variant="outlined">
                  ➕
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Rich Text Editor */}
        <Grid item xs={12} md={6}>
          <Card sx={{ height: "45vh", display: "flex", flexDirection: "column" }}>
            <CardContent sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
              <Typography variant="h5">Rich Text Editor</Typography>
              <ReactQuill
                value={editorContent}
                onChange={handleEditorChange}
                modules={{
                  toolbar: [
                    [{ header: [1, 2, false] }],
                    ["bold", "italic", "underline", "strike"],
                    [{ list: "ordered" }, { list: "bullet" }],
                    ["blockquote", "code-block"],
                    [{ color: [] }, { background: [] }],
                    [{ align: [] }],
                    ["clean"],
                  ],
                }}
                formats={[
                  "header",
                  "bold",
                  "italic",
                  "underline",
                  "strike",
                  "list",
                  "bullet",
                  "blockquote",
                  "code-block",
                  "color",
                  "background",
                  "align",
                ]}
                style={{ height: "150px", marginTop: "10px" }}
              />
            </CardContent>
          </Card>
        </Grid>

        {/* User Data Form */}
        <Grid item xs={12}>
          <Card sx={{ height: "80vh", marginTop: "20px" }}>
            <CardContent sx={{ height: "100%" }}>
              <Typography variant="h5">User Data Form</Typography>
              <Box sx={{ marginTop: "10px", height: "calc(100% - 40px)" }}>
                <form onSubmit={handleSubmit}>
                  <TextField label="Name" name="name" value={name} onChange={handleFormChange} fullWidth margin="normal" />
                  <TextField label="Contact" name="contact" value={contact} onChange={handleFormChange} fullWidth margin="normal" />
                  <TextField label="Address" name="address" value={address} onChange={handleFormChange} fullWidth margin="normal" />
                  <TextField label="Email" name="email" value={email} onChange={handleFormChange} fullWidth margin="normal" />
                  <Button type="submit" variant="contained" color="primary" fullWidth>
                    Submit
                  </Button>
                </form>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default App;
