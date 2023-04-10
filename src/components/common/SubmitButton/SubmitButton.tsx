import { Button } from "@mui/material";

type SubmitButtonProps = {
    handleSubmit: () => Promise<void>;
    label: string;
    disabled ?: boolean
  };
  
  const SubmitButton = ({ handleSubmit, label, disabled = false }: SubmitButtonProps) => {
    return (
      <Button disabled={disabled} onClick={handleSubmit} sx={{color:"white"}}  variant="contained"  >
        {label}
      </Button>
    );
  };
  export default SubmitButton;
  