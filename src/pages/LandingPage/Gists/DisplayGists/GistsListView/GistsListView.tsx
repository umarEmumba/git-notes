import { Box, Table, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { tableColumns } from '../../../../../constants';

import ListContent from './ListContent/ListContent';

const GistsListView = () => {
  return (
  <Box>
      <TableContainer>
        <Table>
          <TableHead className="bg-[#c8e9dd]">
            <TableRow>
              {
                tableColumns.map((cellHeading,index)=>
                <TableCell key={`cellHeading-${index}`} align="left">{cellHeading}</TableCell>
                )
              }
            </TableRow>
          </TableHead>
          <ListContent />
        </Table>
      </TableContainer>
  </Box>
  )
};

export default GistsListView;
