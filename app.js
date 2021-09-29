const { data } = require('./data');
const count = process.argv;

if (count.includes('--count')) {
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
  }