import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import useStar from "../../../hooks/useStar";

type StarProps = {
  id: string;
};

const Star = ({ id }: StarProps) => {

  const {onClick,isStarred}= useStar(id)
  return (
    <>
      <span className="cursor-pointer" onClick={() => onClick(id)}>
        {isStarred ?  <StarIcon color="primary" /> : <StarBorderIcon color="primary" /> }
      </span>
    </>
  );
};

export default Star;