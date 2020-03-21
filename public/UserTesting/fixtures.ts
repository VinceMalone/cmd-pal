import listings from '../../data/netflix_titles.json';

export const netflixChoices = listings
  .map(listing => listing.title)
  .sort()
  .map(title => ({
    label: title,
    resolve: title,
  }));
