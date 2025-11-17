export interface IAnimeModel {
  success: boolean;
  status: number;
  count: number;
  id: string;
  colors: Colors;
  image: Image;
  metadata: Metadata;
  category: string;
  tags: string[];
  rating: string;
  anime: Anime;
  source: Source;
  attribution: Attribution;
}


export interface Attribution {
  artist: Artist;
  copyright: string;
}

export interface Artist {
  username: string;
  profile: string;
}

export interface Source {
  url: string;
  direct: string;
}

export interface Anime {
  title?: any;
  character?: any;
}

export interface Metadata {
  original: Original2;
  compressed: Original2;
}

export interface Original2 {
  width: number;
  height: number;
  size: number;
  extension: string;
}

export interface Image {
  original: Original;
  compressed: Original;
}

export interface Original {
  url: string;
  extension: string;
}

export interface Colors {
  main: string;
  palette: string[];
}