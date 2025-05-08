"use client"

import Image from "next/image";
import { DataTable } from "@/components/DataTable";
import { columns, Mahasiswa } from "@/components/Columns";
import AddNewMahasiswa from "@/components/AddNewMahasiswa";
import { useEffect, useState } from "react";
import { getMahasiswa } from "@/action/mahasiswa.action";
import toast from "react-hot-toast";
import Link from "next/link";
import { SkeletonTable } from "@/components/SkeletonLoader";

const Home = () => {
	const [dataMahasiswa, setDataMahasiswa] = useState<Mahasiswa[]>([])
	const [isLoading, setIsLoading] = useState<boolean>(true)

	useEffect(() => {
		const fetchData = async () => {
			const res = await getMahasiswa()

			if (res.success) {
				setDataMahasiswa(res.data!)
			} else {
				toast.error("Gagal mengambil data mahasiswa", {
					duration: 3000,
					ariaProps: {
						role: 'alert',
						"aria-live": 'polite'
					}
				})
			}

			setIsLoading(false)
		}

		fetchData()
	}, [])

	const onAddMahasiswa = (newData: Mahasiswa) => {
		setDataMahasiswa(prev => ([
			...prev,
			newData
		]))
	}

	const onUpdateMahasiswa = (updatedData: Mahasiswa) => {
		setDataMahasiswa(prev =>
			prev.map(obj => obj.id === updatedData.id ? updatedData : obj)
		)
	}

	const onDeleteMahasiswa = (id: string) => {
		setDataMahasiswa(prev =>
			prev.filter(obj => obj.id !== id)
		)
	}

	return (
		<div className="mx-auto max-w-6xl">
			<div className="w-full">
				<AddNewMahasiswa onSuccess={onAddMahasiswa} />
				{isLoading ? (
					<SkeletonTable
						columnCount={6}
						rowCount={7}
					/>
				) : (
					<DataTable
						data={dataMahasiswa}
						columns={columns(onUpdateMahasiswa, onDeleteMahasiswa)}
					/>
				)}
			</div>
		</div>
	);
}

export default Home
