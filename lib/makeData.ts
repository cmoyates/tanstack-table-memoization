import { faker } from "@faker-js/faker";
import { Person } from "./dataModel";

const range = (len: number) => {
	const array: number[] = [];
	for (let i = 0; i < len; i++) {
		array.push(i);
	}
	return array;
};

const newPerson = (index: number): Person => {
	return {
		id: faker.string.uuid(),
		index,
		avatar: faker.image.avatar(),
		name: faker.person.fullName(),
		age: faker.number.int({ min: 18, max: 80 }),
		email: faker.internet.email(),
		createdAt: faker.date.past(),
		employed: faker.datatype.boolean(),
	};
};

export function makeData(...lengths: number[]) {
	const makeDataLevel = (depth = 0): Person[] => {
		const length = lengths[depth]!;
		return range(length).map((_, index): Person => newPerson(index));
	};

	return makeDataLevel();
}
