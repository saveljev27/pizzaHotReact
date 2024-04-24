import React from 'react'
import ContentLoader from 'react-content-loader'

const MyLoader = (props) => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={465}
    viewBox="0 0 280 465"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="0" y="309" rx="5" ry="5" width="272" height="70" />
    <rect x="9" y="398" rx="5" ry="5" width="85" height="30" />
    <rect x="134" y="393" rx="5" ry="5" width="124" height="38" />
    <circle cx="135" cy="122" r="120" />
    <rect x="0" y="267" rx="5" ry="5" width="272" height="29" />
  </ContentLoader>
)

export default MyLoader
