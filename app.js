const { data } = require('./data');
const count = process.argv;

const isCount = count.includes('--count');
const isFilter = count.findIndex((v) => v.includes('--filter='));

if (isCount && isFilter < 0) {
  const toDisplay = data.map((x) => {
    return {
      name: `${x.name} [${x.people.length}]`,
      people: x.people.map((y) => {
        return {
          name: `${y.name} [${y.animals.length}]`,
          animals: y.animals,
        };
      }),
    };
  });
  console.log(JSON.stringify(toDisplay));
} else if (isFilter >= 0 && !isCount) {
  const query = count[isFilter].split('=')[1];
  const toDisplay = data
    .map((x) => {
      const country = {
        name: x.name,
        people: x.people
          .map((y) => {
            const person = {
              name: y.name,
              animals: y.animals.filter((z) => z.name.includes(query)),
            };
            return person.animals.length ? person : false;
          })
          .filter((x) => x),
      };
      return country.people.length ? country : false;
    })
    .filter((x) => x);
  console.log(JSON.stringify(toDisplay));
} else {
  console.log('Unkown command provided!');
}