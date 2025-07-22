const sanitizeUser = (user) => {
  if (!user) return null;

  const {
    password,        
    ...sanitizedUser   
  } = user;

  return sanitizedUser;
};

export default sanitizeUser;