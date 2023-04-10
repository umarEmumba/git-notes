import { Avatar, Box, Card, CardContent, Divider, Typography } from "@mui/material";
import { blue } from "@mui/material/colors";
import { gistType } from "../../../store/gists/types";
import { dateToDuration } from "../../../utils";
import ViewFile from "../../Gists/DisplayGists/GistsGridView/ViewFile/ViewFile";
import { useNavigate } from "react-router-dom";

interface GistPropsType {
    gist : gistType
}

const Gist = ({gist} : GistPropsType) => {
    const fileUrl = gist.files[Object.keys(gist.files)[0]].raw_url;
    const navigate = useNavigate();
    return (
        <Card sx={{m:2}} >
            <CardContent>
                <ViewFile url={fileUrl} />
                <Divider className='p-2'/>
                <Box className="flex pt-2" onClick={()=>navigate(`/gist/${gist.id}`)}>
                    <Avatar sx={{width: "70px", height: "70px"}} alt="profile image" src={gist.owner.avatar_url} />
                    <Box className="pl-4">
                        <Typography gutterBottom variant="h6" component="div" color={blue[900]}>
                        {gist.owner.login}
                        </Typography>
                        <Typography>
                        Created {dateToDuration(gist.created_at)}
                        </Typography>
                    </Box>
                </Box>
                <Typography variant="body2" color="secondary">
                {gist.created_at}
                </Typography>
            </CardContent>
        </Card>
    );
}
export default Gist;