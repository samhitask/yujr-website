import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
  projectId: 'a46k9yri',
  dataset: 'production',
  useCdn: true, // set to false if you want always fresh data
  apiVersion: '2024-01-01',
});

const builder = imageUrlBuilder(client);

export function urlFor(source) {
  return builder.image(source);
}

// Helper to convert Portable Text to plain text for descriptions
export function toPlainText(blocks = []) {
  return blocks
    .map(block => {
      if (block._type !== 'block' || !block.children) {
        return '';
      }
      return block.children.map(child => child.text).join('');
    })
    .join('\n\n');
}