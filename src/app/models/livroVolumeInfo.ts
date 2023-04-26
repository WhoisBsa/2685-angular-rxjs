import { Item } from "./interfaces";

export class LivroVolumeInfo {
  title?: string;
  authors?: string[];
  publisher?: string;
  publishedDate?: Date;
  description?: string;
  thumbnail: string;
  previewLink: string;

  constructor(livro: Item) {
    this.title = livro.volumeInfo?.title;
    this.authors = livro.volumeInfo?.authors;
    this.publishedDate = livro.volumeInfo?.publishedDate;
    this.publisher = livro.volumeInfo?.publisher;
    this.description = livro.volumeInfo?.description;
    this.previewLink = livro.volumeInfo?.previewLink;
    this.thumbnail = livro.volumeInfo?.imageLinks?.thumbnail;
  }
}
