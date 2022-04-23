const nextConfig = {
  reactStrictMode: true,
  webpackDevMiddleware: config => {
    // https://stackoverflow.com/a/59954986
    config.watchOptions.ignored = config.watchOptions.ignored.filter(
      ignore => !ignore.toString().includes('.mdx')
    );
    return config;
  }
}

module.exports = nextConfig
