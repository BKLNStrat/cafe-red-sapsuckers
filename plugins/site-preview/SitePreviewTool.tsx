import { useState } from 'react'
import { Card, Stack, Button, Text, Flex, Spinner, Box } from '@sanity/ui'

interface PreviewResult {
  status: 'ok' | 'error' | 'already_building'
  cafeRedUrl?: string
  sapsuckersUrl?: string
  message?: string
}

export function SitePreviewTool() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<PreviewResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const buildPreview = async () => {
    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const res = await fetch('http://104.236.69.208:3849/preview', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      })
      const data: PreviewResult = await res.json()
      if (res.ok && data.status === 'ok') {
        setResult(data)
      } else if (data.status === 'already_building') {
        setError('A preview is already being built. Please wait a moment and try again.')
      } else {
        setError(data.message || 'Preview build failed. Please try again.')
      }
    } catch (err: any) {
      setError('Could not reach the preview server. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card padding={5}>
      <Stack space={6}>
        <Stack space={3}>
          <Text size={4} weight="bold">
            Preview Site
          </Text>
          <Text size={2} muted>
            Build a private preview of both sites using your current saved drafts.
            Nothing goes live until you click Publish on individual items.
          </Text>
          <Text size={2} muted>
            The preview takes about 15 seconds to build. A banner at the top of each
            preview page confirms you are viewing a preview, not the live site.
          </Text>
        </Stack>

        <Button
          text={loading ? 'Building preview...' : 'Build Preview'}
          tone="primary"
          onClick={buildPreview}
          disabled={loading}
          fontSize={2}
          padding={4}
          style={{ width: '200px' }}
        />

        {loading && (
          <Flex align="center" gap={3} padding={4}>
            <Spinner muted />
            <Text muted>
              Building preview with your latest drafts... this takes about 15 seconds.
            </Text>
          </Flex>
        )}

        {error && (
          <Card padding={4} radius={2} shadow={1} tone="critical">
            <Text size={2}>{error}</Text>
          </Card>
        )}

        {result?.status === 'ok' && (
          <Card padding={4} radius={2} shadow={1} tone="positive">
            <Stack space={4}>
              <Text size={2} weight="bold">
                Preview is ready. Open in a new tab to review.
              </Text>
              <Text size={1} muted>
                When you are happy with what you see, return here and click Publish
                on each item to make it live. The live site updates in about 10 seconds.
              </Text>
              <Flex gap={3} wrap="wrap">
                <Button
                  text="Open Cafe Red Preview"
                  tone="default"
                  as="a"
                  href={result.cafeRedUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                />
                <Button
                  text="Open Sapsuckers Preview"
                  tone="default"
                  as="a"
                  href={result.sapsuckersUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                />
              </Flex>
              <Box>
                <Text size={1} muted>
                  Direct links (bookmark these):{' '}
                  <a href={result.cafeRedUrl} target="_blank" rel="noopener noreferrer">
                    {result.cafeRedUrl}
                  </a>
                  {' '}·{' '}
                  <a href={result.sapsuckersUrl} target="_blank" rel="noopener noreferrer">
                    {result.sapsuckersUrl}
                  </a>
                </Text>
              </Box>
            </Stack>
          </Card>
        )}
      </Stack>
    </Card>
  )
}
