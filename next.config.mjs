/** @type {import('next').NextConfig} */
const nextConfig = {
    images : {
        domains : ['firebasestorage.googleapis.com']
    },
    compiler:{
        styledComponents :true
    },
    // reactStrictMode : false, // strictMode 해제 기본값 true   
};

export default nextConfig;
