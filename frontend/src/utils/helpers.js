export const handleApiError = (error) => {
  if (error.response) {
    // The request was made and the server responded with a status code
    console.error('Error response:', error.response.data);
    console.error('Status code:', error.response.status);
    return error.response.data.message || 'An error occurred';
  } else if (error.request) {
    // The request was made but no response was received
    console.error('Error request:', error.request);
    return 'No response from server';
  } else {
    // Something happened in setting up the request
    console.error('Error message:', error.message);
    return error.message;
  }
};

export const formatDate = (dateString) => {
  if (!dateString) return '';
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};