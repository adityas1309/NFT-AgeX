import dotenv from 'dotenv';
import { TwitterApi } from 'twitter-api-v2';
import Sentiment from 'sentiment';

dotenv.config();

const BEARER_TOKEN = process.env.TWITTER_BEARER_TOKEN;
const GROQ_API_KEY = process.env.GROQ_API_KEY;

if (!BEARER_TOKEN) {
  console.error("❌ ERROR: Missing Twitter Bearer Token in .env");
  process.exit(1);
}

if (!GROQ_API_KEY) {
  console.error("❌ ERROR: Missing Groq AI Key in .env");
  process.exit(1);
}

const twitterClient = new TwitterApi(BEARER_TOKEN);
const sentiment = new Sentiment();

function analyzeSentiment(text) {
  const result = sentiment.analyze(text);
  const score = result.score;

  if (score > 0) return 'positive';
  if (score < 0) return 'negative';
  return 'neutral';
}

async function getLiveTweets(keyword) {
  try {
    const query = `${keyword} -is:retweet lang:en`;

    const tweetsResponse = await twitterClient.v2.search(query, {
      max_results: 10,
    });

    if (!tweetsResponse || !tweetsResponse.data?.data?.length) {
      console.warn(`⚠️ No tweets found for: ${keyword}`);
      return JSON.stringify([]);
    }

    const sentiments = tweetsResponse.data.data.map(tweet => ({
      tweet: tweet.text,
      sentiment: analyzeSentiment(tweet.text)
    }));

    return JSON.stringify(sentiments, null, 2);

  } catch (error) {
    if (error.code === 429) {
      console.warn("⚠️ Rate limit exceeded. Using Groq AI to generate tweets...");
    } else {
      console.error("❌ ERROR:", error.message);
    }

    return JSON.stringify([]);
  }
}

const keyword = "NFT";
if (process.argv[1] === new URL(import.meta.url).pathname) {
  getLiveTweets(keyword).then(console.log);
}

export { getLiveTweets };
