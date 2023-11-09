export const metadata = {
    title: "Proyecto Cloud Computing",
    description: "The layout of the app",
};

export default function RootLayout({ children }) {
    return (
        <html>
            <body>
                <div id="root">{children}</div>
            </body>
        </html>
    );
}