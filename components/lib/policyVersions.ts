// Shared ordering for a policy's capture dates (MM/DD/YYYY) and download formats

export function sortVersions(versions: string[]): string[] {
  return [...versions].sort((a, b) => new Date(b).getTime() - new Date(a).getTime());
}

// define a specific order the formats should be displayed; anything not
// in this list sorts after all of them instead of jumping to the front
const FORMAT_ORDER = ["txt", "warc.json", "html", "warc", "pdf"];

export function sortFormats(formats: string[]): string[] {
  const position = (format: string) => {
    const index = FORMAT_ORDER.indexOf(format);
    return index === -1 ? FORMAT_ORDER.length : index;
  };
  return [...formats].sort((a, b) => position(a) - position(b));
}
