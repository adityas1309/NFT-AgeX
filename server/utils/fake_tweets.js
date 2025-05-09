import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const GROQ_API_KEY = process.env.GROQ_API_KEY;
const keyword = process.argv[2] || 'NFT';

async function getFakeTweets(keyword) {
  if (!GROQ_API_KEY) {
    return JSON.stringify([{ tweet: 'AI tweet generation failed: Missing API key', sentiment: 'error' }], null, 2);
  }

  const prompt = `Generate 7 realistic tweets about ${keyword} (an NFT project). Each tweet should:

- Be natural and engaging, like a real Twitter post.
- Reflect real user behavior, including excitement, skepticism, or neutral observations.
- Include hashtags and emojis where relevant.
- End with a sentiment label: Positive, Negative, or Neutral.

Ensure that:
- Positive tweets express excitement or bullish sentiment.
- Negative tweets express doubt, frustration, or complaints.
- Neutral tweets are observational or open-ended.

### Example Output:
1. "Just minted a ${keyword} NFT, and the art is 🔥! Can't wait to see where this project goes! 🚀 #${keyword} #NFTCommunity" - Sentiment: Positive

2. "Another day, another NFT project... Is ${keyword} actually legit or just another cash grab? 🤔" - Sentiment: Negative

3. "Big names are talking about ${keyword} NFT. Might be worth checking out. #NFTs #${keyword}" - Sentiment: Neutral

4. "Bruh, gas fees were more than my ${keyword} NFT mint price. This ain't it. 💀" - Sentiment: Negative

5. "Floor price of ${keyword} NFT is holding steady. Might be a solid long-term hold. #NFTMarket" - Sentiment: Neutral

6. "The ${keyword} team just dropped a sneak peek of their upcoming project and it's 🔥 Can't wait to hear more! #${keyword} #NFTCommunity" - Sentiment: Positive

7. "Does anyone know if buying a ${keyword} NFT will get you perks or access to exclusive content? 🤔 Would be cool to get some extra benefits. #${keyword} #NFTPerks" - Sentiment: Neutral

Now, generate 7 more tweets following this format. Ensure sentiment labels are **correct and varied**.`;

  try {
    const response = await axios.post(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        model: 'llama3-8b-8192',
        messages: [{ role: 'user', content: prompt }],
      },
      {
        headers: {
          'Authorization': `Bearer ${GROQ_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const content = response.data.choices?.[0]?.message?.content;
    if (!content) throw new Error('❌ No valid response from Groq AI.');

    const tweetPattern = /^\d+\.\s*"(.+?)"\s+- Sentiment:\s*(Positive|Negative|Neutral)/gm;
    const tweets = [];
    let match;

    while ((match = tweetPattern.exec(content)) !== null) {
      tweets.push({
        tweet: match[1].trim(),
        sentiment: match[2].trim().toLowerCase(),
      });
    }

    const validSentiments = new Set(['positive', 'negative', 'neutral']);
    tweets.forEach(t => {
      if (!validSentiments.has(t.sentiment)) {
        console.warn(`⚠️ Invalid sentiment detected: ${t.sentiment} for tweet: ${t.tweet}`);
      }
    });

    return JSON.stringify(tweets, null, 2);
  } catch (error) {
    console.error('❌ ERROR:', error.message);
    return JSON.stringify([{ tweet: 'AI tweet generation failed', sentiment: 'error' }], null, 2);
  }
}

if (process.argv[1] === new URL(import.meta.url).pathname) {
  getFakeTweets(keyword).then(console.log);
}

export { getFakeTweets };
