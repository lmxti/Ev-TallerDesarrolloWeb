// Hoja de estilo importada
import "./styles/App.css";

// Hooks importados
import { useEffect, useState } from "react";

// Importacion de componentes
import { Box, Container, Divider } from "@mui/material";
import ProfileModal from "./components/profile-modal.jsx";

// Query
import { useGetDog } from "./querys/query.jsx";



//  Librerias importadas
import dogNames from "dog-names";
import LoremIpsum from "react-lorem-ipsum";
import axios from "axios";

// Imagenes importadas  importados
import logo from "./img/logo.png";
import iconSun from "../src/img/icon-sun.png";
import iconChat from "../src/img/icon-chat.png";
import iconUbication from "../src/img/icon-ubication.png";
import iconDistance from "../src/img/icon-gps.png";

function App() {
  // Seteo de perro y sus propiedades
  const [perro, setPerro] = useState({
    nombre: "",
    imagen: "",
    edad: "",
    ubicacion: "",
    descripcion: "",
  });
  // Seteo de listado de perros 'liked'
  const [liked, setLiked] = useState([]);
  // Seteo de listado de perros 'notLiked'
  const [notLiked, setNotLiked] = useState([]);
  // Seteo de variables 'buttonDeactivated'
  const [buttonDeactivated, setButtonDesactivated] = useState(false);
  // Seteo de variable 'loading'
  const [loading, setLoading] = useState(false);

  // Ubicaciones posibles
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
  // Distancias posibles
  const distancias = ["1km", "2km", "3km", "4km", "5km", "6km", "7km", "8km"];

  // Funcion para obtener perro y setear perro (Nombre y foto aleatoria)
  const getPerro = () => {
    setLoading(true);
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
            avgWordsPerSentence={3}
            avgSentencesPerParagraph={2}
          />
        ),
      });
    });
  };

  useEffect(() => {
    getPerro();
  }, []);

  const imageDog = document.getElementById("imageDog");

  // Funcion para agregar a listado de liked (perros que le gustaron)
  const giveLike = (perro) => {
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
    //  Push de perro a lista de gustados
    setLiked([perro, ...liked]);
    // Obtencion de nuevo perro
    getPerro();
  };

  const giveNotLike = (perro) => {
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
    // Push de perro a lista de no gustados
    setNotLiked([...notLiked, perro]);
    // Obtencion de nuevo perro
    getPerro();
  };

  // Funcion para cambiar de lista (liked a notLiked)
  const moveToNotLiked = (perro) => {
    setLiked(liked.filter((p) => p !== perro));
    setNotLiked([perro, ...notLiked]);
  };

  // Funcion para cambiar de lista (notLiked a liked)
  const moveToLiked = (perro) => {
    setNotLiked(notLiked.filter((p) => p !== perro));
    setLiked([perro, ...liked]);
  };

  const showDog = () => {
    return (
      <Box className="profile-container">
        <Box className="profile-picture">
          {loading && <div id="loader"></div>}
          <img
            id="imageDog"
            src={perro.imagen}
            alt={`Foto de perfil de ${perro.nombre}`}
          />
        </Box>
        <Box className="profile-body">
          <Box className="profile-info">
            {perro.nombre}, {perro.edad}
          </Box>

          <Box className="profile-ubication">
            <Box className="ubication">
              <img src={iconUbication} alt="Ubication" />
              De {perro.ubicacion}
            </Box>
            <Box className="distance">
              <img src={iconDistance} />A {perro.distancia} de distancia
            </Box>
          </Box>
          <Divider />
          <Box>
            <div className="lorem">{perro.descripcion}</div>
          </Box>
          <Box className="buttons">
            <div
              className={`btn noLike ${buttonDeactivated ? "disabled" : ""}`}
              onClick={() => giveNotLike(perro)}
            />
            <div
              className={`btn like ${buttonDeactivated ? "disabled" : ""}`}
              onClick={() => giveLike(perro)}
            />
          </Box>
        </Box>
      </Box>
    );
  };


  // const { data: InfoPerro, isLoading: cargando, refetch: recargar, isError: error} = useGetDog();

  // console.log(InfoPerro);


  return (
    <>
      <Container>
        <Box className="contenedor-principal">
          {/* Columna principal */}
          <Box className="column profile">
            <Box className="profile-header">
              <img className="side-icon" src={iconSun} alt="Icon Dark theme" />
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
                {liked.map((perro) => (
                  <li key={perro.nombre}>
                    <img src={perro.imagen} alt="Avatar perro" />
                    <h2>{perro.nombre}</h2>
                    <button
                      title="Cambiar a lista contraria"
                      className="btn-change right"
                      onClick={() => moveToNotLiked(perro)}
                    />
                    <ProfileModal datos={perro}></ProfileModal>
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
                {notLiked.map((perro) => (
                  <li>
                    <img src={perro.imagen} alt="Avatar perro" />
                    <h2>{perro.nombre}</h2>
                    <button
                      title="Cambiar a lista contraria"
                      className="btn-change left"
                      onClick={() => moveToLiked(perro)}
                    />
                    <ProfileModal datos={perro}></ProfileModal>
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
