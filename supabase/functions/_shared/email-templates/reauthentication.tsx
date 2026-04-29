/// <reference types="npm:@types/react@18.3.1" />

import * as React from 'npm:react@18.3.1'

import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from 'npm:@react-email/components@0.0.22'

interface ReauthenticationEmailProps {
  token: string
}

export const ReauthenticationEmail = ({ token }: ReauthenticationEmailProps) => (
  <Html lang="de" dir="ltr">
    <Head />
    <Preview>Dein Bestätigungscode für Scorlink</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={brand}>
          <Text style={brandMark}>Scorlink</Text>
        </Section>
        <Heading style={h1}>Identität bestätigen</Heading>
        <Text style={text}>Verwende den folgenden Code, um deine Identität zu bestätigen:</Text>
        <Text style={codeStyle}>{token}</Text>
        <Text style={footer}>
          Der Code läuft in Kürze ab. Wenn du das nicht angefragt hast,
          kannst du diese E-Mail ignorieren.
        </Text>
        <Text style={signature}>— Scorlink · Wien</Text>
      </Container>
    </Body>
  </Html>
)

export default ReauthenticationEmail

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
const codeStyle = {
  fontFamily: '"Courier New", Courier, monospace',
  fontSize: '32px',
  fontWeight: 600 as const,
  color: '#5C1A1F',
  backgroundColor: '#EDE3D0',
  padding: '20px 24px',
  letterSpacing: '0.2em',
  textAlign: 'center' as const,
  margin: '0 0 30px',
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
