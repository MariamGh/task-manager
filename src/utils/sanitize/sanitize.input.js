import xss from 'xss';

export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input;
  return xss(input.trim());
};
