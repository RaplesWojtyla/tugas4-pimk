"use client"

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Loader2Icon } from "lucide-react";
import type { Mahasiswa } from "./Columns";
import { useState } from "react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./ui/alert-dialog";
import { createMahasiswa } from "@/action/mahasiswa.action";
import toast from 'react-hot-toast'
import { useAuth } from "@clerk/nextjs";


const AddNewMahasiswa = ({ onSuccess } : { onSuccess: (newData: Mahasiswa) => void }) => {
	const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)
	const [newMahasiswa, setNewMahasiswa] = useState<Omit<Mahasiswa, 'id'>>({
		nim: "",
		nama: "",
		email: "",
		fakultas: "",
		jurusan: "",
	})
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const { isSignedIn } = useAuth()

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { id, value } = e.target
		setNewMahasiswa(prev => ({
			...prev,
			[id]: value
		}))
	}

	const handleSubmit = async () => {
		const isAnyEmptyFields = Object.values(newMahasiswa).some(val => val.trim() === '')

		if (isAnyEmptyFields) {
			toast.error('Harap mengisi seluruh field.', {
				duration: 4500,
				ariaProps: {
					role: 'alert',
					"aria-live": 'polite'
				}
			})
			return
		}

		setIsLoading(true)
		const res = await createMahasiswa(newMahasiswa)

		if (res.success && res.data) {
			toast.success(res.message, {
				duration: 4500,
				ariaProps: {
					role: 'status',
					"aria-live": 'polite'
				}
			})

			onSuccess(res.data)

			setNewMahasiswa({
				nim: "",
				nama: "",
				email: "",
				fakultas: "",
				jurusan: ""
			})
			setIsDialogOpen(false)
		} else {
			toast.error(res.message, {
				duration: 4500,
				ariaProps: {
					role: 'status',
					"aria-live": 'polite'
				}
			})
		}

		setIsLoading(false)
	}

	const inputType = [
		{ label: "NIM", id: "nim", type: "text" },
		{ label: "Nama Lengkap", id: "nama", type: "text" },
		{ label: "Email", id: "email", type: "email" },
		{ label: "Fakultas", id: "fakultas", type: "text" },
		{ label: "Jurusan", id: "jurusan", type: "text" }
	]


	return (
		<div className="flex justify-end mb-5">
			<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
				<DialogTrigger asChild>
					<Button className="bg-green-500 hover:bg-green-600 transition duration-300" disabled={!isSignedIn}>
						Tambah Mahasiswa
					</Button>
				</DialogTrigger>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Tambahkan Data Mahasiswa</DialogTitle>
						<DialogDescription>
							Tambahkan data mahasiswa baru.
						</DialogDescription>
					</DialogHeader>
					<div className="grid gap-4 py-4">
						{inputType.map(obj => (
							<div key={obj.id} className="grid grid-cols-4 items-center gap-4">
								<Label htmlFor={obj.id} className="text-right">
									{obj.label}
								</Label>
								<Input
									id={obj.id}
									type={obj.type}
									value={(newMahasiswa as any)[obj.id]}
									onChange={handleChange}
									className="col-span-3"
									required
								/>
							</div>
						))}
					</div>
					<Alert className="text-yellow-400 border-yellow-300  mt-5">
						<AlertCircle className="size-4" />
						<AlertTitle>Warning!</AlertTitle>
						<AlertDescription className="text-yellow-500">
							Harap pastikan mengisi data mahasiswa dengan benar.
						</AlertDescription>
					</Alert>
					<DialogFooter className="mt-5">
						<Button variant={'outline'} onClick={() => setIsDialogOpen(prev => !prev)}>
							Cancel
						</Button>
						<AlertDialog>
							<AlertDialogTrigger asChild>
								<Button 
									className="bg-green-500 hover:bg-green-600 transition duration-300" 
									disabled={isLoading}
								>
									{isLoading ? (
										<Loader2Icon className="size-4 animate-spin" />
									) : "Simpan" }
								</Button>
							</AlertDialogTrigger>
							<AlertDialogContent>
								<AlertDialogHeader>
									<AlertDialogTitle>Apakah anda sudah benar-benar yakin?</AlertDialogTitle>
									<AlertDialogDescription>
										Tindakan ini tidak dapat dibatalkan.
									</AlertDialogDescription>
								</AlertDialogHeader>
								<AlertDialogFooter>
									<AlertDialogCancel>Cancel</AlertDialogCancel>
									<AlertDialogAction asChild>
										<Button 
											className="bg-green-500 hover:bg-green-600 transition duration-300"
											type="submit"
											onClick={handleSubmit}
										>
											Continue
										</Button>
									</AlertDialogAction>
								</AlertDialogFooter>
							</AlertDialogContent>
						</AlertDialog>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	)
}

export default AddNewMahasiswa