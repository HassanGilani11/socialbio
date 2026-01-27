import Logo from "@/components/Logo";
import Header from "./_components/Header";
import connectToDatabase from "@/lib/db";
import SiteConfig from "@/schema/site-config";

export default async function Layout({ children }) {
    await connectToDatabase();
    const config = await SiteConfig.findOne();
    const siteName = config?.siteName || "MySocials";

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