import React from 'react';
import withIcon from '../withIcon';

function SocialFacebook() {
  return (
    <path d="M20 40C8.954 40 0 31.046 0 20S8.954 0 20 0s20 8.954 20 20-8.954 20-20 20zm0-39C9.507 1 1 9.507 1 20s8.507 19 19 19 19-8.507 19-19S30.493 1 20 1zm-4.234 16.024h1.795v-1.76c0-.781 0-1.981.585-2.723a3.234 3.234 0 0 1 2.83-1.321c1.094-.048 2.19.062 3.253.326l-.453 2.688a6.21 6.21 0 0 0-1.464-.22c-.707 0-1.336.254-1.336.976v2.034h2.897l-.2 2.63h-2.697v9.126H17.56v-9.126h-1.795v-2.63z" />
  );
}

SocialFacebook.viewBoxSize = '40';

export default withIcon(SocialFacebook);
