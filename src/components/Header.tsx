import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs"
import Link from "next/link"
import { Button } from "./ui/button"
import { LogInIcon } from "lucide-react"

const Header = () => {
	return (
		<header className="w-full border-b py-4 mb-6">
			<div className="mx-auto max-w-6xl flex items-center justify-between px-4 sm:px-8">
				<h1 className="text-xl font-bold tracking-tight text-primary">
					Sistem Data Mahasiswa
				</h1>
				<nav className="flex items-center text-sm text-muted-foreground space-x-1">
					<SignedOut>
						<SignInButton mode="modal">
							<Button variant={'outline'}>
								<LogInIcon />
								Login
							</Button>
						</SignInButton>
						<SignUpButton mode="modal">
							<Button variant={'default'}>
								Sign Up
							</Button>
						</SignUpButton>
					</SignedOut>
					<SignedIn>
						<div className="mr-5">
							<Link href="/" className="hover:underline hover:underline-offset-4">
								Home
							</Link>
							<span>/</span>
							<span className="text-foreground">Dashboard</span>
						</div>
						<UserButton />
					</SignedIn>
				</nav>
			</div>
		</header>
	)
}

export default Header