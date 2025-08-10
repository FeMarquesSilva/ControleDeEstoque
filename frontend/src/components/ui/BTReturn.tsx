import { Icon } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from 'lucide-react'

const BTReturn = () => {
    const navigate = useNavigate();
    return (
        <Icon
            onClick={() => navigate(-1)}
            backgroundColor={"rgba(235, 160, 0, 1)"}
            _hover={{backgroundColor: "rgba(190, 158, 89, 1)" }}
            transition={"all 0.3s"}
            borderRadius={"150px"}
            as={ArrowLeft}
            position={"fixed"}
            cursor={"pointer"}
            fontSize={"24px"}
            width={"45px"}
            height={"45px"}
            color={"white"}
            margin={"20px"}
            zIndex={1}
        />
    );
}

export default BTReturn;