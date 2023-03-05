import classNames from 'classnames';
import Link from 'next/link';
import { FaEye, FaPencilAlt } from 'react-icons/fa';

import Layout from '@/components/layout/Layout';

export default function BlogListPage() {
  return (
    <Layout>
      <div className='h-full w-full p-4'>
        <div className='flex items-center'>
          <h1 className='mr-4'>Posts</h1>
          <button className='h-8 rounded bg-sky-500 py-1 px-2 text-sm font-bold text-white hover:bg-sky-600'>
            <Link href='/blog/create'>Create</Link>
          </button>
        </div>
        <table className='mt-8 min-w-full divide-y divide-gray-300'>
          <thead className='bg-gray-50'>
            <tr>
              <Th>Title</Th>
              <Th>Slug</Th>
              <Th>Created At</Th>
              <Th>Updated At</Th>
              <Th style={{ width: '50px' }}>Published</Th>
              <Th>Actions</Th>
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-200 bg-white'>
            <tr>
              <Td>Blog 1</Td>
              <Td>Author 1</Td>
              <Td>2021-01-01</Td>
              <Td>2021-01-01</Td>
              <Td style={{ width: '120px', textAlign: 'center' }}>
                <input type='checkbox' />
              </Td>
              <Td>
                <div className='flex justify-start'>
                  <Link href='/blog/123' className='mr-4'>
                    <FaEye />
                  </Link>
                  <Link href='/blog/123/edit'>
                    <FaPencilAlt />
                  </Link>
                </div>
              </Td>
            </tr>
          </tbody>
        </table>
      </div>
    </Layout>
  );
}

type ThProps = {
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLTableCellElement>;

function Th({ children, className, ...props }: ThProps) {
  const thClassName = classNames(
    'px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider',
    className
  );

  return (
    <th className={thClassName} {...props}>
      {children}
    </th>
  );
}

type TdProps = {
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLTableCellElement>;

function Td({ children, className, ...props }: TdProps) {
  const tdClassName = classNames('px-6 py-4 whitespace-nowrap', className);

  return (
    <td className={tdClassName} {...props}>
      {children}
    </td>
  );
}
