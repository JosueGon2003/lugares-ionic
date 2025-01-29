export interface Comentario {
    id?: number;
    name: string;
    comentario: string;
    
  }

  export interface Lugar {
    id: number;
    titulo: string;
    imagen: string;
    comentarios?: Comentario [];
  }