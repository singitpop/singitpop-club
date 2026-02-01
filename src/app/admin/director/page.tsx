import DirectorWizard from "@/components/director/DirectorWizard";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Director Mode Ultra | SingitPop Studio",
    description: "AI Music Video Production Studio",
};

export default function DirectorPage() {
    return <DirectorWizard />;
}
