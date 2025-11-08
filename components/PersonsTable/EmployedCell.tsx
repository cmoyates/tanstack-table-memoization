import { PersonsTableRowData } from "@/lib/tables/personsTable";
import { CellContext } from "@tanstack/react-table";
import { Checkbox } from "../ui/checkbox";
import { usePersonStore } from "@/lib/stores/personStore";
import { useShallow } from "zustand/shallow";

type EmployedCellProps = CellContext<PersonsTableRowData, boolean>;

const EmployedCell = ({ getValue, row, table }: EmployedCellProps) => {
	const [updatePerson, getPersonByID] = usePersonStore(
		useShallow((state) => [state.updatePerson, state.getPersonByID]),
	);

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
					}
				}}
				checked={getValue()}
			/>
		</div>
	);
};

export default EmployedCell;
