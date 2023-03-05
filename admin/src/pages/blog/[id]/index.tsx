import Layout from '@/components/layout/Layout';
import MarkdownRenderer from '@/components/MarkdownRenderer';

export default function BlogPage() {
  return (
    <Layout>
      <div className='h-full w-full p-4'>
        <MarkdownRenderer />
      </div>
    </Layout>
  );
}
