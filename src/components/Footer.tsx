import Image from "next/image"
import Link from "next/link"

const Footer = () => {
	return (
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
	)
}

export default Footer