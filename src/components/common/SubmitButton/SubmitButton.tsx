import { Button } from "@mui/material";

type SubmitButtonProps = {
    handleSubmit: () => Promise<void>;
    label: string;
  };
  
  const SubmitButton = ({ handleSubmit, label }: SubmitButtonProps) => {
    return (
      <Button onClick={handleSubmit} sx={{color:"white"}}  variant="contained"  >
        {label}
      </Button>
    );
  };
  export default SubmitButton;
  