import { Skeleton } from "@/components/ui/skeleton"
import { Input } from "./ui/input";
import { DropdownMenu, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { Button } from "./ui/button";

export const SkeletonTable = ({ columnCount, rowCount }: { columnCount: number; rowCount: number }) => {
	return (
		<div className="w-full">
			<div className="flex items-center py-4">
				<Input
					placeholder="Cari NIM mahasiswa..."
					className="max-w-sm"
				/>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="outline" className="ml-auto">
							Columns <ChevronDown />
						</Button>
					</DropdownMenuTrigger>
				</DropdownMenu>
			</div>
			<div className="rounded-md border">
				<div className="p-4 border-b">
					<Skeleton className="h-8 w-1/3" />
				</div>
				<div className="p-4 space-y-2">
					<div className="flex space-x-4">
						{Array.from({ length: columnCount }).map((_, i) => (
							<Skeleton key={i} className="h-4 w-96" />
						))}
					</div>

					{Array.from({ length: rowCount }).map((_, rowIdx) => (
						<div key={rowIdx} className="flex space-x-4 items-center">
							{Array.from({ length: columnCount }).map((_, colIdx) => (
								<Skeleton key={colIdx} className="h-8 w-96 rounded-md" />
							))}
						</div>
					))}
				</div>
			</div>
		</div>
	)
}
