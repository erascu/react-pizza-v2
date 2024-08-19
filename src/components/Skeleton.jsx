import React from "react";
import ContentLoader from "react-content-loader";

const Skeleton = () => (
    <ContentLoader
        speed={2}
        width={280}
        height={466}
        viewBox="0 0 280 466"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
    >
        <rect x="81" y="35" rx="0" ry="0" width="0" height="1" />
        <circle cx="140" cy="120" r="120" />
        <rect x="0" y="276" rx="10" ry="10" width="280" height="27" />
        <rect x="0" y="317" rx="10" ry="10" width="280" height="88" />
        <rect x="0" y="430" rx="10" ry="10" width="73" height="27" />
        <rect x="115" y="421" rx="10" ry="10" width="165" height="45" />
    </ContentLoader>
)

export default Skeleton;
