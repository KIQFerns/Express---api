import { useState, useEffect } from "react";

//importar componentes do projeto
import ModalClientes from "./ModalClientes";

//compenentes MUI
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { FormControl, TextField, IconButton } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

//fetch
import api from "../Api";

function TabelaClientes() {
  const [rows, setRows] = useState([]);
  const [open, setOpen] = useState(false);
  const [cliente, setCliente] = useState({ nome: "", email: "", telefone: "" });
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //função para criar um novo cliente
  let handleCreate = async (e) => {
    e.preventDefault();
    console.log(cliente);
    api
      .post("/clientes", cliente)
      .then((response) => {
        console.log(response.data);
        handleRead();
        setOpen(false);
      })
      .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
      });
  };

  //função para Ler lista de clientes um novo cliente
  let handleRead = async () => {
    api
      .get("/clientes")
      .then((response) => setRows(response.data))
      .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
      });
  };

  const handleEdit = () => {
    // some action
  };

  //inicialização
  useEffect(() => {
    handleRead();
  }, []);

  //colunas datatable
  const columns = [
    {
      field: "Print",
      renderCell: (cellValues) => {
        return (
          <div
            className="d-flex justify-content-between align-items-center"
            style={{ cursor: "pointer" }}
          >
            <IconButton
              color="secondary"
              aria-label="Edit item"
              onClick={() => {
                setCliente({
                  nome: cellValues.row.nome,
                  email: cellValues.row.email,
                  telefone: cellValues.row.telefone,
                });
                setOpen(true);
              }}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              aria-label="Delete item"
            >
              <DeleteIcon />
            </IconButton>
          </div>
        );
      },
    },
    { field: "nome", headerName: "nome", width: 300 },
    { field: "email", headerName: "email", width: 150 },
    { field: "telefone", headerName: "telefone", width: 150 },
  ];

  return (
    <>
      <Box style={{ marginRight: "auto" }}>
        <Button
          style={{ margin: "25px" }}
          variant="contained"
          onClick={() => {
            {
              setCliente({ nome: "", email: "", telefone: "" });
              handleOpen();
            }
          }}
        >
          Registrar Cliente
        </Button>
      </Box>
      <ModalClientes
        handleCreate={handleCreate}
        handleRead={handleRead}
        handleClose={handleClose}
        open={open}
        setCliente={setCliente}
        cliente={cliente}
        teste={"aqui"}
      />
      <Box
        style={{
          height: 400,
          marginLeft: "25px",
          marginRight: "auto",
          backgroundColor: "white",
        }}
      >
        <DataGrid
          getRowId={(row) => row.id_cliente}
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
        />
      </Box>
    </>
  );
}

export default TabelaClientes;
