"use client";

import { PersonsTableRowData } from "@/lib/tables/personsTable";
import {
	createColumnHelper,
	flexRender,
	getCoreRowModel,
	useReactTable,
} from "@tanstack/react-table";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { usePersonStore } from "@/lib/stores/personStore";
// import { useShallow } from "zustand/shallow";
import EmployedCell from "./EmployedCell";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { useState } from "react";

type Props = {};

const columnHelper = createColumnHelper<PersonsTableRowData>();

const columns = [
	columnHelper.accessor("index", {
		header: undefined,
		cell: (info) => info.getValue() + 1,
	}),
	columnHelper.accessor("avatar", {
		header: "Avatar",
		cell: (info) => (
			<Avatar>
				<AvatarImage src={info.getValue()} />
			</Avatar>
		),
	}),
	columnHelper.accessor("name", {
		header: "Name",
		cell: (info) => info.getValue(),
	}),
	columnHelper.accessor("age", {
		header: "Age",
		cell: (info) => info.getValue(),
	}),
	columnHelper.accessor("email", {
		header: "Email",
		cell: (info) => info.getValue(),
	}),
	columnHelper.accessor("employed", {
		header: "Employed",
		cell: EmployedCell,
	}),
];

const TanstackTable = (props: Props) => {
	// const [persons] = usePersonStore(useShallow((state) => [state.persons]));

	const [data, setData] = useState(usePersonStore.getState().persons);

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
	});

	return (
		<>
			<div className="flex flex-row items-center justify-center gap-2">
				<Button
					onClick={() => {
						const personsFromStore = usePersonStore.getState().persons;

						console.log(personsFromStore);
					}}
				>
					Log Store
				</Button>
				<Button
					onClick={() => {
						const personsFromStore = usePersonStore.getState().persons;
						setData([...personsFromStore]);
					}}
				>
					Force Re-Render
				</Button>
			</div>
			<Table>
				<TableHeader>
					{table.getHeaderGroups().map((headerGroup) => (
						<TableRow key={headerGroup.id}>
							{headerGroup.headers.map((header) => (
								<TableHead key={header.id}>
									{header.isPlaceholder
										? null
										: flexRender(
												header.column.columnDef.header,
												header.getContext(),
											)}
								</TableHead>
							))}
						</TableRow>
					))}
				</TableHeader>
				<TableBody>
					{table.getRowModel().rows?.length ? (
						table.getRowModel().rows.map((row) => (
							<TableRow
								key={row.id}
								data-state={row.getIsSelected() && "selected"}
							>
								{row.getVisibleCells().map((cell) => (
									<TableCell key={cell.id}>
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</TableCell>
								))}
							</TableRow>
						))
					) : (
						<TableRow>
							<TableCell colSpan={columns.length} className="h-24 text-center">
								No results.
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
		</>
	);
};

export default TanstackTable;
