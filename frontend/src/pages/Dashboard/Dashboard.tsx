import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { linkService } from '@/services/links';
import Button from '@/components/ui/Button';

const Dashboard: React.FC = () => {
  const [longUrl, setLongUrl] = useState('');
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const queryClient = useQueryClient();

  const { data, isLoading, error: fetchError } = useQuery({
  queryKey: ['links'],
  queryFn: linkService.getAllLinks,
  refetchInterval: 3000,
  refetchIntervalInBackground: true, 
});

  const {
    mutate: shortenLink,
    isPending: isSubmitting,
    error: mutationError,
  } = useMutation({
    mutationFn: (url: string) => linkService.shortenUrl({ long_url: url }),
    onSuccess: () => {
      setLongUrl('');
      queryClient.invalidateQueries({ queryKey: ['links'] });
    },
  });

  const handleCreateLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (!longUrl.trim()) return;
    shortenLink(longUrl);
  };

  const copyToClipboard = (shortId: string, id: number) => {
    const fullUrl = `${import.meta.env.VITE_API_URL || 'http://localhost:8080'}/s/${shortId}`;
    navigator.clipboard.writeText(fullUrl);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const globalError =
    (mutationError as any)?.response?.data?.error ||
    (fetchError as any)?.response?.data?.error ||
    null;

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="mt-2">Manage your shortened links</p>
        </div>

        <div className="rounded-xl border border-slate-200 shadow-sm p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Create Short Link</h2>
          <form onSubmit={handleCreateLink} className="flex gap-3">
            <input
              type="url"
              placeholder="Enter your long URL (https://...)"
              value={longUrl}
              onChange={(e) => setLongUrl(e.target.value)}
              className="flex-1 px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-sm"
              required
              disabled={isSubmitting}
            />
            <Button
              type="submit"
              disabled={isSubmitting || !longUrl.trim()}
              className="px-6 py-2 font-medium text-sm rounded-lg transition-colors"
            >
              {isSubmitting ? 'Creating...' : 'Shorten'}
            </Button>
          </form>
          {globalError && (
            <p className="text-xs font-medium mt-3">{globalError}</p>
          )}
        </div>

        <div className="rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100">
            <h2 className="text-lg font-semibold">Your Links</h2>
          </div>

          {isLoading ? (
            <div className="px-6 py-12 text-center">
              <p className="text-sm font-medium">Loading server index...</p>
            </div>
          ) : data?.length === 0 ? (
            <div className="px-6 py-12 text-center">
              <p className="text-sm font-medium">
                No links yet. Start shrinking destination strings!
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="border-b border-slate-200 text-xs font-semibold uppercase tracking-wider">
                  <tr>
                    <th className="px-6 py-3.5 w-16 text-center">#</th>
                    <th className="px-6 py-3.5 w-44">Short Link</th>
                    <th className="px-6 py-3.5">Destination URL</th>
                    <th className="px-6 py-3.5 w-28 text-center">Clicks</th>
                    <th className="px-6 py-3.5 w-32">Created</th>
                    <th className="px-6 py-3.5 w-24 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  {data?.map((link, index) => (
                    <tr key={link.id} className="transition-colors">
                      <td className="px-6 py-4 font-medium text-center">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4 font-mono font-semibold">
                        <a
                          href={`${import.meta.env.VITE_API_URL || 'http://localhost:8080'}/s/${link.short_id}`}
                          target="_blank"
                          rel="noreferrer"
                          className="hover:underline"
                        >
                          {link.short_id}
                        </a>
                      </td>
                      <td className="px-6 py-4 font-medium max-w-xs truncate">
                        <a
                          href={link.long_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:underline"
                          title={link.long_url}
                        >
                          {link.long_url}
                        </a>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border border-indigo-100">
                          {link.clicks}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-xs font-medium">
                        {new Date(link.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button
                          onClick={() =>
                            copyToClipboard(link.short_id, link.id)
                          }
                          className={`text-xs font-semibold transition-colors focus:outline-none ${
                            copiedId === link.id ? '' : 'hover:underline'
                          }`}
                        >
                          {copiedId === link.id ? 'Copied!' : 'Copy Link'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
