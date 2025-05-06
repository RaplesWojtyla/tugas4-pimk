import React, { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Button } from "./ui/button"
import { Mahasiswa } from "./Columns"
import { Loader2 } from "lucide-react"

const UpdateForm = ({
	updateMahasiswa,
	isLoading,
	handleChange,
	handleSubmit
}: {
	updateMahasiswa: Mahasiswa,
	isLoading: boolean,
	handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
	handleSubmit: () => void
}) => {
	const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)

	const inputType = [
		{ label: "NIM", id: "nim", type: "text" },
		{ label: "Nama Lengkap", id: "nama", type: "text" },
		{ label: "Email", id: "email", type: "email" },
		{ label: "Fakultas", id: "fakultas", type: "text" },
		{ label: "Jurusan", id: "jurusan", type: "text" }
	]

	return (
		<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
			<DialogTrigger className="text-sm px-2 py-1.5 hover:bg-gray-100 rounded-sm">Update Data Mahasiswa</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Update Data Mahasiswa</DialogTitle>
					<DialogDescription>Ubah data mahasiswa disini.</DialogDescription>
				</DialogHeader>
				<div className="grid gap-4 py-4">
					{inputType.map(obj => (
						<div key={obj.id} className="grid grid-cols-4 items-center gap-4">
							<Label htmlFor={obj.id} className="text-right">
								{obj.label}
							</Label>
							<Input
								className="col-span-3"
								id={obj.id}
								type={obj.type}
								value={(updateMahasiswa as any)[obj.id]}
								onChange={handleChange}
							/>
						</div>
					))}
				</div>
				<DialogFooter>
					<Button
						className="bg-green-500 hover:bg-green-600 transition duration-300" 
						type="submit" 
						onClick={handleSubmit}
					>
						{isLoading ? (
							<Loader2 className="animate-spin size-4" />
						) : "Simpan Perubahan" }
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}

export default UpdateForm