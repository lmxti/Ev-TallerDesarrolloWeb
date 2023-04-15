// Hoja de estilo importada
import "./App.css";

// Hooks importados
import { useEffect, useState } from "react";

// Componentes de Material UI importados
import {
  Box,
  Grid,
  ListItem,
  List,
  Container,
  Button,
  Avatar,
  Divider,
  Chip,
  Stack,
} from "@mui/material";

// Librerias importadas
import dogNames from "dog-names";
import LoremIpsum from "react-lorem-ipsum";
import axios from "axios";

// Iconos importados
import logo from "./img/logo.png";
import iconSetting from "../src/img/icon-settings.svg";
import iconChat from "../src/img/icon-chat.png";

function App() {
  // Seteo de perro con propiedades de nombre e imagen.
  const [perro, setPerro] = useState({
    nombre: "",
    imagen: "",
    edad: "",
    ubicacion: "",
    descripcion: "",
  });
  // Seteo de listado de perros que le gustaron
  const [liked, setLiked] = useState([]);
  // Seteo de listado de perros que no le gustaron
  const [notLiked, setNotLiked] = useState([]);
  // Seteo de variables para no spam de botones
  const [buttonDeactivated, setButtonDeactivated] = useState(false);

  const ubicaciones = [
    "Concepción",
    "Coronel",
    "Chiguayante",
    "Lota",
    "Penco",
    "San Pedro de la paz",
    "Talcahuano",
    "Tomé",
    "Hualpen",
  ];

  const distancias = ["1km", "2km", "3km", "4km", "5km", "6km", "7km", "8km"];

  // Funcion para obtener perro y setear perro (Nombre y foto aleatoria)
  const getPerro = () => {
    axios.get("https://dog.ceo/api/breeds/image/random").then((response) => {
      setPerro({
        nombre: dogNames.allRandom(),
        imagen: response.data.message,
        edad: Math.round(Math.random() * 4) + 1,
        ubicacion: ubicaciones[Math.floor(Math.random() * ubicaciones.length)],
        distancia: distancias[Math.floor(Math.random() * distancias.length)],
        descripcion: (
          <LoremIpsum
            startWithLoremIpsum={false}
            avgWordsPerSentence={2}
            avgSentencesPerParagraph={1}
          />
        ),
      });
    });
  };

  // Obtencion de perro al cargar la pagina
  useEffect(() => {
    getPerro();
  }, []);

  // Funcion para agregar a listado de liked (perros que le gustaron)
  const giveLike = (perro) => {
    // Comprobacion de spam de botones
    if (!buttonDeactivated) {
      setButtonDeactivated(true);
      setTimeout(() => {
        setButtonDeactivated(false);
      }, 1000);
    } else { return }
    //  Push de perro a lista de gustados
    setLiked([...liked, perro]);
    // Obtencion de nuevo perro
    getPerro();
  };

  // Funcion para agregar a listado de notLiked (perros que no le gustaron)
  const giveNotLike = (perro) => {
    // Comprobacion de spam de botones
    if (!buttonDeactivated) {
      setButtonDeactivated(true);
      setTimeout(() => {
        setButtonDeactivated(false);
      }, 1000);
    } else { return }
    // Push de perro a lista de no gustados
    setNotLiked([...notLiked, perro]);
    // Obtencion de nuevo perro
    getPerro();
  };

  // Funcion para cambiar de lista (liked a notLiked)
  const moveToNotLiked = (perro) => {
    setLiked(liked.filter((p) => p !== perro));
    setNotLiked([...notLiked, perro]);
  };

  // Funcion para cambiar de lista (notLiked a liked)
  const moveToLiked = (perro) => {
    setNotLiked(notLiked.filter((p) => p !== perro));
    setLiked([...liked, perro]);
  };

  // Seleccion de elementos del DOM
  const body = document.body; // Elemento body
  const gridBox = document.querySelectorAll(".gridBox"); // Elementos gridBox (columnas)
  const btn = document.querySelectorAll(".btn"); // Elementos btn (botones de like y dislike)
  const nameAge = document.querySelector(".name-age"); // Elemento nameAge (nombre y edad del perro)
  const ubication = document.querySelector(".ubication"); // Elemento ubication (ubicacion del perro)
  const distance = document.querySelector(".distance"); // Elemento distance (distancia del perro)
  const iconUbication = document.querySelector(".icon-ubication"); // Elemento iconUbication (icono de ubicacion)
  const iconDistance = document.querySelector(".icon-distance"); // Elemento iconDistance (icono de distancia)

  const setDarkMode = () => {
    body.classList.toggle("dark-mode");
    gridBox.forEach((box) => {
      box.classList.toggle("dark-mode");
    });
    btn.forEach((botones) => {
      botones.classList.toggle("dark-mode");
    });
    nameAge.classList.toggle("dark-mode");
    ubication.classList.toggle("dark-mode");
    distance.classList.toggle("dark-mode");
    iconUbication.classList.toggle("dark-mode");
    iconDistance.classList.toggle("dark-mode");
  };

  return (
    <>
      <Container className="principal-container">
        {/* Contenedor grid */}
        <Grid container justifyContent="space-evenly">
          {/* Lista de notLiked*/}
          <Grid xs={3} className="shadow-border gridBox"
          >
            <List>
              {notLiked.map((perro) => (
                <ListItem className="list-item">
                  <Avatar
                    src={perro.imagen}
                    alt="Imagen Avatar"
                    style={{ marginRight: "10px" }}
                  />
                  {perro.nombre}
                  <Button onClick={() => moveToLiked(perro)}>Cambiar</Button>
                </ListItem>
              ))}
            </List>
          </Grid>

          {/* Perfil de perro */}
          <Grid xs={4} className=" grid-Box gridBox shadow-border">
            <Box className="div-header">
              <img
                className="side-icon"
                src={iconSetting}
                onClick={() => setDarkMode()}
              />
              <img className="logo" src={logo} alt="xd" />
              <img className="side-icon" src={iconChat} alt="" />
            </Box>
            <Divider />
            <Box className="container">
              <img
                className="img-perro"
                src={perro.imagen}
                alt="Imagen de perfil"
              />
              <h1 className="name-age">
                {perro.nombre}, {perro.edad}
              </h1>
              <h3 className="ubication">{" "}<span className="icon-ubication">{" "}<img src="./src/img/icon-ubication.png" alt="Ubication" /></span>{" "}
                De {perro.ubicacion}
              </h3>
              <h3 className="distance">{" "}<span className="icon-distance">{" "}<img src="./src/img/icon-gps.png" alt="Distance" /></span>
                A {perro.distancia} de distancia
              </h3>
              <Divider />
              <div className="lorem">{perro.descripcion}</div>
              <Box className="btns">
                <div
                  className={`btn not-like ${buttonDeactivated ? "disabled" : ""}`}
                  onClick={() => giveNotLike(perro)}
                ></div>
                <div
                  className={`btn like ${buttonDeactivated ? "disabled" : ""}`}
                  onClick={() => giveLike(perro)}></div>
              </Box>
            </Box>
          </Grid>

          {/* Lista de liked */}
          <Grid xs={3} className="gridBox shadow-border">
            <List>
              {liked.map((perro) => (
                <ListItem className="list-item">
                  <Avatar
                    src={perro.imagen}
                    alt="Imagen Avatar"
                    style={{ marginRight: "10px" }}
                  />
                  {perro.nombre}
                  <Button onClick={() => moveToNotLiked(perro)}>Cambiar</Button>
                </ListItem>
              ))}
            </List>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default App;
