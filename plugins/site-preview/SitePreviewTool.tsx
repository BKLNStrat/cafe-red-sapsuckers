import { useState } from 'react'
import { Card, Stack, Button, Text, Flex, Spinner, Box } from '@sanity/ui'

interface PreviewResult {
  status: 'ok' | 'error' | 'already_building'
  cafeRedUrl?: string
  sapsuckersUrl?: string
  message?: string
}

export function SitePreviewTool() {
  const [loading, setLoading] = useState<string | null>(null)
  const [result, setResult] = useState<PreviewResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const buildPreview = async (site: 'both' | 'cafe-red' | 'sapsuckers') => {
    setLoading(site)
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
        // Auto-open the requested site in a new tab
        if (site === 'cafe-red' && data.cafeRedUrl) {
          window.open(data.cafeRedUrl, '_blank')
        } else if (site === 'sapsuckers' && data.sapsuckersUrl) {
          window.open(data.sapsuckersUrl, '_blank')
        }
      } else if (data.status === 'already_building') {
        setError('A preview is already being built. Please wait a moment and try again.')
      } else {
        setError(data.message || 'Preview build failed. Please try again.')
      }
    } catch (err: any) {
      setError('Could not reach the preview server. Please try again.')
    } finally {
      setLoading(null)
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
            Build a private preview using your current saved drafts.
            Nothing goes live until you click Publish on individual items.
          </Text>
          <Text size={2} muted>
            The preview takes about 15 seconds to build. A banner at the top of each
            preview page confirms you are viewing a preview, not the live site.
          </Text>
        </Stack>

        <Flex gap={3} wrap="wrap">
          <Button
            text={loading === 'cafe-red' ? 'Building...' : 'Preview Cafe Red'}
            tone="primary"
            onClick={() => buildPreview('cafe-red')}
            disabled={loading !== null}
            fontSize={2}
            padding={4}
          />
          <Button
            text={loading === 'sapsuckers' ? 'Building...' : 'Preview Sapsuckers'}
            tone="primary"
            onClick={() => buildPreview('sapsuckers')}
            disabled={loading !== null}
            fontSize={2}
            padding={4}
          />
          <Button
            text={loading === 'both' ? 'Building...' : 'Preview Both'}
            tone="positive"
            onClick={() => buildPreview('both')}
            disabled={loading !== null}
            fontSize={2}
            padding={4}
          />
        </Flex>

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
                Preview is ready.
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
            </Stack>
          </Card>
        )}
      </Stack>
    </Card>
  )
}
