import { PersonsTableRowData } from "@/lib/tables/personsTable";
import { CellContext } from "@tanstack/react-table";
import { Checkbox } from "../ui/checkbox";
import { usePersonStore } from "@/lib/stores/personStore";
import { useShallow } from "zustand/shallow";
import { useState } from "react";

type EmployedCellProps = CellContext<PersonsTableRowData, boolean>;

const EmployedCell = ({ getValue, row }: EmployedCellProps) => {
	const [updatePerson, getPersonByID] = usePersonStore(
		useShallow((state) => [state.updatePerson, state.getPersonByID]),
	);

	const [employed, setEmployed] = useState(getValue());

	return (
		<div>
			<Checkbox
				onCheckedChange={(checkedState) => {
					const person = getPersonByID(row.original.id);
					if (person) {
						updatePerson({
							...person,
							employed: Boolean(checkedState),
						});
						setEmployed(Boolean(checkedState));
					}
				}}
				checked={employed}
			/>
		</div>
	);
};

export default EmployedCell;
