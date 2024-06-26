const llama = require('llama-api');
const scraping = require('./scraping');

async function main() {
  try {
    // Scrape articles as before...
    const articleUrls = [
        { url: 'https://www.fusspflege-nageldesign.com/' },
        { url: 'https://www.perplexity.ai/search/can-you-give-Vbc6WZL7SsWv4oBOMNv.oQ' },
        // ...
      ];

    // Use LLaMA's entity recognition to identify relevant entities in the articles
    const entities = [];
    for (const article of articles) {
      const text = article.content;
      const recognizedEntities = llama.recognizeEntities(text);
      entities.push(...recognizedEntities);
    }

    // Group the entities by type and sort them by frequency
    const groupedByType = groupBy(entities, 'type');
    const sortedByFrequency = Object.values(groupedByType).map((entities) => {
      return { type: entities[0].type, count: entities.length };
    }).sort((a, b) => b.count - a.count);

    // Print the results to the console
    for (const entity of sortedByFrequency) {
      const count = entity.count;
      const type = entity.type;
      console.log(`${type}: ${count}`);
    }
  } catch (err) {
    console.error('An error occurred while running the program', err);
    process.exit(1);
  } finally {
    process.exit(); // exit with a code of 0 if no errors occurred
  }
  const groupBy = (entities, propName) => {
    return entities.reduce((accumulator, entity) => {
      const key = entity[propName];
      if (!accumulator[key]) accumulator[key] = [];
      accumulator[key].push(entity);
      return accumulator;
    }, {});
  };
  
  // Scrape an article and return its content, title, and url
  async function scrapeFootcareTips(url) {
    try {
      const html = await llama.getHtml(url);
      const { content, title } = scraping.scrapeArticle(html);
      return { content, title, url };
    } catch (err) {
      console.error(`Error scraping article: ${url}`, err);
      throw err;
    }
  };}

// Example usage