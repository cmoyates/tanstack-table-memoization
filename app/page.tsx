"use client";

import PersonsTable from "@/components/PersonsTable/PersonsTable";
import { makeData } from "@/lib/makeData";
import { usePersonStore } from "@/lib/stores/personStore";
import { useEffect } from "react";
import { useShallow } from "zustand/shallow";

export default function Home() {
	const [personsStoreInitialized] = usePersonStore(
		useShallow((state) => [state.initialized]),
	);

	useEffect(() => {
		if (!personsStoreInitialized) {
			usePersonStore.getState().addPersons(makeData(250));
		}
	}, []);

	return (
		<div className="bg-muted flex min-h-screen items-center justify-center font-sans">
			<main className="bg-card flex min-h-screen w-full max-w-4xl flex-col items-start justify-start gap-16 px-16 py-32 sm:items-start">
				<h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
					Tanstack Table Memoization
				</h1>
				<PersonsTable />
			</main>
		</div>
	);
}
