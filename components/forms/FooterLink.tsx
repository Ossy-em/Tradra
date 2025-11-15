import Link from "next/link";

const FooterLink = ({ text, linkText, href }: FooterLinkProps) => {
   
      return (
        <p className="text-center text-sm text-gray-400 pt-4">
            {text}{' '}
            <Link 
                href={href} 
                className="text-white font-medium hover:text-gray-300 transition-colors underline-offset-4 hover:underline"
            >
                {linkText}
            </Link>
        </p>
    );
    
}
export default FooterLink