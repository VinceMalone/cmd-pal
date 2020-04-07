import faker from 'faker/locale/en';

import listings from '../../data/netflix_titles.json';

faker.seed(1);

export const branches = Array.from({ length: 30 }, () => ({
  name: faker.system.fileName(),
}));

export const netflixOptions = listings
  .map(listing => listing.title)
  .sort()
  .map(title => ({
    label: title,
    resolve: title,
  }));
