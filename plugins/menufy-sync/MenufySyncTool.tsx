import { useState } from 'react'
import { Card, Stack, Button, Text, Flex, Badge, Box, Spinner } from '@sanity/ui'

interface Change {
  type: 'new' | 'updated' | 'removed'
  name: string
  price?: string
  oldPrice?: string
  newPrice?: string
}

interface SyncResult {
  restaurant: string
  status: string
  message?: string
  sections?: number
  totalItems?: number
  added: number
  updated: number
  unchanged: number
  removedFromMenufy?: number
  changes: Change[]
}

export function MenufySyncTool() {
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<SyncResult[] | null>(null)
  const [error, setError] = useState<string | null>(null)

  const runSync = async (restaurant: string) => {
    setLoading(true)
    setError(null)
    setResults(null)

    try {
      const res = await fetch('/api/menufy-sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ restaurant }),
      })

      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.message || 'Sync failed')
      }

      const data = await res.json()
      setResults(data.results)
    } catch (err: any) {
      setError(err.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card padding={4}>
      <Stack space={5}>
        <Stack space={3}>
          <Text size={4} weight="bold">
            Sync from Menufy
          </Text>
          <Text size={1} muted>
            Pull the latest menu from your Menufy ordering pages. New items, price changes,
            and removals are applied automatically -- no manual publishing needed.
          </Text>
        </Stack>

        <Flex gap={3}>
          <Button
            text="Sync Sapsuckers"
            tone="primary"
            onClick={() => runSync('sapsuckers')}
            disabled={loading}
          />
          <Button
            text="Sync Cafe Red"
            tone="primary"
            onClick={() => runSync('cafe-red')}
            disabled={loading}
          />
          <Button
            text="Sync Both"
            tone="positive"
            onClick={() => runSync('both')}
            disabled={loading}
          />
        </Flex>

        {loading && (
          <Flex align="center" gap={3} padding={4}>
            <Spinner muted />
            <Text muted>
              Pulling menu data from Menufy... this may take up to 30 seconds.
            </Text>
          </Flex>
        )}

        {error && (
          <Card padding={3} radius={2} shadow={1} tone="critical">
            <Text size={1}>{error}</Text>
          </Card>
        )}

        {results && results.map((result) => (
          <Card key={result.restaurant} padding={4} radius={2} shadow={1}>
            <Stack space={4}>
              <Flex align="center" gap={2}>
                <Text size={2} weight="bold">
                  {result.restaurant === 'cafe-red' ? 'Cafe Red' : 'Sapsuckers'}
                </Text>
                <Badge tone={result.status === 'ok' ? 'positive' : 'caution'}>
                  {result.status === 'ok' ? 'Done' : 'Issue'}
                </Badge>
              </Flex>

              {result.status === 'no_data' && (
                <Text size={1} muted>{result.message}</Text>
              )}

              {result.status === 'ok' && (
                <Stack space={3}>
                  <Flex gap={4}>
                    <Stack space={1}>
                      <Text size={3} weight="bold">{result.added}</Text>
                      <Text size={1} muted>New items</Text>
                    </Stack>
                    <Stack space={1}>
                      <Text size={3} weight="bold">{result.updated}</Text>
                      <Text size={1} muted>Updated</Text>
                    </Stack>
                    <Stack space={1}>
                      <Text size={3} weight="bold">{result.unchanged}</Text>
                      <Text size={1} muted>Unchanged</Text>
                    </Stack>
                    {(result.removed ?? 0) > 0 && (
                      <Stack space={1}>
                        <Text size={3} weight="bold">{result.removed}</Text>
                        <Text size={1} muted>Removed</Text>
                      </Stack>
                    )}
                  </Flex>

                  {result.changes.length > 0 && (
                    <Stack space={2}>
                      <Text size={1} weight="bold">Changes:</Text>
                      {result.changes.slice(0, 20).map((change, i) => (
                        <Flex key={i} gap={2} align="center">
                          <Badge
                            tone={change.type === 'new' ? 'positive' : change.type === 'updated' ? 'caution' : 'critical'}
                            fontSize={0}
                          >
                            {change.type}
                          </Badge>
                          <Text size={1}>
                            {change.name}
                            {change.type === 'updated' && ` (${change.oldPrice} \u2192 ${change.newPrice})`}
                            {change.type === 'new' && change.price && ` (${change.price})`}
                          </Text>
                        </Flex>
                      ))}
                      {result.changes.length > 20 && (
                        <Text size={1} muted>...and {result.changes.length - 20} more</Text>
                      )}
                    </Stack>
                  )}

                  {result.added === 0 && result.updated === 0 && (
                    <Text size={1} muted>
                      Everything matches. No changes needed.
                    </Text>
                  )}

                  {(result.added > 0 || result.updated > 0 || (result.removed ?? 0) > 0) && (
                    <Text size={1} muted>
                      All changes are live on the site. Rebuild may be needed for static pages.
                    </Text>
                  )}
                </Stack>
              )}
            </Stack>
          </Card>
        ))}
      </Stack>
    </Card>
  )
}
