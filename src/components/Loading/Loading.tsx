import { ReactUIContext } from '@nstseek/react-ui/context';
import React, { useContext } from 'react';
import './Loading.scss';

/**
 * This component implements a simple loading indicator at the bottom-right of the page, just to give a UI feedback to the final user
 */
const Loading: React.FC = () => {
  const uiCtx = useContext(ReactUIContext);

  return uiCtx.state.loading.length ? (
    <div className='Loading'>
      <i id='loading' className='fas fa-spinner' />
    </div>
  ) : null;
};

export default Loading;
