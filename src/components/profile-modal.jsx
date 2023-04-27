import * as React from "react";

import { Box, Typography, Modal } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const styleImg = {
  width: "100%",
  height: "40rem",
};

export default function profileModal({ datos }) {
  const { nombre, edad, imagen, descripcion, ubicacion, distancia } = datos;
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <button title="Ver perfil" className="btn-info" onClick={handleOpen}></button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <img style={styleImg} src={imagen} alt="Imagen perro" />
          <Box className='profile-info'>
            {nombre}, {edad}
          </Box>
          <Box className="ubication">
            <img src="../src/img/icon-ubication.png" alt="xd" />
            De {ubicacion}
          </Box>
          <Box className="distance" >
          <img src="../src/img/icon-gps.png" alt="xd" />
           A {distancia} de distancia
          </Box>
          <Box>
            {descripcion}
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
