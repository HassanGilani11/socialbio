"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default function AdminPage() {
    const { isLoaded, isSignedIn, user } = useUser();
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);
    const { toast } = useToast();

    const [formData, setFormData] = useState({
        heroTitle: "",
        heroDescription: "",
        siteName: "",
        githubText: "",
        githubLink: "",
    });

    useEffect(() => {
        if (isLoaded && !isSignedIn) {
            redirect("/sign-in");
        }

        if (isSignedIn) {
            fetch("/api/site-config")
                .then((res) => res.json())
                .then((data) => {
                    if (data.config) {
                        setFormData({
                            heroTitle: data.config.heroTitle || "",
                            heroDescription: data.config.heroDescription || "",
                            siteName: data.config.siteName || "",
                            githubText: data.config.githubText || "",
                            githubLink: data.config.githubLink || "",
                        });
                    }
                    setLoading(false);
                })
                .catch((err) => {
                    console.error(err);
                    setLoading(false);
                });
        }
    }, [isLoaded, isSignedIn]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setUpdating(true);
        try {
            const res = await fetch("/api/site-config", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                toast({
                    title: "Success",
                    description: "Site configuration updated successfully.",
                });
            } else {
                throw new Error("Failed to update");
            }
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Error",
                description: "Something went wrong.",
            });
        } finally {
            setUpdating(false);
        }
    };

    if (!isLoaded || loading) {
        return (
            <div className="h-screen grid place-content-center">
                <Loader2 className="w-8 h-8 animate-spin" />
            </div>
        );
    }

    if (!isSignedIn) return null; // Will redirect in useEffect

    return (
        <div className="max-w-4xl mx-auto py-10 px-6">
            <h1 className="text-3xl font-bold mb-8">Admin / Site Configuration</h1>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="siteName">Site Name (Logo)</Label>
                    <Input
                        id="siteName"
                        value={formData.siteName}
                        onChange={(e) => setFormData({ ...formData, siteName: e.target.value })}
                        placeholder="MySocials"
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="githubText">GitHub Button Text</Label>
                    <Input
                        id="githubText"
                        value={formData.githubText}
                        onChange={(e) => setFormData({ ...formData, githubText: e.target.value })}
                        placeholder="Contribute to this project on GitHub"
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="githubLink">GitHub Link URL</Label>
                    <Input
                        id="githubLink"
                        value={formData.githubLink}
                        onChange={(e) => setFormData({ ...formData, githubLink: e.target.value })}
                        placeholder="https://github.com/..."
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="heroTitle">Hero Title</Label>
                    <Textarea
                        id="heroTitle"
                        value={formData.heroTitle}
                        onChange={(e) => setFormData({ ...formData, heroTitle: e.target.value })}
                        className="min-h-[100px] text-lg font-medium"
                        placeholder="Enter the main headline..."
                    />
                    <p className="text-sm text-gray-500">Supports HTML for gradient text spans (advanced).</p>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="heroDescription">Hero Description</Label>
                    <Textarea
                        id="heroDescription"
                        value={formData.heroDescription}
                        onChange={(e) => setFormData({ ...formData, heroDescription: e.target.value })}
                        className="min-h-[100px]"
                        placeholder="Enter the sub-headline/description..."
                    />
                </div>

                <Button type="submit" disabled={updating}>
                    {updating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Save Changes
                </Button>
            </form>
        </div>
    );
}
