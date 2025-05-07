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
		<div className="flex flex-col min-h-screen p-4 sm:p-8 font-[family-name:var(--font-geist-sans)]">
			<header className="w-full border-b py-4 mb-6">
				<div className="mx-auto max-w-6xl flex items-center justify-between px-4 sm:px-8">
					<h1 className="text-xl font-bold tracking-tight text-primary">
						Sistem Data Mahasiswa
					</h1>
					<nav className="flex items-center text-sm text-muted-foreground space-x-1">
						<Link href="/" className="hover:underline hover:underline-offset-4">
							Home
						</Link>
						<span>/</span>
						<span className="text-foreground">Dashboard</span>
					</nav>
				</div>
			</header>

			<main className="flex-1 w-full overflow-auto">
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
			</main>


			<footer className="mt-8 flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
				<p>© {new Date().getFullYear()} Patra Rafles Wostyla Sinaga. All rights reserved.</p>
				<Link
					href="https://github.com/RaplesWojtyla"
					target="_blank"
					rel="noopener noreferrer"
					className="flex items-center gap-2 hover:underline hover:underline-offset-4"
				>
					<Image
						src="/github.png"
						alt="GitHub icon"
						width={16}
						height={16}
						aria-hidden
					/>
					GitHub
				</Link>
				<Link
					href="https://www.linkedin.com/in/wojtylakarma"
					target="_blank"
					rel="noopener noreferrer"
					className="flex items-center gap-2 hover:underline hover:underline-offset-4"
				>
					<Image
						src="/linkedin.png"
						alt="LinkedIn icon"
						width={16}
						height={16}
						aria-hidden
					/>
					LinkedIn
				</Link>
			</footer>
		</div>
	);
}

export default Home
