import { type NextRequest } from 'next/server';
import * as crypto from 'crypto';
import { v4 as uuidv4 } from 'uuid';

export interface Car {
  id: number;
  uid: string;
  carBrand: string;
  typeOfCar: string;
}

const availableCarBrands = [
  'Abarth',
  'Alfa Romeo',
  'Aston Martin',
  'Audi',
  'Bentley',
  'BMW',
  'Bugatti',
  'Cadillac',
  'Chevrolet',
  'Chrysler',
  'Citroën',
  'Corvette',
  'Dacia',
  'Daihatsu',
  'Dodge',
  'Ferrari',
  'Fiat',
  'Ford',
  'General Motors',
  'GMC',
  'Honda',
  'Hummer',
  'Hyundai',
  'Jaguar',
  'Jeep',
  'Kia',
  'Lamborghini',
  'Lancia',
  'Land Rover',
  'Lexus',
  'Maserati',
  'Mazda',
  'Mclaren',
  'Mercedes',
  'MG',
  'Mitsubishi',
  'Nissan',
  'Opel',
  'Peugeot',
  'Porsche',
  'Renault',
  'Rolls Royce',
  'Seat',
  'Skoda',
  'Volvo',
  'Volkswagen'
];

const availableTypesOfCars = [
  'Sedan',
  'Hatchback',
  'Coupe',
  'SUV',
  'Sports car',
  'Convertible',
  'Crossover',
  'Muscle Car',
  'Station wagon',
  'Pickup Truck',
  'Minivan',
  'Spyder',
  'Hot hatch',
  'Limousine',
  'UTE',
  'Pony car',
  'Sports sedan',
  'Military Vehicle',
  'Dragster'
];

function getRandomCarBrand(): string {
  const randomInteger = crypto.randomInt(availableCarBrands.length);
  return availableCarBrands[randomInteger];
}

function getRandomTypeOfCar(): string {
  const randomInteger = crypto.randomInt(availableTypesOfCars.length);
  return availableTypesOfCars[randomInteger];
}

function getRandomCar(): Car {
  return {
    id: crypto.randomInt(100000000),
    uid: uuidv4(),
    carBrand: getRandomCarBrand(),
    typeOfCar: getRandomTypeOfCar()
  };
}

function getRandomCars(numOfCars: number): Car | Array<Car> {
  if (numOfCars < 2) {
    return getRandomCar();
  }
  const listOfCars: Array<Car> = [];
  for (let i = 0; i < numOfCars; i++) {
    listOfCars.push(getRandomCar());
  }
  return listOfCars;
}

export function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const querySize = searchParams.get('size');
  const numOfCars = querySize && !isNaN(Number(querySize)) ? Number(querySize) : 1;
  const listOfCars = getRandomCars(numOfCars);
  return Response.json(listOfCars);
}
