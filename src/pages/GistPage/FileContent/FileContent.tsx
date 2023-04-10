import { FC } from "react";
import { Box, Paper, Typography } from "@mui/material";
import ViewFile from "../../../components/common/ViewFile/ViewFile";
import { blue } from "@mui/material/colors";
import { GenericObject } from "../../../utils";

interface FileContentProps {
    file : GenericObject
}
const FileContent : FC<FileContentProps> = ({file}) => {
    return (
        <Paper className="p-4">
            <Box className="min-h-[420px]">
                <Typography color={blue[500]}>
                    {file?.filename}
                </Typography>
                <hr />
                <ViewFile
                    url={
                        file?.raw_url
                    }
                />
            </Box>
        </Paper>
    );
}
export default FileContent;