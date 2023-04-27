import { useQuery } from "react-query";
import axios from "axios";
import dogNames from "dog-names";
import LoremIpsum from "react-lorem-ipsum";

export function useGetDog() {
  return useQuery(["getDog"], getDog, {
    retry: 0,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    keepPreviousData: false,
    enabled: true,
  });
}

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

export const getDog = async () => {
  const { data } = await axios.get("https://dog.ceo/api/breeds/image/random");
  return {
    nombre: dogNames.allRandom(),
    imagen: data.message,
    edad: Math.round(Math.random() * 4) + 1,
    ubicacion: ubicaciones[Math.floor(Math.random() * ubicaciones.length)],
    distancia: Math.floor(Math.random() * 10) + 1,
    descripcion: (
      <LoremIpsum
        startWithLoremIpsum={false}
        avgWordsPerSentence={3}
        avgSentencesPerParagraph={2}
      />
    ),
  };
};
