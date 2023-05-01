// Hoja de estilo importada
import "./styles/App.css";

// Hooks importados
import { useEffect, useState } from "react";

// Importacion de componentes
import { Box, Container, Divider } from "@mui/material";
import ProfileModal from "./components/profile-modal.jsx";

// Query que trae la informacion de los perros
import { useGetDog } from "./querys/query.jsx";

// Imagenes importadas  importados
import logo from "./img/logo.png";
import iconSun from "../src/img/icon-sun.png";
import iconChat from "../src/img/icon-chat.png";
import iconUbication from "../src/img/icon-ubication.png";
import iconDistance from "../src/img/icon-gps.png";

function App() {
  // Obtener datos de query
  const {
    data: infoPerro,
    isFetching: cargando,
    refetch: recargar,
    isError: errors,
  } = useGetDog();

  // Seteo de listado de perros 'liked'
  const [liked, setLiked] = useState([]);
  // Seteo de listado de perros 'notLiked'
  const [notLiked, setNotLiked] = useState([]);
  // Seteo de variables 'buttonDeactivated'
  const [buttonDeactivated, setButtonDesactivated] = useState(false);

  // Funcion para agregar a listado de liked (perros que le gustaron)
  const giveLike = (infoPerro) => {
    // Comprobacion de spam de botones
    if (!buttonDeactivated) {
      setButtonDesactivated(true);
      imageDog.style.filter = "grayscale(100%)";
      setTimeout(() => {
        setButtonDesactivated(false);
        imageDog.style.filter = "grayscale(0%)";
      }, 1000);
    } else {
      return;
    }
    setLiked([infoPerro,...liked]);
    recargar();
  };

  // Funcion para agregar a listado de notLiked (perros que no le gustaron)
  const giveNotLike = (infoPerro) => {
    // Comprobacion de spam de botones
    if (!buttonDeactivated) {
      setButtonDesactivated(true);
      imageDog.style.filter = "grayscale(100%)";
      setTimeout(() => {
        setButtonDesactivated(false);
        imageDog.style.filter = "grayscale(0%)";
      }, 1000);
    } else {
      return;
    }
    setNotLiked([infoPerro, ...notLiked]);
    recargar();
  };

  // Funcion para mover perro del listado de "notLiked" al listado de "liked"
  const moveToLiked = (infoPerro) => {
    setNotLiked(notLiked.filter((p) => p !== infoPerro));
    setLiked([infoPerro, ...liked]);
  }

  // Funcion para mover perro del listado de "liked" al listado de "notLiked"
  const moveToNotLiked = (infoPerro) => {
    setLiked(liked.filter((p) => p !== infoPerro));
    setNotLiked([infoPerro, ...notLiked]);
  }




  // Mostrar el perfil de perro obtenido.
  const showDog = () => {
    return (
      <Box className="profile-container">
        <Box className="profile-picture">
          {cargando && <div id="loader"></div>}
          <img
            id="imageDog"
            src={infoPerro?.imagen}
            alt={`Foto de perfil de ${infoPerro?.nombre}`}
          />
        </Box>
        <Box className="profile-body">
          <Box className="profile-info">
            {infoPerro?.nombre}, {infoPerro?.edad}
          </Box>

          <Box className="profile-ubication">
            <Box className="ubication">
              <img src={iconUbication} alt="Ubication" />
              De {infoPerro?.ubicacion}
            </Box>
            <Box className="distance">
              <img src={iconDistance} />A {infoPerro?.distancia} de distancia
            </Box>
          </Box>
          <Divider />
          <Box>
            <div className="lorem">{infoPerro?.descripcion}</div>
          </Box>
          <Box className="buttons">
            <div
            title="No me gusta"
              className={`btn noLike ${buttonDeactivated ? "disabled" : ""}`}
              onClick={() => giveNotLike(infoPerro)}
            />
            <div
            title="Me gusta"
              className={`btn like ${buttonDeactivated ? "disabled" : ""}`}
              onClick={() => giveLike(infoPerro)}
            />
          </Box>
        </Box>
      </Box>
    );
  };

  const columns = document.querySelectorAll(".column");
  const headerProfile = document.querySelector(".profile-header");
  const sideIcons = document.querySelectorAll(".side-icon");
  const headerLiked = document.querySelector(".liked-header");
  const headerNotLiked = document.querySelector(".notLiked-header");
  const btnLike = document.querySelector(".like");
  const btnNoLike = document.querySelector(".noLike");
  const columnContent = document.querySelectorAll(".column-content");
  const Ubication = document.querySelector(".ubication");
  const Distance = document.querySelector(".distance");

  const toggleDarkMode = () => {
    document.body.classList.toggle("dark");
    headerProfile.classList.toggle("dark");
    headerLiked.classList.toggle("dark");
    headerNotLiked.classList.toggle("dark");
    sideIcons.forEach((icon) => {
      icon.classList.toggle("dark");
    });
    btnLike.classList.toggle("dark");
    btnNoLike.classList.toggle("dark");
    columns.forEach((column) => {
      column.classList.toggle("dark");
    });

    Ubication.classList.toggle("dark");
    Distance.classList.toggle("dark");

    columnContent.forEach((column) => {
      column.classList.toggle("dark");
    });

  };
  
  return (
    <>
      <Container>
        <Box className="contenedor-principal">
          {/* Columna principal */}
          <Box className="column profile">
            <Box className="profile-header">
              <img className="side-icon" src={iconSun} alt="Icon Dark theme" onClick={toggleDarkMode} />
              <img className="center-icon" src={logo} alt="Logo Header" />
              <img className="side-icon" src={iconChat} alt="Icon Chat" />
            </Box>
            {showDog()}
          </Box>

          {/* Columna liked */}
          <Box className="column liked">
            <Box className="liked-header">
              <img src="../src/img/like.png" alt="liked" />
            </Box>
            <Box className="column-content">
              <ul>
                {liked.map((infoPerro) => (
                  <li key={infoPerro?.nombre}>
                    <img src={infoPerro?.imagen} alt="Avatar perro" />
                    <h2>{infoPerro?.nombre}</h2>
                    <button
                      title="Cambiar a lista contraria"
                      className="btn-change right"
                      onClick={() => moveToNotLiked(infoPerro)}
                    />
                    <ProfileModal datos={infoPerro}></ProfileModal>
                  </li>
                ))}
              </ul>
            </Box>
          </Box>
          {/* Columna de notLiked */}
          <Box className="column notLiked">
            <Box className="notLiked-header">
              <img src="../src/img/dont-like.png" alt="lkiked" />
            </Box>
            <Box className="column-content">
              <ul>
                {notLiked.map((infoPerro) => (
                  <li key={infoPerro?.nombre}>
                    <img src={infoPerro?.imagen} alt="Avatar perro" />
                    <h2>{infoPerro?.nombre}</h2>
                    <button
                      title="Cambiar a lista contraria"
                      className="btn-change left"
                      onClick={() => moveToLiked(infoPerro)}
                    />
                    <ProfileModal datos={infoPerro}></ProfileModal>
                  </li>
                ))}
              </ul>
            </Box>
          </Box>
        </Box>
      </Container>
    </>
  );
}
export default App;
