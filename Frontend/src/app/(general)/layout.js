
import Navbar from "../components/navigation/Navbar"
import Footer from "../components/Footer";

export default function RootLayout({children}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <Footer></Footer>
        {children}
      </body>
    </html>
  );
}
