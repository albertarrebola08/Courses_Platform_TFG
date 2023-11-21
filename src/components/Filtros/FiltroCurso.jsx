


import React from 'react';
import { Select, SelectItem } from '@nextui-org/react';
import { RiFilter3Line } from 'react-icons/ri';

const FiltroCurso = ({ cursos, moduloData, onInputChange }) => {
    return (
      <div className="filtering-box flex gap-2 items-center">
        <div><RiFilter3Line className="text-2xl rounded-lg"/></div>
        <Select 
          id="filtro-cursos"
          name="curso_id"
          value={moduloData.curso_id}
          onChange={onInputChange}
          className="w-[20%]"
          placeholder="Tots els cursos"
          aria-label="Selecciona-curso"
        >
          {cursos.map(curso => (
            <SelectItem key={curso.id} value={curso.id}>
              {curso.nombre}
            </SelectItem>
          ))}
        </Select>
      </div>
    );
  };
  
  export default FiltroCurso;