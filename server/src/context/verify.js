const context = ({ req }) => {
  return {
    token: req.headers.authorization,
  };
};

export default context;