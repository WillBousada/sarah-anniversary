import WelcomeText from "./components/SplitText";

export default function App() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-200 via-pink-300 to-rose-300 flex items-center justify-center p-4">
            <WelcomeText
                text="Hello Beautiful"
                tag="h1"
                className="text-6xl font-bold text-white italic"
                delay={150}
                duration={1.2}
                splitType="chars"
                from={{ opacity: 0, y: 50 }}
                to={{ opacity: 1, y: 0 }}
            />
        </div>
    );
}
