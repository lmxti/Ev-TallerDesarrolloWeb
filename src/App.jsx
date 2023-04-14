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
  const [perro, setPerro] = useState({ nombre: "", imagen: "", edad: "" });
  // Seteo de listado de perros que le gustaron
  const [liked, setLiked] = useState([]);
  // Seteo de listado de perros que no le gustaron
  const [notLiked, setNotLiked] = useState([]);

  // 
  const [loading, setLoading] = useState(true);

  // Funcion para obtener perro y setear perro (Nombre y foto aleatoria)
  const getPerro = () => {
    setLoading(true);
    axios.get("https://dog.ceo/api/breeds/image/random").then((response) => {
      setPerro({
        nombre: dogNames.allRandom(),
        imagen: response.data.message,
        edad : Math.round(Math.random() * 4) + 1,
      });
      setLoading(false);
    });
  };

  // Obtencion de perro al cargar la pagina
  useEffect(() => {
    getPerro();
  }, []);

  // Funcion para agregar a listado de liked (perros que le gustaron)
  const giveLike = (perro) => {
    //  Push de perro a lista de gustados
    setLiked([...liked, perro]);
    // Obtencion de nuevo perro
    getPerro();
  };

  // Funcion para agregar a listado de notLiked (perros que no le gustaron)
  const giveNotLike = (perro) => {
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
  
  return (
    <>
      <Container
        style={{
          backgroundColor: "whitesmoke",
          marginTop: "100px",
          padding: "50px",
        }}
      >
        {/* Contenedor grid */}
        <Grid container justifyContent="space-evenly">
          {/* Lista de notLiked*/}
          <Grid
            bgcolor={"#fff"}
            color={"black"}
            xs={3}
            className="shadow-border"
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
          <Grid
            bgcolor={"#fff"}
            item
            xs={4}
            className=" box-perfil shadow-border "
          >
            <Box className="div-header">
              <img className="side-icon" src={iconSetting}></img>
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
              <Divider />
              <div className="lorem">
                <LoremIpsum
                  random
                  startWithLoremIpsum={false}
                  avgWordsPerSentence={2}
                  avgSentencesPerParagraph={1}
                />
              </div>
              <Box className="btns">
                <div
                  className="btn not-like"
                  onClick={() => giveNotLike(perro)}
                ></div>
                <div
                  className="btn like"
                  onClick={() => giveLike(perro)}
                  ></div>
              </Box>
            </Box>
          </Grid>

          {/* Lista de liked */}
          <Grid
            bgcolor={"#fff"}
            color={"black"}
            xs={3}
            className="shadow-border"
          >
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
