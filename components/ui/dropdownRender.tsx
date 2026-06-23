import { Platform } from "@/components/src/types";

export default function dropdownRender(item: Platform, query: string): React.ReactNode {
  const option = item.name;
  if (!query) { return option; }

  const queryWithoutSpaces = query.replace(/\s+/g, '');

  if (!queryWithoutSpaces) { return option; }

  const lowerOption = option.toLowerCase();
  const lowerQuery = queryWithoutSpaces.toLowerCase();

  // Try to find a match starting from each position in the option
  for (let startPos = 0; startPos < option.length; startPos++) {
    // Skip whitespace starting positions
    if (option[startPos].match(/\s/)) {
      continue;
    }

    let optionIndex = startPos;
    let queryIndex = 0;
    const matchStartIndex = startPos;

    // Try to match the query from this starting position
    while (optionIndex < option.length && queryIndex < lowerQuery.length) {
      // Skip whitespace in option
      if (option[optionIndex].match(/\s/)) {
        optionIndex++;
        continue;
      }

      // Check if current character matches
      if (lowerOption[optionIndex] === lowerQuery[queryIndex]) {
        queryIndex++;
        optionIndex++;
      } else {
        // No match at this position, break and try next starting position
        break;
      }
    }

    // If we matched the entire query
    if (queryIndex === lowerQuery.length) {
      const spans: React.ReactNode[] = [];

      // Add everything before the match
      if (matchStartIndex > 0) {
        spans.push(option.slice(0, matchStartIndex));
      }

      // Add the matched portion as bold
      spans.push(<strong key={matchStartIndex}>{option.slice(matchStartIndex, optionIndex)}</strong>);

      // Add everything after the match
      if (optionIndex < option.length) {
        spans.push(option.slice(optionIndex));
      }

      return <>{spans}</>;
    }
  }

  // If we got here, we didn't find a match
  return option;
}