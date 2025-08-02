import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const BTReturn = () => {
    const navigate = useNavigate();
    return (
        <Button position={"absolute"} margin={"15px"} onClick={() => {navigate(-1)}}>Voltar</Button>
    );
}

export default BTReturn;