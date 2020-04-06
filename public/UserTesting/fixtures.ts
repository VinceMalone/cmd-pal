import listings from '../../data/netflix_titles.json';

export const netflixOptions = listings
  .map(listing => listing.title)
  .sort()
  .map(title => ({
    label: title,
    resolve: title,
  }));
