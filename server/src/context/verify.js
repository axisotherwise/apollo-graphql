const context = ({ req }) => {
  return {
    user: req.user,
    token: req.headers.authorization,
  };
};

export default context;