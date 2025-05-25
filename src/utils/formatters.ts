/**
 * Format a date string to a more readable format
 * @param dateString - Date string in ISO format (YYYY-MM-DD)
 * @param options - Intl.DateTimeFormatOptions
 * @returns Formatted date string
 */
export const formatDate = (
  dateString: string,
  options: Intl.DateTimeFormatOptions = { 
    month: 'short', 
    day: 'numeric', 
    year: 'numeric' 
  }
): string => {
  if (!dateString) return '';
  
  try {s
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', options);
  } catch (error) {
    console.error('Error formatting date:', error);
    return dateString;
  }
};
