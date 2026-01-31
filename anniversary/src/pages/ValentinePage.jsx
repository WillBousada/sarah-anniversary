import FloatingHearts from "../components/FloatingHearts";
import Valentine from "../components/Valentine";

export default function ValentinePage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-red-300 via-rose-400 to-pink-500 flex items-center justify-center p-4 relative overflow-hidden">
            <FloatingHearts count={25} />
            <Valentine />
        </div>
    );
}
