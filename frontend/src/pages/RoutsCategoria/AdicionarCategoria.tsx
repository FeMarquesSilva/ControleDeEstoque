import BTReturn from "../../components/ui/BTReturn";
import { useState } from "react";
import { Categoria as CategoriaInterface } from "./Interfaces";
import { handleSubmitCategoria } from "./Services";
import { menssage } from "../../components/ui/toastMenssage";

const stylesInputs = {
    width: "100%",
    marginBottom: "10px",
    padding: "8px",
    border: "1px solid #ccc",
    borderRadius: "5px",
};

const AdicionarCategoria = () => {
    const [loading, setLoading] = useState(false);
    const [categoria, setCategoria] = useState<CategoriaInterface>({
        id: null,
        nome: "",
        descricao: ""
    });

    // Atualiza os campos do formulário
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setCategoria((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    // Função de envio
    const submitCategoria = async () => {
        if (loading) return;

        // Validação simples
        if (!categoria.nome.trim()) {
            menssage("Atenção", "O campo Nome é obrigatório.", "warning");
            return;
        }

        setLoading(true);

        await handleSubmitCategoria(categoria)
            .then((response) => {
                setLoading(false);
                if (response?.status === 201) {
                    menssage("Sucesso", "Categoria cadastrada com sucesso!", "success");
                    setCategoria({ id: null, nome: "", descricao: "" });
                } else {
                    menssage("Erro", "Erro ao cadastrar categoria.", "error");
                }
            })
            .catch((error) => {
                console.error(error);
                setLoading(false);
                menssage("Erro", "Erro ao cadastrar categoria. Tente novamente.", "error");
            });
    };

    return (
        <div style={{ padding: "20px" }}>
            <BTReturn />

            <h2>Adicionar Categoria</h2>

            <input
                style={stylesInputs}
                type="text"
                name="nome"
                placeholder="Nome da Categoria"
                value={categoria.nome}
                onChange={handleChange}
            />

            <textarea
                style={stylesInputs}
                name="descricao"
                placeholder="Descrição da Categoria"
                value={categoria.descricao}
                onChange={handleChange}
            />

            <button
                style={{
                    padding: "10px 15px",
                    backgroundColor: loading ? "#999" : "#007bff",
                    color: "#fff",
                    border: "none",
                    borderRadius: "5px",
                    cursor: loading ? "not-allowed" : "pointer"
                }}
                onClick={submitCategoria}
                disabled={loading}
            >
                {loading ? "Enviando..." : "Cadastrar"}
            </button>
        </div>
    );
};

export default AdicionarCategoria;
