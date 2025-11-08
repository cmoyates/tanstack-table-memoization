import { create } from "zustand";
import { Person, PersonSchema } from "@/lib/dataModel";

interface PersonStoreState {
	persons: Person[];
	addPerson: (person: Person) => void;
	addPersons: (persons: Person[]) => void;
	updatePerson: (person: Person) => void;
	removePerson: (id: string) => void;
	getPersonByID: (id: string) => Person | undefined;
	getAllPersons: () => Person[];
}

export const usePersonStore = create<PersonStoreState>((set, get) => {
	// #region Functions

	const addPerson = (
		person: Omit<Person, "id" | "createdAt" | "updatedAt">,
	) => {
		const parsed = PersonSchema.parse(person);

		set((state) => ({
			persons: [...state.persons, parsed],
		}));
	};

	const addPersons = (persons: Person[]) => {
		const newPersons = persons.map((data) => PersonSchema.parse(data));
		set((state) => ({
			persons: [...state.persons, ...newPersons],
		}));
	};

	const updatePerson = (person: Person) => {
		const updatedPerson: Person = PersonSchema.parse(person);
		set({
			persons: get().persons.map((personFromStore) =>
				personFromStore.id === updatedPerson.id
					? updatedPerson
					: personFromStore,
			),
		});
	};

	const removePerson = (id: string) => {
		const personsFromStore = get().persons;

		set({
			persons: personsFromStore.filter(
				(personFromStore) => personFromStore.id !== id,
			),
		});
	};

	const getPersonByID = (id: string) => {
		const personsFromStore = get().persons;
		const personFromID = personsFromStore.find((person) => person.id === id);
		if (!personFromID) {
			throw new Error(`Person with ID ${id} not found`);
		}
		return personFromID;
	};

	const getAllPersons = () => get().persons;

	// #endregion Functions

	return {
		persons: [],
		addPerson,
		addPersons,
		updatePerson,
		removePerson,
		getPersonByID,
		getAllPersons,
	};
});
