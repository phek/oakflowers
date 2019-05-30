import React from 'react';
import withIcon from '../withIcon';

function InfoSmall() {
  return (
    <path d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 1 8 0a8 8 0 0 1 0 16zm.484-9.572V12h-.979V6.428h.979zm.22-1.748c0 .095-.02.184-.058.266a.768.768 0 0 1-.154.22.715.715 0 0 1-.223.151.669.669 0 0 1-.536 0 .725.725 0 0 1-.371-.37.688.688 0 0 1 0-.539A.707.707 0 0 1 8 3.974c.095 0 .185.019.27.055a.715.715 0 0 1 .376.377.66.66 0 0 1 .058.272z" />
  );
}

InfoSmall.viewBoxSize = '16';

export default withIcon(InfoSmall);
