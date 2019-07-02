const auth = r => ({
  post: data => r('/auth/login', { method: 'post', data }),
});

export default auth;
