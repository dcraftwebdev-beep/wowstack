import React, { useEffect } from 'react'

import ContactHub from '../Components/Sections/ContactHub'
import BookMeeting from '../Components/Sections/BookMeeting'
import ContactMe from '../Components/Sections/ContactMe';
import PageSeo from '../Components/PageSeo';

const Contact = () => {
      // Scroll to top when entering this page
    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);

  return (
    <>
    <PageSeo path="/contact" />
    <div>
      <ContactHub />
      <BookMeeting />
      <ContactMe />
    </div>
    </>
  )
}

export default Contact
