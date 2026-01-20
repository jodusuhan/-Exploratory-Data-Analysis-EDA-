import { DataPoint } from '../types';

export const irisDataset: DataPoint[] = [
  { sepal_length: 5.1, sepal_width: 3.5, petal_length: 1.4, petal_width: 0.2, species: 'setosa' },
  { sepal_length: 4.9, sepal_width: 3.0, petal_length: 1.4, petal_width: 0.2, species: 'setosa' },
  { sepal_length: 4.7, sepal_width: 3.2, petal_length: 1.3, petal_width: 0.2, species: 'setosa' },
  { sepal_length: 4.6, sepal_width: 3.1, petal_length: 1.5, petal_width: 0.2, species: 'setosa' },
  { sepal_length: 5.0, sepal_width: 3.6, petal_length: 1.4, petal_width: 0.2, species: 'setosa' },
  { sepal_length: 7.0, sepal_width: 3.2, petal_length: 4.7, petal_width: 1.4, species: 'versicolor' },
  { sepal_length: 6.4, sepal_width: 3.2, petal_length: 4.5, petal_width: 1.5, species: 'versicolor' },
  { sepal_length: 6.9, sepal_width: 3.1, petal_length: 4.9, petal_width: 1.5, species: 'versicolor' },
  { sepal_length: 5.5, sepal_width: 2.3, petal_length: 4.0, petal_width: 1.3, species: 'versicolor' },
  { sepal_length: 6.5, sepal_width: 2.8, petal_length: 4.6, petal_width: 1.5, species: 'versicolor' },
  { sepal_length: 6.3, sepal_width: 3.3, petal_length: 6.0, petal_width: 2.5, species: 'virginica' },
  { sepal_length: 5.8, sepal_width: 2.7, petal_length: 5.1, petal_width: 1.9, species: 'virginica' },
  { sepal_length: 7.1, sepal_width: 3.0, petal_length: 5.9, petal_width: 2.1, species: 'virginica' },
  { sepal_length: 6.3, sepal_width: 2.9, petal_length: 5.6, petal_width: 1.8, species: 'virginica' },
  { sepal_length: 6.5, sepal_width: 3.0, petal_length: 5.8, petal_width: 2.2, species: 'virginica' },
  { sepal_length: 5.4, sepal_width: 3.9, petal_length: 1.7, petal_width: 0.4, species: 'setosa' },
  { sepal_length: 4.6, sepal_width: 3.4, petal_length: 1.4, petal_width: 0.3, species: 'setosa' },
  { sepal_length: 5.0, sepal_width: 3.4, petal_length: 1.5, petal_width: 0.2, species: 'setosa' },
  { sepal_length: 4.4, sepal_width: 2.9, petal_length: 1.4, petal_width: 0.2, species: 'setosa' },
  { sepal_length: 4.9, sepal_width: 3.1, petal_length: 1.5, petal_width: 0.1, species: 'setosa' },
];

export const netflixDataset: DataPoint[] = [
  { type: 'Movie', title: 'The Irishman', director: 'Martin Scorsese', release_year: 2019, duration: 209, rating: 'R', country: 'USA' },
  { type: 'Movie', title: 'Marriage Story', director: 'Noah Baumbach', release_year: 2019, duration: 137, rating: 'R', country: 'USA' },
  { type: 'TV Show', title: 'Stranger Things', director: 'The Duffer Brothers', release_year: 2016, duration: 4, rating: 'TV-14', country: 'USA' },
  { type: 'Movie', title: 'Roma', director: 'Alfonso Cuarón', release_year: 2018, duration: 135, rating: 'R', country: 'Mexico' },
  { type: 'TV Show', title: 'The Crown', director: 'Peter Morgan', release_year: 2016, duration: 6, rating: 'TV-MA', country: 'UK' },
  { type: 'Movie', title: 'Klaus', director: 'Sergio Pablos', release_year: 2019, duration: 96, rating: 'PG', country: 'Spain' },
  { type: 'TV Show', title: 'Ozark', director: 'Bill Dubuque', release_year: 2017, duration: 4, rating: 'TV-MA', country: 'USA' },
  { type: 'Movie', title: 'The Two Popes', director: 'Fernando Meirelles', release_year: 2019, duration: 125, rating: 'PG-13', country: 'UK' },
  { type: 'TV Show', title: 'Dark', director: 'Baran bo Odar', release_year: 2017, duration: 3, rating: 'TV-MA', country: 'Germany' },
  { type: 'Movie', title: 'Extraction', director: 'Sam Hargrave', release_year: 2020, duration: 116, rating: 'R', country: 'USA' },
  { type: 'TV Show', title: 'Money Heist', director: 'Álex Pina', release_year: 2017, duration: 5, rating: 'TV-MA', country: 'Spain' },
  { type: 'Movie', title: 'The Platform', director: 'Galder Gaztelu-Urrutia', release_year: 2019, duration: 94, rating: 'TV-MA', country: 'Spain' },
  { type: 'TV Show', title: 'Bridgerton', director: 'Chris Van Dusen', release_year: 2020, duration: 2, rating: 'TV-MA', country: 'USA' },
  { type: 'Movie', title: 'Bird Box', director: 'Susanne Bier', release_year: 2018, duration: 124, rating: 'R', country: 'USA' },
  { type: 'TV Show', title: 'The Witcher', director: 'Lauren Schmidt', release_year: 2019, duration: 3, rating: 'TV-MA', country: 'USA' },
  { type: 'Movie', title: 'Enola Holmes', director: 'Harry Bradbeer', release_year: 2020, duration: 123, rating: 'PG-13', country: 'USA' },
  { type: 'TV Show', title: 'Lupin', director: 'George Kay', release_year: 2021, duration: 2, rating: 'TV-14', country: 'France' },
  { type: 'Movie', title: 'The Trial of the Chicago 7', director: 'Aaron Sorkin', release_year: 2020, duration: 129, rating: 'R', country: 'USA' },
];

export const datasetDescriptions = {
  iris: 'Classic Iris flower dataset with measurements of sepal and petal dimensions for three species.',
  netflix: 'Sample Netflix content catalog with movies and TV shows information including type, director, release year, and ratings.',
};
