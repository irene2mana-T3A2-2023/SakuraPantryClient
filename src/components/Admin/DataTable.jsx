import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button
} from '@nextui-org/react';
import { FiPlus } from 'react-icons/fi';

export default function DataTable({
  columns,
  renderCell,
  addAction,
  addActionLabel = 'Add New',
  data,
  loading
}) {
  // Determine the loading state of the table.
  const loadingState = loading || data.length === 0 ? 'loading' : 'idle';

  // Top content for the table, typically used for action buttons like 'Add New'.
  const topContent = (
    <div className='flex flex-col gap-4'>
      <div className='flex justify-end gap-3 items-end'>
        {addAction ? (
          <div className='flex gap-3'>
            <Button color='secondary' size='lg' endContent={<FiPlus />} onClick={addAction}>
              {addActionLabel}
            </Button>
          </div>
        ) : null}
      </div>
    </div>
  );

  return (
    <Table
      aria-label='data table'
      isHeaderSticky
      bottomContentPlacement='outside'
      topContent={topContent}
      topContentPlacement='outside'
      isLoading={loading}
    >
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === 'actions' ? 'center' : 'start'}
            allowsSorting={column.sortable}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={data} loadingState={loadingState}>
        {(item) => (
          <TableRow key={item._id}>
            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
