"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal, Trash } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import React, { useState } from "react"
import UpdateForm from "./UpdateForm"
import toast from "react-hot-toast"
import { deleteMahasiswa, updateMahasiswa } from "@/action/mahasiswa.action"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./ui/alert-dialog"


export type Mahasiswa = {
	id: string
	nim: string
	nama: string
	email: string
	fakultas: string
	jurusan: string
}

// export const columns: ColumnDef<Mahasiswa>[] = [
export const columns = (
	onUpdate: (updated: Mahasiswa) => void,
	onDelete: (id: string) => void
): ColumnDef<Mahasiswa>[] => [
	{
		id: "select",
		header: ({ table }) => (
			<Checkbox
				checked={
					table.getIsAllPageRowsSelected() ||
					(table.getIsSomePageRowsSelected() && "indeterminate")
				}
				onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
				aria-label="Select all"
			/>
		),
		cell: ({ row }) => (
			<Checkbox
				checked={row.getIsSelected()}
				onCheckedChange={(value) => row.toggleSelected(!!value)}
				aria-label="Select row"
			/>
		),
		enableSorting: false,
		enableHiding: false,
	},
	{
		accessorKey: "nim",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					NIM
					<ArrowUpDown />
				</Button>
			)
		},
		cell: ({ row }) => <div className="lowercase">{row.getValue("nim")}</div>,
	},
	{
		accessorKey: "nama",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					Nama
					<ArrowUpDown />
				</Button>
			)
		},
		cell: ({ row }) => <div className="capitalize">{row.getValue("nama")}</div>,
	},
	{
		accessorKey: "email",
		header: "Email",
		cell: ({ row }) => (
			<div className="text-muted-foreground">{row.getValue("email")}</div>
		),
	},
	{
		accessorKey: "fakultas",
		header: "Fakultas",
		cell: ({ row }) => (
			<div className="capitalize">{row.getValue("fakultas")}</div>
		),
	},
	{
		accessorKey: "jurusan",
		header: "Jurusan",
		cell: ({ row }) => (
			<div className="capitalize">{row.getValue("jurusan")}</div>
		),
	},
	{
		id: "actions",
		enableHiding: false,
		cell: ({ row }) => {
			const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false)
			const [isLoading, setIsLoading] = useState<boolean>(false)

			const mahasiswa = row.original
			const [updateDataMahasiswa, setUpdateDataMahasiswa] = useState<Mahasiswa>({ ...mahasiswa })

			const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
				const { id, value } = e.target

				setUpdateDataMahasiswa(prev => ({
					...prev,
					[id]: value
				}))
			}

			const handleUpdate = async () => {
				setIsLoading(true)

				try {
					const res = await updateMahasiswa(updateDataMahasiswa)

					if (res.success && res.data) {
						toast.success('Berhasil mengubah data mahasiswa', {
							duration: 4500,
							ariaProps: {
								role: 'status',
								"aria-live": 'polite'
							}
						})

						onUpdate(res.data)
					} else {
						toast.error(res.message, {
							duration: 4500,
							ariaProps: {
								role: 'alert',
								"aria-live": 'polite'
							}
						})
					}
				} catch (e: any) {
					console.error(e)

					toast.error('Gagal mengubah data mahasiswa', {
						duration: 4500,
						ariaProps: {
							role: 'alert',
							"aria-live": 'polite'
						}
					})
				} finally {
					setIsLoading(false)
				}
			}

			const handleDelete = async (id: string) => {
				const toastID = toast.loading("Menghapus...")

				try {
					const res = await deleteMahasiswa(id)

					if (res.success) {
						toast.success(res.message, {
							id: toastID,
							duration: 4500,
							ariaProps: {
								role: 'status',
								"aria-live": 'polite'
							}
						})

						onDelete(id)
					} else {
						toast.error(res.message, {
							id: toastID,
							duration: 4500,
							ariaProps: {
								role: 'alert',
								"aria-live": 'polite'
							}
						})
					}
				} catch (error) {
					console.error(error)

					toast.error('Internal Server Error', {
						duration: 3000,
						ariaProps: {
							role: 'status',
							"aria-live": 'polite'
						}
					})
				}
			}

			return (
				<DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" className="h-8 w-8 p-0">
							<span className="sr-only">Open menu</span>
							<MoreHorizontal />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuLabel>Actions</DropdownMenuLabel>
						<DropdownMenuItem onClick={() => navigator.clipboard.writeText(mahasiswa.nim)}>
							Salin NIM Mahasiswa
						</DropdownMenuItem>
						<DropdownMenuSeparator />

						<UpdateForm
							updateMahasiswa={updateDataMahasiswa}
							isLoading={isLoading}
							handleChange={handleChange}
							handleSubmit={handleUpdate}
						/>

						<AlertDialog>
							<AlertDialogTrigger className="flex items-center gap-2 text-sm px-2 py-1.5 hover:bg-gray-100 rounded-sm w-full">
								<Trash className="text-red-500 size-4" />
								<span className="text-red-500 uppercase font-semibold">Delete</span>
							</AlertDialogTrigger>
							<AlertDialogContent>
								<AlertDialogHeader>
									<AlertDialogTitle>Apakah anda benar-benar yakin?</AlertDialogTitle>
									<AlertDialogDescription>Aksi ini tidak akan dapat dibatalkan. Data mahasiswa tersebut akan hilang secara permanen.</AlertDialogDescription>
								</AlertDialogHeader>
								<AlertDialogFooter>
									<AlertDialogCancel>Cancel</AlertDialogCancel>
									<AlertDialogAction asChild>
										<Button 
											className="bg-red-500 hover:bg-red-600 transition duration-300"
											onClick={() => handleDelete(mahasiswa.id)}	
										>
											Delete
										</Button>
									</AlertDialogAction>
								</AlertDialogFooter>
							</AlertDialogContent>
						</AlertDialog>

					</DropdownMenuContent>
				</DropdownMenu>
			)
		},
	},
]