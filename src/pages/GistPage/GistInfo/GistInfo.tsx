import { Box, Typography } from "@mui/material"
import { dateToDuration } from "../../../utils"
import { FC } from "react"

interface GistInfoProps {
    username : string
    date  : string
}
const GistInfo : FC<GistInfoProps> = ({username,date}) => {
    return (
        <Box>
        <Typography color="blue">{username}</Typography>
        <Typography color="gray" fontSize="14px">
          Created {dateToDuration(date)}
        </Typography>
        <Typography color="gray" fontSize="10px">
          Broadcast Server
        </Typography>
      </Box> 
    )
}
export default GistInfo;