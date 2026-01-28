import Logo from "@/components/Logo";
import Header from "./_components/Header";
import connectToDatabase from "@/lib/db";
import SiteConfig from "@/schema/site-config";

export default async function Layout({ children }) {
    let siteName = "MySocials";
    try {
        await connectToDatabase();
        const config = await SiteConfig.findOne();
        siteName = config?.siteName || "MySocials";
    } catch (error) {
        console.error("UserLayout: Failed to fetch site config:", error.message);
    }


    return (
        <main>
            <Header siteName={siteName} />
            {children}
            <div className="mt-20 mb-8 grid place-content-center text-center">
                <Logo siteName={siteName} />
                <p className="text-xs">An Open Source Project by <a href="https://github.com/HassanGilani11">syedhassan</a></p>

            </div>
        </main>
    )
}