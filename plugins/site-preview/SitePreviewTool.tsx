import { useState, useCallback, useRef } from 'react'
import { Card, Stack, Button, Text, Flex, Spinner } from '@sanity/ui'

interface PreviewStatus {
  status: 'idle' | 'building' | 'ok' | 'error' | 'already_building'
  cafeRedUrl?: string
  sapsuckersUrl?: string
  message?: string
  timestamp?: string
}

const getBaseUrl = () => {
  if (typeof window !== 'undefined') {
    return window.location.origin.replace(/\/$/, '')
  }
  return 'http://104.236.69.208:3333'
}

export function SitePreviewTool() {
  const [building, setBuilding] = useState(false)
  const [status, setStatus] = useState<PreviewStatus | null>(null)
  const [error, setError] = useState<string | null>(null)
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const stopPolling = useCallback(() => {
    if (pollRef.current) {
      clearInterval(pollRef.current)
      pollRef.current = null
    }
  }, [])

  const pollStatus = useCallback(async (): Promise<PreviewStatus> => {
    const base = getBaseUrl()
    const res = await fetch(`${base}/api/preview-status?t=${Date.now()}`, { cache: 'no-store' })
    return await res.json()
  }, [])

  const startBuild = useCallback(async () => {
    setBuilding(true)
    setError(null)
    setStatus(null)
    stopPolling()

    try {
      const base = getBaseUrl()
      const res = await fetch(`${base}/api/preview`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
      })
      const data = await res.json()

      if (data.status === 'already_building' || data.status === 'building') {
        // Poll for completion
        pollRef.current = setInterval(async () => {
          try {
            const s = await pollStatus()
            if (s.status === 'ok') {
              setStatus(s)
              setBuilding(false)
              stopPolling()
            } else if (s.status === 'error') {
              setError(s.message || 'Preview build failed.')
              setBuilding(false)
              stopPolling()
            }
            // If still "building", keep polling
          } catch {
            // Ignore transient fetch errors during polling
          }
        }, 2000)
      } else if (data.status === 'ok') {
        setStatus(data)
        setBuilding(false)
      } else if (data.status === 'error') {
        setError(data.message || 'Preview build failed.')
        setBuilding(false)
      }
    } catch (err: any) {
      setError(err?.message || 'Could not reach the preview server. Please try again.')
      setBuilding(false)
    }
  }, [stopPolling, pollStatus])

  const openPreview = useCallback((url: string) => {
    const base = getBaseUrl()
    // If URL is relative, make it absolute
    const fullUrl = url.startsWith('http') ? url : `${base}${url}`
    window.open(fullUrl, '_blank')
  }, [])

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
            text={building ? 'Building Preview...' : 'Build Preview'}
            tone="positive"
            onClick={startBuild}
            disabled={building}
            fontSize={2}
            padding={4}
          />
        </Flex>

        {building && (
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

        {status?.status === 'ok' && !building && (
          <Card padding={4} radius={2} shadow={1} tone="positive">
            <Stack space={4}>
              <Text size={2} weight="bold">
                Preview is ready.
              </Text>
              <Text size={1} muted>
                Review your changes below. When you are happy with what you see, return
                here and click Publish on each item you changed.
              </Text>
              <Flex gap={3} wrap="wrap">
                {status.cafeRedUrl && (
                  <Button
                    text="Open Cafe Red Preview"
                    tone="primary"
                    onClick={() => openPreview(status.cafeRedUrl!)}
                    fontSize={2}
                    padding={4}
                  />
                )}
                {status.sapsuckersUrl && (
                  <Button
                    text="Open Sapsuckers Preview"
                    tone="primary"
                    onClick={() => openPreview(status.sapsuckersUrl!)}
                    fontSize={2}
                    padding={4}
                  />
                )}
              </Flex>
              {status.timestamp && (
                <Text size={1} muted>
                  Built at {new Date(status.timestamp).toLocaleTimeString()}
                </Text>
              )}
            </Stack>
          </Card>
        )}
      </Stack>
    </Card>
  )
}
