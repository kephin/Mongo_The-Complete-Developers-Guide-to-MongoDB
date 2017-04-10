const Artist = require('../models/artist');

/**
 * Searches through the Artist collection
 * @param {object} criteria An object with a name, age, and yearsActive
 * @param {string} sortProperty The property to sort the results by
 * @param {integer} offset How many records to skip in the result set
 * @param {integer} limit How many records to return in the result set
 * @return {promise} A promise that resolves with the artists, count, offset, and limit
 */
module.exports = (criteria, sortProperty, offset = 0, limit = 20) => {
  const ageRange = require('./GetAgeRange');
  const yearsActiveRange = require('./GetYearsActiveRange');

  return Promise.all([ageRange(), yearsActiveRange(), Artist.count()])
    .then(([ageRange, yearsActiveRange, count]) => {
      return Artist.find({
          age: {
            $gte: criteria.age ? criteria.age.min : ageRange.min,
            $lte: criteria.age ? criteria.age.max : ageRange.max,
          },
          yearsActive: {
            $gte: criteria.yearsActive ? criteria.yearsActive.min : yearsActiveRange.min,
            $lte: criteria.yearsActive ? criteria.yearsActive.max : yearsActiveRange.max,
          },
        })
        .sort({
          [sortProperty]: 1,
        })
        .skip(offset)
        .limit(limit)
        .then(all => ({ all, count, offset, limit }));
    });
};
