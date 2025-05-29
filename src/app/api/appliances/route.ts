import { type NextRequest } from 'next/server';
import * as crypto from 'crypto';
import { v4 as uuidv4 } from 'uuid';

export interface Appliance {
  id: number;
  uid: string;
  brand: string;
  equipment: string;
}

const availableBrands = [
  'Whirlpool',
  'Admiral',
  'Electrolux',
  'Fagor',
  'Samsung',
  'Amana',
  'Siemens',
  'Thermador',
  'Maytag',
  'Bosch',
  'LG',
  'Haier',
  'Miele',
  'Fisher & Paykel',
  'AEG',
  'Panasonic',
  'Toshiba',
  'Philips',
  'Beko',
  'Whirlpool',
  'Hotpoint',
  'JennAir',
  'Kenmore',
  'Dacor',
  'Frigidaire',
  'Breville'
];

const availableEquipments = [
  'Trouser press',
  'Exhaust hood',
  'Garbage disposal unit',
  'Sewing machine',
  'Mousetrap',
  'Forced-air',
  'Oil heater',
  'Domestic robot',
  'Vacuum cleaner',
  'Solar water heater',
  'Evaporative cooler',
  'Dishwasher',
  'Humidifier',
  'Hob (hearth)',
  'Central vacuum cleaner',
  'Gas appliance',
  'Appliance plug',
  'Water cooker'
];

function getRandomBrand(): string {
  const randomInteger = crypto.randomInt(availableBrands.length);
  return availableBrands[randomInteger];
}

function getRandomEquipment(): string {
  const randomInteger = crypto.randomInt(availableEquipments.length);
  return availableEquipments[randomInteger];
}

function getRandomAppliance(): Appliance {
  return {
    id: crypto.randomInt(100000000),
    uid: uuidv4(),
    brand: getRandomBrand(),
    equipment: getRandomEquipment()
  };
}

function getRandomAppliances(numOfAppliances: number): Appliance | Array<Appliance> {
  if (numOfAppliances < 2) {
    return getRandomAppliance();
  }
  const listOfAppliances: Array<Appliance> = [];
  for (let i = 0; i < numOfAppliances; i++) {
    listOfAppliances.push(getRandomAppliance());
  }
  return listOfAppliances;
}

export function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const querySize = searchParams.get('size');
  const numOfAppliances = querySize && !isNaN(Number(querySize)) ? Number(querySize) : 1;
  const listOfAppliances = getRandomAppliances(numOfAppliances);
  return Response.json(listOfAppliances);
}
