import DirectorWizard from "@/components/director/DirectorWizard";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Director Admin Mode | SingitPop",
    description: "Video Prompt Generator",
};

export default function DirectorPage() {
    return <DirectorWizard />;
}
