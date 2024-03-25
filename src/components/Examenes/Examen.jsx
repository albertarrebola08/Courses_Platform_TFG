import React, { useState } from "react";

const Examen = ({ examen }) => {
  const [respuestasUsuario, setRespuestasUsuario] = useState({});

  const handleChangeRespuesta = (preguntaId, respuestaId) => {
    setRespuestasUsuario((prevRespuestas) => ({
      ...prevRespuestas,
      [preguntaId]: respuestaId,
    }));
  };

  const calcularNota = () => {
    let puntaje = 0;

    examen.preguntas.forEach((pregunta) => {
      const respuestaUsuario = respuestasUsuario[pregunta.id];
      if (respuestaUsuario !== undefined) {
        const respuestaCorrecta = pregunta.respuestas.find(
          (respuesta) => respuesta.esCorrecta
        );
        if (respuestaCorrecta.id === respuestaUsuario) {
          puntaje++;
        }
      }
    });

    // Puedes hacer cualquier ajuste en el puntaje aquí, como convertirlo a porcentaje o escala.
    return puntaje;
  };

  return (
    <div>
      <h2>Examen</h2>
      {examen.preguntas.map((pregunta) => (
        <div key={pregunta.id}>
          <p>{pregunta.enunciado}</p>
          <ul>
            {pregunta.respuestas.map((respuesta) => (
              <li key={respuesta.id}>
                <label>
                  <input
                    type={pregunta.tipo === "test" ? "radio" : "text"}
                    name={`pregunta-${pregunta.id}`}
                    value={respuesta.id}
                    onChange={() =>
                      handleChangeRespuesta(pregunta.id, respuesta.id)
                    }
                  />
                  {respuesta.texto}
                </label>
              </li>
            ))}
          </ul>
        </div>
      ))}
      <button onClick={() => alert(`Tu puntaje es: ${calcularNota()} puntos`)}>
        Finalizar Examen
      </button>
    </div>
  );
};

export default Examen;
