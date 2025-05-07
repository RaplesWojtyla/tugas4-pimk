"use server"

import { Mahasiswa } from "@/components/Columns";
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";



export const createMahasiswa = async (mahasiswa: Omit<Mahasiswa, 'id'>) => {
	try {
		const newMahasiswa: Mahasiswa = await prisma.mahasiswa.create({
			data: {
				nim: mahasiswa.nim,
				nama: mahasiswa.nama,
				email: mahasiswa.email,
				fakultas: mahasiswa.fakultas,
				jurusan: mahasiswa.jurusan,
			}
		})

		revalidatePath('/')
		return {
			success: true,
			status: 200,
			message: "Berhasil Menambahkan Data Mahasiswa",
			data: newMahasiswa
		}
	} catch (error: any) {
		console.error(`Gagal menambahkan data mahasiswa: ${error}`)

		if (error instanceof Prisma.PrismaClientKnownRequestError) {
			if (error.code === 'P2002') {
				return {
					success: false,
					status: 409,
					message: `Data ${error.meta ? (error.meta.target as Array<string>)[0].toUpperCase() : "NIM/Email"} mahasiswa telah ada`
				}
			}
		}

		return {
			success: false,
			status: 500,
			message: error?.message ?? "Internal Server Error"
		}
	}
}


export const getMahasiswa = async () => {
	try {
		const students = await prisma.mahasiswa.findMany({
			select: {
				id: true,
				nim: true,
				nama: true,
				email: true,
				fakultas: true,
				jurusan: true
			}
		})

		return {
			success: true,
			message: "Berhasil mengambil data mahasiswa",
			data: students
		}
	} catch (e) {
		console.error(e)

		return {
			success: false,
			message: "Gagal mengambil data mahasiswa"
		}
	}
}

export const updateMahasiswa = async (mahasiswa: Mahasiswa) => {
	try {
		const updated = await prisma.mahasiswa.update({
			where: {
				id: mahasiswa.id
			},
			data: {
				nim: mahasiswa.nim,
				nama: mahasiswa.nama,
				email: mahasiswa.email,
				fakultas: mahasiswa.fakultas,
				jurusan: mahasiswa.jurusan
			}
		})

		revalidatePath('/')

		return {
			success: true,
			status: 200,
			message: 'Berhasil merubah data mahasiswa',
			data: updated
		}
	} catch (error: any) {
		console.error(error)

		if (error instanceof Prisma.PrismaClientKnownRequestError) {
			if (error.code === 'P2002') {
				return {
					success: false,
					status: 409,
					message: `Data ${error.meta ? (error.meta.target as Array<string>)[0].toUpperCase() : "NIM/Email"} mahasiswa telah ada`
				}
			}
		}

		return {
			success: false,
			status: 500,
			message: 'Gagal merubah data mahasiswa'
		}
	}
}

export const deleteMahasiswa = async (id: string) => {
	try {
		await prisma.mahasiswa.delete({
			where: {
				id: id
			}
		})

		revalidatePath('/')

		return {
			success: true,
			status: 200,
			message: 'Berhasil menghapus data mahasiswa'
		}
	} catch (e: any) {
		console.error(e)

		return {
			success: false,
			status: 500,
			message: 'Gagal menghapus data mahasiswa.'
		}
	}
}
