import React from 'react';
import { Dragao } from 'typings/api';

interface ContextType {
  dragoes: Dragao[];
  setDragoes: React.Dispatch<React.SetStateAction<Dragao[]>>;
}

const DragoesContext = React.createContext<ContextType>({
  dragoes: [],
  setDragoes: (state: Dragao[]): any => state
});

export default DragoesContext;
