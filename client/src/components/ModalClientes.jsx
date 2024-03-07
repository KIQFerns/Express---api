//compenentes MUI
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { FormControl, TextField } from "@mui/material";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

//estilo do modal
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const ModalClientes = (props) => {
  return (
    <Modal
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <FormControl style={{ width: "100%" }}>
          <form onSubmit={props.handleCreate}>
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              align="center"
              style={{ marginBottom: "25px" }}
            >
              Registrar Cliente
            </Typography>
            <TextField
              style={{ margin: "5px" }}
              type="text"
              placeholder="Nome"
              defaultValue={props.cliente.nome}
              onChange={(e) =>
                props.setCliente((prev) => ({ ...prev, nome: e.target.value }))
              }
              fullWidth
              required
            />
            <TextField
              style={{ margin: "5px" }}
              type="text"
              placeholder="E-mail"
              value={props.cliente.email}
              onChange={(e) =>
                props.setCliente((prev) => ({ ...prev, email: e.target.value }))
              }
              fullWidth
              required
            />
            <TextField
              style={{ margin: "5px" }}
              type="text"
              placeholder="Telefone"
              value={props.cliente.telefone}
              onChange={(e) =>
                props.setCliente((prev) => ({ ...prev, telefone: e.target.value }))
              }
              fullWidth
              required
            />
            <Button
              type="submit"
              style={{ marginTop: "25px", width: "100%" }}
              variant="contained"
            >
              Criar
            </Button>
          </form>
        </FormControl>
      </Box>
    </Modal>
  );
};

export default ModalClientes;
