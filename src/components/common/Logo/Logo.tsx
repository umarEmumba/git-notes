import { Box } from '@mui/material';
import { FC } from 'react';


interface LogoProps {
  src : string;
  altText : string;
}

const Logo: FC<LogoProps> = ({src,altText}) => (
  <Box
    className="w-64"
    component="img"
    alt={altText}
    src={src}
    />
);

export default Logo;
