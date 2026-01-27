import mongoose from "mongoose";

const fileSchema = new mongoose.Schema(
    {
        heroTitle: {
            type: String,
        },
        heroDescription: {
            type: String,
        },
        heroImage: {
            type: String, // URL to the image
        },
        siteName: {
            type: String,
        },
        githubText: {
            type: String,
        },
        githubLink: {
            type: String,
        }
    },
    { timestamps: true }
);

const SiteConfig = mongoose.models.SiteConfig || mongoose.model("SiteConfig", fileSchema);

export default SiteConfig;
