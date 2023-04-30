import noDataImage from '../../assets/img/no-data.jpg';

import './noData.styles.css';

const NoData = () => {
  return (
    <div className='no-data-msg-container'>
      <img src={noDataImage} alt='No data' width={400} className='no-data-image' />
      <p className='no-data-message'>Looks like there is no data to display at the moment.</p>
    </div>
  );
};

export default NoData;
