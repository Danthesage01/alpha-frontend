import React from 'react'
import { Link } from 'react-router-dom';
const PageLinkHome = ({link, children}) => {
  return (
    <div className='back-link'>
      <Link to={link} className="link">{children}</Link>
    </div>
  );
}
export const PageLink = ({link, children}) => {
  return (
    <div className='back-link2'>
      <Link to={link} className="link2">{children}</Link>
    </div>
  );
}

export default PageLinkHome