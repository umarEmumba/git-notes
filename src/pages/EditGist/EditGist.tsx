import { Box, Container, FormControl, TextField } from "@mui/material";
import Header from "../../components/common/Header/Header";
import SubmitButton from "../../components/common/SubmitButton/SubmitButton";
import useCreateGist from "../../hooks/useCreateGist";

const EditGist = () => {
    const {
        fileName,
        gistDesc,
        gistContent,
        handleChangeDesc,
        handleChangeFileName,
        handleChangeContent,
        createGist,
        updateGist,
        loader,
        id,
      } = useCreateGist();
    
    return (
    <>
        <Header />
        <Container>
          <FormControl sx={{width:"100%"}}>
            <Box className="p-5 flex flex-col gap-7">
              <TextField 
                type="text"
                value={gistDesc}
                disabled={loader}
                variant="outlined"
                label="Description"
                onChange={handleChangeDesc}
                placeholder="Enter gist description..."
              />
              <TextField 
                type="text"
                variant="outlined"
                disabled={loader}
                label="File Name"
                value={fileName}
                onChange={handleChangeFileName}
                placeholder="Enter File Name..."
              />
              { (
                <TextField
                  rows={20}
                  multiline
                  disabled={loader}
                  variant="outlined"
                  label="File Content"
                  value={gistContent}
                  onChange={handleChangeContent}
                  placeholder="Enter file content..."
                />
              )}
            </Box>
          </FormControl>
          <Box className="p-5">
            <SubmitButton
              disabled={loader || !gistContent.trim() || !fileName.trim()}
              handleSubmit={
                id ? () => updateGist(id) : createGist
              }
              label={id ? "Update Gist" : "Create Gist"}
            />
          </Box>
        </Container>
      </>)
}
export default EditGist;