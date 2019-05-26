// Object destructuring

const person = {
  name: 'Nico',
  age: 26,
  location: {
    city: 'Buenos Aires',
    temp: 15
  }
};

const {name = 'Anónimo', age } = person;

const { city, temp: temperature} = person.location

console.log(`${name} is ${age} years old and lives in ${city} and its ${temperature} degrees`);


// Array Destructuring

const address = ['Lavalleja 152', 'Buenos Aires', 'Argentina', 'C1414'];

const [ , province = 'HOOLA', ,zip = 'AAAA'] = address;

console.log(`You are in ${zip} ${province}`);