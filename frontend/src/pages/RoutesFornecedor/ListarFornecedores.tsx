import { Box } from "@chakra-ui/react";
import Header from "../../components/ui/Header";
import BTReturn from "../../components/ui/BTReturn";

const ListarFornecedores = () => {
    return (
        <Box>
            <Header tittle="Lista de Fornecedores"/>
            <BTReturn />
            {/* Conteúdo da página de Listar Fornecedores */}
        </Box>
    );
};

export default ListarFornecedores;

