const Artist = require('../models/artist');

/**
 * Finds the lowest and highest age of artists in the Artist collection
 * @return {promise} A promise that resolves with an object
 * containing the min and max ages, like { min: 16, max: 45 }.
 */
module.exports = () => {
  // Never try to pull all the records form MongoDB to the Node environment
  // return Artist.find({})
  //   .sort({ age: 1 })
  //   .then(users => ({ min: users[0].age, max: users[users.length - 1].age }));

  const minQuery = Artist.find({})
    .sort({ age: 1 })
    // Instead, use limit() to get the first one
    .limit(1)
    .then(artists => artists[0].age);

  const maxQuery = Artist.find({})
    .sort({ age: -1 })
    .limit(1)
    .then(artists => artists[0].age);

  return Promise.all([minQuery, maxQuery])
    .then(([min, max]) => ({ min, max }));
};
