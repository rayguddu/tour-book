class AiUnavailableError extends Error { }

const TIMEOUT_MS = 12000;
const httpError = (name, status, detail = "") => {
    const err = new Error(`${name} answered ${status} ${detail.slice(0, 200)}`);
    err.status = status;
    return err;
};

const PAUSE_MS = 60 * 1000;

const groq = {
    name: "Groq",
    async ask(system, messages) {
        const key = process.env.GROQ_API_KEY;
        if (!key) throw new Error("GROQ_API_KEY is not set");
        const base = process.env.GROQ_BASE_URL || "https://api.groq.com/openai/v1";
        const res = await fetch(`${base}/chat/completions`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${key}`,
            },
            body: JSON.stringify({
                model: process.env.GROQ_MODEL || "openai/gpt-oss-120b",
                messages: [{ role: "system", content: system }, ...messages],
                response_format: { type: "json_object" }, // answer must be JSON
                temperature: 0.4,
            }),
            signal: AbortSignal.timeout(TIMEOUT_MS),
        })
        if (!res.ok) throw httpError("Groq", res.status, await res.text());

        const data = await res.json();
        return data.choices?.[0]?.message?.content || "";
    }
}

const gemini = {
    name: "Gemini",
    async ask(system, messages) {
        const key = process.env.GEMINI_API_KEY;
        if (!key) throw new Error("GEMINI_API_KEY is not set");

        const base =
            process.env.GEMINI_BASE_URL ||
            "https://generativelanguage.googleapis.com/v1beta";
        const model = process.env.GEMINI_MODEL || "gemini-3.5-flash-lite";

        const res = await fetch(`${base}/models/${model}:generateContent`, {
            method: "POST",
            headers: { "Content-Type": "application/json", "x-goog-api-key": key },
            body: JSON.stringify({
                systemInstruction: { parts: [{ text: system }] },
                // Gemini calls the assistant "model"
                contents: messages.map((m) => ({
                    role: m.role === "assistant" ? "model" : "user",
                    parts: [{ text: m.content }],
                })),
                generationConfig: {
                    responseMimeType: "application/json", // answer must be JSON
                    temperature: 0.4,
                },
            }),
            signal: AbortSignal.timeout(TIMEOUT_MS),
        });
        if (!res.ok) throw httpError("Gemini", res.status, await res.text());

        const data = await res.json();
        return data.candidates?.[0]?.content?.parts?.[0]?.text || "";
    },
};

const PROVIDERS = [groq, gemini];

const parseJson = (text) =>
    JSON.parse(text.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/, ""));

const askAI = async (system, messages, check) => {
    for (const provider of PROVIDERS) {
        if (provider.pausedUntil && Date.now() < provider.pausedUntil) continue;
        try {
            const text = await provider.ask(system, messages);
            const result = check(parseJson(text));
            if (result !== null) return result;
            console.error(`[ai] ${provider.name} gave an unusable answer`);
        } catch (err) {
            console.error(`[ai] ${provider.name} failed: ${err.message}`); const timedOut = err.name === "TimeoutError" || err.name === "AbortError";
            if (timedOut || err.status === 429 || err.status >= 500) {
                provider.pausedUntil = Date.now() + PAUSE_MS;
            }
        }
        throw new AiUnavailableError("AI is not available right now");
    }
}
module.exports = { askAI, AiUnavailableError };