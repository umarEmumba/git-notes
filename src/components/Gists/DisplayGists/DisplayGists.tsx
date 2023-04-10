import { TablePagination } from '@mui/material';
import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { gistsPerPage, landingPageViews, totalGists } from '../../../constants';
import { AppDispatch, storeStateType } from '../../../store';
import { fetchGists } from '../../../store/gists/gistsSlice';
import GistsGridView from './GistsGridView/GistsGridView';
import GistsListView from './GistsListView/GistsListView';

interface DisplayGistsProps {
  activeView : string;
}

const DisplayGists: FC<DisplayGistsProps> = ({activeView}) => {
  const {page} = useSelector((state: storeStateType) => state.gists);
  const currentPage = page - 1;
  const dispatch = useDispatch<AppDispatch>();

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    dispatch(fetchGists({page: newPage + 1, func : 'getGists'}))
  };
 
    return (
      <>
      {
      activeView === landingPageViews.list ?
        <>
          <GistsListView  />
          <TablePagination
            component="div"
            rowsPerPageOptions={[]}
            count={totalGists}
            page={currentPage}
            onPageChange={handleChangePage}
            rowsPerPage={gistsPerPage}
          />
        </>
        :
        <GistsGridView />
      }
      </>
    );
  }

export default DisplayGists;
