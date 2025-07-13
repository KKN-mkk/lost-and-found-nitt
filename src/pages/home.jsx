import React, { useState, useEffect, useRef } from 'react';
import FoundItemForm from '../components/FoundItemForm';
import LostItemFeed from '../components/LostItemFeed';
import FoundItemFeed from '../components/FoundItemFeed';
import LostItemForm from '../components/LostItemForm';
import { useNavigate } from 'react-router-dom';
import lostBoy from '../assets/lostBoy.png';
import foundGirl from '../assets/foundGirl.png';

const BG_GRADIENT = "linear-gradient(135deg, #f3e8ff 0%, #f0fdf4 100%)";
const CARD_BG = "#fff";
const INDIGO = "#4F46E5";
const FOUND_PINK = "#ED4B86";
const TEXT_LIGHT = "#F5F4FB";
const BORDER = "#E5E7EB";

export default function Home() {
    const [active, setActive] = useState("");
    const [showGuidelines, setShowGuidelines] = useState(false);
    const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("user")));
    const navigate = useNavigate();

    const lostFormRef = useRef(null);
    const foundFormRef = useRef(null);
    const lostFeedRef = useRef(null);
    const foundFeedRef = useRef(null);

    const lostClick = () => {
        setActive("lost");
        if (!user) {
            localStorage.setItem("intent", "lost");
            navigate('/login');
        } else {
            setTimeout(() => {
                lostFormRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
            }, 100);
        }
    };

    const foundClick = () => {
        setActive("found");
        if (!user) {
            localStorage.setItem("intent", "found");
            navigate('/login');
        } else {
            setTimeout(() => {
                foundFormRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
            }, 100);
        }
    };

    const scrollToLostFeed = () => {
        lostFeedRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    };
    const scrollToFoundFeed = () => {
        foundFeedRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    const handleLogout = () => {
        localStorage.removeItem("user");
        setUser(null);
    };

    const handleLogin = () => {
        navigate('/login');
    };

    useEffect(() => {
        const onStorageChange = () => {
            setUser(JSON.parse(localStorage.getItem("user")));
        };
        window.addEventListener("storage", onStorageChange);
        return () => window.removeEventListener("storage", onStorageChange);
    }, []);

    useEffect(() => {
        if (user) {
            const intent = localStorage.getItem("intent");
            if (intent === "lost" || intent === "found") {
                setActive(intent);
                localStorage.removeItem("intent");
            }
        }
    }, [user]);

    const handleOverlayClick = (e) => {
        if (e.target.id === "guidelines-overlay") {
            setShowGuidelines(false);
        }
    };

    return (
        <div className="min-h-screen" style={{ background: BG_GRADIENT }}>
            <nav
                className="flex flex-wrap items-center justify-between px-2 sm:px-4 md:px-8 py-4 border-b"
                style={{ background: CARD_BG, borderColor: BORDER }}
            >
                <div className="flex items-center gap-2 text-2xl font-bold tracking-tight">
                    
                    <span style={{ color: INDIGO, fontWeight: 800 }}>FindNITT</span>
                </div>
                <ul className="flex flex-wrap gap-2 sm:gap-4 md:gap-6 text-base font-medium" style={{ color: "#808080" }}>
                    <li
                        className="hover:text-indigo-400 cursor-pointer transition"
                        onClick={() => {
                            if (active === "lost" || active === "found") {
                                setActive("");
                            } else {
                                window.location.reload();
                            }
                        }}
                    >
                        Home
                    </li>
                    <li
                        className="hover:text-indigo-400 cursor-pointer transition"
                        onClick={() => setShowGuidelines(true)}
                    >
                        Guidelines
                    </li>
                    <li
                        className="hover:text-indigo-400 cursor-pointer transition"
                        onClick={scrollToLostFeed}
                    >
                        Lost items
                    </li>
                    <li
                        className="hover:text-pink-400 cursor-pointer transition"
                        onClick={scrollToFoundFeed}
                    >
                        Found items
                    </li>
                </ul>
                <button onClick={user ? handleLogout : handleLogin}
                    className="text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 font-medium rounded-full text-xs xs:text-sm md:text-base px-3 xs:px-4 md:px-6 py-2 shadow transition"
                >
                    {user ? "Logout" : "Login"}
                </button>
            </nav>

            {showGuidelines && (
                <div
                    id="guidelines-overlay"
                    onClick={handleOverlayClick}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40"
                >
                    <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-3 sm:p-4 md:p-8 mx-2 sm:mx-4 md:mx-auto relative border border-indigo-100">
                        <button
                            onClick={() => setShowGuidelines(false)}
                            className="absolute top-3 right-4 text-xl text-gray-400 hover:text-indigo-600 font-bold"
                            aria-label="Close"
                        >
                            ×
                        </button>
                        <h2 className="text-2xl font-bold mb-4 text-indigo-700">Pickup Guidelines</h2>
                        <ul className="list-disc pl-6 space-y-3 text-gray-700 text-base">
                            <li>
                                <b>Post complete details:</b> When reporting a lost or found item, provide a clear title, description, time, location, and (if possible) an image.
                            </li>
                            <li>
                                <b>Use a security question:</b> If you found an item, set a security question only the rightful owner can answer (e.g., "What is engraved on the back?").
                            </li>
                            <li>
                                <b>Contact details:</b> While posting, provide your name, hostel/room, and (optionally) mobile number so the owner or founder can reach you.
                            </li>
                            <li>
                                <b>Claiming process:</b> Owners must answer your security question to view your contact and claim the item.
                            </li>
                            <li>
                                <b>Be honest and responsible:</b> Only claim items that truly belong to you, and return found items promptly.
                            </li>
                        </ul>
                        <div className="mt-6 text-sm text-gray-500 text-center">
                            Thank you for making FindNITT safe and helpful for everyone!
                        </div>
                    </div>
                </div>
            )}


            <section
                className="w-full flex flex-col md:flex-row items-stretch justify-around gap-6 md:gap-12 py-4 px-2 sm:px-4 bg-transparent"
                style={{
                    minHeight: "340px",
                    marginBottom: "32px",
                    border: `1.5px solid ${BORDER}`,
                }}
            >

                <div className="flex flex-1 flex-col items-end justify-between py-4">
                    <div className="w-full text-right">
                        <span
                            className="mb-2 text-2xl md:text-5xl font-extrabold"
                            style={{ color: INDIGO, lineHeight: 1.18 }}
                        >
                            Lost something?<br />Don’t worry.
                        </span>
                        <p className="mt-2 text-base md:text-xl text-gray-500 font-medium">
                            Post details and let the community <br /> help you recover it.
                        </p>
                    </div>
                    <img
                        src={lostBoy}
                        alt="Lost Boy"
                        className="my-4 w-[15vw]"
                        style={{ objectFit: "contain" }}
                    />
                    <button
                        onClick={lostClick}
                        className="px-8 py-2 rounded-full font-bold text-base md:text-2xl mr-12 shadow transition focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-offset-2"
                        style={{
                            background: INDIGO,
                            color: TEXT_LIGHT,
                            letterSpacing: "1px",
                            minWidth: "108px",
                        }}
                    >
                        LOST
                    </button>
                </div>

                <div className="hidden md:flex flex-col items-center justify-center">
                    <div className="h-full w-px bg-gray-200 opacity-50" />
                </div>

                <div className="flex flex-1 flex-col items-start justify-between py-4">
                    <div className="w-full text-left">
                        <span
                            className="mb-2 text-2xl md:text-5xl font-extrabold"
                            style={{ color: FOUND_PINK, lineHeight: 1.18 }}
                        >
                            Found something?<br />Bravo!
                        </span>
                        <p className="mt-2 text-base md:text-lg text-gray-500 font-medium">
                            Help someone by reporting <br />what you found.
                        </p>
                    </div>
                    <img
                        src={foundGirl}
                        alt="Found Girl"
                        className="my-4 w-[15vw]"
                        style={{ objectFit: "contain" }}
                    />
                    <button
                        onClick={foundClick}
                        className="px-8 py-2 rounded-full font-bold text-base md:text-2xl ml-12 shadow transition focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-offset-2"
                        style={{
                            background: FOUND_PINK,
                            color: TEXT_LIGHT,
                            letterSpacing: "1px",
                            minWidth: "120px",
                        }}
                    >
                        FOUND
                    </button>
                </div>
            </section>

            <main className="px-2 sm:px-4 py-6 md:py-12">
                <div className="max-w-4xl mx-auto space-y-8 md:space-y-12">
                    {active === "lost" && user &&
                        <section
                            ref={lostFormRef}
                            className="rounded-2xl shadow-md p-3 sm:p-4 md:p-8 mb-8"
                            style={{
                                background: CARD_BG,
                                border: `1.5px solid ${INDIGO}22`,
                                color: INDIGO
                            }}
                        >
                            <h2 className="text-2xl font-bold mb-4" style={{ color: INDIGO }}>
                                Report Lost Item
                            </h2>
                            <LostItemForm />

                        </section>
                    }
                    {active === "found" && user &&
                        <section
                            ref={foundFormRef}
                            className="rounded-2xl shadow-md p-3 sm:p-4 md:p-8 mb-8"
                            style={{
                                background: CARD_BG,
                                border: `1.5px solid ${FOUND_PINK}22`,
                                color: FOUND_PINK
                            }}
                        >
                            <h2 className="text-2xl font-bold mb-4" style={{ color: FOUND_PINK }}>
                                Repport Found Item</h2>
                            <FoundItemForm />
                        </section>
                    }

                    <div ref={lostFeedRef}>
                        <LostItemFeed />
                    </div>
                    <div ref={foundFeedRef}>
                        <FoundItemFeed />
                    </div>
                </div>
            </main>
        </div>
    );
}
