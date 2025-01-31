import cron from "node-cron";
import { scrapeWebsite } from "../services/scraperService";

const scheduleScraper = () => {
    cron.schedule("15 9 * * *", async () => {
        console.log("⏳ Ejecutando scraping diario a las 9:15am...");
        try {
            await scrapeWebsite();
            console.log("✅ Scraping completado.");
        } catch (error) {
            console.error("❌ Error en el scraping:", error);
        }
    }, {
        timezone: "America/Caracas",
    });

    console.log("🕒 Cron job programado para ejecutarse todos los días a las 9:15am.");
};

export default scheduleScraper;