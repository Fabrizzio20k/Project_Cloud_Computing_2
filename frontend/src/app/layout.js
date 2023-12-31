import Navbar from "@/components/Navbar";
import Background from "@/components/Background";
import './globals.css';

export const metadata = {
    title: "Proyecto Cloud Computing",
    description: "The layout of the app",
};

export default function RootLayout({ children }) {
    return (
        <html>
            <body>
                <Navbar />
                <Background>
                    {children}
                </Background>
            </body>
        </html>
    );
}