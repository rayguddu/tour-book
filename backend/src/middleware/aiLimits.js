const rateLimit = require("express-rate-limit");
const { ipKeyGenerator } = require("express-rate-limit");

const BURST_PER_MINUTE = 6; //  messages per IP per minute
const GUEST_PER_DAY = 40; //    messages per guest per day
const USER_PER_DAY = 80; //     messages per logged-in user per day
const SITE_PER_MINUTE = 25; //  messages from everyone, per minute
const SITE_PER_DAY = 800; //    messages from everyone, per day

const MINUTE = 60 * 1000;
const DAY = 24 * 60 * MINUTE;

const makeLimiter = (windowMs, limit, message, keyGenerator) => rateLimit({ windowMs, limit, standardHeaders: true, legacyHeaders: false, message: { success: false, message }, ...(keyGenerator && { keyGenerator }), })

const burst = makeLimiter(
    MINUTE,
    BURST_PER_MINUTE,
    "You are sending messages too fast. Please wait a minute.",
);

const perVisitorDaily = rateLimit({
    windowMs: DAY,
    limit: (req) => (req.user ? USER_PER_DAY : GUEST_PER_DAY),
    standardHeaders: true,
    legacyHeaders: false,
    keyGenerator: (req) =>
        req.user ? `user:${req.user._id}` : ipKeyGenerator(req.ip),
    message: {
        success: false,
        message:
            "You have reached today's message limit. Please come back tomorrow.",
    },
});

const siteWide = () => "all";
const siteMinute = makeLimiter(
    MINUTE,
    SITE_PER_MINUTE,
    "The assistant is very busy right now. Please try again in a minute.",
    siteWide,
);
const siteDaily = makeLimiter(
    DAY,
    SITE_PER_DAY,
    "The assistant has reached its daily limit. Please try again tomorrow.",
    siteWide,
);

// For the admin "Write with AI" button: 10 per minute is plenty
const adminBurst = makeLimiter(
    MINUTE,
    10,
    "Too many requests. Please wait a minute.",
);

const chatLimits = [burst];
const chatLimitsAfterAuth = [perVisitorDaily, siteMinute, siteDaily];


module.exports = { chatLimits, chatLimitsAfterAuth, adminBurst };