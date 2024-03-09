import { useState, useEffect } from "react";

//importar componentes do projeto
import ModalClientes from "./ModalClientes";
import ModalMap from "./ModalMap";

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
  const [route, setRoute] = useState([]);
  const [edit, setEdit] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [openMap, setOpenMap] = useState(false);
  const [cliente, setCliente] = useState({
    id_cliente: "",
    nome: "",
    email: "",
    telefone: "",
    x: 0,
    y: 0,
  });

  const handleOpen = () => setOpenForm(true);
  const handleClose = () => setOpenForm(false);
  const handleOpenMap = () => setOpenMap(true);
  const handleCloseMap = () => setOpenMap(false);

  //função para criar um novo cliente
  let handleCreate = async (e) => {
    e.preventDefault();
    console.log(cliente);
    api
      .post("/clientes", cliente)
      .then((response) => {
        console.log(response.data);
        handleRead();
        setOpenForm(false);
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

  // função para editar um cliente
  const handleEdit = (e) => {
    e.preventDefault();
    console.log(cliente);
    api
      .put("/clientes/" + cliente.id_cliente, cliente)
      .then((response) => {
        console.log(response.data);
        handleRead();
        setOpenForm(false);
      })
      .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
      });
  };

  // função para deletar um cliente
  const handleDelete = (id_cliente) => {
    console.log(id_cliente);
    api
      .delete("/clientes/" + id_cliente)
      .then((response) => {
        console.log(response.data);
        handleRead();
        setOpenForm(false);
      })
      .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
      });
  };

  // função para Gerar Rota
  const handleRoute = () => {
    api
      .get("/clientes/route")
      .then((response) => {
        setRoute(response.data);
      })
      .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
      });
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
            {/* botão de editar */}
            <IconButton
              color="primary"
              aria-label="Edit item"
              onClick={() => {
                setCliente({
                  id_cliente: cellValues.row.id_cliente,
                  nome: cellValues.row.nome,
                  email: cellValues.row.email,
                  telefone: cellValues.row.telefone,
                  x: cellValues.row.x,
                  y: cellValues.row.y,
                });
                setEdit(true);
                setOpenForm(true);
              }}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              aria-label="Delete item"
              style={{ color: "#e6493e" }}
              onClick={() => handleDelete(cellValues.row.id_cliente)}
            >
              <DeleteIcon />
            </IconButton>
          </div>
        );
      },
    },
    { field: "id_cliente", headerName: "id", width: 10 },
    { field: "nome", headerName: "nome", width: 300 },
    { field: "email", headerName: "email", width: 150 },
    { field: "telefone", headerName: "telefone", width: 150 },
    { field: "x", headerName: "x", width: 50 },
    { field: "y", headerName: "y", width: 50 },
  ];

  return (
    <>
      <Box style={{ marginLeft: "auto", marginRight: "auto" }}>
        <Button
          style={{ margin: "25px" }}
          variant="contained"
          onClick={() => {
            {
              setCliente({
                id_cliente: "",
                nome: "",
                email: "",
                telefone: "",
                x: 0,
                y: 0,
              });
              setEdit(false);
              handleOpen();
            }
          }}
        >
          Registrar Cliente
        </Button>
        <Button
          style={{ margin: "25px" }}
          variant="contained"
          onClick={() => {
            {
              handleRoute();
              handleOpenMap();
            }
          }}
        >
          Visualizar Rota
        </Button>
      </Box>
      <ModalClientes
        edit={edit}
        handleCreate={handleCreate}
        handleRead={handleRead}
        handleEdit={handleEdit}
        handleClose={handleClose}
        open={openForm}
        setCliente={setCliente}
        cliente={cliente}
        teste={"aqui"}
      />
      <ModalMap handleClose={handleCloseMap} open={openMap} route={route} />
      <Box
        style={{
          height: 400,
          marginLeft: "auto",
          marginRight: "auto",
          backgroundColor: "white",
        }}
      >
        <DataGrid
          disableRowSelectionOnClick
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
