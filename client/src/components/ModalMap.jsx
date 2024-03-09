//compenentes MUI
import { Box } from "@mui/material";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";

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

function ModalMap(props) {
  console.log(props.route);
  const listItems = props.route.map((d) => <li key={d.nome}>{d.nome}</li>);
  return (
    <Modal
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          align="center"
          style={{ marginBottom: "25px" }}
        >
          Melhor rota
        </Typography>
        {listItems}
      </Box>
    </Modal>
  );
}

export default ModalMap;
