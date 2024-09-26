// next.config.js
module.exports = {
    async redirects() {
        return [
            {
                source: '/',
                destination: '/home',
                permanent: true, // Set to false if you want a temporary redirect (307)
            },
        ];
    },
};

