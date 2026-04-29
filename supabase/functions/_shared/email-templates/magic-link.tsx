/// <reference types="npm:@types/react@18.3.1" />

import * as React from 'npm:react@18.3.1'

import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from 'npm:@react-email/components@0.0.22'

interface MagicLinkEmailProps {
  siteName: string
  confirmationUrl: string
}

export const MagicLinkEmail = ({ confirmationUrl }: MagicLinkEmailProps) => (
  <Html lang="de" dir="ltr">
    <Head />
    <Preview>Dein Login-Link für Scorlink</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={brand}>
          <Text style={brandMark}>Scorlink</Text>
        </Section>
        <Heading style={h1}>Dein Login-Link</Heading>
        <Text style={text}>
          Klick auf den Button, um dich bei Scorlink anzumelden. Der Link
          läuft in Kürze ab.
        </Text>
        <Section style={buttonWrap}>
          <Button style={button} href={confirmationUrl}>
            Einloggen →
          </Button>
        </Section>
        <Text style={footer}>
          Du hast keinen Link angefragt? Dann ignoriere diese E-Mail.
        </Text>
        <Text style={signature}>— Scorlink · Wien</Text>
      </Container>
    </Body>
  </Html>
)

export default MagicLinkEmail

const main = {
  backgroundColor: '#ffffff',
  fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
}
const container = { padding: '40px 32px', maxWidth: '560px' }
const brand = { borderBottom: '1px solid #5C1A1F', paddingBottom: '20px', marginBottom: '32px' }
const brandMark = {
  fontFamily: 'Georgia, "Times New Roman", serif',
  fontSize: '22px',
  fontWeight: 600 as const,
  color: '#5C1A1F',
  margin: 0,
  letterSpacing: '-0.02em',
}
const h1 = {
  fontFamily: 'Georgia, "Times New Roman", serif',
  fontSize: '38px',
  fontWeight: 400 as const,
  color: '#5C1A1F',
  margin: '0 0 28px',
  letterSpacing: '-0.02em',
  lineHeight: '1.1',
}
const text = { fontSize: '15px', color: '#5C1A1F', lineHeight: '1.6', margin: '0 0 20px' }
const buttonWrap = { margin: '32px 0' }
const button = {
  backgroundColor: '#5C1A1F',
  color: '#EDE3D0',
  fontSize: '14px',
  fontWeight: 500 as const,
  borderRadius: '0',
  padding: '14px 24px',
  textDecoration: 'none',
  letterSpacing: '0.02em',
}
const footer = { fontSize: '13px', color: '#5C1A1F', opacity: 0.7, margin: '32px 0 0' }
const signature = {
  fontSize: '12px',
  color: '#5C1A1F',
  opacity: 0.6,
  margin: '24px 0 0',
  borderTop: '1px solid #5C1A1F',
  paddingTop: '20px',
  letterSpacing: '0.04em',
}
